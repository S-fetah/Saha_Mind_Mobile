// components/LucidIcons.tsx
import React from 'react';
import Svg, {Circle, Path, Polyline} from 'react-native-svg';
import {ViewStyle} from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export const ArrowLeft = ({size = 24, color = '#333', style}: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}>
    <Path d="m12 19-7-7 7-7" />
    <Path d="M19 12H5" />
  </Svg>
);

export const ChevronRight = ({size = 24, color = '#333', style}: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}>
    <Polyline points="9 18 15 12 9 6" />
  </Svg>
);
export const ImagePlaceholderIcon = ({
  size = 24,
  color = '#A0A0A0',
  style,
}: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}>
    <Path d="M21 12V7H3v14h14" />
    <Path d="M17 22V12h5" />
    <Path d="M18 6V2" />
    <Path d="M2 13V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6" />
    <Path d="M22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6" />
    <Circle cx="9" cy="9" r="2" />
    <Polyline points="22 12 17 17 14 14 2 22" />
  </Svg>
);
