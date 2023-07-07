import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchStudents } from "./studentsSlice";
import { fetchCampuses } from "../campuses/campusesSlice";
import { useGetCampusName, useHandleCardClick } from "../../utils/utils";
import StudentCard from "../../components/StudentCard";
import { Card, CardActionArea, CardContent, CardMedia, Button, Typography, Grid, Box } from "@mui/material";

const Students = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.list);
  const campuses = useSelector((state) => state.campuses.list);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchCampuses());
  }, [dispatch]);

  const getCampusName = useGetCampusName();
  const handleCardClick = useHandleCardClick();

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" margin={2}>
        <Typography variant="h4" component="div">
          All Students
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/add-student")}>
          Add Student
        </Button>
      </Box>
      <Grid container spacing={2}>
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            getCampusName={getCampusName}
            handleCardClick={handleCardClick}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Students;
