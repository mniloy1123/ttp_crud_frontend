import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "./studentsSlice";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const Students = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div>
      <h1>All Students</h1>
      <Button variant="contained" color="primary">Add Students</Button>
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
            </CardContent>
          </CardActionArea>
          <Button size="small" color="primary">
            Edit
          </Button>
          <Button size="small" color="secondary">
            Delete
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default Students;
