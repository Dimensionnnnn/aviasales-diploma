import { API_URL } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { FavoriteTicketParams, FavoriteTicketsResponse } from './slice';

interface UnLikeTicketParams {
  userId: string;
  ticketId: string;
}

interface UnLikeByFlightNumberTicketParams {
  userId: string;
  flightNumber: string;
}

export const fetchFavoriteTickets = createAsyncThunk<FavoriteTicketsResponse, string>(
  'favorite_tickets',
  async (userId: string, thunkApi) => {
    try {
      const response = await axios.get<FavoriteTicketsResponse>(`${API_URL}tickets/${userId}`);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data.message);
      }

      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const likeTicket = createAsyncThunk<FavoriteTicketsResponse, FavoriteTicketParams>(
  'like_ticket',
  async (params: FavoriteTicketParams, thunkApi) => {
    try {
      const response = await axios.post<FavoriteTicketsResponse>(`${API_URL}tickets/`, {
        ...params,
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

export const unlikeTicket = createAsyncThunk<FavoriteTicketsResponse, UnLikeTicketParams>(
  'unlike_ticket',
  async (params: UnLikeTicketParams, thunkApi) => {
    try {
      const response = await axios.delete<FavoriteTicketsResponse>(`${API_URL}tickets/`, {
        data: {
          ...params,
        },
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

export const unlikeTicketByFlightNumber = createAsyncThunk<
  FavoriteTicketsResponse,
  UnLikeByFlightNumberTicketParams
>('unlike_ticket_by_flight_number', async (params: UnLikeByFlightNumberTicketParams, thunkApi) => {
  try {
    const response = await axios.delete<FavoriteTicketsResponse>(
      `${API_URL}tickets/flight-number`,
      {
        data: {
          ...params,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }

    return thunkApi.rejectWithValue(error.message);
  }
});
