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
export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const addProductModel_style= {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,

  // border: "1px solid #000",
  // borderRadius:"10px",
  boxShadow: 24,
  p: 4,
};
