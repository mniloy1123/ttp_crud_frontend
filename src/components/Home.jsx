import React from "react";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
        padding: 0,
        backgroundImage: "linear-gradient(180deg, #3f51b5 0%, #9fa8da 100%)",
        color: "white",
      }}
    >
      <Typography variant="h2" align="center" gutterBottom>
        Welcome to Campus Manager
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        Your one-stop solution to manage campuses and students.
      </Typography>
      <Typography variant="body1" align="center" gutterBottom sx={{ maxWidth: "60%", mt: 3 }}>
        Navigate through the website to see all campuses, add a new campus, view details of each campus and the students
        associated with it. You can also view all students, add new students, and view the campus each student is
        associated with. Our simple interface allows for easy and efficient management of campuses and students. Enjoy
        your stay!
      </Typography>
    </Box>
  );
};

export default Home;
