import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk("students/fetchStudents", async () => {
  const response = await axios.get("http://localhost:8080/api/students");
  return response.data;
});

export const updateStudent = createAsyncThunk("students/updateStudent", async ({id, student}) => {
  const response = await axios.put(`http://localhost:8080/api/students/${id}`, student);
  return response.data;
});

export const fetchSingleStudent = createAsyncThunk(
  "students/fetchSingleStudent",
  async (id) => {
    const response = await axios.get(`http://localhost:8080/api/students/${id}`);
    console.log("Fetch single student response:", response.data);
    return response.data;
  }  
)

const studentsSlice = createSlice({
  name: "students",
  initialState: { list: [], singleStudent: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.list = action.payload
    });
    builder.addCase(fetchSingleStudent.fulfilled, (state, action) => {
      console.log("Fetched single student:", action.payload);
      state.singleStudent = action.payload;
    });
  },
});

export default studentsSlice.reducer;
