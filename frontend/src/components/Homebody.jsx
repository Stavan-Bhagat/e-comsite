/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Carousel as BootstrapCarousel } from 'react-bootstrap';
import { Typography } from '@mui/material';
import 'react-multi-carousel/lib/styles.css';
import img1 from '../images/img1.webp';
import img3 from '../images/img3.webp';
import img2 from '../images/img2.jpg';
import CategoryList from './CategoryList';
import HorizontalCategory from './HorizontalCategory';
import ProductCarousel from './ProductCarousel';
import { styles } from '../css/multiCarousel';

const Body = () => {
  return (
    <>
      <CategoryList />

      <HorizontalCategory category="electronics" />
      <ProductCarousel category="fashion" />
      <ProductCarousel category="skincare" />
    </>
  );
};

export default Body;
