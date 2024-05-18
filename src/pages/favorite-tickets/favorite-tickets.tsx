import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View } from 'react-native';

import { RootRouteNames, RootStackParamList } from '@app/navigation/tab-navigator/tab-navigator';

import { PrimaryHeader } from '@widgets/layouts/primary-header/primary-header';

import { useAppDispatch, useAppSelector } from '@shared/store';
import { actions as authActions } from '@shared/store/ducks/auth';
import { actions as favoriteTicketsActions } from '@shared/store/ducks/favorite-tickets';
import { PricesForDatesType } from '@shared/store/ducks/tickets-by-dates/slice';
import { DataHandler } from '@shared/ui/data-handler/data-handler';
import { Spinner } from '@shared/ui/spinner/spinner';
import { Ticket } from '@shared/ui/ticket/ticket';

import {
  StyledSpinnerContainer,
  StyledTicketsContainer,
  StyledTicketsWrapper,
  StyledTitleTickets,
} from './ui/components';

export const FavoriteTickets = () => {
  const dispatch = useAppDispatch();
  const favoriteTickets = useAppSelector((state) => state.favoriteTickets);
  const userId = useAppSelector((state) => state.auth.currentUser?.id);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (userId) {
      dispatch(favoriteTicketsActions.getFavoriteTickets(userId));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const handleNavigate = (ticket: PricesForDatesType) => {
    navigation.navigate(RootRouteNames.TICKET, { ticket, isFavorite: true });
  };

  return (
    <View>
      <PrimaryHeader title="Избранное" onLogout={handleLogout} />
      <DataHandler data={favoriteTickets.data} isWithHeader={false}>
        {favoriteTickets.loading ? (
          <StyledSpinnerContainer>
            <Spinner />
          </StyledSpinnerContainer>
        ) : (
          <StyledTicketsContainer>
            <StyledTitleTickets>Ближайшие билеты</StyledTitleTickets>
            <StyledTicketsWrapper>
              {favoriteTickets.data?.map((ticket) => (
                <Ticket
                  key={ticket.flight_number}
                  ticket={ticket}
                  onClick={() => handleNavigate(ticket)}
                />
              ))}
            </StyledTicketsWrapper>
          </StyledTicketsContainer>
        )}
      </DataHandler>
    </View>
  );
};
