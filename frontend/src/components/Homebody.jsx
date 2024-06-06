import React from "react";
import { Image, Container, Row, Col, Carousel as BootstrapCarousel, Card, Button } from "react-bootstrap";
import { Typography } from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import img1 from "./../images/img1.webp";
import img3 from "./../images/img3.webp";
import img2 from "./../images/img2.jpg";
import men from "./../images/bhai.jpeg";
import women from "./../images/women.jpeg";
import kids from "./../images/kids.jpeg";
import electronics from "./../images/electronics.jpeg";
import beauty from "./../images/beauty.jpeg";
import toys from "./../images/toys.jpeg";
import CategoryList from "../components/CategoryList";
import HorizontalCategory from "../components/HorizontalCategory";
import ProductCarousel from "./ProductCarousel";
import { styles } from "../css/multiCarousel";

const Body = () => {
  return (
    <>
      <div className="carousel-container">
        <CategoryList />
        <BootstrapCarousel>
          <BootstrapCarousel.Item style={styles.carouselItem}>
            <img className="d-block w-100" src={img1} alt="First slide" style={styles.carouselImage} />
          </BootstrapCarousel.Item>
          <BootstrapCarousel.Item style={styles.carouselItem}>
            <img className="d-block w-100" src={img2} alt="Second slide" style={styles.carouselImage} />
          </BootstrapCarousel.Item>
          <BootstrapCarousel.Item style={styles.carouselItem}>
            <img className="d-block w-100" src={img3} alt="Third slide" style={styles.carouselImage} />
          </BootstrapCarousel.Item>
        </BootstrapCarousel>
      </div>
      <Container classname="" fluid>
        <Typography variant="h5">Best Of Electronics</Typography>
      </Container>

      <HorizontalCategory category="electronics" />
      <ProductCarousel category="fashion" />
      <ProductCarousel category="skincare" />
    </>
  );
};

export default Body;
