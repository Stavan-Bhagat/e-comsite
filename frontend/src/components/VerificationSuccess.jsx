import React from 'react';
import { Button, Card, CardMedia, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import imageSuccess from '../images/success.avif';

const VerificationSuccess = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Card sx={{ maxWidth: 400, margin: 'auto' }}>
        <CardMedia component="img" height="200" image={imageSuccess} alt="Email Verified" />
        <Container sx={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Email Verified Successfully!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your email has been verified successfully. You can now log in to your account.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoginRedirect}
            sx={{ marginTop: '20px' }}
          >
            Go to Login Page
          </Button>
        </Container>
      </Card>
    </Container>
  );
};

export default VerificationSuccess;
