import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampuses } from "./campusesSlice";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { fetchStudents } from "../students/studentsSlice";

const Campuses = () => {
  const dispatch = useDispatch();
  const campuses = useSelector((state) => state.campuses);
  const students = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchCampuses());
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        margin={2}
      >
        <Typography variant="h4" component="div">
          Campus Listing
        </Typography>
        <Button variant="contained" color="primary">
          Add Campus
        </Button>
      </Box>
      <Grid container spacing={2}>
        {campuses.map((campus) => {
          const studentCount = students.filter(student => student.campusId === campus.id).length;
          return (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            marginLeft={2}
            key={campus.id}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={campus.imageUrl}
                  alt={campus.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {campus.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                      {studentCount} {studentCount === 1 ? 'Student' : 'Students'}
                    </Typography>
                </CardContent>
              </CardActionArea>
              <Button size="small" color="primary">
                Edit
              </Button>
              <Button size="small" color="error">
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
