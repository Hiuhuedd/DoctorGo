import React from 'react'
import { Dimensions,View } from 'react-native'
import {  PanGestureHandler,} from 'react-native-gesture-handler'
import Animated, {  useAnimatedGestureHandler,  useSharedValue,  useAnimatedStyle,  withTiming,  runOnJS
} from 'react-native-reanimated'
import { Box } from 'native-base'
// import { makeStyledComponent } from '../../constants/styled'

// const StyledView = makeStyledComponent(Animated.View)

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.2

const SwipeView = ({ children, backView, onSwipeLeft, simultaneousHandlers }) => {

  const translateX = useSharedValue(0)

  const panGesture = useAnimatedGestureHandler({
    onActive: event => {
      translateX.value = Math.max(-128, Math.min(0, event.translationX))
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < SWIPE_THRESHOLD
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH)
        onSwipeLeft && runOnJS(onSwipeLeft)()
      } else {
        translateX.value = withTiming(0)
      }
    }
  })

  const facadeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value
      }
    ]
  }))

  return (
    <Animated.View style={{width:"100%",}}>
      {backView && (
        <Animated.View style={{position:"absolute" ,left:0, right:0 ,top:0, bottom:0}}>
          {backView}
        </Animated.View>
      )}
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}
      >
        <Animated.View style={facadeStyle}>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}

export default SwipeView
