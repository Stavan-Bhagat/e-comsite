import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

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
            <p>&copy; {new Date().getFullYear()} Zen Fusion. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
