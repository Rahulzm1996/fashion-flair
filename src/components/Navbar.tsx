import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { NAVBAR_DRAWER_WIDTH, getCartDetailsUrl } from "../constants";
import { useAppContext } from "../context";
import axios from "axios";

const Navbar = () => {
  const { cartItemList } = useAppContext();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState([]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const fetchCartItems = async () => {
    try {
      const { data, status } = await axios.get(getCartDetailsUrl());
      if (status === 200) {
        setCartItems(data?.resources || []);
      }
    } catch (error) {
      console.error("error occured while fetching cart items ", error);
    }
  };
  useEffect(() => {
    fetchCartItems();
  }, []);

  //shows it in menu of mobile view
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link to="/" className="logo-link">
        <Typography variant="h6" sx={{ my: "16px !important" }}>
          TeeRex Store
        </Typography>
      </Link>

      <Divider />
      <List sx={{ paddingTop: "unset" }}>
        <Link to="/products" className="link">
          <ListItem key="Products" disablePadding>
            <ListItemButton>
              <ListItemText
                primary="Products"
                sx={{ color: "#242525", fontWeight: "500" }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/cart" className="link">
          <ListItem key="cart" disablePadding>
            <ListItemButton>
              <Badge
                badgeContent={cartItemList.length}
                sx={{
                  "& .MuiBadge-badge": {
                    color: "#fff",
                    backgroundColor: "#242525",
                    left: "18px",
                  },
                }}
              >
                <ListItemText
                  primary="Cart"
                  sx={{ color: "#242525", fontWeight: "500" }}
                />
              </Badge>
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        "& .logo-link": {
          display: "inline-block",
          color: "#fff",
          marginRight: "auto",
          cursor: "pointer",
        },
      }}
    >
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ background: "#2d2d2d", color: "#fff" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/" className="logo-link">
            <Typography variant="h6" sx={{ my: "16px !important" }}>
              Fashion Flair
            </Typography>
          </Link>

          {/* //showing products tab in all the view except mobile */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/products" className="link">
              <Button sx={{ color: "#fff" }}>Products</Button>
            </Link>
          </Box>

          <Link to="/cart" className="link">
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              sx={{ color: "#fff" }}
            >
              <Badge
                badgeContent={cartItemList.length || cartItems.length}
                sx={{
                  color: "#fff",
                  "& .MuiBadge-badge": {
                    left: "4px",
                    top: "-2px",
                  },
                }}
              >
                <ShoppingCartOutlinedIcon color="inherit" fontSize="small" />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: NAVBAR_DRAWER_WIDTH,
            },

            "& .logo-link": {
              display: "inline-block",
              color: "#000",
              marginRight: "auto",
              cursor: "pointer",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </Box>
  );
};

export default Navbar;
