import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Modal, Pressable } from 'react-native';
import styled, { css } from 'styled-components/native';

import { RootRouteNames, RootStackParamList } from '@app/navigation/tab-navigator/tab-navigator';

import { useAppDispatch, useAppSelector } from '@shared/store';
import { actions } from '@shared/store/ducks/special-offer';
import { SpecialOffer } from '@shared/store/ducks/special-offer/slice';
import { ButtonIcon } from '@shared/ui/buttons/button-icon/button-icon';
import { DataHandler } from '@shared/ui/data-handler/data-handler';
import { SvgCloseIcon } from '@shared/ui/icons/components/svg-close-icon';
import { Spinner } from '@shared/ui/spinner/spinner';
import { Ticket } from '@shared/ui/ticket/ticket';

import {
  StyledButtonModalClose,
  StyledContainer,
  StyledContentContainer,
  StyledModalContainer,
  StyledSpinnerContainer,
} from './ui/components';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export const PrimaryTicketsSearchModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const dispatch = useAppDispatch();
  const specialTickets = useAppSelector((state) => state.specialOffers);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigate = (ticket: SpecialOffer) => {
    // onClose();
    navigation.navigate(RootRouteNames.TICKET, { ticket });
  };

  const handleClose = () => {
    dispatch(actions.clearSpecialOffers());
    onClose();
  };

  return (
    <StyledContainer>
      <Modal animationType="slide" visible={isVisible}>
        <StyledModalContainer>
          <StyledButtonModalClose>
            <ButtonIcon Icon={SvgCloseIcon} onPress={handleClose} />
          </StyledButtonModalClose>
          <DataHandler data={specialTickets.data}>
            {specialTickets.loading ? (
              <StyledSpinnerContainer>
                <Spinner />
              </StyledSpinnerContainer>
            ) : (
              <StyledContentContainer>
                <StyledHeaderTitle>
                  {specialTickets.data[0]?.title ? specialTickets.data[0].title : 'Билеты'}
                </StyledHeaderTitle>
                <Ticket
                  ticket={specialTickets.data[0]}
                  onClick={() => handleNavigate(specialTickets.data[0])}
                />
              </StyledContentContainer>
            )}
          </DataHandler>
        </StyledModalContainer>
      </Modal>
    </StyledContainer>
  );
};

const StyledHeaderTitle = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.headlineSemibold_16};
      color: ${props.theme.colors.grayscale_800};
    `;
  }};
`;
