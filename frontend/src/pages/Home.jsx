// import "..../css/home.css";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/header-footer.css';
import '../css/homeBody.css';
import Body from '../components/Homebody';

const Home = () => {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
};

export default Home;
