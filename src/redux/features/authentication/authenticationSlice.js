import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk("create user", async (payload) => {
  const url = "http://localhost:3000/auth/";
  try {
    const response = await axios.post(url, payload);
    const { data, headers } = response;
    const token = headers["access-token"];
    const tokenType = headers["token-type"];
    const expiry = headers.expiry;

    return { token, tokenType, expiry, data };
  } catch (error) {
    if (error.response) {
      return error.response.data.errors.full_messages[0] || "An error occurred";
    } else {
      throw error; // Rethrow the error to be caught by Redux Toolkit
    }
  }
});
export const loginUser = createAsyncThunk("login user", async (payload) => {
  const url = "http://localhost:3000/auth/sign_in";
  try {
    const response = await axios.post(url, payload);
    const { data, headers } = response;
    const token = headers["access-token"];
    const tokenType = headers["token-type"];
    const expiry = headers.expiry;

    return { token, tokenType, expiry, data };
  } catch (error) {
    if (error.response) {
      return error.response.data.errors.full_messages[0] || "An error occurred";
    } else {
      throw error;
    }
  }
});
const initialState = {
  data: {
    signed_in: false,
    token: "",
    data: {},
  },
  loading: true,
  error: "",
};

const authenticationSlice = createSlice({
  name: "authentication/login/signup",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createUser.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          data: {
            ...state.data,
            signed_in: true,
            token: payload.token,
            data: payload.data,
          },
        };
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        return { ...state, error: payload };
      })
      .addCase(loginUser.pending, (state)=> {
        return { ...state, loading: true };
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          loading: false,
          data: {
            ...state.data,
            signed_in: true,
            token: payload.token,
            data: payload.data,
          },
        };
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        return { ...state, error: payload };
      })

  },
});

export default authenticationSlice.reducer;
