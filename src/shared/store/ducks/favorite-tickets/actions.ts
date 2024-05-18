import { favoriteTicketsSlice } from './slice';
import {
  fetchFavoriteTickets,
  likeTicket,
  unlikeTicket,
  unlikeTicketByFlightNumber,
} from './thunks';

export const actions = {
  ...favoriteTicketsSlice.actions,
  getFavoriteTickets: fetchFavoriteTickets,
  likeTicket: likeTicket,
  dislikeTicket: unlikeTicket,
  dislikeTicketByFlightNumber: unlikeTicketByFlightNumber,
};
