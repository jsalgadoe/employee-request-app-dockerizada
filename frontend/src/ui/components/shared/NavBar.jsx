import * as React from "react";
import PropTypes from "prop-types";
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
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const drawerWidth = 240;

const allPages = [
  {
    id: 1,
    name: "Empleados",
    path: "/employees/",
    admin: false,
  },
  {
    id: 2,
    name: "Crear empleados",
    path: "/employees/new",
    admin: true,
  },
  {
    id: 3,
    name: "Solicitudes",
    path: "/requests/",
    admin: false,
  },
  {
    id: 4,
    name: "Crear solicitudes",
    path: "/requests/new",
    admin: true,
  },
];

export const NavBar = (props) => {
  const { window, is_admin, logout } = props;
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  const pages = allPages.filter(
    (page) => page.admin === is_admin || !page.admin
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Button component={Link} to={"/employees/"}>
          <HomeIcon fontSize="large" sx={{ color: "white" }} />
        </Button>
      </Typography>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.id} disablePadding>
            <ListItemButton
              component={Link}
              to={page.path}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Button component={Link} to={"/employees/"}>
              <HomeIcon fontSize="large" sx={{ color: "white" }} />
            </Button>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "inline-block" } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                component={Link}
                to={page.path}
                sx={{ color: "#fff" }}
              >
                {page.name}
              </Button>
            ))}
            <Button onClick={logout}>
              <ExitToAppIcon fontSize="large" sx={{ color: "white" }} />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={isMobileMenuOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

NavBar.propTypes = {
  window: PropTypes.func,
  is_admin: PropTypes.bool.isRequired,
  logout: PropTypes.func,
};
