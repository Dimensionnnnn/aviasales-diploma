import { RootState } from '@shared/store/store';

export const selectors = {
  selectTickets: (state: RootState) => state.cheapTickets.data,
};
