import {Text, Dimensions, Pressable, GestureResponderEvent} from 'react-native';
import React, {useState} from 'react';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import TabIcon from '../../components/TabIcon';
import {MessageCircle, LucideIcon, Home} from 'lucide-react-native';

import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {EventArg} from '@react-navigation/native';
import Chats from './Chats';
import GuestHomeScreen from '../Pages/GuestHomeScreen';

const Tab = createBottomTabNavigator();

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

const Tabs = [
  {
    name: 'Guest',
    component: (props: any) => <GuestHomeScreen {...props} />,
    icon: Home,
  },
  {
    name: 'Chat',
    component: Chats,
    icon: MessageCircle,
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
        color={focused ? 'blue' : color}
        size={size}
        icon={Icon}
        name={name}
        width={width}
      />
    );

type CreateTabBarButtonProps = Readonly<{name: string; active: focusType[]}> &
  BottomTabBarButtonProps;
const CreateTabBarButton = ({
  children,
  onPress,
  name,
  active,
}: CreateTabBarButtonProps) => {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const activeTab = active.find(e => e.screen === name);

  const handlePress = (e: GestureResponderEvent) => {
    if (!activeTab?.active) {
      translateY.value = withTiming(-15, {
        duration: 200,
        easing: Easing.elastic(1),
        reduceMotion: ReduceMotion.Never,
      });

      scale.value = withTiming(1.4, {
        duration: 200,
        easing: Easing.elastic(1),
        reduceMotion: ReduceMotion.Never,
      });

      setTimeout(() => {
        translateY.value = withTiming(0, {
          duration: 200,
          easing: Easing.linear,
          reduceMotion: ReduceMotion.Never,
        });
        scale.value = withTiming(1.1, {
          duration: 200,
          easing: Easing.linear,
          reduceMotion: ReduceMotion.Never,
        });
      }, 100);
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
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
      <Text
        style={{
          fontSize: 10,
          fontWeight: 'bold',
          backgroundColor: 'transparent',
          color: activeTab?.active ? 'blue' : '#121714',
          marginTop: deviceHeight > 800 ? 5 : 0,
        }}>
        {name}
      </Text>
    </Pressable>
  );
};
interface focusType {
  screen: string;
  active: boolean;
}

export default function GuestMain() {
  const [badgeNumber, setBadgeNumber] = useState<number>(3);
  const [focus, setFocus] = useState<focusType[]>([
    {
      screen: 'Guest',
      active: false,
    },
    {
      screen: 'Chat',
      active: false,
    },
  ]);
  const [bkColor, setBkColor] = useState<'#f2fbf9' | '#fff'>('#fff');
  const handleTabPress = (
    routeName: string,
    e: EventArg<'tabPress', true, undefined>,
  ) => {
    console.log(e.data);

    const initial = [
      {
        screen: 'Guest',
        active: false,
      },
      {
        screen: 'Chat',
        active: false,
      },
    ];
    const filtered = initial.filter(a => a.screen !== routeName);
    filtered.push({screen: routeName, active: true});
    setFocus(filtered);
    routeName === 'Chat' ? setBkColor('#f2fbf9') : setBkColor('#fff');
  };

  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: deviceHeight > 800 ? 70 : 60,
            borderRadius: 10,
            marginBottom: deviceHeight > 800 ? '6%' : -4,
            // backgroundColor: '#f2fbf9',
            backgroundColor: bkColor,
          },
        }}>
        {Tabs.map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarButton: props =>
                CreateTabBarButton({
                  ...props,
                  name: tab.name,
                  active: focus,
                }),

              tabBarShowLabel: false,
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: 'bold',
                bottom: -5,
              },

              tabBarBadge:
                tab.name === 'Chat' && badgeNumber > 0
                  ? badgeNumber
                  : undefined,
              tabBarIcon: createTabBarIcon(
                tab.icon,
                tab.name,
                deviceWidth / Tabs.length,
              ),
            }}
            listeners={({route}) => ({
              tabPress: e => {
                handleTabPress(route.name, e);
                setBadgeNumber(0); // Clear the badge when Chat tab is pressed
              },
            })}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}
