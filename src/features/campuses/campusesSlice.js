import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCampuses = createAsyncThunk(
  "campuses/fetchCampuses",
  async () => {
    const response = await axios.get("http://localhost:8080/api/campuses");
    return response.data;
  }
);

export const addCampus = createAsyncThunk(
  "campuses/addCampus",
  async (campus) => {
    const response = await axios.post("http://localhost:8080/api/campuses", campus);
    return response.data;
  }
);

const campusesSlice = createSlice({
  name: "campuses",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCampuses.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addCampus.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});


export default campusesSlice.reducer;
