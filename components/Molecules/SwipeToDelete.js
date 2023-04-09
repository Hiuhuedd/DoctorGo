import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { COLORS } from '../../constants/theme';

const SWIPE_THRESHOLD = 75;
const BACKGROUND_COLOR = '#ff4444';

const SwipeToDelete = ({ item, onDelete,key }) => {
  if (!item) {
    return <></>;
  }

  const [isDeleting, setIsDeleting] = useState(false);
  const translateX = useSharedValue(0);
  const backgroundColor = useSharedValue(BACKGROUND_COLOR);
  const showBackground = useSharedValue(false);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = ctx.startX + translationX;
      if (translationX > SWIPE_THRESHOLD) {
        showBackground.value = true;
      } else {
        showBackground.value = false;
      }
    },
    onEnd: ({ velocityX, translationX }) => {
      if (translationX > SWIPE_THRESHOLD || velocityX > 1000) {
        // setIsDeleting(true);
        translateX.value = withSpring(500, {})
        backgroundColor.value = withSpring(COLORS.rose);
        // onDelete(key)
      } else {
        translateX.value = withSpring(0);
        showBackground.value = false;
      }
    },
  });

  const swipeStyles = useAnimatedStyle(() => {
    const opacity = isDeleting ? withSpring(0) : 1;
    return {
      transform: [{ translateX: translateX.value }],
      opacity,
    };
  });

  const backgroundStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
      position: 'absolute',
      alignItems:"flex-start",
      justifyContent:"center",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: showBackground.value ? withSpring(1) : withSpring(0),
      borderRadius: 8,
      padding:16,
    };
  });

  const handleDelete = useCallback(() => {
    onDelete(item);
  }, [item, onDelete]);

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[ swipeStyles]}>
      {item}
        <Animated.View style={[ backgroundStyles]}>
          <Text style={styles.deleteText}>Cancle Appointment</Text>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SwipeToDelete;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    // padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  deleteAction: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
