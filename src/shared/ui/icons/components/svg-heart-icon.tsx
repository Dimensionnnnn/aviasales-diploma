import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const SvgHeartIcon = (props: SvgProps) => (
  <Svg width={32} height={32} fill="currentColor" {...props}>
    <Path
      fill="#231F20"
      d="M16 28a1.334 1.334 0 0 1-.947-.387L4.694 17.24a7.013 7.013 0 0 1 0-9.867 6.987 6.987 0 0 1 9.867 0L16 8.813l1.44-1.44a6.986 6.986 0 0 1 9.867 0 7.014 7.014 0 0 1 0 9.867l-10.36 10.373A1.335 1.335 0 0 1 16 28Z"
    />
  </Svg>
);
