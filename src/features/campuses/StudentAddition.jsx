import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Select, MenuItem, Typography, Box } from "@mui/material";

const StudentAddition = ({ onAddStudent }) => {
  const allStudents = useSelector((state) => state.students.list);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  return (
    <Box>
      <Typography variant="h5" component="div" align="center">
        Add a Student
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={2}>
        <Select
          value={selectedStudentId || ""}
          onChange={(event) => {
            const newSelectedStudentId = event.target.value;
            if (newSelectedStudentId) {
              setSelectedStudentId(newSelectedStudentId);
            }
          }}
        >
          {allStudents.map((student) => (
            <MenuItem key={student.id} value={student.id}>
              {student.firstName + " " + student.lastName}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (selectedStudentId) {
              onAddStudent(selectedStudentId);
              setSelectedStudentId(null);
            }
          }}
        >
          Add Student
        </Button>
      </Box>
    </Box>
  );
};

export default StudentAddition;
