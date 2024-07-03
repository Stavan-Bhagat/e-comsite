import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import AdminPanel from './pages/AdminPanel';
import UserPanel from './pages/UserPanel';
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
import Faq from './components/help';
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
            <Route path="/user-panel" element={isAuthenticated ? <UserPanel /> : <Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/product/search/:type/:term" element={<ProductSearch />} />
            <Route path="/product/cart/" element={<Cart />} />
            <Route path="/checkout" element={isAuthenticated ? <CheckOut /> : <Login />} />
            <Route path="/paymentform" element={isAuthenticated ? <PaymentForm /> : <Login />} />
            <Route
              path="/confirmation"
              element={isAuthenticated ? <ConfirmationPage /> : <Login />}
            />
            <Route path="/faq" element={<Faq />} />
          </Routes>
        </StripeProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
