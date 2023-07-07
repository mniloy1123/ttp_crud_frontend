import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Typography, Button, Box, Select, MenuItem } from "@mui/material";
import { fetchSingleCampus, updateCampus } from "./campusesSlice";
import { fetchStudents, updateStudent } from "../students/studentsSlice";

const EditCampusPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const campus = useSelector((state) => state.campuses.singleCampus); //singleCampus
  const allStudents = useSelector((state) => state.students.list); //list

  const [campusInfo, setCampusInfo] = useState({ name: "", imageUrl: "", address: "", description: "" });
  const [selectedStudentId, setSelectedStudentId] = useState(null);

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
    console.log("Before update: ", campusInfo);
    await dispatch(updateCampus({ id: campus.id, campus: campusInfo }));
    console.log("After update: ", campusInfo);
    navigate(`/campuses/`); // Navigate back to the campus page after updating the campus.
  };

  const handleAddStudent = (studentId) => {
    console.log("Student ID to add: ", studentId);
    const student = allStudents.find((student) => student.id === Number(studentId));
    console.log("Found student: ", student);
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
        <Typography variant="h6" component="div">
          Add a Student
        </Typography>
        <Select
          value={selectedStudentId || ""}
          onChange={(event) => {
            const newSelectedStudentId = event.target.value;
            if (newSelectedStudentId) {
              setSelectedStudentId(newSelectedStudentId);
            }
          }}
        >
          {allStudents.map((student) => (
            <MenuItem key={student.id} value={student.id}>
              {student.firstName + " " + student.lastName}
            </MenuItem>
          ))}
        </Select>
        <Button
          sx={{ mx: "auto", mt: 2 }}
          variant="contained"
          color="primary"
          onClick={() => {
            if (selectedStudentId) {
              handleAddStudent(selectedStudentId);
              setSelectedStudentId(null);
            }
          }}
        >
          Add Student
        </Button>

        <Typography variant="h6" component="div">
          Students on Campus
        </Typography>
        {studentsOnCampus.map((student) => (
          <Typography key={student.id}>
            {student.firstName} {student.lastName}
          </Typography>
        ))}
      </Box>
    </div>
  );
};

export default EditCampusPage;
