import { NavigationProp, useNavigation } from '@react-navigation/native';
import styled, { css } from 'styled-components/native';

import { RootRouteNames, RootStackParamList } from '@app/navigation/tab-navigator/tab-navigator';

import { SecondaryHeader } from '@widgets/layouts/secondary-header/secondary-header';

import { useAppDispatch, useAppSelector } from '@shared/store';
import { actions } from '@shared/store/ducks/special-offer';
import { SpecialOffer } from '@shared/store/ducks/special-offer/slice';
import { DataHandler } from '@shared/ui/data-handler/data-handler';
import { Spinner } from '@shared/ui/spinner/spinner';
import { Ticket } from '@shared/ui/ticket/ticket';

import {
  StyledContainer,
  StyledContentContainer,
  StyledModalContainer,
  StyledSpinnerContainer,
} from './ui/components';

export const PrimaryTicketsSearch = () => {
  const dispatch = useAppDispatch();
  const specialTickets = useAppSelector((state) => state.specialOffers);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigate = (ticket: SpecialOffer) => {
    navigation.navigate(RootRouteNames.TICKET, { ticket });
  };

  const handleBack = () => {
    dispatch(actions.clearSpecialOffers());
  };

  return (
    <StyledContainer>
      <DataHandler data={specialTickets.data}>
        {specialTickets.loading ? (
          <StyledSpinnerContainer>
            <Spinner />
          </StyledSpinnerContainer>
        ) : (
          <StyledContentContainer>
            <SecondaryHeader
              title={specialTickets.data[0]?.title ? specialTickets.data[0].title : 'Билеты'}
              onBack={handleBack}
            />
            <Ticket
              ticket={specialTickets.data[0]}
              onClick={() => handleNavigate(specialTickets.data[0])}
            />
          </StyledContentContainer>
        )}
      </DataHandler>
    </StyledContainer>
  );
};
