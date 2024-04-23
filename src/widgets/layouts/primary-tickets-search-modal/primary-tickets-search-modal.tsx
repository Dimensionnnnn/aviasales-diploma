import { Modal } from 'react-native';

import { ButtonIcon } from '@shared/ui/buttons/button-icon/button-icon';
import { SvgCloseIcon } from '@shared/ui/icons/components/svg-close-icon';

import { StyledButtonModalClose, StyledContainer, StyledModalContainer } from './ui/components';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export const PrimaryTicketsSearchModal: React.FC<Props> = ({ isVisible, onClose }) => {
  return (
    <StyledContainer>
      <Modal animationType="slide" visible={isVisible}>
        <StyledModalContainer>
          <StyledButtonModalClose>
            <ButtonIcon Icon={SvgCloseIcon} onPress={onClose} />
          </StyledButtonModalClose>
        </StyledModalContainer>
      </Modal>
    </StyledContainer>
  );
};
