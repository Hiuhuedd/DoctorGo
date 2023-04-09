import React, { useCallback } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData,Text,View } from 'react-native';
import {Box,HStack,Icon,} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { PanGestureHandlerProps } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated'
// import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import AnimatedTaskLabel from './animated-task-label';
import SwipableView from './swipable-view';
import { COLORS, SIZES } from '../../constants/theme';
import Appointments from './Appointments';

const TaskItem = ({isDone,onToggleCheckbox,data,key,onPressLabel,onRemove,simultaneousHandlers }) => {
  

  return (
    <SwipableView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      backView={
        <Animated.View style={{width:"100%", height:"100%", backgroundColor:COLORS.rose, alignItems:"flex-end",
        justifyContent:"center",paddingRight:4,}}
         
        >
          <Feather color="white" name="trash-2" size={SIZES.body3} />
        </Animated.View>
      }
    >
      <View style={{alignItems:"center",width:"100%",padding:5,backgroundColor:COLORS.white}} >
        {/* <Box width={30} height={30} mr={2}>
          <Pressable onPress={onToggleCheckbox}>
            <AnimatedCheckbox
              highlightColor={highlightColor}
              checkmarkColor={checkmarkColor}
              boxOutlineColor={boxStroke}
              checked={isDone}
            />
          </Pressable>
        </Box> */}
        <AnimatedTaskLabel
            textColor={COLORS.black}
            inactiveTextColor={COLORS.gray2}
            strikethrough={isDone}
            onPress={onPressLabel}
          >
     <Appointments appointment={data} key={key} past={false} />
           
          </AnimatedTaskLabel>
      </View>
    </SwipableView>
  );
};

export default TaskItem;
