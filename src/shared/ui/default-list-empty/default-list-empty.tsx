import styled, { css } from 'styled-components/native';

import { SecondaryHeader } from '@widgets/layouts/secondary-header/secondary-header';

import { listEmptyMessages } from '@shared/constants/list-empty-messages';
import { SvgSeacrhIcon } from '@shared/ui/icons/components/svg-search-icon';

interface Props {
  isWithHeader?: boolean;
}

export const DefaultListEmpty: React.FC<Props> = ({ isWithHeader }) => {
  return (
    <>
      {isWithHeader && <SecondaryHeader title={'Простите'} />}
      <StyledContainer>
        <SvgSeacrhIcon />
        <StyledText>{listEmptyMessages}</StyledText>
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.View`
  width: 100%;
  align-items: center;
  padding-top: 70px;
  justify-content: center;
  gap: 20px;
`;

const StyledText = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.headlineRegular_18};
      color: ${props.theme.colors.grayscale_800};
    `;
  }};
`;
