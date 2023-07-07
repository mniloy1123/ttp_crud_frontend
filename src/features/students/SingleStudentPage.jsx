import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleStudent, deleteStudent, updateStudent } from "./studentsSlice";
import { fetchSingleCampus, fetchCampuses, updateCampus } from "../campuses/campusesSlice";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";

const SingleStudentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedCampus, setSelectedCampus] = useState("");
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    dispatch(fetchCampuses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSingleStudent(id));
  }, [dispatch, id]);

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
    navigate("/students");
  };

  const handleCampusChange = (event) => {
    setSelectedCampus(event.target.value);
  };

  const student = useSelector((state) => state.students.singleStudent);
  const campus = useSelector((state) => state.campuses.singleCampus);
  const campuses = useSelector((state) => state.campuses.list);

  useEffect(() => {
    if (student.campusId) {
      dispatch(fetchSingleCampus(student.campusId));
    }
  }, [dispatch, student]);

  useEffect(() => {
    const count = campus?.students.length || 0;
    setStudentCount(count);
  }, [campus]);

  const handleCampusUpdate = (event) => {
    const updatedStudent = { ...student, campusId: selectedCampus }; //copy student object and change campusId to selectedCampus
    dispatch(updateStudent({ id: student.id, student: updatedStudent }));
    navigate(`/students/${student.id}`); // navigate back to the student's page
  };

  return (
    <div>
      <h1>Show Student</h1>
      <h2>{student.firstName + " " + student.lastName}</h2>
      <img src={student.imageUrl} alt={student.name} />
      <p>GPA: {student.gpa}</p>
      <p>Email: {student.email}</p>
      <Button
        size="small"
        color="primary"
        onClick={(e) => {
          navigate(`/students/${student.id}/edit`); // This will redirect to the edit campus page
        }}
      >
        Edit
      </Button>
      <Button
        size="small"
        color="error"
        onClick={(e) => {
          handleDelete(student.id);
        }}
      >
        Delete
      </Button>
      {campus && (
        <div>
          <h3>This student is registered to the following campus:</h3>
        </div>
      )}
      <Card onClick={() => navigate(`/campuses/${student.campusId}`)} sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={campus?.imageUrl} alt={campus?.name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {campus?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {studentCount} {studentCount === 1 ? "Student" : "Students"}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Button
          size="small"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            handleCampusUpdate();
          }}
        >
          Edit
        </Button>
      </Card>
      <Box>
        <Select value={selectedCampus} onChange={handleCampusChange}>
          {campuses.map((campus) => (
            <MenuItem key={campus.id} value={campus.id}>
              {campus.name}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={handleCampusUpdate}>Change Campus</Button>
      </Box>
    </div>
  );
};

export default SingleStudentPage;
