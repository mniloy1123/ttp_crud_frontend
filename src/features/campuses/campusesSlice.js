import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchCampuses = createAsyncThunk("campuses/fetchCampuses", async () => {
  const response = await axios.get(`${BACKEND_URL}/api/campuses`);
  return response.data;
});

export const fetchSingleCampus = createAsyncThunk("campuses/fetchSingleCampus", async (id) => {
  const response = await axios.get(`${BACKEND_URL}/api/campuses/${id}`);
  return response.data;
});

export const addCampus = createAsyncThunk("campuses/addCampus", async (campus) => {
  const response = await axios.post(`${BACKEND_URL}/api/campuses`, campus);
  return response.data;
});

export const updateCampus = createAsyncThunk(
  'campuses/updateCampus',
  async ({ id, campus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/api/campuses/${id}`, campus);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const deleteCampus = createAsyncThunk("campuses/deleteCampus", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${BACKEND_URL}/api/campuses/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const campusesSlice = createSlice({
  name: "campuses",
  initialState: { list: [], singleCampus: { students: [] } },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCampuses.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(addCampus.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
    builder.addCase(deleteCampus.fulfilled, (state, action) => {
      state.list = state.list.filter((campus) => campus.id !== action.payload);
    });
    builder.addCase(fetchSingleCampus.fulfilled, (state, action) => {
      state.singleCampus = action.payload;
    });
    builder.addCase(updateCampus.fulfilled, (state, action) => {
      const campusIndex = state.list.findIndex((campus) => campus.id === action.payload.id);
      state.list[campusIndex] = action.payload;
    });
  },
});

export default campusesSlice.reducer;
