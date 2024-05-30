import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fetchProductsByCategory } from "../utils/service";
import { styles } from "../css/multiCarousel";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductCarousel = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductsFromCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetchProductsByCategory(category);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsFromCategory(category);
  }, [category]);

  return (
    <>
      <Typography variant="h6">Popular Brands</Typography>
      <Carousel showDots responsive={responsive}>
        {products?.map((item) => (
          <Card key={item?.id} style={styles.card}>
            <img
              src={item?.productImage[0]}
              alt={item?.name}
              style={styles.productImage}
            />
            <CardContent style={styles.cardContent}>
              <Typography style={styles.productName} variant="body1">
                {item?.name}
              </Typography>
              <Typography
                style={styles.productPrice}
                variant="body2"
                color="primary"
              >
                ${item?.price}
              </Typography>
            </CardContent>
            <CardActions style={styles.cardActions}>
              <Button variant="contained" color="primary">
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </Carousel>
    </>
  );
};

export default ProductCarousel;
