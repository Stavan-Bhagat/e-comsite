import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Card,
  CardMedia,
} from "@mui/material";
import { Row, Col, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import shoppingImage from "../images/shopping.avif";
import checkEmail from "../images/checkEmail.jpg";
import "../css/register.css";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router";
import axiosInstance from "../utils/axios";
import { VisuallyHiddenInput } from ".././utils/style";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/Slice/authSlice";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { set_token } from "../utils/service";
const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    if (verificationSent) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 300000);

      return () => clearTimeout(timer);
    }
  }, [verificationSent, navigate]);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleLogin = async(data) => {
    console.log("Login Data:", data);
    try {
      const response = await axiosInstance.post(`/submit/login`, data);

      const { success, message, accessToken, refreshToken, user } =
      response.data;
      // localStorage.setItem("token", accessToken);
      set_token(accessToken);
      localStorage.setItem("refreshToken", refreshToken);
  
      if (success) {
        dispatch(loginSuccess({user, accessToken}));
      } else {
        return "login failed", message;
      }
    } catch (e) {
      console.error("error", e.message);
      dispatch(loginFailure(e.message));
    }
  };

  const handleRegister = async (data) => {
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(
        data.password,
        process.env.REACT_APP_ENCRYPT_PASSWORD_KEY
      ).toString();

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("role", "User");
      formData.append("password", encryptedPassword);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      await axiosInstance.post("/submit/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setVerificationSent(true);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const onSubmit = (data) => {
    if (isLogin) {
      handleLogin(data);
    } else {
      handleRegister(data);
    }
  };

  return (
    <>
      <Header />
      <Container
        sx={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          align: "center",
          margin: "3%",
          padding: "2%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row>
          <Col>
            <Image src={shoppingImage} className="register-image" />
          </Col>
          <Col>
            <Container
              maxWidth="xs"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Container maxWidth="xs">
                {verificationSent ? (
                  <>
                    <Typography variant="h4" align="center" gutterBottom>
                      Verify Your Email
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                      Please check your email to verify your account within 5
                      minutes, If you haven't received the email, please
                      register again
                    </Typography>
                    <Card sx={{ maxWidth: 400, margin: "auto" }}>
                      <CardMedia
                        component="img"
                        height="300"
                        image={checkEmail}
                        alt="check Email"
                      />
                    </Card>
                  </>
                ) : isLogin ? (
                  <>
                    <Typography variant="h4" align="center" gutterBottom>
                      Sign In
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        variant="outlined"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Invalid email address",
                          },
                        })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        variant="outlined"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        error={!!errors.password}
                        helperText={
                          errors.password ? errors.password.message : ""
                        }
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ mt: 2 }}
                      >
                        Sign In
                      </Button>
                    </form>
                    <Typography variant="body1" align="center">
                      Don't have an account?{" "}
                      <Button color="secondary" onClick={handleToggle}>
                        Register
                      </Button>
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h4" align="center" gutterBottom>
                      Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        variant="outlined"
                        {...register("name", {
                          required: "Name is required",
                        })}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        variant="outlined"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Invalid email address",
                          },
                        })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        variant="outlined"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                            message:
                              "Password must include upper and lower case letters, a number, and a special character",
                          },
                        })}
                        error={!!errors.password}
                        helperText={
                          errors.password ? errors.password.message : ""
                        }
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        {...register("confirmPassword", {
                          required: "Confirm Password is required",
                          validate: (value) =>
                            value === getValues("password") ||
                            "Passwords do not match",
                        })}
                        error={!!errors.confirmPassword}
                        helperText={
                          errors.confirmPassword
                            ? errors.confirmPassword.message
                            : ""
                        }
                      />
                                         <Button
                        component="label"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ mt: 2 }}
                      >
                        <CameraAltIcon sx={{ mr: 1 }} />
                        Upload Profile Picture
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          hidden
                        />   </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ mt: 2 }}
                      >
                        Sign UP
                      </Button>
                    </form>
                    <Typography variant="body1" align="center">
                      Already have an account?{" "}
                      <Button color="secondary" onClick={handleToggle}>
                        Login
                      </Button>
                    </Typography>
                  </>
                )}
              </Container>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
