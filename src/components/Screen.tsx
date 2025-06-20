import {View, ViewProps, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  children: React.ReactNode;
  gradient: boolean;
} & ViewProps;
// ['#f2fbf9', '#e3f5f2']

const {height} = Dimensions.get('window');
const Screen = ({children, style, gradient, ...props}: Props) => {
  const colors = gradient
    ? [
        '#c4eae4',
        '#daf2ee',
        '#e3f5f2',
        '#d9f2ee',
        '#e3f5f2',
        '#d9f2ee',
        '#f2fbf9',
      ]
    : ['#fff', '#fff'];
  return (
    <View style={[styles.container, style]} {...props}>
      <LinearGradient
        colors={colors}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.gradientBackground}>
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradientBackground: {
    flex: 1, // Make the gradient fill its parent container
    paddingHorizontal: 16,
    paddingTop: height < 800 ? 15 : 35,

    // paddingBottom: 32,
  },
});

export default Screen;
