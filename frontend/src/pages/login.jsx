import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Card, CardMedia } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { fetchCartData } from '../utils/services/cart.service';
import { loginSuccess, loginFailure } from '../redux/Slice/authSlice';
import { loginUser, registerUser } from '../utils/services/user.service';
import checkEmail from '../images/checkEmail.jpg';
import loginImage from '../images/login.avif';
import Header from '../components/Header';
import { addToCart } from '../redux/Slice/cartSlice';
import { MESSAGES } from '../constant/messages.constant';
import {
  StyledContainer,
  StyledImage,
  StyledModalContainer,
  StyledGrid,
} from '../css/styles/login.style';

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const [loading, setLoading] = useState(false);
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
        navigate('/');
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

  const fetchCart = async (userId) => {
    try {
      const data = await fetchCartData(userId);
      data.items.forEach((cartItem) => {
        const item = {
          _id: cartItem.productId._id,
          productName: cartItem.productId.productName,
          productImage: cartItem.productId.productImage,
          quantity: cartItem.quantity,
          sellingPrice: cartItem.sellingPrice,
        };
        dispatch(addToCart(item));
      });
    } catch (error) {
      console.error(MESSAGES.ERROR.CART_FETCH_FAILED, error);
    }
  };

  const handleLogin = async (data) => {
    try {
      const response = await loginUser(data);
      const { success, message, accessToken, refreshToken, user } = response;
      if (success) {
        dispatch(loginSuccess({ user, accessToken, refreshToken }));
        await fetchCart(user._id);
      } else {
        enqueueSnackbar(`${MESSAGES.ERROR.LOGIN_FAILED} ${message}`, { variant: 'error' });
      }
    } catch (e) {
      dispatch(loginFailure(e.message));
      enqueueSnackbar(`${MESSAGES.ERROR.LOGIN_FAILED} ${e.message}`, { variant: 'error' });
    }
  };

  const handleRegister = async (data) => {
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(
        data.password,
        process.env.REACT_APP_ENCRYPT_PASSWORD_KEY
      ).toString();

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('role', 'User');
      formData.append('password', encryptedPassword);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      setLoading(true);
      await registerUser(formData);
      setLoading(false);
      setVerificationSent(true);
    } catch (error) {
      enqueueSnackbar(`${MESSAGES.ERROR.REGISTER_FAILED} ${error.message}`, {
        variant: 'error',
      });
    }
  };

  const onSubmit = (data) => {
    if (isLogin) {
      handleLogin(data);
    } else {
      handleRegister(data);
    }
  };

  if (loading) {
    return (
      <StyledContainer
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
      >
        <CircularProgress color="secondary" />
        <Typography mt={2}>
          {MESSAGES.INFO.PROCESSING_REQUEST}
          <SentimentVerySatisfiedIcon className="px-2" />
        </Typography>
      </StyledContainer>
    );
  }

  return (
    <>
      <Header />
      <StyledContainer>
        <StyledGrid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <StyledImage component="img" src={loginImage} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledModalContainer>
              <Container maxWidth="xs">
                {verificationSent ? (
                  <>
                    <Typography variant="h4" align="center" gutterBottom>
                      Verify Your Email
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                      {MESSAGES.INFO.VERIFY_EMAIL}
                    </Typography>
                    <Card sx={{ maxWidth: 400, margin: 'auto' }}>
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
                      Login
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        variant="outlined"
                        {...register('email', {
                          required: MESSAGES.FORMS.VALIDATION.EMAIL_REQUIRED,
                          pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: MESSAGES.FORMS.VALIDATION.EMAIL_INVALID,
                          },
                        })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        variant="outlined"
                        {...register('password', {
                          required: MESSAGES.FORMS.VALIDATION.PASSWORD_REQUIRED,
                          minLength: {
                            value: 6,
                            message: MESSAGES.FORMS.VALIDATION.PASSWORD_MIN_LENGTH,
                          },
                        })}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ mt: 2 }}
                      >
                        Login
                      </Button>
                    </form>
                    <Typography variant="body1" align="center">
                      Don&apos;t have an account?{' '}
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
                        {...register('name', {
                          required: MESSAGES.FORMS.VALIDATION.NAME_REQUIRED,
                        })}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ''}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        variant="outlined"
                        {...register('email', {
                          required: MESSAGES.FORMS.VALIDATION.EMAIL_REQUIRED,
                          pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: MESSAGES.FORMS.VALIDATION.EMAIL_INVALID,
                          },
                        })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        variant="outlined"
                        {...register('password', {
                          required: MESSAGES.FORMS.VALIDATION.PASSWORD_REQUIRED,
                          minLength: {
                            value: 8,
                            message: MESSAGES.FORMS.VALIDATION.PASSWORD_MIN_LENGTH,
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                            message: MESSAGES.FORMS.VALIDATION.PASSWORD_COMPLEXITY,
                          },
                        })}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        {...register('confirmPassword', {
                          required: MESSAGES.FORMS.VALIDATION.PASSWORD_CONFIRM_REQUIRED,
                          validate: (value) =>
                            value === getValues('password') ||
                            MESSAGES.FORMS.VALIDATION.PASSWORD_CONFIRM_MATCH,
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
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
                        <input type="file" accept="image/*" onChange={handleFileChange} hidden />
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
                      Already have an account?{' '}
                      <Button color="secondary" onClick={handleToggle}>
                        Login
                      </Button>
                    </Typography>
                  </>
                )}
              </Container>
            </StyledModalContainer>
          </Grid>
        </StyledGrid>
      </StyledContainer>
    </>
  );
};

export default Login;
