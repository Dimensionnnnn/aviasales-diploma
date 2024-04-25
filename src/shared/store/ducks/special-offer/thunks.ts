import { API_TRAVELPAYOUTS_URL } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { SpecialOffersResponse } from './slice';

export interface SpecialOffersParams {
  origin: string;
  destination: string;
  locale: string;
  token: string;
}

export const fetchSpecialOffers = createAsyncThunk<SpecialOffersResponse, SpecialOffersParams>(
  'v3/get_special_offers',
  async (data: SpecialOffersParams, thunkApi: any) => {
    try {
      const response: SpecialOffersResponse = await axios.get(
        `${API_TRAVELPAYOUTS_URL}v3/get_special_offers`,
        {
          params: data,
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
