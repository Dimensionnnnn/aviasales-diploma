import { combineReducers } from '@reduxjs/toolkit';

import { reducer as authReducer } from './auth';
import { reducer as cheapTicketsReducer } from './cheap-tickets';
import { reducer as favoriteTicketsReducer } from './favorite-tickets';
import { reducer as specialOffersReducer } from './special-offer';
import { reducer as pricesForDatesReducer } from './tickets-by-dates';

export const reducer = combineReducers({
  auth: authReducer,
  cheapTickets: cheapTicketsReducer,
  specialOffers: specialOffersReducer,
  pricesForDates: pricesForDatesReducer,
  favoriteTickets: favoriteTicketsReducer,
});
