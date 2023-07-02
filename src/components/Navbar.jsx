import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/campuses">
          Campuses
        </Button>
        <Button color="inherit" component={Link} to="/students">
          Students
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;