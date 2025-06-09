import React from 'react';
import {LucideIcon} from 'lucide-react-native';

type TabIconProps = Readonly<{
  focused: boolean;
  color: string;
  size: number;
  name: string;
  width: number;
  icon: LucideIcon;
}>;

export default function TabIcon({
  focused,
  icon: Icon,
  width,
  color,
}: TabIconProps) {
  return (
    <Icon
      size={25}
      style={{width}}
      color={focused ? color : 'black'}
      fillOpacity={0.7}
    />
  );
}
