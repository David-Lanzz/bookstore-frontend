import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/schools';
export const schoolsFromAPI = createAsyncThunk('get schools data', async () => {
  try {
    const { data } = await axios.get(url);
    console.log(data)
    return data;
  } catch (error) {
    throw error
  }
});
export const postNewSchool = createAsyncThunk('post school data', async (payload) => {
  try {
    const postdata = await axios.post(url, payload);
    return postdata.data;
  } catch (error) {
    throw error.message;
  }
});
export const deleteFromAPI = createAsyncThunk('delete school', async (id) => {
  try {
    const del = await axios.delete(`${url}/${id}`);
    return del.data;
  } catch (error) {
    throw error.message;
  }
});

const initialState = {
  schools: [],
};
const schoolSlice = createSlice({
  name: 'schools',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(schoolsFromAPI.fulfilled, (state, action) => {
        return {
          ...state, schools: action.payload
        };
      })
  },
});

export default schoolSlice.reducer;
