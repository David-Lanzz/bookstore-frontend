import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/departments';
export const departmentsFromAPI = createAsyncThunk('get department data', async (payload) => {
    try {
        console.log(payload)
        const response = await axios.get(`${url}/?school_id=${payload}`);
        return response.data;
    } catch (error) {
        return (error.message);
    }
});
export const postNewDepartment = createAsyncThunk('post department data', async (input) => {
    try {
        const postdata = await axios.post(url, input);
        return postdata.data;
    } catch (error) {
        return error.message;
    }
});
export const deleteFromAPI = createAsyncThunk('delete department data', async (id) => {
    try {
        const del = await axios.delete(`${url}/${id}`);
        return del.data;
    } catch (error) {
        return error.message;
    }
});

const initialState = {
    departments: [],
};
const departmentSlice = createSlice({
    name: 'departments',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(departmentsFromAPI.fulfilled, (state, {payload}) => {
                return {
                    ...state, departments: payload
                };
            })
    },
});

export default departmentSlice.reducer;
