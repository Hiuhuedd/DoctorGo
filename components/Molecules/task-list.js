import React, { useCallback, useRef } from 'react';
import { AnimatePresence, View } from 'moti';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import TaskItem from './task-item';
import { SIZES } from '../../constants/theme';
// import { makeStyledComponent } from '../../constants/styled';

// const StyledView = makeStyledComponent(View);
// const StyledScrollView = makeStyledComponent(ScrollView);

const AnimatedTaskItem = ( {simultaneousHandlers,data,onToggleItem,onPressLabel,onRemove,key }) => {
 

  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data);
  }, [data, onToggleItem]);

  const handlePressLabel = useCallback(() => {
    onPressLabel(data);
  }, [data, onPressLabel]);

  const handleRemove = useCallback(() => {
    onRemove(data);
  }, [data, onRemove]);

  return (
    <View
  style={{width:SIZES.width}}
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46,
      }}
    >
      <TaskItem
        key={key}
        simultaneousHandlers={simultaneousHandlers}
        data={data}
        isDone={true}
        onToggleCheckbox={handleToggleCheckbox}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      />
    </View>
  );
};

const TaskList=({data,onToggleItem,onPressLabel,onRemoveItem,}) => {
 

  const refScrollView = useRef(null);

  return (
    <ScrollView ref={refScrollView}>
      <AnimatePresence>
        {data.map((item,key) => (
          <AnimatedTaskItem
            key={key}
            data={item}
            simultaneousHandlers={refScrollView}
            onToggleItem={onToggleItem}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
          />
        ))}
      </AnimatePresence>
    </ScrollView>
  );
};

export default TaskList;