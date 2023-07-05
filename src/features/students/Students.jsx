import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "./studentsSlice";
import { fetchCampuses } from "../campuses/campusesSlice";
import { Card, CardActionArea, CardContent, CardMedia, Button, Typography } from "@mui/material";

const Students = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const campuses = useSelector((state) => state.campuses.list);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchCampuses());
  }, [dispatch]);

  const getCampusName = (campusId) => {
    const campus = campuses.find((campus) => campus.id === campusId);
    return campus ? campus.name : "No Campus";
  };

  return (
    <div>
      <h1>All Students</h1>
      <Button variant="contained" color="primary">
        Add Students
      </Button>
      {students.map((student) => (
        <Card key={student.id} sx={{ maxWidth: 200 }}>
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
              <Typography variant="body2" color="textSecondary">
                Campus: {getCampusName(student.campusId)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default Students;
