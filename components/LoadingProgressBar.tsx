import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

const LoadingProgressBar = ({
  loading,
  duration = 3000,
  style
}: {
  loading: boolean;
  /**mili seconds (1000) */ duration?: number;
  style?: StyleProp<ViewStyle>
}) => {
  const progress = useSharedValue(0);

  const animatedProgress = useDerivedValue(() => {
    return progress.value * 100;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value}%`,
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [0, 100 - animatedProgress.value],
            {
                extrapolateLeft: Extrapolation.CLAMP,
                extrapolateRight: Extrapolation.IDENTITY
            }
          ),
        },
      ],
    };
  });

  const startAnimation = () => {
    progress.value = withRepeat(
      withTiming(1, { duration }),
      -1, // -1 means repeat indefinitely
      true // true means reverse direction after each repeat
    );
  };

  const stopAnimation = () => {
    progress.value = withTiming(0);
  };

  if (loading) {
    startAnimation();
  } else {
    stopAnimation();
    return null
  }

  

  return (
    <View style={[styles.container, style]}>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressBarActive, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressBar: {
    width: "100%",
    height: 6,
    borderRadius: 5,
    backgroundColor: "#EDEDED",
    overflow: "hidden",
  },
  progressBarActive: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: "blue",
  },
});

export default LoadingProgressBar;
