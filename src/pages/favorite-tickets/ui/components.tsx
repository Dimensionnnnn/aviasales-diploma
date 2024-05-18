import styled, { css } from 'styled-components/native';

export const StyledSpinnerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const StyledTitleTickets = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.headlineMedium_18};
      color: ${props.theme.colors.grayscale_800};
      margin: 24px auto 20px;
    `;
  }}
`;

export const StyledTicketsContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledTicketsWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;
