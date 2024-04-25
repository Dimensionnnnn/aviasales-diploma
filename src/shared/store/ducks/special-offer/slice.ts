import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { actions } from './actions';

export interface SpecialOffer {
  airline: string;
  airline_title: string;
  color: string;
  departure_at: string;
  destination: string;
  destination_airport: string;
  destination_name: string;
  destination_name_declined: string;
  duration: number;
  flight_number: string;
  link: string;
  mini_title: string;
  origin: string;
  origin_airport: string;
  origin_name: string;
  origin_name_declined: string;
  price: number;
  search_id: string;
  signature: string;
  title: string;
}

export interface SpecialOffersResponse {
  currency: string;
  data: SpecialOffer[];
  success: boolean;
}

export type SpecialOffersType = {
  loading: boolean;
  data: SpecialOffer[];
};

const initialState: SpecialOffersType = {
  loading: false,
  data: [],
};

export const specialOffersSlice = createSlice({
  name: 'specialOffers',
  initialState,
  reducers: {
    clearSpecialOffers: (state) => {
      state.data = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPending(actions.getSpecialOffers), (state) => {
      state.loading = true;
    });
    builder.addMatcher(isFulfilled(actions.getSpecialOffers), (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    });
    builder.addMatcher(isRejected(actions.getSpecialOffers), (state) => {
      state.loading = false;
      state.data = [];
    });
  },
});

export const { reducer } = specialOffersSlice;
