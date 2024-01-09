import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/categories';
export const categoriesFromAPI = createAsyncThunk('get category data', async (payload) => {
    try {
        console.log(payload)
        const response = await axios.get(`${url}/?level_id=${payload}`);
        return response.data;
    } catch (error) {
        return (error.message);
    }
});
export const postNewCategory = createAsyncThunk('post category data', async (input) => {
    try {
        const postdata = await axios.post(url, input);
        return postdata.data;
    } catch (error) {
        return error.message;
    }
});
export const deleteFromAPI = createAsyncThunk('delete category data', async (id) => {
    try {
        const del = await axios.delete(`${url}/${id}`);
        return del.data;
    } catch (error) {
        return error.message;
    }
});

const initialState = {
    categories: [],
};
const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(categoriesFromAPI.fulfilled, (state, {payload}) => {
                return {
                    ...state, categories: payload
                };
            })
    },
});

export default categoriesSlice.reducer;
