import React ,{useState,useEffect}from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Platform,TextInput, } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Axios from 'axios';
import { Button } from '../Atoms/Button';
import Feather from 'react-native-vector-icons/Feather';
import appTheme from '../../constants/theme';
import ViewAtom from '../../components/Atoms/ViewAtom';
import TextAtom from '../../components/Atoms/TextAtom';
import { Icon } from 'react-native-elements';
const {COLORS, SIZES, FONTS}=appTheme
const DoctorDetailsBottomSheet = React.forwardRef(({onMethodSelected,navigation,doctor}, ref) => {


    const fullStars = Math.floor(doctor.rating);
    const halfStars = Math.ceil(doctor.rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;

  return (
    <RBSheet
      ref={ref}
      height={250}
      openDuration={250}
      dragFromTopOnly  
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          alignItems:"center",
          backgroundColor:COLORS.white
         
        },
      }}
      >
     
     <ViewAtom fd="row" jc="flex-start" ai="flex-start" w="100%" pv={0} ph={20} bg="transparent" br={0} mv={10} mh={0}>

            <Image style={styles.userImg}  source={{uri:doctor.img}} />
            <ViewAtom fd="column" jc="flex-start" ai="flex-start"  pv={0} ph={5} bg="transparent" br={0} mv={0} mh={20}>
                <TextAtom text={`Dr. ${doctor.name}`} c={COLORS.primary} f="Poppins" s={SIZES.body4} w="500"/>
                <TextAtom text={doctor.doctor.type} c={COLORS.primary} f="Poppins" s={SIZES.base} w="500"/>
            

                <ViewAtom fd="row" ai="center"  pv={5} ph={10} bg={COLORS.gray} br={5} mv={0} mh={0}>
                            {[...Array(fullStars)].map((_, i) => (
                                <Icon key={i} color={COLORS.gold} size={SIZES.body4} name="star" />
                            ))}
                            {[...Array(halfStars)].map((_, i) => (
                                <Icon key={i} color={COLORS.gold} size={SIZES.body4}  name="star-half" />
                            ))}
                            {[...Array(emptyStars)].map((_, i) => (
                                <Icon key={i} size={SIZES.body4}  name="star-outline" />
                            ))}
        
                </ViewAtom>
                
                <ViewAtom fd="row" ai="center" jc="space-between" w="60%" pv={5} ph={0} br={5} mv={0} mh={0}>
                        <ViewAtom fd="column" ai="center"  pv={5} ph={0} br={5} mv={0} mh={0}>   
                        <TextAtom text='1550' c={COLORS.primary} f="Poppins" s={SIZES.body4} w="500"/>
                        <TextAtom text="Reviews" c={COLORS.gray2} f="Poppins" s={SIZES.base} w="500"/>
                        </ViewAtom>
           
                        <ViewAtom fd="column" ai="center"  pv={5} ph={0} br={5} mv={0} mh={0}>  
                        <TextAtom text='24' c={COLORS.primary} f="Poppins" s={SIZES.body4} w="500"/>
                        <TextAtom text="Years exp." c={COLORS.gray2} f="Poppins" s={SIZES.base} w="500"/>              
                        </ViewAtom>
                        <ViewAtom fd="column" ai="center"  pv={5} ph={0} br={5} mv={0} mh={0}>     
                        <TextAtom text='4745' c={COLORS.primary} f="Poppins" s={SIZES.body4} w="500"/>
                        <TextAtom text="Patients" c={COLORS.gray2} f="Poppins" s={SIZES.base} w="500"/>             
                        </ViewAtom>
                
                </ViewAtom>

         </ViewAtom>
     </ViewAtom>
                        
       <Button text={"Proceed"} width="85%"bg={COLORS.primary} navigation={navigation} borderRadius={5} screen="BookingFour"  onMethodSelected={onMethodSelected}/>
         
    </RBSheet>
  );
});
const styles =StyleSheet.create({
   
     
     userImg: {
      height: 100,
      width: 80,
      borderRadius:5,
      backgroundColor:COLORS.white
    },
  });
export default DoctorDetailsBottomSheet;