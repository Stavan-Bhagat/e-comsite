import React, { useEffect, useState } from "react";
import { Typography, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fetchProductsByCategory } from "../utils/service";
import { styles } from "../css/multiCarousel";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link } from "react-router-dom";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
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
      <Typography variant="h6">Popular {category}</Typography>
      <Carousel showDots responsive={responsive}>
        {products?.map((item) => (
          <Link to={`/product/${item._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <Card key={item?.id} style={styles.card}>
              <img src={item?.productImage[0]} alt={item?.name} style={styles.productImage} />
              <CardContent style={styles.cardContent}>
                <Typography style={styles.productName} variant="body1">
                  {item?.productName}
                </Typography>
                <Typography style={styles.productPrice} variant="body1" color="black" component="span">
                  From
                </Typography>
                <Typography style={styles.productPrice} variant="body2" color="primary" component="span">
                  <CurrencyRupeeIcon fontSize="small" />
                  {item?.price}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Carousel>
    </>
  );
};

export default ProductCarousel;
