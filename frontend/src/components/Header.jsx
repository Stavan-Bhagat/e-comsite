import React, { useState, useRef, useEffect } from "react";
import { Navbar, Nav, Modal, Button, FormControl, Form } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { logout } from "../redux/Slice/authSlice";
import Profile from "./Profile";
import AdminPanel from "../pages/AdminPanel";
import axiosInstance from "../utils/axios";

const Header = () => {
  const user = useSelector((state) => state?.auth.user);
  const isAuthenticated = useSelector((state) => state?.auth.isAuthenticated);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handlePanel = () => {
    setIsDrawerOpen(true);
    navigate("/admin-panel");
  };

  const handleHome = () => {
    setIsDrawerOpen(false);
    navigate("/");
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const prevOpen = useRef(open);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleProfile = () => {
    setProfile((prev) => !prev);
    setOpen(false);
  };

  const handleSearchIconClick = () => {
    setShowModal(true);
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.length > 0) {
      try {
        const response = await axiosInstance.get(`/product/suggestions`, {
          params: { search: query },
        });
        console.log("suggestion", response);
        setSuggestions(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = () => {
    console.log("Searching for:", search);
    // navigate(`/product/search/${suggestion.category}`);
    setShowModal(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.productName);
    navigate(`/product/search/${suggestion.category}`);
    setShowModal(false);
  };

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        style={{ paddingLeft: "20px", paddingRight: "20px", zIndex: 9999 }}
      >
        <Navbar.Brand href="/">Zen Fusion</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ alignItems: "center" }}>
            <IconButton onClick={handleSearchIconClick}>
              <SearchIcon />
            </IconButton>
            {!isAuthenticated && (
              <Button
                variant="outline-primary"
                onClick={() => navigate("/login")}
                style={{ marginRight: "15px" }}
              >
                <PersonIcon /> Login
              </Button>
            )}
            {user?._id && (
              <div>
                {user?.imageUrl ? (
                  <Avatar
                    alt="Travis Howard"
                    src={user.imageUrl}
                    ref={anchorRef}
                    onClick={handleToggle}
                  />
                ) : (
                  <Button
                    variant="outline-primary"
                    ref={anchorRef}
                    onClick={handleToggle}
                    style={{ marginRight: "15px" }}
                  >
                    <AccountIcon /> User
                  </Button>
                )}
              </div>
            )}
            <IconButton aria-label="cart">
              <Badge badgeContent={0} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Search Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSearchSubmit}>
            <FormControl
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
              style={{ marginBottom: "15px" }}
            />
            <Button variant="outline-success" onClick={handleSearchSubmit}>
              Search
            </Button>
          </Form>
          {suggestions.length > 0 && (
            <ul
              style={{ listStyleType: "none", padding: 0, marginTop: "15px" }}
            >
              {suggestions.slice(0, 5).map((suggestion) => (
                <li
                  key={suggestion._id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{ cursor: "pointer", padding: "5px 0" }}
                >
                  {suggestion.productName}
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
      </Modal>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
        sx={{ zIndex: "999" }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-end" ? "right top" : "right bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  {location.pathname === "/admin-panel" ? (
                    <MenuItem onClick={handleHome}>Home</MenuItem>
                  ) : (
                    user?.role === "Admin" && (
                      <MenuItem onClick={handlePanel}>Admin Panel</MenuItem>
                    )
                  )}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {profile && <Profile />}
      {isDrawerOpen && <AdminPanel />}
    </>
  );
};

export default Header;

// import React, { useState, useRef, useEffect } from "react";
// import { Navbar, Nav, FormControl, Form } from "react-bootstrap";
// import SearchIcon from "@mui/icons-material/SearchOutlined";
// import PersonIcon from "@mui/icons-material/Person";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AccountIcon from "@mui/icons-material/AccountCircleOutlined";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Button from "@mui/material/Button";
// import ClickAwayListener from "@mui/material/ClickAwayListener";
// import Grow from "@mui/material/Grow";
// import Paper from "@mui/material/Paper";
// import Popper from "@mui/material/Popper";
// import MenuItem from "@mui/material/MenuItem";
// import MenuList from "@mui/material/MenuList";
// import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
// import Avatar from "@mui/material/Avatar";
// import { logout } from "../redux/Slice/authSlice";
// import Profile from "./Profile";
// import AdminPanel from "../pages/AdminPanel";
// import axiosInstance from "../utils/axios";

// const Header = () => {
//   const user = useSelector((state) => state?.auth.user);
//   const isAuthenticated = useSelector((state) => state?.auth.isAuthenticated);
//   const [collapsed, setCollapsed] = useState(true);
//   const [search, setSearch] = useState("");
//   const [suggestions, setSuggestions] = useState([]); // Initialize as an empty array
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [profile, setProfile] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const anchorRef = useRef(null);

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handlePanel = () => {
//     setIsDrawerOpen(true);
//     navigate("/admin-panel");
//   };

//   const handleHome = () => {
//     setIsDrawerOpen(false);
//     navigate("/");
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }
//     setOpen(false);
//   };

//   const handleListKeyDown = (event) => {
//     if (event.key === "Tab") {
//       event.preventDefault();
//       setOpen(false);
//     } else if (event.key === "Escape") {
//       setOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }
//     prevOpen.current = open;
//   }, [open]);

//   const handleToggleCollapse = () => {
//     setCollapsed(!collapsed);
//   };

//   const handleSearchChange = async (e) => {
//     const query = e.target.value;
//     setSearch(query);

//     if (query.length > 0) {
//       try {
//         const response = await axiosInstance.get(`/product/suggestions`, {
//           params: { search: query },
//         });
//         console.log("suggestion", response);
//         setSuggestions(Array.isArray(response.data) ? response.data : []);
//       } catch (error) {
//         console.error("Error fetching suggestions", error);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSearch = () => {
//     console.log("Searching for:", search);
//   };

//   const handleLoginClick = () => {
//     navigate("/login");
//   };

//   const prevOpen = useRef(open);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   const handleProfile = () => {
//     setProfile((prev) => !prev);
//     setOpen(false);
//   };

//   return (
//     <>
//       <Navbar
//         bg="light"
//         expand="lg"
//         style={{ paddingLeft: "20px", paddingRight: "20px", zIndex: 9999 }}
//       >
//         <Navbar.Brand href="/">Zen Fusion</Navbar.Brand>
//         <Navbar.Toggle
//           aria-controls="basic-navbar-nav"
//           onClick={handleToggleCollapse}
//         />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto" style={{ alignItems: "center" }}>
//             <Form
//               inline="true"
//               className="d-flex"
//               style={{ marginRight: "15px" }}
//             >
//               <FormControl
//                 type="text"
//                 placeholder="Search"
//                 value={search}
//                 onChange={handleSearchChange}
//                 style={{ marginRight: "5px" }}
//               />
//               <Button variant="outline-success" onClick={handleSearch}>
//                 <SearchIcon />
//               </Button>
//             </Form>
//             {suggestions.length > 0 && (
//               <ul
//                 style={{
//                   position: "absolute",
//                   background: "white",
//                   listStyleType: "none",
//                   padding: 0,
//                   margin: 0,
//                   zIndex: 1000,
//                 }}
//               >
//                 {suggestions.map((suggestion) => (
//                   <li
//                     key={suggestion._id}
//                     onClick={() => setSearch(suggestion.productName)}
//                   >
//                     {suggestion.productName}
//                   </li>
//                 ))}
//               </ul>
//             )}
//             {!isAuthenticated && (
//               <Button
//                 variant="outline-primary"
//                 onClick={handleLoginClick}
//                 style={{ marginRight: "15px" }}
//               >
//                 <PersonIcon /> Login
//               </Button>
//             )}
//             {user?._id && (
//               <div>
//                 {user?.imageUrl ? (
//                   <Avatar
//                     alt="Travis Howard"
//                     src={user.imageUrl}
//                     ref={anchorRef}
//                     onClick={handleToggle}
//                   />
//                 ) : (
//                   <Button
//                     variant="outline-primary"
//                     ref={anchorRef}
//                     onClick={handleToggle}
//                     style={{ marginRight: "15px" }}
//                   >
//                     <AccountIcon /> User
//                   </Button>
//                 )}
//               </div>
//             )}
//             <IconButton aria-label="cart">
//               <Badge badgeContent={0} color="secondary">
//                 <ShoppingCartIcon />
//               </Badge>
//             </IconButton>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>

//       <Popper
//         open={open}
//         anchorEl={anchorRef.current}
//         role={undefined}
//         placement="bottom-end"
//         transition
//         disablePortal
//         sx={{ zIndex: "999" }}
//       >
//         {({ TransitionProps, placement }) => (
//           <Grow
//             {...TransitionProps}
//             style={{
//               transformOrigin:
//                 placement === "bottom-end" ? "right top" : "right bottom",
//             }}
//           >
//             <Paper>
//               <ClickAwayListener onClickAway={handleClose}>
//                 <MenuList
//                   autoFocusItem={open}
//                   id="composition-menu"
//                   onKeyDown={handleListKeyDown}
//                 >
//                   <MenuItem onClick={handleProfile}>Profile</MenuItem>
//                   {location.pathname === "/admin-panel" ? (
//                     <MenuItem onClick={handleHome}>Home</MenuItem>
//                   ) : (
//                     user?.role === "Admin" && (
//                       <MenuItem onClick={handlePanel}>Admin Panel</MenuItem>
//                     )
//                   )}
//                   <MenuItem onClick={handleLogout}>Logout</MenuItem>
//                 </MenuList>
//               </ClickAwayListener>
//             </Paper>
//           </Grow>
//         )}
//       </Popper>
//       {profile && <Profile />}
//       {isDrawerOpen && <AdminPanel />}
//     </>
//   );
// };

// export default Header;
