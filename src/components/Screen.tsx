import {View, ViewProps, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  children: React.ReactNode;
} & ViewProps;

const Screen = ({children, style, ...props}: Props) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {/* <LinearGradient
        colors={[
          '#c4eae4',
          '#daf2ee',
          '#e3f5f2',
          '#d9f2ee',
          '#e3f5f2',
          '#d9f2ee',
          '#f2fbf9',
        ]} // The gradient colors
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.gradientBackground}>
          </LinearGradient> */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  gradientBackground: {
    flex: 1, // Make the gradient fill its parent container
    borderRadius: 15, // Optional: if your mood chart background has rounded corners
  },
});

export default Screen;
