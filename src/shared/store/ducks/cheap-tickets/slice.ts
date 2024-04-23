import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { actions } from './actions';

type CheapTicket = {
  show_to_affiliates: boolean;
  trip_class: number;
  origin: string;
  destination: string;
  depart_date: string;
  return_date: string;
  number_of_changes: number;
  value: number;
  found_at: string;
  distance: number;
  actual: boolean;
};

export type CheapResponse = {
  currency: string;
  data: CheapTicket[];
};

export type CheapTicketsType = {
  loading: boolean;
  data: CheapTicket[];
};

const initialState: CheapTicketsType = {
  loading: false,
  data: [],
};

export const cheapTicketsSlice = createSlice({
  name: 'cheapTickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isPending(actions.getCheapTickets), (state) => {
      state.loading = true;
    });
    builder.addMatcher(isFulfilled(actions.getCheapTickets), (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    });
    builder.addMatcher(isRejected(actions.getCheapTickets), (state) => {
      state.loading = false;
      state.data = [];
    });
  },
});

export const { reducer } = cheapTicketsSlice;
