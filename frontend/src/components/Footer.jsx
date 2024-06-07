import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="text-center text-md-left">
          <Col xs={12} md={4} className="mb-3">
            <h5>Quick Links</h5>
            <Nav className="flex-column align-items-center align-items-md-start">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">About Us</Nav.Link>
              <Nav.Link href="#">Contact Us</Nav.Link>
              <Nav.Link href="#">FAQ</Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <h5>Follow Us</h5>
            <Nav className="justify-content-center justify-content-md-start">
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
          <Col xs={12} md={4} className="mb-3">
            <h5>Contact Us</h5>
            <p>Email: info@zenfusion.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 E-commerce St, Shopville</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p>&copy; {new Date().getFullYear()} Zen Fusion. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
