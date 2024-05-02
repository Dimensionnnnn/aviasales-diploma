import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import styled from 'styled-components/native';

import {
  RootRouteNames,
  RootStackParamList,
  TicketsRouteParams,
} from '@app/navigation/tab-navigator/tab-navigator';

import { UILabelInput } from '@shared/ui/inputs/label-input/label-input';

import { BaseTicketsSearchModal } from '../base-tickets-search-modal/base-tickets-search-modal';
import { PrimaryTicketsSearchModal } from '../primary-tickets-search-modal/primary-tickets-search-modal';

interface Props {
  searchParams?: TicketsRouteParams;
}

export const PrimaryTicketsSearch: React.FC<Props> = ({ searchParams }) => {
  const [isBaseModalVisible, setIsBaseModalVisible] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleBaseModalClose = (props: TicketsRouteParams) => {
    setIsBaseModalVisible(false);

    navigation.navigate(RootRouteNames.TICKETS, props);
  };

  return (
    <StyledContainer>
      <StyledInputsContainer onTouchStart={() => setIsBaseModalVisible(true)}>
        <UILabelInput
          label="Откуда"
          isDisabled
          placeholder={searchParams?.origin ?? 'Откуда - Омск'}
        />
        <UILabelInput
          label="Куда"
          isDisabled
          placeholder={searchParams?.destination ?? 'Куда - Москва'}
        />
      </StyledInputsContainer>
      <BaseTicketsSearchModal
        isVisible={isBaseModalVisible}
        searchParams={searchParams}
        onClose={() => setIsBaseModalVisible(false)}
        onCloseWithNextOpen={handleBaseModalClose}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
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
