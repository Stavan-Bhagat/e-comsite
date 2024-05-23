import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import Header from "../components/Header";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // State to manage whether the user is on the login page

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, such as sending data to server
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleToggle = () => {
    setIsLogin(!isLogin); // Toggle the state between login and register
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="xs"
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h4" align="center" gutterBottom>
                Sign In
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={handlePasswordChange}
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
              <form onSubmit={handleSubmit}>
              <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  variant="outlined"
                  type="text"
                  value={name}
                  onChange={handleEmailChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={handlePasswordChange}
                />
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
    </>
  );
};

export default Login;
