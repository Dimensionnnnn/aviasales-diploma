import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { actions } from './actions';

export interface PricesForDatesParams {
  currency?: string; // default 'rub'
  origin?: string;
  destination?: string;
  departure_at?: string;
  return_at?: string;
  one_way?: boolean; // default true
  direct?: boolean; // default false
  market?: string; // default 'ru'
  limit?: number; // default 30
  page?: number;
  sorting?: 'price' | 'route' | 'unique';
  token?: string;
}

export interface PricesForDatesType {
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

export interface PricesForDatesResponse {
  success: boolean;
  data: PricesForDatesType[];
}

export interface PricesForDatesState {
  loading: boolean;
  data: PricesForDatesType[];
}

const initialState: PricesForDatesState = {
  loading: false,
  data: [],
};

export const pricesForDatesSlice = createSlice({
  name: 'pricesForDates',
  initialState,
  reducers: {
    clearPricesForDates: (state) => {
      state.data = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPending(actions.getPricesForDates), (state) => {
      state.loading = true;
    });
    builder.addMatcher(isFulfilled(actions.getPricesForDates), (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    });
    builder.addMatcher(isRejected(actions.getPricesForDates), (state) => {
      state.loading = false;
      state.data = [];
    });
  },
});

export const { reducer } = pricesForDatesSlice;
