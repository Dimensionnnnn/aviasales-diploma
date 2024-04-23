import { API_URL } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAuthSignInThunk = createAsyncThunk(
  'auth/login',
  async (userData: any, thunkApi) => {
    try {
      const response: any = await axios.post(`${API_URL}auth/login`, userData);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data.message);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const fetchAuthSignUpThunk = createAsyncThunk(
  'auth/signup',
  async (userData: any, thunkApi) => {
    try {
      const response: any = await axios.post(`${API_URL}auth/signup`, userData);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data.message);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
