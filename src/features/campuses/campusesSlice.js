import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCampuses = createAsyncThunk("campuses/fetchCampuses", async () => {
  const response = await axios.get("http://localhost:8080/api/campuses");
  return response.data;
});

export const addCampus = createAsyncThunk("campuses/addCampus", async (campus) => {
  const response = await axios.post("http://localhost:8080/api/campuses", campus);
  return response.data;
});

export const deleteCampus = createAsyncThunk("campuses/deleteCampus", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:8080/api/campuses/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

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
    builder.addCase(deleteCampus.fulfilled, (state, action) => {
      return state.filter((campus) => campus.id !== action.payload);
    });
  },
});

export default campusesSlice.reducer;
