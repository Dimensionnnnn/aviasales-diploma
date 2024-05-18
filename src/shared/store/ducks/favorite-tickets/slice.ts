import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { actions } from './actions';

export interface FavoriteTicketParams {
  userId: string;
  origin: string;
  destination: string;
  origin_airport: string;
  destination_airport: string;
  price: number;
  airline: string;
  flight_number: string;
  departure_at: string;
  return_at?: string;
  transfers: number;
  return_transfers?: number;
  duration: number;
  duration_to: number;
  duration_back?: number;
  link: string;
  currency: string;
}

export interface FavoriteTicketType {
  userId: string;
  origin: string;
  destination: string;
  origin_airport: string;
  destination_airport: string;
  price: number;
  airline: string;
  flight_number: string;
  departure_at: string;
  return_at?: string;
  transfers: number;
  return_transfers?: number;
  duration: number;
  duration_to: number;
  duration_back?: number;
  link: string;
  currency: string;
}

export interface FavoriteTicketsResponse {
  success: boolean;
  data: FavoriteTicketType[];
}

export interface FavoriteTicketsState {
  loading: boolean;
  data: FavoriteTicketType[];
}

const initialState: FavoriteTicketsState = {
  loading: false,
  data: [],
};

export const favoriteTicketsSlice = createSlice({
  name: 'favoriteTickets',
  initialState,
  reducers: {
    clearFavoriteTickets: (state) => {
      state.data = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPending(actions.getFavoriteTickets), (state) => {
      state.loading = true;
    });
    builder.addMatcher(isFulfilled(actions.getFavoriteTickets), (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    });
    builder.addMatcher(isRejected(actions.getFavoriteTickets), (state) => {
      state.loading = false;
      state.data = [];
    });
    builder.addMatcher(isFulfilled(actions.likeTicket), (state, action) => {
      state.data.push(action.meta.arg);
    });
    builder.addMatcher(isFulfilled(actions.dislikeTicketByFlightNumber), (state, action) => {
      state.data = state.data.filter(
        (ticket) => ticket.flight_number !== action.meta.arg.flightNumber,
      );
    });
  },
});

export const { reducer } = favoriteTicketsSlice;
