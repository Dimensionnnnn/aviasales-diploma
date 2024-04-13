import { COLORS } from '@shared/ui/styles/colors';

import { styledComponentsTypography } from './styled-components-typography';

export const themes = {
  default: {
    colors: { ...COLORS },
    typography: { ...styledComponentsTypography },
  },
};
