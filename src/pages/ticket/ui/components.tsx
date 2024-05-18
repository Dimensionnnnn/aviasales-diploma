import styled, { css } from 'styled-components/native';

export const StyledContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.grayscale_200};
  position: relative;
`;

export const StyledContentContainer = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 16px 0 14px;
`;

export const TicketInfoContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.grayscale_500};
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
`;

export const TicketItem = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

export const TicketItemTitle = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.headlineRegular_18};
      color: ${props.theme.colors.grayscale_800};
    `;
  }}
`;

export const TicketItemDate = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.bodyRegular_14};
      color: ${props.theme.colors.grayscale_700};
    `;
  }}
`;

export const TicketItemTime = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.bodyRegular_16};
      color: ${props.theme.colors.grayscale_800};
    `;
  }}
`;

export const TicketTitle = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.headlineSemibold_20};
      color: ${props.theme.colors.grayscale_800};
    `;
  }}
`;

export const TicketTime = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.bodyRegular_16};
      color: ${props.theme.colors.grayscale_700};
    `;
  }}
`;

export const TicketTimeWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const TicketContainer = styled.View`
  width: 100%;
`;

export const ImageSmall = styled.Image`
  width: 150px;
  height: 100px;
  margin-left: 16px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
