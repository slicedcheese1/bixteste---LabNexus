import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Home } from "@mui/icons-material";
import api from "@services/api";

interface MenuItem {
  text: string;
  url: string;
}

interface SideMenuProps {
  menuItems: MenuItem[];
}

export default function SideMenu({ menuItems }: SideMenuProps) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  const handleMenuItemClick = (url: string) => {
    navigate(url);
    setOpen(false);
  };

  const handleLogout = async () => {
    if (api.login.logout()) {
      return navigate("/login");
    }
  };
  return (
    <>
      <IconButton onClick={toggleDrawer(true)} color="inherit" aria-label="open drawer">
        <MenuIcon fontSize="large" />
      </IconButton>
      <SwipeableDrawer anchor="left" open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <Typography variant="h5" fontWeight="700" align="center" marginTop="2rem" marginBottom="2rem">
            Dashboard
          </Typography>
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => handleMenuItemClick(item.url)}>
                  <Home />
                  <ListItemText primary={item.text} sx={{ display: "flex", justifyContent: "center" }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <ListItem disablePadding onClick={handleLogout}>
            <ListItemButton sx={{ backgroundColor: "red", margin: "2rem", borderRadius: "15px" }}>
              <ListItemText primary="Sair" sx={{ display: "flex", justifyContent: "center", color: "error" }} />
            </ListItemButton>
          </ListItem>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
