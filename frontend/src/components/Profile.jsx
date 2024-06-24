import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Box,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  NativeSelect,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { updateUser } from '../redux/Slice/authSlice';
import { updateUserData } from '../utils/services/user.service';
import {
  StyledContainer,
  StyledCard,
  StyledAvatar,
  StyledForm,
  StyledIconButton,
  StyledButton,
  StyledBackdrop,
  StyledLoadingMessage,
} from '../css/styles/profile.style';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    role: user ? user.role : '',
    imageUrl: user ? user.imageUrl : '',
  });

  const [editMode, setEditMode] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const finalFormData = new FormData();
    finalFormData.append('name', formData.name);
    finalFormData.append('email', formData.email);
    finalFormData.append('role', formData.role);
    if (formData.image) {
      finalFormData.append('image', formData.image);
    }

    const response = await updateUserData(user._id, finalFormData);
    setLoading(false);

    if (response) {
      dispatch(updateUser(response.updatedUser));
      setEditMode(false);
      setShowSubmitButton(true);
      setSnackbarMessage('Profile updated successfully!');
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage('Unable to change the profile!');
      setOpenSnackbar(true);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user ? user.name : '',
      email: user ? user.email : '',
      role: user ? user.role : '',
      imageUrl: user ? user.imageUrl : '',
    });

    setEditMode(false);
    setShowSubmitButton(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imageUrl: URL.createObjectURL(file),
      });
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <Box p={3}>
          <Box display="flex" justifyContent="center" mb={2}>
            <StyledAvatar alt={user ? user.name : ''} src={formData.imageUrl} />
            {editMode && (
              <StyledIconButton aria-label="change-image" component="label">
                <PhotoCameraIcon />
                <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
              </StyledIconButton>
            )}
          </Box>
          <Typography variant="h6" gutterBottom>
            Profile Information
          </Typography>
          <StyledForm onSubmit={handleSubmit}>
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
            {user?.role === 'Admin' && (
              <Box mb={2}>
                <NativeSelect
                  value={formData.role}
                  onChange={handleChange}
                  inputProps={{
                    name: 'role',
                    id: 'role-select',
                  }}
                  fullWidth
                  disabled={!editMode}
                >
                  <option value={'Admin'}>Admin</option>
                  <option value={'User'}>User</option>
                </NativeSelect>
              </Box>
            )}
            <Box display="flex" justifyContent="flex-end">
              {!editMode ? (
                <IconButton aria-label="edit" onClick={handleEdit}>
                  <EditRoundedIcon />
                </IconButton>
              ) : (
                <>
                  {showSubmitButton && (
                    <StyledButton type="submit" variant="contained">
                      Submit
                    </StyledButton>
                  )}
                  <StyledButton type="button" variant="outlined" onClick={handleCancel}>
                    Cancel
                  </StyledButton>
                </>
              )}
            </Box>
          </StyledForm>
        </Box>
      </StyledCard>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Backdrop open={loading} style={{ zIndex: 1200, color: '#fff' }}>
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <StyledLoadingMessage>Updating Profile...</StyledLoadingMessage>
        </Box>
      </Backdrop>
      <StyledBackdrop />
    </StyledContainer>
  );
};

export default Profile;
