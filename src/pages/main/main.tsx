import styled from 'styled-components/native';

import { PrimaryHeader } from '@widgets/layouts/primary-header/primary-header';
import { PrimaryTicketsSearch } from '@widgets/layouts/primary-tickets-search/primary-tickets-search';

import { useAppDispatch } from '@shared/store';
import { actions } from '@shared/store/ducks/auth';

export const Main = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(actions.logout());
  };

  return (
    <StyledContainer>
      <PrimaryHeader title="Авиабилеты" onLogout={handleLogout} />
      <StyledContentContainer>
        <PrimaryTicketsSearch />
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
