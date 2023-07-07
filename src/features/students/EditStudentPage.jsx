import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleStudent, updateStudent } from "./studentsSlice";
import { TextField, Typography, Button, Box } from "@mui/material";

const EditStudentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const student = useSelector((state) => state.students.singleStudent);
  const [studentInfo, setStudentInfo] = useState({ firstName: "", lastName: "", gpa: "", imageUrl: "" });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleStudent(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (student) {
      setStudentInfo(student);
    }
  }, [student]);
  useEffect(() => {
    console.log("studentInfo has changed: ", studentInfo);
  }, [studentInfo]);

  useEffect(() => {
    // Validate form whenever studentInfo changes
    const gpa = parseFloat(studentInfo.gpa); //parseFloat will return NaN if the string is not a number
    const isGpaValid = !isNaN(gpa) && gpa >= 0 && gpa <= 4;
    const areFieldsFilled = studentInfo.firstName && studentInfo.lastName && studentInfo.imageUrl;

    setIsFormValid(isGpaValid && areFieldsFilled);
  }, [studentInfo]);

  const handleChange = (event) => {
    setStudentInfo({ ...studentInfo, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    if (isFormValid) {
      await dispatch(updateStudent({ id: student.id, student: studentInfo }));
      navigate(`/students/`);
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" m={2}>
        <Typography variant="h4" component="div">
          Edit Student
        </Typography>
      </Box>
      <form noValidate>
        <Box sx={{ display: "flex", flexDirection: "column", m: 4 }}>
          <TextField
            margin="normal"
            name="firstName"
            value={studentInfo.firstName}
            onChange={handleChange}
            label="First Name"
            variant="outlined"
            required
          />
          <TextField
            margin="normal"
            name="lastName"
            value={studentInfo.lastName}
            onChange={handleChange}
            label="Last Name"
            variant="outlined"
            required
          />
          <TextField
            margin="normal"
            type="number"
            name="gpa"
            value={studentInfo.gpa}
            onChange={handleChange}
            label="GPA"
            variant="outlined"
            required
            InputProps={{ inputProps: { min: 0, max: 4, step: 0.1 } }}
          />
          <TextField
            margin="normal"
            name="imageUrl"
            value={studentInfo.imageUrl}
            onChange={handleChange}
            label="Student Image URL"
            variant="outlined"
            required
          />
          <Button
            sx={{ mx: "auto", mt: 2 }}
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={!isFormValid}
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EditStudentPage;
