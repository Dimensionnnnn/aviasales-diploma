import { StyleSheet } from 'react-native';

import { COLORS } from '@shared/ui/styles/colors';
import { outfitTextStyles } from '@shared/ui/styles/typography';

export const styles = {
  textColor: {
    pressed: { color: COLORS.additional_success },
    disabled: { color: COLORS.grayscale_600 },
    initial: { color: COLORS.grayscale_800 },
  },
  root: StyleSheet.create({
    fontText: outfitTextStyles.bodyRegular_14,
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  }),
};

enum ElementStatus {
  disabled = 'disabled',
  pressed = 'pressed',
  initial = 'initial',
}

const getElementStatus = (isDisabled?: boolean, isPressed?: boolean) => {
  return isDisabled
    ? ElementStatus.disabled
    : isPressed
    ? ElementStatus.pressed
    : ElementStatus.initial;
};

export const getStyles = (pressed?: boolean, isDisabled?: boolean) => {
  const elementStatus = getElementStatus(isDisabled, pressed);
  return {
    ...styles.root,
    textColor: styles.textColor[elementStatus],
  };
};
