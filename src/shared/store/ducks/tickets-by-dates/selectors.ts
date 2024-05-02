import { RootState } from '@shared/store/store';

export const selectors = {
  selectPricesForDates: (state: RootState) => state.pricesForDates.data,
};
