import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import {
  FooterContainer,
  FooterTitle,
  FooterLink,
  FooterIconLink,
  FooterText,
} from '../css/styles/footerStyle';

const Footer = () => {
  return (
    <FooterContainer component="footer">
      <Container>
        <Grid container spacing={3} className="text-center text-md-left">
          <Grid item xs={12} md={4}>
            <FooterTitle variant="h5">Quick Links</FooterTitle>
            <nav>
              <FooterLink href="#">Home</FooterLink>
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
            </nav>
          </Grid>
          <Grid item xs={12} md={4}>
            <FooterTitle variant="h5">Follow Us</FooterTitle>
            <nav>
              <FooterIconLink href="#">
                <Facebook />
              </FooterIconLink>
              <FooterIconLink href="#">
                <Twitter />
              </FooterIconLink>
              <FooterIconLink href="#">
                <Instagram />
              </FooterIconLink>
              <FooterIconLink href="#">
                <LinkedIn />
              </FooterIconLink>
            </nav>
          </Grid>
          <Grid item xs={12} md={4}>
            <FooterTitle variant="h5">Contact Us</FooterTitle>
            <FooterText>Email: info@zenfusion.com</FooterText>
            <FooterText>Phone: (123) 456-7890</FooterText>
            <FooterText>Address: 123 E-commerce St, Shopville</FooterText>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Typography variant="body2" className="text-center mt-3">
            &copy; {new Date().getFullYear()} Zen Fusion. All rights reserved.
          </Typography>
        </Grid>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
