import { specialOffersSlice } from './slice';
import { fetchSpecialOffers } from './thunks';

export const actions = {
  ...specialOffersSlice.actions,
  getSpecialOffers: fetchSpecialOffers,
};
