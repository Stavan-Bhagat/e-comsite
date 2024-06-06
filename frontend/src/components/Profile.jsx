import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { updateUser } from "../redux/Slice/authSlice";
import { updateUserData } from "../utils/service";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    role: user ? user.role : "",
  });

  const [editMode, setEditMode] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(true);

  const handleClose = () => {};

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateUserData(user._id, formData);
    console.log("aaaa", response);
    if (response) {
      console.log("respoce", response);
      dispatch(updateUser(response));
      setEditMode(false);
      setShowSubmitButton(true);
    } else {
      return "unable to change the profile!";
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user ? user.name : "",
      email: user ? user.email : "",
      role: user ? user.role : "",
    });

    setEditMode(false);
    setShowSubmitButton(true);
  };

  const handleImageUpload = (e) => {};

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      position="relative"
      pb={4}
      bgcolor="transparent"
    >
      <Card sx={{ position: "relative", zIndex: 2, background: "none" }}>
        <Box p={3}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar alt={user ? user.name : ""} src={user ? user.imageUrl : ""} sx={{ width: 120, height: 120 }} />
            {editMode && (
              <IconButton aria-label="change-image" component="label" sx={{ marginLeft: 2 }}>
                <PhotoCameraIcon />
                <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
              </IconButton>
            )}
          </Box>
          <Typography variant="h6">Profile Information</Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                disabled={!editMode}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                disabled={!editMode}
              />
            </Box>
            {user?.role === "Admin" && (
              <Box mb={2}>
                <TextField
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  disabled={!editMode}
                />
              </Box>
            )}
            {!editMode ? (
              <Box display="flex" justifyContent="flex-end">
                <IconButton
                  aria-label="edit"
                  onClick={handleEdit}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                    color: "primary.main",
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Box>
            ) : (
              <Box display="flex" justifyContent="flex-end">
                {showSubmitButton && (
                  <Button type="submit" variant="contained" mr={2}>
                    Submit
                  </Button>
                )}
                <Button type="button" variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            )}
          </form>
        </Box>
      </Card>
      <Paper
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "40%",
          backdropFilter: "blur(5px)",
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default Profile;
