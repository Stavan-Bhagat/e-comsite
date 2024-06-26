import React from 'react';
import 'react-multi-carousel/lib/styles.css';
import CategoryList from './CategoryList';
import HorizontalCategory from './HorizontalCategory';
import ProductCarousel from './ProductCarousel';

const Body = () => {
  return (
    <>
      <CategoryList />
      <HorizontalCategory category="Electronics" />
      <ProductCarousel category="Mobiles" />
      <ProductCarousel category="Perfumes" />
    </>
  );
};

export default Body;
