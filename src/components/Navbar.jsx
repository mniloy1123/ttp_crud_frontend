import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Box>
            <Button color="inherit" component={Link} to="/campuses">
              Campuses
            </Button>
            <Button color="inherit" component={Link} to="/students">
              Students
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
