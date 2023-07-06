import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleStudent, deleteStudent, updateStudent } from "./studentsSlice";
import { fetchSingleCampus, deleteCampus, updateCampus } from "../campuses/campusesSlice";
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography, Box, Grid, MenuItem, Select } from "@mui/material";

const SingleStudentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedCampus, setSelectedCampus] = useState("");

  useEffect(() => {
    dispatch(fetchSingleStudent(id));
  }, [dispatch, id]);

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
    navigate("/students");
  };

  const handleCampusChange = (event) => {
    const newCampusId = event.target.value;
    setSelectedCampus(newCampusId);
    dispatch(updateStudent({ id: student.id, campusId: newCampusId }));
  };

  const student = useSelector((state) => state.students.singleStudent);
  const campus = useSelector((state) => state.campuses.singleCampus);

  useEffect(() => {
    if (student.campusId) {
      dispatch(fetchSingleCampus(student.campusId));
    }
  }, [dispatch, student]);

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
          <p>{campus.name}</p>
        </div>
      )}
    </div>
  );
};

export default SingleStudentPage;
