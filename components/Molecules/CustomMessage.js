import React from 'react';
import { Message } from 'react-native-gifted-chat';

const CustomMessage = (props) => {
  return (
    <Message
      {...props}
      containerStyle={{ ...props.containerStyle, backgroundColor: '#111111' }}
      textStyle={{ ...props.textStyle, color: '#333' }}
    />
  );
};

export default CustomMessage;