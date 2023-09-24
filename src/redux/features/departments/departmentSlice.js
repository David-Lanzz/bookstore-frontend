import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/departments';
export const departmentsFromAPI = createAsyncThunk('get department data', async (payload) => {
    try {
        console.log(payload)
        const { data } = await axios.get(`${url}/?school_id=${payload.school_id}`);
        return data;
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
    school: {},
    isLoading: false,
    success: false,
    error: undefined,
};
const departmentSlice = createSlice({
    name: 'departments',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(departmentsFromAPI.pending, (state) => ({ ...state, isLoading: true }))
            .addCase(departmentsFromAPI.fulfilled, (state, action) => {
                return {
                    ...state, isLoading: false, success: true, departments: action.payload.departments,school: action.payload.school
                };
            })
            .addCase(departmentsFromAPI.rejected, (state) => ({ ...state, isLoading: false, error: false }))
            .addCase(postNewDepartment.pending, (state) => ({ ...state, isLoading: true }))
            .addCase(postNewDepartment.fulfilled, (state) => {
                return {
                    ...state, isLoading: false, success: true
                };
            })
            .addCase(postNewDepartment.rejected, (state) => ({ ...state, isLoading: false, error: true }));
    },
});

export default departmentSlice.reducer;
