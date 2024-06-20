/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import AdminPanel from './pages/AdminPanel';
import ProductPage from './pages/ProductPage';
import ProductSearch from './pages/ProductSearch';
import CheckOut from './pages/CheckOut';
import ConfirmationPage from './pages/ConfirmationPage';
import NotificationComponent from './components/NotificationComponent';
import StripeProvider from './components/StripProvider';
import { lightTheme, darkTheme } from './css/theme/theme';
import PaymentForm from './components/PaymentForm';
import Login from './pages/login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import VerificationSuccess from './components/VerificationSuccess';

const App = () => {
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  const themeMode = useSelector((state) => state?.theme?.mode);
  return (
    <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
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
        </StripeProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
