import React, { useRef, useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { COLORS } from '../../constants/theme';

const MyInput = ({editable, keyboardType, secureTextEntry, style, placeholder,maxLength,setisUpdated}) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
      inputRef.current.focus();
    //   if (editable) {
    // }
  }, [editable]);


  const formatCardNumber = (value) => {
    if(maxLength===19){
        // Remove all non-digits from the input value
        const digitsOnly = value.replace(/\D/g, ''); 
        // Split the digits into groups of four and join them with a space
        const formattedValue = digitsOnly.replace(/(\d{4})/g, '$1 ');
        // Update the state with the formatted value
        setText(formattedValue);
        if (value.length === maxLength) {
            setisUpdated(formattedValue);
            inputRef.current.blur();
          }
  } else if (maxLength === 5) {
        if (value.length === 2&& text.length === 1) {
          value += '/';
        }
        setText(value);
        if (value.length === maxLength) {
            setisUpdated(value);
            inputRef.current.blur();
          }
      }else if (maxLength === 3) {
       
        setText(value);
        if (value.length === maxLength) {
            setisUpdated(value);
            inputRef.current.blur();
          }
      }
    else{
        setText(value);
        setisUpdated(value);

    }
  };


  return (
    <TextInput 
      ref={inputRef}
      autoFocus={editable}
      value={text}
      onChangeText={formatCardNumber}
      placeholder={placeholder}
      placeholderTextColor={COLORS.gray}
      keyboardType={keyboardType}
      textContentType="none"
      secureTextEntry={secureTextEntry}
      autoCompleteType="off"
      autoCapitalize="none"
      maxLength={maxLength}
      editable={editable}
      style={style}
    />
  );
};

export default MyInput;