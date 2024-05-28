import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import VerificationSuccess from "./components/verificationSuccess";
import AdminPanel from "./pages/AdminPanel";
import { useSelector } from "react-redux";
import ProductPage from "./components/ProductPage";
function App() {
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/login"
            element={isAuthenticated ? <Home /> : <Login />}
          ></Route>
          <Route
            path="/verification-success"
            element={<VerificationSuccess />}
          ></Route>
          <Route
            path="/admin-panel"
            element={isAuthenticated ? <AdminPanel /> : <Home />}
          ></Route>
          <Route path="/product" element={<ProductPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
