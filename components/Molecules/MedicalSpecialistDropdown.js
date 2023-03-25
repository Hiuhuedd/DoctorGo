import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  {Picker}  from '@react-native-picker/picker';
import { COLORS, SIZES } from '../../constants/theme';
import TextAtom from '../Atoms/TextAtom';

const MedicalSpecialistDropdown = ({handleSetSpecialist}) => {
  const [selectedValue, setSelectedValue] = useState('cardiologist');
  const medicalSpecialists = [
    { label: 'Cardiologist', value: 'cardiologist' },
    { label: 'Dermatologist', value: 'dermatologist' },
    { label: 'Endocrinologist', value: 'endocrinologist' },
    { label: 'Neurologist', value: 'neurologist' },
    { label: 'Dentist', value: 'Dentist' },
    { label: 'Pediatrician', value: 'Pediatrician' },
    { label: 'Family Medicine', value: 'Family Medicine' },
 
  ];
  useEffect(() => {
    handleSetSpecialist(selectedValue)
}, [selectedValue])

  return (
    <View>
 <TextAtom text="Specify medical specialist" c={COLORS.gray2} f="Poppins" s={SIZES.body5} w="500"/>


      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        
      >
        {medicalSpecialists.map((specialist) => (
          <Picker.Item
            key={specialist.value}
            label={specialist.label}
            value={specialist.value}
            style={styles.pickerItem}
          />
        ))}
      </Picker>
    </View>
  );
};
export default MedicalSpecialistDropdown
const styles = StyleSheet.create({
  
  picker: {
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,

  },
  pickerItem: {
    fontSize: SIZES.body5,
    color: COLORS.gray2,
  },
});