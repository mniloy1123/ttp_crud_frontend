import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchStudents = createAsyncThunk("students/fetchStudents", async () => {
  const response = await axios.get(`${BACKEND_URL}/api/students`);
  return response.data;
});

export const deleteStudent = createAsyncThunk("students/deleteStudent", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${BACKEND_URL}/api/students/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchSingleStudent = createAsyncThunk("students/fetchSingleStudent", async (id) => {
  const response = await axios.get(`${BACKEND_URL}/api/students/${id}`);
  return response.data;
});

export const updateStudent = createAsyncThunk("students/updateStudent", async ({id, student}, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${BACKEND_URL}/api/students/${id}`, student); 
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const addStudent = createAsyncThunk("students/addStudent", async (student) => {
  const response = await axios.post(`${BACKEND_URL}/api/students`, student);
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
      state.singleStudent = action.payload;
    });
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.list = state.list.filter((student) => student.id !== action.payload);
    });
    builder.addCase(updateStudent.fulfilled, (state, action) => {
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
