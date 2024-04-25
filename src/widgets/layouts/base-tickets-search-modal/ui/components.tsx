import styled from 'styled-components/native';

export const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.grayscale_200};
  display: flex;
  padding: 24px 16px;
  width: 100%;
  max-width: 343px;
`;

export const StyledModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.grayscale_200};
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 84px 16px 24px;
  z-index: 2;
`;

export const StyledModalInputContainer = styled.View`
  background-color: ${(props) => props.theme.colors.grayscale_500};
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  position: fixed;
  z-index: 3;
`;

export const StyledButtonModalClose = styled.View`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 3;
`;

export const StyledAutoCompleteContent = styled.View`
  width: 100%;
  gap: 16px;
  margin-top: 30px;
  border-radius: 12px;
  padding: 12px;
  background-color: ${(props) => props.theme.colors.grayscale_500};
  z-index: 1;
`;

export const StyledAutoCompleteItem = styled.View`
  display: flex;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.grayscale_600};
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

export const StyledScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
  margin-bottom: 150px;
`;

export const StyledSpinnerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
