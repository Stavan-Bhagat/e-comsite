import React,{useEffect,useState} from "react";
import { Typography, Card, Button } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fetchProductsByCategory } from "../utils/service";
const ProductCarousel = ({category  }) => {
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
  }, [category]);

  return (
    <div>
      <Typography variant="h6">Popular Brands</Typography>
      <Carousel showDots responsive={responsive}>
        {products?.map((item) => (
          <Card key={item.id} className="card">
            <Card.Img variant="top" src={item.image} className="product--image" />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Card.Text className="price">${item.price}</Card.Text>
              <Button variant="contained" color="primary">Add to Cart</Button>
            </Card.Body>
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
