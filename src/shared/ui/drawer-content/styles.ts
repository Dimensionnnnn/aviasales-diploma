import { StyleSheet } from 'react-native';

import { COLORS } from '@shared/ui/styles/colors';
import { outfitTextStyles } from '@shared/ui/styles/typography';

const styles = {
  containerBackgroundColor: { backgroundColor: COLORS.grayscale_500 },
  colorText: { color: COLORS.primary },
  colorIcon: COLORS.primary,
  root: StyleSheet.create({
    fontUserName: outfitTextStyles.titleSemibold_28,
    fontItemLabel: outfitTextStyles.headlineSemibold_20,
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingLeft: 13,
      paddingRight: 13,
      paddingBottom: 30,
      paddingTop: 60,
    },
    userContainer: {
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 30,
      gap: 12,
    },
    itemLabel: {
      marginLeft: -24,
      justifyContent: 'center',
    },
  }),
};

export const getStyles = () => {
  return {
    ...styles,
  };
};
