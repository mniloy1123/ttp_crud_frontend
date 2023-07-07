import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleStudent, deleteStudent, updateStudent } from "./studentsSlice";
import { fetchSingleCampus, fetchCampuses } from "../campuses/campusesSlice";
// prettier-ignore
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography, Box, MenuItem, Select, Grid } from "@mui/material";

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
    console.log(`Campus changed to ${event.target.value}`);
  };

  const student = useSelector((state) => {
    console.log("Single Student State: ", state.students.singleStudent);
    return state.students.singleStudent;
  });
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
    event.preventDefault();
    const updatedStudent = { ...student, campusId: selectedCampus }; //copy student object and change campusId to selectedCampus
    console.log(`Updating student: ${JSON.stringify(updatedStudent)}`);
    dispatch(updateStudent({ id: student.id, student: updatedStudent }));
    navigate(`/students/${student.id}`); // navigate back to the student's page
  };

  return (
    <Box sx={{ flexGrow: 1, m: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ maxWidth: 345, m: 'auto' }}>
            <CardMedia component="img" image={student.imageUrl} alt={student.name} sx={{ height: 140 }} />
            <CardContent>
              <Typography variant="h5" component="div">
                {student.firstName + " " + student.lastName}
              </Typography>
              <Typography variant="body1">
                GPA: {student.gpa}
              </Typography>
              <Typography variant="body1">
                Email: {student.email}
              </Typography>
            </CardContent>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={(e) => {
                  navigate(`/students/${student.id}/edit`); // This will redirect to the edit campus page
                }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={(e) => {
                  handleDelete(student.id);
                }}
              >
                Delete
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          {student.campusId ? (
            <>
              <Typography variant="h5" component="div">
                This student is registered to the following campus:
              </Typography>
              <Card onClick={() => navigate(`/campuses/${student.campusId}`)} sx={{ maxWidth: 345, m: 'auto', mt: 2 }}>
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
              </Card>
            </>
          ) : (
            <Typography variant="h5" component="div">
              This student isn't associated with any campus
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Select value={selectedCampus} onChange={handleCampusChange}>
              {campuses.map((campus) => (
                <MenuItem key={campus.id} value={campus.id}>
                  {campus.name}
                </MenuItem>
              ))}
            </Select>
            <Button variant="contained" color="primary" onClick={handleCampusUpdate} sx={{ ml: 2 }}>
              Change Campus
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleStudentPage;
