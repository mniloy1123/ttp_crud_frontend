import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleStudent } from "./studentsSlice";
import { fetchSingleCampus } from "../campuses/campusesSlice";

const SingleStudentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleStudent(id));
  }, [dispatch, id]);

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
      <h2>{student.name}</h2>
      <img src={student.imageUrl} alt={student.name} />
      <p>GPA: {student.gpa}</p>
      <p>Email: {student.email}</p>
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
