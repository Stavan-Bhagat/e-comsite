import React, { useEffect, useState } from "react";
import { fetchProductsByCategory } from "../utils/service";
import LinearProgress from "@mui/material/LinearProgress";
import { Container, Grid, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HorizontalCategory = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductsFromCategory = async () => {
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
    fetchProductsFromCategory();
  }, [category]); // Fetch products whenever the category prop changes

  return (
    <>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Container>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={3} key={product._id}>
                <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
                  <Box sx={{ border: "1px solid", padding: 2 }}>
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      style={{ width: "100%", height: "auto" }}
                    />
                    <Typography variant="h6">{product.productName}</Typography>
                    <Typography variant="h6">${product.price}</Typography>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default HorizontalCategory;
