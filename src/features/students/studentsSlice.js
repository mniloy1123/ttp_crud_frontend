import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get("http://localhost:8080/api/students");
    return response.data;
  }
);

const campusesSlice = createSlice({
  name: "students",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
     builder.addCase(fetchStudents.fulfilled, (state, action) => {
      return action.payload;
      });
  },
});

export default campusesSlice.reducer;
