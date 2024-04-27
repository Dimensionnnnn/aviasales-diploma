import { RouteProp, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';

import { RootRouteNames, RootStackParamList } from '@app/navigation/tab-navigator/tab-navigator';

import { SecondaryHeader } from '@widgets/layouts/secondary-header/secondary-header';

import { Ticket } from '@shared/ui/ticket/ticket';

export const TicketPage = () => {
  const route = useRoute<RouteProp<RootStackParamList, RootRouteNames.TICKET>>();
  const props = route.params.ticket;

  return (
    <StyledContainer>
      <SecondaryHeader title="Билет" />
      <StyledContentContainer>
        <Ticket ticket={props} isForward />
      </StyledContentContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.grayscale_200};
  position: relative;
`;

const StyledContentContainer = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 16px 0 14px;
`;
