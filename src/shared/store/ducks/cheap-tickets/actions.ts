import { cheapTicketsSlice } from './slice';
import { fetchCheapTicketsByIATAThunk } from './thunks';

export const actions = {
  ...cheapTicketsSlice.actions,
  getCheapTickets: fetchCheapTicketsByIATAThunk,
};
