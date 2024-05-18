import { RootState } from '@shared/store/store';

export const selectors = {
  selectFavoriteTickets: (state: RootState) => state.favoriteTickets.data,
};
