import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableWithoutFeedback, Text, Image, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS, SIZES } from '../../constants/theme';
import CardAtom from '../Atoms/CardAtom';
import TextAtom from '../Atoms/TextAtom'; 
import ViewAtom from '../Atoms/ViewAtom';
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from 'react-native-vector-icons/Feather'
const MedicinesList = ({ medicines, navigation,searchText ,cartItems,handleAddToCart}) => {


  const handleMedicinePress = (medicine) => {

    navigation.navigate('MedicineDetails', { medicine,cartItems });
  };


  const renderItem = ({ item }) => {
    const isItemInCart = cartItems.find(cartItem => cartItem.name === item.name);
  
    return (
    
        <CardAtom fd="column" jc="space-between" ai="center" pv={10} ph={10} bg={COLORS.white} w={"45%"} br={5} mv={20} mh={0}
                 el={3} sh='#525252' >

        <Image source={item.imageUrl} style={styles.medicineImage} />
        <ViewAtom fd="column" jc="center" ai="flex-start" w="100%" pv={0} ph={0} bg={COLORS.white} br={0} mv={0} mh={0}>
        <TextAtom text={item.name} c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>
        <TextAtom text={item.dosage} c={COLORS.gray2} f="Poppins" s={SIZES.base} w="500"/>
        <TextAtom text={`Ksh ${item.price}/=`} c={COLORS.black} f="Poppins1" s={SIZES.h5} w="500"/>


        <ViewAtom fd="row" ai="center" jc='space-between' w="100%" pv={0} ph={0} bg={COLORS.white} br={0} mv={0} mh={0}>
        <TouchableWithoutFeedback
      
        onPress={() => handleAddToCart(item)} 
      >
          <View>

        <CardAtom fd="row" jc="space-between" ai="center"  pv={10} ph={10} bg={ isItemInCart? COLORS.gray2:COLORS.primary} br={5} mv={0} mh={0}
                 el={3} sh='#525252' >
                       <Feather name="plus" size={SIZES.font}    color={COLORS.white}/>
     
                 </CardAtom>
          </View>
      </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
       onPress={() => handleMedicinePress(item)}
      >
          <View>

        <CardAtom fd="row" jc="space-between" ai="center"   >
                       <Feather name="arrow-right" size={SIZES.h2}    color={COLORS.black}/>
     
                 </CardAtom>
          </View>
      </TouchableWithoutFeedback>

        </ViewAtom>


        </ViewAtom>
     
                 </CardAtom>

       
    );
  };

  const filteredMedicines = medicines.filter(medicine => medicine.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <View style={styles.container}>
     


         <ScrollView style={{height:SIZES.height-100}}>
       <ViewAtom fd="column" jc="center" ai="flex-start" w="100%" pv={0} ph={20} bg={COLORS.white} br={0} mv={0} mh={0}>
     <TextAtom text="For you" c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>      
       </ViewAtom>
        
      <FlatList
        data={filteredMedicines}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
      />

         </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 20,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width:SIZES.width
  },
  medicineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width:"45%",
    marginBottom:20,
    backgroundColor:"blue"
  },
  medicineImage: {
    width:'100%',
    height: SIZES.height-650,
    objectFit:'contain'

   
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MedicinesList;