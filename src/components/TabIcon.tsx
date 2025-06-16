import React from 'react';
import {LucideIcon} from 'lucide-react-native';
import {Dimensions} from 'react-native';

type TabIconProps = Readonly<{
  focused: boolean;
  color: string;
  size: number;
  name: string;
  width: number;
  icon: LucideIcon;
}>;
const {height} = Dimensions.get('window');
export default function TabIcon({
  focused,
  icon: Icon,
  width,
  color,
}: TabIconProps) {
  return (
    <Icon
      size={25}
      style={{width, marginTop: height > 800 ? 15 : 0}}
      color={focused ? color : 'black'}
      fillOpacity={0.7}
    />
  );
}
