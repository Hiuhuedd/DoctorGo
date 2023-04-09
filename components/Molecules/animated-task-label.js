import React, { useEffect, memo } from 'react';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withSequence, withDelay, interpolateColor } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View ,Text,} from 'react-native';

const AnimatedBox = Animated.createAnimatedComponent(View);
const AnimatedHStack = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

const AnimatedTaskLabel = memo((props) => {
  const { strikethrough, textColor, inactiveTextColor, onPress, children } = props;

  const hstackOffset = useSharedValue(0);
  const hstackAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: hstackOffset.value }],
  }), [strikethrough]);

  const textColorProgress = useSharedValue(0);
  const textColorAnimatedStyles = useAnimatedStyle(() => ({
    color: interpolateColor(
      textColorProgress.value,
      [0, 1],
      [textColor, inactiveTextColor]
    ),
  }), [strikethrough, textColor, inactiveTextColor]);

  const strikethroughWidth = useSharedValue(0);
  const strikethroughAnimatedStyles = useAnimatedStyle(() => ({
    width: `${strikethroughWidth.value * 100}%`,
    borderBottomColor: interpolateColor(
      textColorProgress.value,
      [0, 1],
      [textColor, inactiveTextColor]
    ),
  }), [strikethrough, textColor, inactiveTextColor]);

  useEffect(() => {
    const easing = Easing.out(Easing.quad);
    if (strikethrough) {
      hstackOffset.value = withSequence(
        withTiming(4, { duration: 200, easing }),
        withTiming(0, { duration: 200, easing })
      );
      strikethroughWidth.value = withTiming(1, { duration: 400, easing });
      textColorProgress.value = withDelay(
        1000,
        withTiming(1, { duration: 400, easing })
      );
    } else {
      strikethroughWidth.value = withTiming(0, { duration: 400, easing });
      textColorProgress.value = withTiming(0, { duration: 400, easing });
    }
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <AnimatedHStack style={[{ alignItems:"center"},hstackAnimatedStyles]}>
        {children}
      </AnimatedHStack>
    </TouchableWithoutFeedback>
  );
});

export default AnimatedTaskLabel;
