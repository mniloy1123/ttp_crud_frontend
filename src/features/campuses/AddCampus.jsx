import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCampus } from "./campusesSlice";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

const AddCampus = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCampus({ name, imageUrl, address, description }));
    navigate("/campuses");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", m: 4 }}>
        <TextField margin="normal" required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField margin="normal" label="Image Url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <TextField
          margin="normal"
          required
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
        />
        <Button sx={{ mx: "auto", mt: 2 }} variant="contained" type="submit">
          Add Campus
        </Button>
      </Box>
    </form>
  );
};

export default AddCampus;
