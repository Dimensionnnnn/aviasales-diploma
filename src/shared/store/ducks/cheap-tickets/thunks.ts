import { API_TRAVELPAYOUTS_URL } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { CheapResponse } from './slice';

export type ApiParams = {
  currency: string;
  period_type: string;
  page: number;
  limit: number;
  show_to_affiliates: boolean;
  sorting: string;
  token: string;
  origin: string;
  destination: string;
  one_way: boolean;
};

export const fetchCheapTicketsByIATAThunk = createAsyncThunk<CheapResponse, ApiParams>(
  'v2/prices/latest',
  async (data: ApiParams, thunkApi: any) => {
    try {
      const response: CheapResponse = await axios.get(`${API_TRAVELPAYOUTS_URL}v2/prices/latest`, {
        params: data,
      });

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data.message);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
