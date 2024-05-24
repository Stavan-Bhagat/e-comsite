import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerificationSuccess from "./components/verificationSuccess";
import AdminPanel from "./pages/AdminPanel";
function App() {
  return (
    <>
    {/*  */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/verification-success" element={<VerificationSuccess/>}></Route>
        <Route path="/admin-panel" element={<AdminPanel />}></Route>
      </Routes>
    </Router>
      
      
    </>
  );
}

export default App;
 