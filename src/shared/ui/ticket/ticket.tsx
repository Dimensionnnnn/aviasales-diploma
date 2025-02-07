import { URL_OPEN } from '@env';
import { Linking } from 'react-native';
import styled, { css } from 'styled-components/native';

import { SpecialOffer } from '@shared/store/ducks/special-offer/slice';
import { PricesForDatesType } from '@shared/store/ducks/tickets-by-dates/slice';

interface Props {
  ticket: SpecialOffer | PricesForDatesType;
  isForward?: boolean;
  onClick?: () => void;
}

const formatDepartureDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`;
};

const handleClick = async (ticketLink: string, isForward: boolean, onClick?: () => void) => {
  if (isForward) {
    Linking.openURL(`${URL_OPEN}${ticketLink}`);
  } else {
    onClick?.();
  }
};

const isSpecialOffer = (ticket: SpecialOffer | PricesForDatesType): ticket is SpecialOffer => {
  return (ticket as SpecialOffer).airline_title !== undefined;
};

export const Ticket: React.FC<Props> = ({ ticket, isForward = false, onClick }) => (
  <StyledTicketContainer onPress={() => handleClick(ticket.link, isForward, onClick)}>
    <StyledTicketHeader>
      <StyledTicketPriceTitle>{`${ticket.price} ₽`}</StyledTicketPriceTitle>
      {isSpecialOffer(ticket) && ticket.airline_title && (
        <StyledTicketAirlineTitle>{ticket.airline_title}</StyledTicketAirlineTitle>
      )}
    </StyledTicketHeader>
    <StyledTicketMain>
      <StyledTicketDataTitle>
        {`Дата вылета: ${formatDepartureDate(ticket.departure_at)}`}
      </StyledTicketDataTitle>
      <StyledTicketIATATitle>{`${ticket.origin} - ${ticket.destination}`}</StyledTicketIATATitle>
    </StyledTicketMain>
  </StyledTicketContainer>
);

export const StyledTicketContainer = styled.Pressable`
  display: flex;
  flex-direction: column;
  width: 343px;
  background-color: ${(props) => props.theme.colors.grayscale_500};
  border-radius: 12px;
  padding: 16px;
  gap: 12px;
`;

export const StyledTicketHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTicketMain = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledTicketPriceTitle = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.bodyBold_14};
      color: ${props.theme.colors.grayscale_800};
    `;
  }};
`;

const StyledTicketIATATitle = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.captionRegular_12};
      color: ${props.theme.colors.grayscale_700};
    `;
  }}
`;

const StyledTicketDataTitle = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.captionRegular_12};
      color: ${props.theme.colors.grayscale_800};
    `;
  }}
`;

const StyledTicketAirlineTitle = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.bodyRegular_14};
      color: ${props.theme.colors.grayscale_800};
    `;
  }}
`;
