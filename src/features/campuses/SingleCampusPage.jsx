import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleCampus, fetchCampuses } from "./campusesSlice";
import { fetchStudents, updateStudent } from "../students/studentsSlice";
import { useGetCampusName, useHandleCardClick } from "../../utils/utils";
import StudentCard from "../../components/StudentCard";
import StudentAddition from "./StudentAddition";
//prettier-ignore
import {Typography, Box, Grid} from "@mui/material";

const SingleCampusPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allStudents = useSelector((state) => state.students.list);

  useEffect(() => {
    dispatch(fetchSingleCampus(id));
    dispatch(fetchStudents());
    dispatch(fetchCampuses());
  }, [dispatch, id]);

  const campus = useSelector((state) => state.campuses.singleCampus);

  const getCampusName = useGetCampusName();
  const handleCardClick = useHandleCardClick();

  const handleAddStudent = (studentId) => {
    console.log("Student ID to add: ", studentId);
    const student = allStudents.find((student) => student.id === Number(studentId));
    console.log("Found student: ", student);
    dispatch(updateStudent({ ...student, campusId: campus.id })).then(() => {
      dispatch(fetchSingleCampus(id)); // Refetch the single campus data.
    });
  };
  return (
    <Box sx={{ mt: 2, mx: 2 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h3" component="div">
          {campus.name}
        </Typography>
        <Box sx={{ my: 2, display: "flex", flexDirection: "row", alignItems: "start", justifyContent: "center" }}>
          <Box sx={{ mr: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={campus.imageUrl} alt={campus.name} style={{ maxWidth: 345, height: "auto" }} />
            <Typography variant="body1" component="p">
              {campus.address}
            </Typography>
          </Box>
          <Typography variant="body1" component="p">
            {campus.description}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        <StudentAddition onAddStudent={handleAddStudent} />
        <Typography variant="h6" component="div" align="center" mt={2}>
          Students on Campus
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {campus.students &&
          campus.students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              getCampusName={getCampusName}
              handleCardClick={handleCardClick}
            />
          ))}
      </Grid>
    </Box>
  );
};

export default SingleCampusPage;
