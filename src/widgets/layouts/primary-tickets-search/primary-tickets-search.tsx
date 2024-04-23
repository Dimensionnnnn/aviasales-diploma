import { useState } from 'react';
import styled from 'styled-components/native';

import { UILabelInput } from '@shared/ui/inputs/label-input/label-input';

import { BaseTicketsSearchModal } from '../base-tickets-search-modal/base-tickets-search-modal';
import { PrimaryTicketsSearchModal } from '../primary-tickets-search-modal/primary-tickets-search-modal';

export const PrimaryTicketsSearch = () => {
  const [isBaseModalVisible, setIsBaseModalVisible] = useState(false);
  const [isPrimaryModalVisible, setIsPrimaryModalVisible] = useState(false);

  const handleBaseModalClose = () => {
    setIsBaseModalVisible(false);
    setIsPrimaryModalVisible(true);
  };

  return (
    <StyledContainer>
      <StyledInputsContainer onTouchStart={() => setIsBaseModalVisible(true)}>
        <UILabelInput label="Откуда" isDisabled placeholder="Откуда - Омск" />
        <UILabelInput label="Куда" isDisabled placeholder="Куда - Москва" />
      </StyledInputsContainer>
      <BaseTicketsSearchModal
        isVisible={isBaseModalVisible}
        onClose={() => setIsBaseModalVisible(false)}
        onCloseWithNextOpen={handleBaseModalClose}
      />
      <PrimaryTicketsSearchModal
        isVisible={isPrimaryModalVisible}
        onClose={() => setIsPrimaryModalVisible(false)}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.grayscale_200};
  display: flex;
  padding: 24px 16px;
  width: 100%;
  max-width: 343px;
`;

const StyledInputsContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;
