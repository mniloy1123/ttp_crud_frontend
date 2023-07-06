import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "./studentsSlice";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

const AddStudent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gpa, setGpa] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gpaNumber = parseFloat(gpa);
  const isGpaValid = !isNaN(gpaNumber) && gpaNumber >= 0.0 && gpaNumber <= 4.0;
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const isEmailValid = emailRegex.test(email);
  const isFormValid =
    firstName.trim() !== "" && imageUrl.trim() !== "" && lastName.trim() !== "" && isEmailValid && isGpaValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent({ firstName, lastName, email, imageUrl, gpa }));
    navigate("/students");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", m: 4 }}>
        <TextField
          margin="normal"
          required
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          label="Image Url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          label="GPA (0.0-4.0)"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
        />
        <Button sx={{ mx: "auto", mt: 2 }} variant="contained" type="submit" disabled={!isFormValid}>
          Add Student
        </Button>
      </Box>
    </form>
  );
};

export default AddStudent;
