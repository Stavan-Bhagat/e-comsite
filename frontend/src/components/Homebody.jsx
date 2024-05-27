import React from "react";
import {
  Image,
  Container,
  Row,
  Col,
  Carousel as BootstrapCarousel,
  Card,
  Button,
} from "react-bootstrap";
import { Typography } from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import image2 from "./../images/w1.jpg";
import image3 from "./../images/mens.webp";
import image5 from "./../images/bags.jpg";
import men from "./../images/bhai.jpeg";
import women from "./../images/women.jpeg";
import kids from "./../images/kids.jpeg";
import electronics from "./../images/electronics.jpeg";
import beauty from "./../images/beauty.jpeg";
import toys from "./../images/toys.jpeg";
import CategoryList from "../components/CategoryList";
import HorizontalCategory from "../components/HorizontalCategory";
const categories = [
  { id: 1, name: "Men", imgSrc: men },
  { id: 2, name: "Women", imgSrc: women },
  { id: 3, name: "Kids", imgSrc: kids },
  { id: 4, name: "Electronics", imgSrc: electronics },
  { id: 5, name: "Beauty", imgSrc: beauty },
  { id: 6, name: "Toys", imgSrc: toys },
];

const items = [
  { id: 1, name: "temp", img: electronics, price: 150, category: "temp" },
  { id: 2, name: "temp", img: electronics, price: 150, category: "temp" },
  { id: 3, name: "temp", img: electronics, price: 150, category: "temp" },
  { id: 4, name: "temp", img: electronics, price: 150, category: "temp" },
  { id: 5, name: "temp", img: electronics, price: 150, category: "temp" },
];

const productData = [
  {
    id: 1,
    imageurl: electronics,
    name: "Colorful sneakers",
    price: "$19.99",
    description: "Some text about the product..",
  },
  {
    id: 2,
    imageurl: electronics,
    name: "Sport sneakers",
    price: "$21.99",
    description: "Some text about the product..",
  },
  {
    id: 3,
    imageurl: electronics,
    name: "iWatch",
    price: "$99.99",
    description: "Some text about the product..",
  },
  {
    id: 4,
    imageurl: electronics,
    name: "Water Bottle",
    price: "$14.99",
    description: "Some text about the product..",
  },
  {
    id: 5,
    imageurl: electronics,
    name: "Vans sneakers",
    price: "$38.99",
    description: "Some text about the product..",
  },
  {
    id: 6,
    imageurl: electronics,
    name: "Water Bottle",
    price: "$14.99",
    description: "Some text about the product..",
  },
  {
    id: 7,
    imageurl: electronics,
    name: "Vans sneakers",
    price: "$38.99",
    description: "Some text about the product..",
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Body = () => {
  return (
    <>
      <div className="carousel-container">
        <CategoryList />

        <div className="carousel-container">
          <BootstrapCarousel>
            <BootstrapCarousel.Item>
              <img className="d-block w-100" src={image2} alt="First slide" />
              <BootstrapCarousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </BootstrapCarousel.Caption>
            </BootstrapCarousel.Item>
            <BootstrapCarousel.Item>
              <img className="d-block w-100" src={image3} alt="Second slide" />
              <BootstrapCarousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </BootstrapCarousel.Caption>
            </BootstrapCarousel.Item>
            <BootstrapCarousel.Item>
              <img className="d-block w-100" src={image5} alt="Third slide" />
              <BootstrapCarousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </BootstrapCarousel.Caption>
            </BootstrapCarousel.Item>
          </BootstrapCarousel>
        </div>
        <Container classname="" fluid>
          <Typography variant="h5">Best Of Electronics</Typography>
        </Container>

        <HorizontalCategory />
        {/* <Container className="">
          <Row className="display-product-row">
            {items.map((category) => (
              <Col
                key={category.id}
                xs={6}
                sm={4}
                md={3}
                lg={2}
                className="text-center p-2"
              >
                <Image
                  src={category.img}
                  alt={category.name}
                  className="round-image"
                />
                <Typography variant="h6">{category.name}</Typography>
                <Typography variant="h6">{category.price}</Typography>
              </Col>
            ))}
          </Row>
        </Container> */}
        <Typography>Product Carousel</Typography>
        <Carousel showDots={true} responsive={responsive}>
          {productData.map((item) => (
            <Card key={item.id} className="card">
              <Card.Img
                variant="top"
                src={item.imageurl}
                className="product--image"
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text className="price">{item.price}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          ))}
        </Carousel>
        <Typography>Popular Brands</Typography>
        <Carousel showDots={true} responsive={responsive}>
          {productData.map((item) => (
            <Card key={item.id} className="card">
              <Card.Img variant="top" src={toys} className="product--image" />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text className="price">{item.price}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Body;
