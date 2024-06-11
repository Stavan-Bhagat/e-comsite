/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import VerificationSuccess from './components/VerificationSuccess';
import AdminPanel from './pages/AdminPanel';
import ProductPage from './pages/ProductPage';
import ProductSearch from './pages/ProductSearch';
import CheckOut from './pages/CheckOut';
import ConfirmationPage from './pages/ConfirmationPage';
import NotificationComponent from './components/NotificationComponent';
import Cart from './pages/Cart';
import StripeProvider from './components/StripProvider';
import PaymentForm from './components/PaymentForm';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
const App = () => {
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  return (
    <Router>
      {/* <Elements stripe={stripePromise}> */}
      <StripeProvider>
        <NotificationComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
          <Route path="/verification-success" element={<VerificationSuccess />} />
          <Route path="/admin-panel" element={isAuthenticated ? <AdminPanel /> : <Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/product/search/:type/:term" element={<ProductSearch />} />
          <Route path="/product/cart/" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/paymentform" element={<PaymentForm />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
        {/* </Elements> */}
      </StripeProvider>
    </Router>
  );
};

export default App;
