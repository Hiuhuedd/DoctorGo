import React ,{useState,useEffect}from 'react';
import {StyleSheet,Image, TouchableWithoutFeedback ,View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { COLORS, SIZES } from '../../constants/theme';
import  TextAtom  from '../Atoms/TextAtom';
import ViewAtom from '../Atoms/ViewAtom';
import { image_Diagnosis, M2, Ambulance } from '../../constants/images';
import CardAtom from '../Atoms/CardAtom';
const EcareServices=({navigation})=>{
       const items = [
              {
                image: image_Diagnosis,
                text: "Consultation",
                screen:"BookingOne"
              },
              {
                image: M2,
                text: "Medicine",
                screen:"Medicine"
              },
              {
                image:Ambulance,
                text: "Ambulance",
              },
            ];
            const renderedItems = items.map((item) => (
              <TouchableWithoutFeedback onPress={()=>navigation.navigate(item.screen)} style={{width:"25%"}}>

              <View style={{width:"28%"}}>
              <CardAtom fd="column" jc="center" ai="center" w="100%" pv={0} ph={0} bg={COLORS.white} br={10} mv={0} mh={0}
         el={3} sh='#525252' >
                  <Image style={styles.userImg} source={item.image} />
            
                <TextAtom text={item.text} c={COLORS.gray2} f="Poppins" s={SIZES.body5} w="500" />
          </CardAtom>

              </View>
                </TouchableWithoutFeedback>
            ));
      return(
     <ViewAtom fd="column" jc="center" ai="flex-start" w="100%" pv={15} ph={20} bg="transparent" br={0} mv={10} mh={0}>
    <TextAtom text="Ecare services" c={COLORS.black} f="Poppins" s={SIZES.h3} w="600"/>

    <ViewAtom fd="row" jc="space-between" ai="center" w="100%" pv={0} ph={0} bg={COLORS.white} br={0} mv={0} mh={0}>
    {renderedItems}
  </ViewAtom>
            

     </ViewAtom>
      )
}
export default EcareServices
const styles = StyleSheet.create({
 
       
       userImg: {
        height: 35,
        width: 35,
        // borderRadius: 50,
        backgroundColor:COLORS.white,
    
      },

    
  });