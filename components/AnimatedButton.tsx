import React, { useState, useEffect, ReactElement } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
} from "react-native";

const AnimatedButton = ({
  children,
  style,
  loading = false,
  onPress
}: {
  children: ReactElement;
  style?:{container?: StyleProp<ViewStyle>,button?: StyleProp<ViewStyle>};
  loading?: boolean;
  onPress?: () => void
}) => {
  const [spinValue, _] = useState(new Animated.Value(0));

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    } 
  }, [loading, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ rotate: spin }] }, style?.container]}
    >
      <TouchableOpacity disabled={loading} style={style?.button} onPress={onPress}>{children}</TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AnimatedButton;
