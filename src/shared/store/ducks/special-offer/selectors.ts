import { RootState } from '@shared/store/store';

export const selectors = {
  selectSpecialOffers: (state: RootState) => state.specialOffers.data,
};
