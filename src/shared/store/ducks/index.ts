import { combineReducers } from '@reduxjs/toolkit';

import { reducer as authReducer } from './auth';
import { reducer as cheapTicketsReducer } from './cheap-tickets';

export const reducer = combineReducers({
  auth: authReducer,
  cheapTickets: cheapTicketsReducer,
});
