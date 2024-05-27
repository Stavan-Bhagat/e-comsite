import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Item, Typography, Box } from "@mui/material";
import { Image } from "react-bootstrap";
import axiosInstance from "../utils/axios";
import CircularProgress from "@mui/material/CircularProgress";
const CategoryList = () => {
  const [categoryProduct, SetCategoryProduct] = useState([]);
  const [loading, SetLoading] = useState(false);
  const fetchCategoryProduct = async () => {
    SetLoading(true);
    const response = await axiosInstance.get(`/product/fetch-category-product`);
    SetLoading(false);
    SetCategoryProduct(response.data.data);
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
            padding: "1rem",
            gap: "1rem",
          }}
        >
          {" "}
          {categoryProduct.map((category) => (
            <Box>
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
          {/* <Row className="category-row d-flex justify-content-between flex-nowrap overflow-auto">
            {categories.map((category) => (
              <Col
                key={category.id}
                xs={6}
                sm={4}
                md={3}
                lg={2}
                className="text-center p-2"
              >
                <Image
                  src={category.imgSrc}
                  alt={category.name}
                  className="round-image"
                />
                <Typography variant="h6">{category.name}</Typography>
              </Col>
            ))}
          </Row> */}
        </Container>
      )}
    </>
  );
};
export default CategoryList;
