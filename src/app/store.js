import { configureStore } from '@reduxjs/toolkit';
import campusesReducer from '../features/campuses/campusesSlice';

export default configureStore({
    reducer: {
        campuses: campusesReducer,
    },
});