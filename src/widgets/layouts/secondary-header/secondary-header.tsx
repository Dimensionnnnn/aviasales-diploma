import { useNavigation } from '@react-navigation/native';
import styled, { css } from 'styled-components/native';

import { ButtonIcon } from '@shared/ui/buttons/button-icon/button-icon';
import { SvgBackIcon } from '@shared/ui/icons/components/svg-back-icon';

interface Props {
  title: string;
  onBack?: () => void;
}

export const SecondaryHeader = ({ title, onBack }: Props) => {
  const navigate = useNavigation();

  const handleGoBack = () => {
    navigate.goBack();
    onBack?.();
  };

  return (
    <StyledHeaderContainer>
      <StyledButtonContainer>
        <ButtonIcon Icon={SvgBackIcon} onPress={handleGoBack} />
      </StyledButtonContainer>
      <StyledHeaderTitle>{title}</StyledHeaderTitle>
    </StyledHeaderContainer>
  );
};

const StyledHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 18px 0 20px 0;
  width: 100%;
  position: relative;
`;

const StyledHeaderTitle = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.headlineSemibold_20};
      color: ${props.theme.colors.grayscale_800};
      margin-left: 40px;
      max-width: 300px;
    `;
  }};
`;

const StyledButtonContainer = styled.View`
  position: absolute;
  left: 16px;
  top: 12px;
`;
