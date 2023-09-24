import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/books?level_id=2';
export const booksFromAPI = createAsyncThunk('data/getdata', async () => {
  try {
    const { data } = await axios.get(url);

    return data;
  } catch (error) {
    return (error.message);
  }
});
export const postToAPI = createAsyncThunk('data/postdata', async (input) => {
  try {
    const postdata = await axios.post(url, input);
    return postdata.data;
  } catch (error) {
    return error.message;
  }
});
export const deleteFromAPI = createAsyncThunk('books/deletebooks', async (id) => {
  try {
    const del = await axios.delete(`${url}/${id}`);
    return del.data;
  } catch (error) {
    return error.message;
  }
});

const initialState = {
  level: "",
  books: [],
  isLoading: false,
  success: false,
  error: undefined,
};
const bookSlice = createSlice({
  name: 'books',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(booksFromAPI.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(booksFromAPI.fulfilled, (state, action) => {
        const {books,level} = action.payload;
        return {
          ...state, isLoading: false, success: true, books: books, level: level
        };
      })
      .addCase(booksFromAPI.rejected, (state) => ({ ...state, isLoading: false, error: false }));
  },
});

export default bookSlice.reducer;
