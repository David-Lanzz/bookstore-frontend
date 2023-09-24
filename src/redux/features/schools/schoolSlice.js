import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/schools';
export const schoolsFromAPI = createAsyncThunk('get schools data', async () => {
  try {
    const { data } = await axios.get(url);
    console.log(data)
    return data;
  } catch (error) {
    return (error.message);
  }
});
export const postNewSchool = createAsyncThunk('post school data', async (payload) => {
  try {
    const postdata = await axios.post(url, payload);
    schoolsFromAPI()
    return postdata.data;
  } catch (error) {
    return error.message;
  }
});
export const deleteFromAPI = createAsyncThunk('delete school', async (id) => {
  try {
    const del = await axios.delete(`${url}/${id}`);
    return del.data;
  } catch (error) {
    return error.message;
  }
});

const initialState = {
  schools: [],
  isLoading: false,
  success: false,
  error: undefined,
};
const schoolSlice = createSlice({
  name: 'schools',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(schoolsFromAPI.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(schoolsFromAPI.fulfilled, (state, action) => {
        return {
          ...state, isLoading: false, success: true, schools: action.payload
        };
      })
      .addCase(schoolsFromAPI.rejected, (state) => ({ ...state, isLoading: false, error: false }))
      .addCase(postNewSchool.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(postNewSchool.fulfilled, (state) => {
        return {
          ...state, isLoading: false, success: true
        };
      })
      .addCase(postNewSchool.rejected, (state) => ({ ...state, isLoading: false, error: true }));
  },
});

export default schoolSlice.reducer;
