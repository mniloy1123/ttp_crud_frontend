import { configureStore } from "@reduxjs/toolkit";
import campusesReducer from "../features/campuses/campusesSlice";
import studentsReducer from "../features/students/studentsSlice";

export default configureStore({
  reducer: {
    campuses: campusesReducer,
    students: studentsReducer,
  },
});
