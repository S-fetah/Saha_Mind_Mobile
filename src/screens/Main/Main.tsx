import {Text, Dimensions, Pressable, GestureResponderEvent} from 'react-native';
import React from 'react';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import TabIcon from '../../components/TabIcon';
import {House, MessageCircle, Settings, LucideIcon} from 'lucide-react-native';

import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Tab = createBottomTabNavigator();

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

const HomeScreen = () => <Text>Home</Text>;
const ChatScreen = () => <Text>Chat</Text>;
const ProfileScreen = () => <Text>Profile</Text>;

const Tabs = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: House,
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
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      });

      scale.value = withTiming(1.3, {
        duration: 200,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      });

      setTimeout(() => {
        translateY.value = withTiming(0, {
          duration: 200,
          easing: Easing.inOut(Easing.quad),
          reduceMotion: ReduceMotion.System,
        });

        scale.value = withTiming(1, {
          duration: 200,
          easing: Easing.inOut(Easing.quad),
          reduceMotion: ReduceMotion.System,
        });
      }, 200);
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
      <Text style={{fontSize: 10, fontWeight: 'bold'}}>{name}</Text>
    </Pressable>
  );
};

export default function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          borderRadius: 10,
          marginBottom: deviceHeight > 800 ? '3%' : 0,
          // position: 'absolute',
          // bottom: 16,
          // marginLeft: 16,
          // width: deviceWidth - 32,
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
            tabBarActiveTintColor: 'blue',
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
  );
}
