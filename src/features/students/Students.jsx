import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchStudents } from "./studentsSlice";
import { fetchCampuses } from "../campuses/campusesSlice";
import { useGetCampusName, useHandleCardClick} from "../../utils/utils";
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
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} marginLeft={2} key={student.id}>
            <Card onClick={() => handleCardClick(student.id)} sx={{ maxWidth: 250, minHeight: 265 }}>
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
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Students;
