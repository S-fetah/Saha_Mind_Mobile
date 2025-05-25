import {Text, Dimensions, Pressable, GestureResponderEvent} from 'react-native';
import React from 'react';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import TabIcon from '../../components/TabIcon';
import {
  House,
  MessageCircle,
  Settings,
  LucideIcon,
  Home,
} from 'lucide-react-native';

import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from '../Pages/HomeScreen';
import ProfileScreen from '../Pages/ProfileScreen';
import ChatScreen from '../Pages/ChatScreen';

const Tab = createBottomTabNavigator();

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

const Tabs = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: Home,
  },
  {
    name: 'Chat',
    component: ChatScreen,
    icon: MessageCircle,
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    icon: Settings,
  },
];

type TabIconProps = Readonly<{
  focused: boolean;
  color: string;
  size: number;
}>;
const createTabBarIcon =
  (Icon: LucideIcon, name: string, width: number) =>
  ({focused, color, size}: TabIconProps) =>
    (
      <TabIcon
        focused={focused}
        color={color}
        size={size}
        icon={Icon}
        name={name}
        width={width}
      />
    );

type CreateTabBarButtonProps = Readonly<{name: string}> &
  BottomTabBarButtonProps;
const CreateTabBarButton = ({
  children,
  onPress,
  accessibilityState,
  name,
}: CreateTabBarButtonProps) => {
  const isFocused = accessibilityState?.selected;
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const handlePress = (e: GestureResponderEvent) => {
    if (!isFocused) {
      translateY.value = withTiming(-15, {
        duration: 200,
        easing: Easing.elastic(0),
        reduceMotion: ReduceMotion.Never,
      });

      scale.value = withTiming(1.4, {
        duration: 200,
        easing: Easing.elastic(0),
        reduceMotion: ReduceMotion.Never,
      });

      setTimeout(() => {
        translateY.value = withTiming(0, {
          duration: 300,
          easing: Easing.elastic(1),
          reduceMotion: ReduceMotion.Never,
        });
        scale.value = withTiming(1, {
          duration: 300,
          easing: Easing.elastic(1),
          reduceMotion: ReduceMotion.Never,
        });
      }, 220);
    }

    onPress?.(e);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}, {scale: scale.value}],
    };
  });

  return (
    <Pressable
      onPress={handlePress}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
      <Text
        style={{
          fontSize: 10,
          fontWeight: 'bold',
          backgroundColor: 'transparent',
          color: '#121714',
        }}>
        {name}
      </Text>
    </Pressable>
  );
};

export default function Main() {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            borderRadius: 10,
            marginBottom: deviceHeight > 800 ? '6%' : -4,
            backgroundColor: '#f2fbf9',
          },
        }}>
        {Tabs.map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarButton: props =>
                CreateTabBarButton({...props, name: tab.name}),

              tabBarShowLabel: false,
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: 'bold',
                bottom: -5,
              },

              tabBarIcon: createTabBarIcon(
                tab.icon,
                tab.name,
                deviceWidth / Tabs.length,
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}
