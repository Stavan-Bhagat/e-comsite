import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Image } from "react-bootstrap";
import axios from "axios";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    if (searchQuery) {
      fetchProducts();
    }
  }, [searchQuery]);

  const fetchProducts = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(`/api/products?search=${searchQuery}`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = () => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search Products
      </Typography>
      <Box mb={3}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="fashion">Fashion</MenuItem>
                <MenuItem value="home">Home</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <Typography>Price Range</Typography>
            <TextField
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              fullWidth
            />
            <TextField
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              fullWidth
              sx={{ mt: 2 }}
            />
          </Box>
          <Button variant="contained" color="primary" onClick={handleFilter}>
            Apply Filters
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid item xs={4} key={product.id}>
                <Box>
                  <Image
                    src={product.productImage}
                    alt={product.productName}
                    fluid
                  />
                  <Typography variant="h6">{product.productName}</Typography>
                  <Typography variant="body1">${product.price}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchPage;
