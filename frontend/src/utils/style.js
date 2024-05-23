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
export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});