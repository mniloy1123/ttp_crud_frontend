import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleStudent, deleteStudent } from "./studentsSlice";
import { fetchSingleCampus } from "../campuses/campusesSlice";
import { Button } from "@mui/material";

const SingleStudentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleStudent(id));
  }, [dispatch, id]);

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
    navigate("/students");
  };

  const student = useSelector((state) => state.students.singleStudent);
  const campus = useSelector((state) => state.campuses.singleCampus);

  useEffect(() => {
    if (student.campusId) {
      dispatch(fetchSingleCampus(student.campusId));
    }
  }, [dispatch, student]);

  return (
    <div>
      <h1>Show Student</h1>
      <h2>{student.firstName + " " + student.lastName}</h2>
      <img src={student.imageUrl} alt={student.name} />
      <p>GPA: {student.gpa}</p>
      <p>Email: {student.email}</p>
      <Button
        size="small"
        color="primary"
        onClick={(e) => {
          navigate(`/students/${student.id}/edit`); // This will redirect to the edit campus page
        }}
      >
        Edit
      </Button>
      <Button
        size="small"
        color="error"
        onClick={(e) => {
          handleDelete(student.id);
        }}
      >
        Delete
      </Button>
      {campus && (
        <div>
          <h3>This student is registered to the following campus:</h3>
          <p>{campus.name}</p>
        </div>
      )}
    </div>
  );
};

export default SingleStudentPage;
