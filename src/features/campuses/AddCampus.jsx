import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCampus } from './campusesSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const AddCampus = () => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCampus({ name, imageUrl, address, description }));
    navigate("/campuses");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField  label="Image Url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      <TextField required label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <TextField required label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Button type="submit">Add Campus</Button>
    </form>
  );

  
}



export default AddCampus;