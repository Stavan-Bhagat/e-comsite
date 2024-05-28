import React, { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";

const ProductPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching the product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!product) {
    return <Typography>No product found.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h5">Product Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ height: "90vh" }}>
            <Container>
              <Box component={"container"}>
                {/* <Image src={product.image || image} alt={product.productName} /> */}
              </Box>
            </Container>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ height: "90vh" }}>
            <Typography variant="h4">{product.productName}</Typography>
            <Typography variant="h6">{product.price}</Typography>
            <Typography variant="body1">{product.description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
