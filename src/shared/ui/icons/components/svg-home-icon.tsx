import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const SvgHomeIcon = (props: SvgProps) => (
  <Svg width={33} height={33} fill="none" {...props}>
    <Path fill="#231F20" d="M14.134 19.209h5.333v9.333h-5.333v-9.334Z" />
    <Path
      fill="#231F20"
      d="M28.027 14.115 17.747 3.61a1.333 1.333 0 0 0-1.893 0l-10.28 10.52a2.666 2.666 0 0 0-.774 1.906V27.21a2.667 2.667 0 0 0 2.52 2.666h4.147v-12a1.334 1.334 0 0 1 1.333-1.333h8a1.334 1.334 0 0 1 1.334 1.333v12h4.146a2.667 2.667 0 0 0 2.52-2.666V16.035a2.76 2.76 0 0 0-.773-1.92Z"
    />
  </Svg>
);
