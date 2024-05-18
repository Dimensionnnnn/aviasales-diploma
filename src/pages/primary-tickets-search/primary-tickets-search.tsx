import { TOKEN } from '@env';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import styled, { css } from 'styled-components/native';

import { RootRouteNames, RootStackParamList } from '@app/navigation/tab-navigator/tab-navigator';

import { PrimaryTicketsSearch as PrimaryTicketsSearchWidget } from '@widgets/layouts/primary-tickets-search/primary-tickets-search';
import { SecondaryHeader } from '@widgets/layouts/secondary-header/secondary-header';

import { FormDateInput } from '@shared/form-components/date-input/date-input';
import { useAppDispatch, useAppSelector } from '@shared/store';
import { actions as specialOfferActions } from '@shared/store/ducks/special-offer';
import { SpecialOffer } from '@shared/store/ducks/special-offer/slice';
import { actions as ticketsByDatesActions } from '@shared/store/ducks/tickets-by-dates';
import { PricesForDatesType } from '@shared/store/ducks/tickets-by-dates/slice';
import { PrimaryButton } from '@shared/ui/buttons/primary-button/primary-button';
import { DataHandler } from '@shared/ui/data-handler/data-handler';
import { Spinner } from '@shared/ui/spinner/spinner';
import { Ticket } from '@shared/ui/ticket/ticket';

import {
  ContentContainer,
  HeaderContainer,
  StyledContainer,
  StyledDateContainer,
  StyledDateItem,
  StyledDateText,
  StyledSearchButtonContainer,
  StyledSpinnerContainer,
  StyledTicketsContainer,
  StyledTicketsWrapper,
  StyledTitleTickets,
} from './ui/components';

export const PrimaryTicketsSearch = () => {
  const dispatch = useAppDispatch();
  const specialTickets = useAppSelector((state) => state.specialOffers);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [firstDateValue, setFirstDateValue] = useState<Date>();
  const [secondDateValue, setSecondDateValue] = useState<Date>();
  const route = useRoute<RouteProp<RootStackParamList, RootRouteNames.TICKETS>>();
  const tickets = useAppSelector((state) => state.pricesForDates);

  const handleSearch = () => {
    if (firstDateValue) {
      dispatch(ticketsByDatesActions.clearPricesForDates());
      dispatch(
        ticketsByDatesActions.getPricesForDates({
          origin: route.params.originCode,
          destination: route.params.destinationCode,
          departure_at: firstDateValue.toISOString().split('T')[0],
          return_at: secondDateValue && secondDateValue.toISOString().split('T')[0],
          token: TOKEN,
        }),
      );
    }
  };

  const handleNavigate = (ticket: SpecialOffer | PricesForDatesType) => {
    navigation.navigate(RootRouteNames.TICKET, { ticket });
  };

  const handleBack = () => {
    dispatch(specialOfferActions.clearSpecialOffers());
    dispatch(ticketsByDatesActions.clearPricesForDates());
  };

  const handleFirstDate = (date?: Date) => {
    setFirstDateValue(date ? date : new Date());
  };

  const handleSecondDate = (date?: Date) => {
    setSecondDateValue(date ? date : new Date());
  };

  return (
    <StyledContainer>
      <HeaderContainer>
        <SecondaryHeader
          title={specialTickets.data[0]?.title ? specialTickets.data[0].title : 'Билеты'}
          onBack={handleBack}
        />
      </HeaderContainer>
      <ContentContainer>
        <PrimaryTicketsSearchWidget searchParams={route.params} />
        <StyledDateContainer>
          <StyledDateItem>
            {firstDateValue && (
              <StyledDateText>{firstDateValue.toLocaleDateString()}</StyledDateText>
            )}
            <FormDateInput
              titleButton="Когда туда"
              value={firstDateValue}
              handleConfirm={handleFirstDate}
              minimumDate={new Date()}
              maximumDate={secondDateValue}
            />
          </StyledDateItem>
          <StyledDateItem>
            {secondDateValue && (
              <StyledDateText>{secondDateValue.toLocaleDateString()}</StyledDateText>
            )}
            <FormDateInput
              titleButton="Когда обратно"
              value={secondDateValue}
              handleConfirm={handleSecondDate}
              minimumDate={firstDateValue}
            />
          </StyledDateItem>
        </StyledDateContainer>
        {firstDateValue && (
          <StyledSearchButtonContainer>
            <PrimaryButton title="Найти билеты" onPress={handleSearch} />
          </StyledSearchButtonContainer>
        )}
        <DataHandler data={specialTickets.data} isWithHeader={false}>
          {specialTickets.loading ? (
            <StyledSpinnerContainer>
              <Spinner />
            </StyledSpinnerContainer>
          ) : (
            <StyledTicketsContainer>
              <StyledTitleSpecial>Специально для вас</StyledTitleSpecial>
              <Ticket
                ticket={specialTickets.data[0]}
                onClick={() => handleNavigate(specialTickets.data[0])}
              />
              {tickets.loading && (
                <StyledSpinnerContainer>
                  <Spinner />
                </StyledSpinnerContainer>
              )}
              {tickets.data.length > 0 && (
                <>
                  <StyledTitleTickets>Ближайшие билеты</StyledTitleTickets>
                  <StyledTicketsWrapper>
                    {tickets.data.map((ticket) => (
                      <Ticket
                        key={ticket.link}
                        ticket={ticket}
                        onClick={() => handleNavigate(ticket)}
                      />
                    ))}
                  </StyledTicketsWrapper>
                </>
              )}
            </StyledTicketsContainer>
          )}
        </DataHandler>
      </ContentContainer>
    </StyledContainer>
  );
};

const StyledTitleSpecial = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.headlineMedium_18};
      color: ${props.theme.colors.grayscale_800};
      margin-bottom: 20px;
    `;
  }}
`;
