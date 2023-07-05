import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleCampus, updateCampus } from "./campusesSlice";
//import { fetchStudents, updateStudent } from "../students/studentsSlice";

const EditCampusPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const campus = useSelector((state) => state.campuses.singleCampus); //singleCampus
  //const allStudents = useSelector((state) => state.students.list); //list

  const [campusInfo, setCampusInfo] = useState({ name: '', imageUrl: '', address: '', description: '' });

useEffect(() => {
    dispatch(fetchSingleCampus(id));
}, [dispatch, id]);

useEffect(() => {
    setCampusInfo(campus);
  }, [campus]);
  useEffect(() => {
    console.log("campusInfo has changed: ", campusInfo);
  }, [campusInfo]);

 // useEffect(() => {
  //  dispatch(fetchStudents());
 // }, [dispatch]);

  const handleChange = (event) => {
    setCampusInfo({ ...campusInfo, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    console.log("Before update: ", campusInfo);
    await dispatch(updateCampus({ id: campus.id, campus: campusInfo }));
    console.log("After update: ", campusInfo);
    navigate(`/campuses/`); // Navigate back to the campus page after updating the campus.
  };

  //const handleAddStudent = (studentId) => {
 //   const student = allStudents.find((student) => student.id === studentId);
 //   dispatch(updateStudent({ ...student, campusId: campus.id })); // Update the student with the new campus ID.
//  };

  return (
    <div>
      <h1>Edit Campus</h1>
      <form>
        <input name='name' value={campusInfo.name} onChange={handleChange} placeholder='Name' />
        <input name='imageUrl' value={campusInfo.imageUrl} onChange={handleChange} placeholder='Image URL' />
        <input name='address' value={campusInfo.address} onChange={handleChange} placeholder='Address' />
        <textarea name='description' value={campusInfo.description} onChange={handleChange} placeholder='Description' />
        {/* Button for submitting the form. */}
        <button type='button' onClick={handleUpdate}>Save Changes</button>
      </form>
         {/* Dropdown for selecting a student to add to the campus. 
      <div>
        <h2>Students on Campus</h2>
     
        <select onChange={(event) => handleAddStudent(event.target.value)}>
          {allStudents.map((student) => (
            <option value={student.id} key={student.id}>
              {student.firstName} {student.lastName}
            </option>
          ))}
        </select>
        <button type='button' onClick={() => {}}>Add to Campus</button>
      </div> */}
    </div>
  );


};

export default EditCampusPage;
