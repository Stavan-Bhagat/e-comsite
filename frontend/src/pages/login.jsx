import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { Row, Col, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import shoppingImage from "../images/shopping.avif";
import "../css/register.css";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router";
import axiosInstance from "../utils/axios";
import { VisuallyHiddenInput } from ".././utils/style";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { passwordKey } from "../constant/constant";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationTimer, setVerificationTimer] = useState(300);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    if (verificationSent && verificationTimer > 0) {
      const intervalId = setInterval(() => {
        setVerificationTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (verificationSent && verificationTimer === 0) {
      navigate("/");
    }
  }, [verificationSent, verificationTimer, navigate]);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleLogin = (data) => {
    console.log("Login Data:", data);
    // Add login logic here
  };

  const handleRegister = async (data) => {
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(
        data.password,
        passwordKey
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
                      Please check your email to verify your account before 
                      {verificationTimer} seconds.
                      If you
                      haven't received the email, please register again
                    </Typography>
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
                      Register
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
                            value: 6,
                            message: "Password must be at least 6 characters",
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
                        role={undefined}
                        variant="contained"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 2 }}
                      >
                        <CameraAltIcon /> Upload Profile
                        <VisuallyHiddenInput
                          type="file"
                          onChange={handleFileChange}
                        />
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ mt: 2 }}
                      >
                        Register
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

// import React, { useState } from "react";
// import { TextField, Button, Typography, Container } from "@mui/material";
// import { Row, Col, Image } from "react-bootstrap";
// import { useForm } from "react-hook-form";
// import Header from "../components/Header";
// import shoppingImage from "../images/shopping.avif";
// import "../css/register.css";
// import CryptoJS from "crypto-js";
// import { useNavigate } from "react-router";
// import axiosInstance from "../utils/axios";
// import { VisuallyHiddenInput } from ".././utils/style";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import{passwordKey} from "../constant/constant"
// // const passwordKey= process.env.ENCRYPT_PASSWORD_KEY;
// // console.log(passwordKey);

// const Login = () => {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     getValues,
//   } = useForm();

//   const handleToggle = () => {
//     setIsLogin(!isLogin);
//   };

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleLogin = (data) => {
//     console.log("Login Data:", data);
//     // Add login logic here
//   };

//   const handleRegister = async (data) => {
//     try {
//       const encryptedPassword = CryptoJS.AES.encrypt(
//         data.password,
//         passwordKey
//       ).toString();

//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("email", data.email);
//       formData.append("role", "User");
//       formData.append("password", encryptedPassword);
//       if (selectedFile) {
//         formData.append("image", selectedFile);
//       }

//       await axiosInstance.post("/submit/register", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       navigate("/");
//     } catch (e) {
//       console.log(`Error: ${e}`);
//     }
//   };

//   const onSubmit = (data) => {
//     if (isLogin) {
//       handleLogin(data);
//     } else {
//       handleRegister(data);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Container
//         sx={{
//           border: "1px solid #ccc",
//           borderRadius: "5px",
//           align: "center",
//           margin: "3%",
//           padding: "2%",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <Row>
//           <Col>
//             <Image src={shoppingImage} className="register-image" />
//           </Col>
//           <Col>
//             <Container
//               maxWidth="xs"
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Container maxWidth="xs">
//                 {isLogin ? (
//                   <>
//                     <Typography variant="h4" align="center" gutterBottom>
//                       Sign In
//                     </Typography>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                       <TextField
//                         fullWidth
//                         margin="normal"
//                         label="Email"
//                         variant="outlined"
//                         {...register("email", {
//                           required: "Email is required",
//                           pattern: {
//                             value:
//                               /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//                             message: "Invalid email address",
//                           },
//                         })}
//                         error={!!errors.email}
//                         helperText={errors.email ? errors.email.message : ""}
//                       />
//                       <TextField
//                         fullWidth
//                         margin="normal"
//                         label="Password"
//                         type="password"
//                         variant="outlined"
//                         {...register("password", {
//                           required: "Password is required",
//                           minLength: {
//                             value: 6,
//                             message: "Password must be at least 6 characters",
//                           },
//                         })}
//                         error={!!errors.password}
//                         helperText={
//                           errors.password ? errors.password.message : ""
//                         }
//                       />
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         size="large"
//                         sx={{ mt: 2 }}
//                       >
//                         Sign In
//                       </Button>
//                     </form>
//                     <Typography variant="body1" align="center">
//                       Don't have an account?{" "}
//                       <Button color="secondary" onClick={handleToggle}>
//                         Register
//                       </Button>
//                     </Typography>
//                   </>
//                 ) : (
//                   <>
//                     <Typography variant="h4" align="center" gutterBottom>
//                       Register
//                     </Typography>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                       <TextField
//                         fullWidth
//                         margin="normal"
//                         label="Name"
//                         variant="outlined"
//                         {...register("name", {
//                           required: "Name is required",
//                         })}
//                         error={!!errors.name}
//                         helperText={errors.name ? errors.name.message : ""}
//                       />
//                       <TextField
//                         fullWidth
//                         margin="normal"
//                         label="Email"
//                         variant="outlined"
//                         {...register("email", {
//                           required: "Email is required",
//                           pattern: {
//                             value:
//                               /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//                             message: "Invalid email address",
//                           },
//                         })}
//                         error={!!errors.email}
//                         helperText={errors.email ? errors.email.message : ""}
//                       />
//                       <TextField
//                         fullWidth
//                         margin="normal"
//                         label="Password"
//                         type="password"
//                         variant="outlined"
//                         {...register("password", {
//                           required: "Password is required",
//                           minLength: {
//                             value: 6,
//                             message: "Password must be at least 6 characters",
//                           },
//                         })}
//                         error={!!errors.password}
//                         helperText={
//                           errors.password ? errors.password.message : ""
//                         }
//                       />
//                       <TextField
//                         fullWidth
//                         margin="normal"
//                         label="Confirm Password"
//                         type="password"
//                         variant="outlined"
//                         {...register("confirmPassword", {
//                           required: "Confirm Password is required",
//                           validate: (value) =>
//                             value === getValues("password") ||
//                             "Passwords do not match",
//                         })}
//                         error={!!errors.confirmPassword}
//                         helperText={
//                           errors.confirmPassword
//                             ? errors.confirmPassword.message
//                             : ""
//                         }
//                       />
//                       <Button
//                         component="label"
//                         role={undefined}
//                         variant="contained"
//                         fullWidth
//                         variant="outlined"
//                         sx={{ mt: 2 }}
//                       >
//                         <CameraAltIcon /> Upload Profile
//                         <VisuallyHiddenInput
//                           type="file"
//                           onChange={handleFileChange}
//                         />
//                       </Button>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         size="large"
//                         sx={{ mt: 2 }}
//                       >
//                         Register
//                       </Button>
//                     </form>
//                     <Typography variant="body1" align="center">
//                       Already have an account?{" "}
//                       <Button color="secondary" onClick={handleToggle}>
//                         Login
//                       </Button>
//                     </Typography>
//                   </>
//                 )}
//               </Container>
//             </Container>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Login;
