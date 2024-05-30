import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import { Container, Grid, Item, Typography, Box } from "@mui/material";
import { Image } from "react-bootstrap";
import axiosInstance from "../utils/axios";
import CircularProgress from "@mui/material/CircularProgress";
const CategoryList = () => {
  const [categoryProduct, SetCategoryProduct] = useState([]);
  const [loading, SetLoading] = useState(false);
  const navigate = useNavigate();
  const fetchCategoryProduct = async () => {
    SetLoading(true);
    const response = await axiosInstance.get(`/product/fetch-category-product`);
    SetLoading(false);
    SetCategoryProduct(response.data.data);
  };
  const handleChange = (category) => {
    navigate(`/product/search/${category}`);
  };
  useEffect(() => {
    fetchCategoryProduct();
  }, []);
  return (
    <>
      {loading ? (
        <CircularProgress centered />
      ) : (
        <Container
          fluid
          gap={2}
          style={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
            paddingTop: "2rem",
            gap: "1rem",
          }}
        >
          {" "}
          {categoryProduct.map((category, index) => (
            <Box key={index} onClick={() => handleChange(category.category)}>
              <Image
                src={category.productImage[0]}
                alt={category.productName}
                className="round-image"
              />
              <Typography variant="h6" align="center">
                {category.category}
              </Typography>
            </Box>
          ))}
        </Container>
      )}
    </>
  );
};
export default CategoryList;
