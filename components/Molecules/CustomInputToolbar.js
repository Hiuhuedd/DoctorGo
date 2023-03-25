import React from 'react';
import { InputToolbar } from 'react-native-gifted-chat';

const CustomInputToolbar = (props) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{ ...props.containerStyle, backgroundColor: '#f0f0f0' }}
      primaryStyle={{ ...props.primaryStyle, color: '#333' }}
    />
  );
};

export default CustomInputToolbar;