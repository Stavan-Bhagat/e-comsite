import React, { useEffect, useState } from "react";
import { fetchProductsByCategory } from "../utils/service";
import LinearProgress from "@mui/material/LinearProgress";
import { Container, Image } from "react-bootstrap";
import { Grid, Box, Typography } from "@mui/material";
const HorizontalCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [category, SetCategory] = useState("electronics");
  const fetchProductsFromCategory = async () => {
    SetLoading(true);
    console.log("kaif", category);
    const response = await fetchProductsByCategory(category);
    console.log("bycate", response);
    SetLoading(false);
    setProducts(response.data);
  };
  useEffect(() => {
    fetchProductsFromCategory();
  }, []);
  return (
    <>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Container fluid sx={{height:200 ,width:100}}>
          <Grid container spacing={2}>
            {products.map((category) => (
              <Grid
                item
                xs={3}
                key={category._id}
                sx={{ border: "1px solid", color: "black"}}
              >
                <Box>
                  <Image
                    src={category.productImage[0]}
                    alt={category.productName}
                    className="round-image"
                  />
                  <Typography variant="h6">{category.productName}</Typography>
                  <Typography variant="h6">{category.price}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
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
    </>
  );
};
export default HorizontalCategory;
