import { combineReducers } from '@reduxjs/toolkit';

import { reducer as authReducer } from './auth';
import { reducer as cheapTicketsReducer } from './cheap-tickets';
import { reducer as specialOffersReducer } from './special-offer';

export const reducer = combineReducers({
  auth: authReducer,
  cheapTickets: cheapTicketsReducer,
  specialOffers: specialOffersReducer,
});
