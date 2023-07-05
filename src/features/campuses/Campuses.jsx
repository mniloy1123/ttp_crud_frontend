import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCampuses, deleteCampus } from "./campusesSlice";
import { Card, CardActionArea, CardContent, CardMedia, Button, Typography, Grid, Box } from "@mui/material";
import { fetchStudents } from "../students/studentsSlice";

const Campuses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const campuses = useSelector((state) => state.campuses.list);
  const students = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchCampuses());
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCampus(id));
  };

  const handleCardClick = (id) => {
    navigate(`/campuses/${id}`);
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" margin={2}>
        <Typography variant="h4" component="div">
          Campus Listing
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/add-campus")}>
          Add Campus
        </Button>
      </Box>
      <Grid container spacing={2}>
        {campuses.map((campus) => {
          const studentCount = students.filter((student) => student.campusId === campus.id).length;
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} marginLeft={2} key={campus.id}>
              <Card onClick={() => handleCardClick(campus.id)} sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia component="img" height="140" image={campus.imageUrl} alt={campus.name} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {campus.name}
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
                    e.stopPropagation(); // This stops the click event from triggering the parent Card's onClick
                    navigate(`/campuses/${campus.id}/edit`); // This will redirect to the edit campus page
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the Card's onClick from firing when the button is clicked
                    handleDelete(campus.id);
                  }}
                >
                  Delete
                </Button>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Campuses;
