import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Header from "../components/Header";
import Box from "@mui/material/Box";

const AdminPanel = () => {
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const DrawerList = (
    <div>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            selected={selectedIndex === index + 4}
            onClick={() => handleListItemClick(index + 4)}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
        return <h1>Inbox Content</h1>;
      case 1:
        return <h1>Starred Content</h1>;
      case 2:
        return <h1>Send Email Content</h1>;
      case 3:
        return <h1>Drafts Content</h1>;
      case 4:
        return <h1>All Mail Content</h1>;
      case 5:
        return <h1>Trash Content</h1>;
      case 6:
        return <h1>Spam Content</h1>;
      default:
        return <h1>Admin Panel Content</h1>;
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ display: "flex", paddingTop: "64px" }}>
        <Drawer
          variant="persistent"
          open={open}
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              top: "64px",
            },
          }}
        >
          {DrawerList}
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {renderContent()}
        </Box>
      </Box>
    </>
  );
};

export default AdminPanel;
