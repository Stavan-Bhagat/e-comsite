import { Carousel } from "react-bootstrap";
import styled from "@emotion/styled";

export const CustomCarousel = styled(Carousel)`
  height: 50vh;
  width: 100vw;
  .carousel-item {
    height: 50vh;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const productCarousel = styled(Carousel)`
  height: 50vh;
  width: 100vw;
  .carousel-item {
    height: 50vh;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;