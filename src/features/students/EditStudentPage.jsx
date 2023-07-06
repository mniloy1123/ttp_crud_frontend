import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleStudent, updateStudent } from "./studentsSlice";

const EditStudentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const student = useSelector((state) => state.students.singleStudent);
  const [studentInfo, setStudentInfo] = useState({ firstName: "", lastName: "", gpa: "", imageUrl: "" });

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

  const handleChange = (event) => {
    setStudentInfo({ ...studentInfo, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    console.log("Before update: ", studentInfo);
    await dispatch(updateStudent({ id: student.id, student: studentInfo }));
    console.log("After update: ", studentInfo);
    navigate(`/students/`); // Navigate back to the student page after updating the student.
  };

  return (
    <div>
      <h1>Edit Student</h1>
      <form>
        <input name="firstName" value={studentInfo.firstName} onChange={handleChange} placeholder="First Name" />
        <input name="lastName" value={studentInfo.lastName} onChange={handleChange} placeholder="Last Name" />
        <input name="gpa" value={studentInfo.gpa} onChange={handleChange} placeholder="GPA" />
        <input name="imageUrl" value={studentInfo.imageUrl} onChange={handleChange} placeholder="Student Image URL" />
        <button type="button" onClick={handleUpdate}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditStudentPage;
