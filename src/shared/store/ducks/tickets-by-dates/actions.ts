import { pricesForDatesSlice } from './slice';
import { fetchPricesForDates } from './thunks';

export const actions = {
  ...pricesForDatesSlice.actions,
  getPricesForDates: fetchPricesForDates,
};
