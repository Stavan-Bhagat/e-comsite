import React, { useState } from "react";
import { Navbar, Nav, Button, FormControl, Form } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [collapsed, setCollapsed] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  //
  const handleSearch = () => {
    console.log("Searching for:", search);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Zen Fusion</Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={handleToggleCollapse}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Form inline className="d-flex">
            <FormControl
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
            />
            <Button variant="outline-success" onClick={handleSearch}>
              <SearchIcon />
            </Button>
          </Form>
          <Button variant="outline-primary" onClick={handleLoginClick}>
            <PersonIcon /> Login
          </Button>
          {user?._id && (
            <div
              className="text-3xl cursor-pointer relative flex justify-center"
              onClick={() => setMenuDisplay((preve) => !preve)}
            >
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-10 h-10 rounded-full"
                  alt={user?.name}
                />
              ) : (
                // <FaRegCircleUser />
                <Button variant="outline-primary">
                <AccountIcon /> User
              </Button>
              )}
            </div>
          )}

        
          <Button variant="outline-primary">
            <ShoppingCartIcon /> Cart
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

// import React, { useState } from "react";
// import {
//   Navbar,
//   Nav,
//   Button,
//   NavDropdown,
//   Form,
//   FormControl,
// } from "react-bootstrap";

// const Header = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [submenu, setSubmenu] = useState(null);
//   const [collapsed, setCollapsed] = useState(true);

//   const handleMouseEnter = (event, category) => {
//     setAnchorEl(event.currentTarget);
//     setSubmenu(category);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setSubmenu(null);
//   };

//   const handleToggleCollapse = () => {
//     setCollapsed(!collapsed);
//   };

//   const categories = {
//     men: ["T-Shirts", "Footwear", "Jeans", "Accessories"],
//     women: ["Dresses", "Footwear", "Bags", "Jewelry"],
//     kids: ["Toys", "Clothes", "Books", "Games"],
//     electronics: ["Phones", "Laptops", "Cameras", "Accessories"],
//     beauty: ["Skincare", "Makeup", "Fragrances", "Haircare"],
//     toys: ["Action Figures", "Puzzles", "Dolls", "Educational Toys"],
//   };

//   const renderProfileMenu = () => (
//     <NavDropdown
//       id="profile-menu"
//       show={Boolean(anchorEl)}
//       onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
//       onMouseLeave={handleClose}
//       title="Profile"
//     >
//       <NavDropdown.Item onClick={handleClose}>Login</NavDropdown.Item>
//       <NavDropdown.Item onClick={handleClose}>Logout</NavDropdown.Item>
//     </NavDropdown>
//   );

//   const renderCategoryMenu = (category) => (
//     <NavDropdown
//       title={category.charAt(0).toUpperCase() + category.slice(1)}
//       show={Boolean(anchorEl) && submenu === category}
//       onMouseEnter={(e) => handleMouseEnter(e, category)}
//       onMouseLeave={handleClose}
//     >
//       {categories[category].map((subcategory, index) => (
//         <NavDropdown.Item key={index}>{subcategory}</NavDropdown.Item>
//       ))}
//     </NavDropdown>
//   );

//   return (
//     <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
//       <Navbar.Brand href="#home">ZenFusion</Navbar.Brand>
//       <Navbar.Toggle
//         aria-controls="responsive-navbar-nav"
//         onClick={handleToggleCollapse}
//       />
//       <Navbar.Collapse
//         id="responsive-navbar-nav"
//         className={!collapsed ? "collapse" : ""}
//       >
//         {!collapsed ? (
//           <Nav className="me-auto">
//             {Object.keys(categories).map((category, index) => (
//               <div key={index}>{renderCategoryMenu(category)}</div>
//             ))}
//             <Form className="d-flex">
//               <FormControl
//                 type="search"
//                 placeholder="Search"
//                 className="me-2"
//                 aria-label="Search"
//               />
//               <Button variant="outline-success">Search</Button>
//             </Form>
//             <div
//               className="d-flex flex-column align-items-center mr-3"
//               onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
//               onMouseLeave={handleClose}
//             >
//               <Button
//                 aria-controls="profile-menu"
//                 aria-haspopup="true"
//                 onClick={(e) => setAnchorEl(e.currentTarget)}
//                 variant="light"
//               ></Button>
//               {renderProfileMenu()}
//             </div>
//             <div className="d-flex flex-column align-items-center">
//               <Button>Cart</Button>
//             </div>
//           </Nav>
//         ) : (
//           <Nav className="me-auto">
//             <div
//               className="d-flex flex-column align-items-center mr-3"
//               onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
//               onMouseLeave={handleClose}
//             >
//               <Button
//                 aria-controls="profile-menu"
//                 aria-haspopup="true"
//                 onClick={(e) => setAnchorEl(e.currentTarget)}
//                 variant="light"
//               ></Button>
//               {renderProfileMenu()}
//             </div>
//             <Form className="d-flex">
//               <FormControl
//                 type="search"
//                 placeholder="Search"
//                 className="me-2"
//                 aria-label="Search"
//               />
//               <Button variant="outline-success">Search</Button>
//             </Form>
//             <div className="d-flex flex-column align-items-center">
//               <Button>Cart</Button>
//             </div>
//           </Nav>
//         )}
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

// export default Header;
