import styled from 'styled-components/native';

import { useToggle } from '@shared/hooks/use-toggle';
import { SvgPasswordHiddenIcon } from '@shared/ui/icons/components/svg-password-hidden-icon';
import { SvgPasswordShowedIcon } from '@shared/ui/icons/components/svg-password-showed-icon';

import { UILabelInput } from '../label-input/label-input';
import { UILabelInputProps } from '../label-input/label-input';

export interface UIPasswordInputProps extends UILabelInputProps {
  iconColor?: string;
}

export function UIPasswordInput({ iconColor, ...props }: UIPasswordInputProps) {
  const { isOpened: isPasswordHidden, onToggle: setIsPasswordHidden } = useToggle(true);

  return (
    <UILabelInput secureTextEntry={isPasswordHidden} {...props}>
      <StyledIconPressable onPress={setIsPasswordHidden}>
        {isPasswordHidden ? (
          <SvgPasswordHiddenIcon color={iconColor} />
        ) : (
          <SvgPasswordShowedIcon color={iconColor} />
        )}
      </StyledIconPressable>
    </UILabelInput>
  );
}

const StyledIconPressable = styled.Pressable`
  position: absolute;
  right: 0;
  top: 32px;
  > svg {
    color: ${(props) => props.theme.colors.additional_error};
  }
`;
