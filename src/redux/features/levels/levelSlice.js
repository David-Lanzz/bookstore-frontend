import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/levels';
export const levelsFromAPI = createAsyncThunk('get level data', async (payload) => {
    try {
        console.log(payload)
        const { data } = await axios.get(`${url}/?department_id=${payload}`);
        return data;
    } catch (error) {
        return (error.message);
    }
});
export const postNewLevel = createAsyncThunk('post level data', async (input) => {
    try {
        const postdata = await axios.post(url, input);
        return postdata.data;
    } catch (error) {
        return error.message;
    }
});
export const deleteFromAPI = createAsyncThunk('delete level data', async (id) => {
    try {
        const del = await axios.delete(`${url}/${id}`);
        return del.data;
    } catch (error) {
        return error.message;
    }
});

const initialState = {
    levels: []
};
const levelSlice = createSlice({
    name: 'levels',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(levelsFromAPI.fulfilled, (state, {payload}) => {
                return {
                    ...state, levels: payload
                };
            })
    },
});

export default levelSlice.reducer;
