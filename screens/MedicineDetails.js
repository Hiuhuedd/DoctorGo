import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions,Image ,ImageBackground, Platform,TextInput,BackHandler,Switch } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import appTheme from "../constants/theme"
import { ScrollView } from 'react-native-gesture-handler';
import ViewAtom from '../components/Atoms/ViewAtom';
import TextAtom from '../components/Atoms/TextAtom';
import { RadioButton } from 'react-native-paper';
import AntDesign from "react-native-vector-icons/AntDesign";
import { Badge } from "react-native-elements";
import { Button } from '../components/Atoms/Button';

const MedicineDetails = ({ route,navigation }) => {
  const {COLORS, SIZES, FONTS}=appTheme

  const { medicine,cartItems } = route.params;

  const onMethodSelected = (method) => {
    navigation.navigate("Medicine")
};
const desc="One example of a drug description is ibuprofen, which is a nonsteroidal anti-inflammatory drug (NSAID) that is commonly used to relieve pain, reduce fever, and decrease inflammation in the body. It works by blocking the production of certain chemicals in the body that cause pain, fever, and inflammation. Ibuprofen is available in different forms, including tablets, capsules, and liquids, and is often used to treat conditions such as headaches, menstrual cramps, arthritis, and minor injuries. It is important to use ibuprofen as directed and to talk to a healthcare provider before using it in certain situations, such as if you have a history of stomach ulcers or kidney problems."
  return (
    <React.Fragment>

      {/* <Text style={styles.medicineName}>{medicine.name}</Text>
      <Text style={styles.medicineDescription}>{medicine.description}</Text>
      <Text style={styles.medicineDosage}>{medicine.dosage}</Text> */}


      <View style={{backgroundColor:COLORS.white, height:SIZES.height,paddingTop:0}}  >
               <ImageBackground  style={{width: '100%',height:SIZES.height-500,marginBottom:30,backgroundColor:COLORS.white,position:"relative", }} resizeMode="cover" >
                        <ViewAtom fd="column" jc="flex-start" ai="flex-start" pv={40}  ph={15} w="100%" bg="transparent" br={0} mv={0} mh={0}>
                      
                        <ViewAtom fd="row" jc="space-between" ai="center" w="100%" pv={0} ph={10}  bg="transparent" br={0} mv={0} mh={0}>
                        <ViewAtom fd="row" jc="flex-start" ai="center" w="70%" bg="transparent"  pv={0}br={0} mv={0} mh={0}
               
               >
             
                                <Feather name="chevron-left" size={SIZES.h1}     color={COLORS.primary}  onPress={()=> {navigation.navigate("Medicine"); }}/>

                               <TextAtom text={medicine.name} c={COLORS.primary} f="Poppins" s={SIZES.h3} w="500"/>

               </ViewAtom>

                                {/* <TextAtom text="Step 1/4" c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/> */}
                                <View style={{position:"relative",marginRight:20}} >
                                <ViewAtom fd="column" jc="center" ai="center"   pv={10} ph={10} bg={COLORS.primary}  br={50}  mv={0} mh={0} >
                              <Feather name="shopping-cart" size={SIZES.font}   color={COLORS.white}/>
                        </ViewAtom>         
                        {cartItems.length>0&&<View style={{position:"absolute",right:0}} >
                        <Badge  containerStyle={{ position: 'absolute', top: -2, right: -9 }} value={cartItems.length} status="success" />
                                    
                                
                       </View>}
                                </View>
                               
                </ViewAtom>
              

                            
                               
                <ViewAtom  ai="center" w="100%"   bg="transparent" br={0} mv={0} mh={0}>
                <Image source={ medicine.imageUrl} style={styles.medicineImage} />

                        </ViewAtom>
                </ViewAtom>
                </ImageBackground>

                <ViewAtom fd="column" jc="flex-start" ai="flex-start" pv={0}  ph={15} w="100%" bg={COLORS.white} br={0} mv={20} mh={0}>
                      
                        
               
                                      <TextAtom text={medicine.name} c={COLORS.primary} f="Poppins" s={SIZES.h3} w="500"/>
      
                      
                      <TextAtom text={medicine.dosage} c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>        
                      <TextAtom text={`Ksh ${medicine.price}/=`} c={COLORS.black} f="Poppins1" s={SIZES.h2} w="500"/>        
                      <TextAtom text={medicine.description} c={COLORS.gray2} f="Poppins" s={SIZES.h5} w="500"/>        
                      <TextAtom text={desc} c={COLORS.gray2} f="Poppins" s={SIZES.padding} w="500"/>        
                                     
                      {/* <ViewAtom  ai="center" w="100%"   bg="transparent" br={0} mv={0} mh={0}>
                      <Image source={ medicine.imageUrl} style={styles.medicineImage} />
      
                              </ViewAtom> */}
                      </ViewAtom>

                      <ViewAtom  ai="center" w="100%" pv={30} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                    <Button text={"Add to cart"}width="90%"bg={COLORS.primary} borderRadius={7} screen="BookingThree"  onMethodSelected={onMethodSelected}/>
                       
                    </ViewAtom>
                {/* <Appointments/> */}
               
             {/* <View style={{position:"absolute", width:"100%",bottom:0, backgroundColor:COLORS.gray }}>
            <BottomTabs navigation={navigation}/>
             </View> */}
            </View>

    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  medicineImage: {
    width: '70%',
    height: "100%",

  },
  medicineName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  medicineDescription: {
    fontSize: 16,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  medicineDosage: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default MedicineDetails;