import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt"; // New icon for order details
import Header from "../components/Header";
import Box from "@mui/material/Box";
import AllUsers from "../components/AllUsers";
import AllProducts from "../components/AllProducts";
import OrderDetails from "../components/OrderDetails"; // Import your OrderDetails component

const AdminPanel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const sidebarItems = [
    { text: "All Users", icon: <PeopleIcon /> },
    { text: "All Products", icon: <ShoppingBasketIcon /> },
    { text: "Order Details", icon: <ReceiptIcon /> }, // New sidebar item
  ];

  const renderSidebar = () => {
    return (
      <List>
        {sidebarItems.map((item, index) => (
          <ListItemButton
            key={item.text}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    );
  };

  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
        return <AllUsers />;
      case 1:
        return <AllProducts />;
      case 2:
        return <OrderDetails />; // New content for order details
      default:
        return <AllProducts />;
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: "240px",
            flexShrink: 0,
            borderRight: "1px solid #ccc",
            boxSizing: "border-box",
            padding: "16px",
          }}
        >
          {renderSidebar()}
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {renderContent()}
        </Box>
      </Box>
    </>
  );
};

export default AdminPanel;

// import React, { useState } from "react";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import Header from "../components/Header";
// import Box from "@mui/material/Box";
// import AllUsers from "../components/AllUsers";

// const AdminPanel = () => {
//   const [open, setOpen] = useState(true);
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const handleListItemClick = (index) => {
//     setSelectedIndex(index);
//   };

//   const DrawerList = (
//     <div>
//       <List>
//         {["All Users", "All Products"].map((text, index) => (
//           <ListItem
//             key={text}
//             disablePadding
//             selected={selectedIndex === index}
//             onClick={() => handleListItemClick(index)}
//           >
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       {/* <Divider />
//       <List>
//         {["All mail", "Trash", "Spam"].map((text, index) => (
//           <ListItem
//             key={text}
//             disablePadding
//             selected={selectedIndex === index + 4}
//             onClick={() => handleListItemClick(index + 4)}
//           >
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List> */}
//     </div>
//   );

//   const renderContent = () => {
//     switch (selectedIndex) {
//       case 0:
//         return <AllUsers/>;
//       case 1:
//         return <h1>all products</h1>;
//       default:
//         return <h1>all products</h1>;
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Box sx={{ display: "flex", paddingTop: "64px" }}>
//         <Drawer
//           variant="persistent"
//           open={open}
//           sx={{
//             width: 240,
//             flexShrink: 0,
//             "& .MuiDrawer-paper": {
//               width: 240,
//               boxSizing: "border-box",
//               top: "64px",
//             },
//           }}
//         >
//           {DrawerList}
//         </Drawer>
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           {renderContent()}
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default AdminPanel;
