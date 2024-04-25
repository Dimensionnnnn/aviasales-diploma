import { Linking } from 'react-native';
import styled, { css } from 'styled-components/native';

import { SpecialOffer } from '@shared/store/ducks/special-offer/slice';

interface Props {
  ticket: SpecialOffer;
}

const formatDepartureDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`;
};

const forwardTicketLink = async (ticketLink: string) => {
  console.log(`https://www.aviasales.ru${ticketLink}`);
  Linking.openURL(`https://www.aviasales.ru${ticketLink}`);

  const url = `https://www.aviasales.ru${ticketLink}`;

  const supported = await Linking.canOpenURL(url);

  console.log(supported, url);
};

export const Ticket: React.FC<Props> = ({ ticket }) => (
  <StyledTicketContainer onPress={() => forwardTicketLink(ticket.link)}>
    <StyledTicketHeader>
      <StyledTicketPriceTitle>{`${ticket.price} ₽`}</StyledTicketPriceTitle>
      <StyledTicketAirlineTitle>{ticket.airline_title}</StyledTicketAirlineTitle>
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
