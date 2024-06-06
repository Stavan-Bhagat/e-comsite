import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login";
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
=======
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
>>>>>>> 05b6d1174ba67909855e3bc68ed92420157183e8
import VerificationSuccess from "./components/VerificationSuccess";
import AdminPanel from "./pages/AdminPanel";
import { useSelector } from "react-redux";
import ProductPage from "./pages/ProductPage";
import ProductSearch from "./pages/ProductSearch";
import CheckOut from "./pages/CheckOut";
import ConfirmationPage from "./pages/ConfirmationPage";
import NotificationComponent from "./components/NotificationComponent";
import Cart from "./pages/Cart";
function App() {
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  return (
    <>
      <Router>
        <NotificationComponent />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={isAuthenticated ? <Home /> : <Login />}></Route>
          <Route path="/verification-success" element={<VerificationSuccess />}></Route>
          <Route path="/admin-panel" element={isAuthenticated ? <AdminPanel /> : <Home />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/product/search/:category" element={<ProductSearch />}></Route>
          <Route path="/product/cart/" element={<Cart />}></Route>
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
