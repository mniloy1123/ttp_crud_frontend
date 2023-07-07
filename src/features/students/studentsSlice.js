import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk("students/fetchStudents", async () => {
  const response = await axios.get("http://localhost:8080/api/students");
  return response.data;
});

export const deleteStudent = createAsyncThunk("students/deleteStudent", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:8080/api/students/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchSingleStudent = createAsyncThunk("students/fetchSingleStudent", async (id) => {
  const response = await axios.get(`http://localhost:8080/api/students/${id}`);
  console.log("Fetch single student response:", response.data);
  return response.data;
});

export const updateStudent = createAsyncThunk("students/updateStudent", async (updatedStudent, { rejectWithValue }) => {
  try {
    console.log("updateStudent payload:", updatedStudent); // add this log
    const response = await axios.put(`http://localhost:8080/api/students/${updatedStudent.id}`, updatedStudent);
    console.log("updateStudent response:", response); // and this log
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const addStudent = createAsyncThunk("students/addStudent", async (student) => {
  const response = await axios.post("http://localhost:8080/api/students", student);
  return response.data;
});

const studentsSlice = createSlice({
  name: "students",
  initialState: { list: [], singleStudent: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(fetchSingleStudent.fulfilled, (state, action) => {
      console.log("Fetched single student:", action.payload);
      state.singleStudent = action.payload;
    });
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.list = state.list.filter((student) => student.id !== action.payload);
    });
    builder.addCase(updateStudent.fulfilled, (state, action) => {
      console.log("Updated student: ", action.payload);
      const studentIndex = state.list.findIndex((student) => student.id === action.payload.id);
      state.list[studentIndex] = action.payload;
      // Also update singleStudent if it's the updated student
      if (state.singleStudent.id === action.payload.id) {
        state.singleStudent = action.payload;
      }
    });
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
  },
});

export default studentsSlice.reducer;
