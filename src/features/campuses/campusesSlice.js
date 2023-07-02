import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCampuses = createAsyncThunk(
  "campuses/fetchCampuses",
  async () => {
    const response = await axios.get("http://localhost:8080/api/campuses");
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
  },
});

export default campusesSlice.reducer;
