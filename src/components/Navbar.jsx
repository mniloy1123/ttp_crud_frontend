import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button color="primary" component={Link} to="/">
            Home
          </Button>
          <Box>
            <Button color="primary" component={Link} to="/campuses">
              Campuses
            </Button>
            <Button color="primary" component={Link} to="/students">
              Students
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
