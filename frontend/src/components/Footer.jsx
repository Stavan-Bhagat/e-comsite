import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">About Us</Nav.Link>
              <Nav.Link href="#">Contact Us</Nav.Link>
              <Nav.Link href="#">FAQ</Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <Nav className="justify-content-start">
              <Nav.Link href="#">
                <FaFacebook size={24} />
              </Nav.Link>
              <Nav.Link href="#">
                <FaTwitter size={24} />
              </Nav.Link>
              <Nav.Link href="#">
                <FaInstagram size={24} />
              </Nav.Link>
              <Nav.Link href="#">
                <FaLinkedin size={24} />
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: info@zenfusion.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 E-commerce St, Shopville</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p>
              &copy; {new Date().getFullYear()} Zen Fusion. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

// import React from "react";
// import { Box, Typography, Link, IconButton } from "@mui/material";
// import { styled } from "@mui/system";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";

// const FooterContainer = styled(Box)(({ theme }) => ({
//   backgroundColor: "#f5f5f5",
//   padding: theme.spacing(4),
//   marginTop: theme.spacing(4),
//   borderTop: "1px solid #ddd",
// }));

// const FooterSection = styled(Box)(({ theme }) => ({
//   marginBottom: theme.spacing(3),
// }));

// const Footer = () => {
//   return (
//     <FooterContainer>
//       <Box display="flex" justifyContent="space-between" flexWrap="wrap">
//         <FooterSection>
//           <Typography variant="h6" gutterBottom>
//             Quick Links
//           </Typography>
//           <Box>
//             <Link
//               href="#"
//               variant="body2"
//               sx={{ display: "block", marginBottom: "8px" }}
//             >
//               Home
//             </Link>
//             <Link
//               href="#"
//               variant="body2"
//               sx={{ display: "block", marginBottom: "8px" }}
//             >
//               About Us
//             </Link>
//             <Link
//               href="#"
//               variant="body2"
//               sx={{ display: "block", marginBottom: "8px" }}
//             >
//               Contact Us
//             </Link>
//             <Link
//               href="#"
//               variant="body2"
//               sx={{ display: "block", marginBottom: "8px" }}
//             >
//               FAQ
//             </Link>
//           </Box>
//         </FooterSection>
//         <FooterSection>
//           <Typography variant="h6" gutterBottom>
//             Follow Us
//           </Typography>
//           <Box>
//             <IconButton href="#" color="primary">
//               <FacebookIcon />
//             </IconButton>
//             <IconButton href="#" color="primary">
//               <TwitterIcon />
//             </IconButton>
//             <IconButton href="#" color="primary">
//               <InstagramIcon />
//             </IconButton>
//             <IconButton href="#" color="primary">
//               <LinkedInIcon />
//             </IconButton>
//           </Box>
//         </FooterSection>
//         <FooterSection>
//           <Typography variant="h6" gutterBottom>
//             Contact Us
//           </Typography>
//           <Typography variant="body2">Email: info@zenfusion.com</Typography>
//           <Typography variant="body2">Phone: (123) 456-7890</Typography>
//           <Typography variant="body2">
//             Address: 123 E-commerce St, Shopville
//           </Typography>
//         </FooterSection>
//       </Box>
//       <Box textAlign="center" mt={3}>
//         <Typography variant="body2">
//           &copy; {new Date().getFullYear()} Zen Fusion. All rights reserved.
//         </Typography>
//       </Box>
//     </FooterContainer>
//   );
// };

// export default Footer;
