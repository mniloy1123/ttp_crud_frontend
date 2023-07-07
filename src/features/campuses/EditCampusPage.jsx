import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {TextField, Typography, Button, Box, Card, CardMedia, CardContent, CardActionArea, Grid, } from "@mui/material"; // prettier-ignore
import { fetchSingleCampus, updateCampus } from "./campusesSlice";
import StudentAddition from "./StudentAddition";
import { fetchStudents, updateStudent } from "../students/studentsSlice";

const EditCampusPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const campus = useSelector((state) => state.campuses.singleCampus); //singleCampus
  const allStudents = useSelector((state) => state.students.list); //list

  const [campusInfo, setCampusInfo] = useState({ name: "", imageUrl: "", address: "", description: "" });

  useEffect(() => {
    dispatch(fetchSingleCampus(id));
    dispatch(fetchStudents());
  }, [dispatch, id]);

  useEffect(() => {
    setCampusInfo(campus);
  }, [campus]);
  useEffect(() => {
    console.log("campusInfo has changed: ", campusInfo);
  }, [campusInfo]);

  const handleChange = (event) => {
    setCampusInfo({ ...campusInfo, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    await dispatch(updateCampus({ id: campus.id, campus: campusInfo }));
    navigate(`/campuses/`); // Navigate back to the campus page after updating the campus.
  };

  const handleAddStudent = (studentId) => {
    const student = allStudents.find((student) => student.id === Number(studentId));
    dispatch(updateStudent({ ...student, campusId: campus.id })); // Update the student with the new campus ID.
    dispatch(fetchSingleCampus(id)); // Refetch the single campus data.
  };

  const studentsOnCampus = allStudents.filter((student) => student.campusId === campus.id);

  return (
    <div>
      <Box display="flex" justifyContent="center" m={2}>
        <Typography variant="h4" component="div">
          Edit Campus
        </Typography>
      </Box>
      <form noValidate>
        <Box sx={{ display: "flex", flexDirection: "column", m: 4 }}>
          <TextField
            margin="normal"
            name="name"
            value={campusInfo.name}
            onChange={handleChange}
            label="College Name"
            variant="outlined"
            required
          />
          <TextField
            margin="normal"
            name="imageUrl"
            value={campusInfo.imageUrl}
            onChange={handleChange}
            label="Image URL"
          />
          <TextField
            margin="normal"
            name="address"
            value={campusInfo.address}
            onChange={handleChange}
            label="Address"
          />
          <TextField
            margin="normal"
            name="description"
            required
            value={campusInfo.description}
            onChange={handleChange}
            label="Description"
            multiline
            rows={4}
          />
          {/* Button for submitting the form. */}
          <Button sx={{ mx: "auto", mt: 2 }} variant="contained" color="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Box>
      </form>
      <Box m={2}>
        <StudentAddition onAddStudent={handleAddStudent} />
      </Box>
      <Typography variant="h6" component="div" align="center" mt={2}>
        Students on Campus
      </Typography>
      <Grid container spacing={2}>
        {studentsOnCampus.map((student) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={student.id}>
            <Card sx={{ maxWidth: 250, minHeight: 265 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={student.imageUrl}
                  alt={student.firstName + " " + student.lastName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {student.firstName + " " + student.lastName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default EditCampusPage;
