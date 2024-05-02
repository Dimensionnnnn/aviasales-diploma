import { API_TRAVELPAYOUTS_URL } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { PricesForDatesParams, PricesForDatesResponse } from './slice';

export const fetchPricesForDates = createAsyncThunk<PricesForDatesResponse, PricesForDatesParams>(
  'v3/prices_for_dates',
  async (params: PricesForDatesParams, thunkApi) => {
    try {
      const response = await axios.get<PricesForDatesResponse>(
        `${API_TRAVELPAYOUTS_URL}v3/prices_for_dates`,
        {
          params,
        },
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data.message);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
