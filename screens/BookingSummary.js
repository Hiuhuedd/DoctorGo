
import React ,{useState,useEffect}from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions,Image ,ImageBackground, Platform,TextInput,BackHandler,Switch, ActivityIndicator,  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Feather from 'react-native-vector-icons/Feather';
// import { Dialog, Divider } from "react-native-elements";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Button } from '../components/Atoms/Button';
import BottomTabs from '../components/Molecules/BottomTabs';
import appTheme from "../constants/theme"
import { ScrollView } from 'react-native-gesture-handler';
import EcareServices from '../components/Molecules/EcareServices';
import Appointments from '../components/Molecules/Appointments';
import ViewAtom from '../components/Atoms/ViewAtom';
import TextAtom from '../components/Atoms/TextAtom';
import { RadioButton } from 'react-native-paper';
import MedicalSpecialistDropdown from '../components/Molecules/MedicalSpecialistDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Mastercard, Visa } from '../constants/images';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const {COLORS, SIZES, FONTS}=appTheme


const BookingSummary= ({navigation}) =>{
    const s = useSelector(state => state.bookingReducer.Schedule);
    const t = useSelector(state => state.bookingReducer.TimeShift);
    const d = useSelector(state => state.bookingReducer.SelectedDoctor);
    console.log(d);
    const consMethod = useSelector(state => state.bookingReducer.ConsultationMethod);
    const card = useSelector(state => state.bookingReducer.Card);
    const all = useSelector(state => state.bookingReducer);
   
    //==============================LOCAL STORAGE ============================
    const handleStorage=()=>{
        // Retrieve existing data from AsyncStorage
        AsyncStorage.getItem('Appointments').then((data) => {
            // Parse the existing data from a string to a JavaScript object
            const existingData = data ? JSON.parse(data) : {};
            
            // Get the current time as a string
            const currentTime = new Date().toISOString();
            
            // Set the new data property to the current time
            existingData[currentTime] = all;
            
            // Convert the updated data object back to a string
            const updatedData = JSON.stringify(existingData);
            console.log(updatedData);
            // Save the updated data string to AsyncStorage
            AsyncStorage.setItem('Appointments', updatedData);
  });
      
        const updatedCard = JSON.stringify(card);
        // Save the updated card data string to AsyncStorage
        AsyncStorage.setItem('card', updatedCard);
  }

    //==============================Backpress============================
    const handleBackPress=()=>{
        
        navigation.navigate("BookingFour") 
        return true
    
    }
    useEffect(() => {

        BackHandler.addEventListener('hardwareBackPress',handleBackPress);
    }, [])
    useEffect(() => {
    
        BackHandler.addEventListener('hardwareBackPress',handleBackPress);
        return()=>{
            BackHandler.removeEventListener('hardwareBackPress',handleBackPress);
            
        }
    }, [])

     
                //==============================PAGE STATE============================
        
        const showAlert = (type, title, msg) => {
            Dialog.show({
            //   type: type,
              title: title,
              textBody: msg,
              autoClose: 3000
            });
          };
        const onMethodSelected = (method) => {
            handleStorage()
            showAlert(ALERT_TYPE.SUCCESS, "Please wait...",  <ActivityIndicator size="small" color="#fff" />);
            setTimeout(() => {
                navigation.navigate("AuthScreen")
            }, 4500);


          };

          function maskCardNumber(cardNumber) {
            const lastFourDigits = cardNumber.slice(-5);
            const maskedDigits = "**** **** **** ";
            return maskedDigits + lastFourDigits;
          }
          
          //==============================PAGE DISPATCH============================
         
        
              
              //==============================PAGE FONTS============================

    const [loaded] = useFonts({
        Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
        Poppins1: require('../assets/fonts/Poppins-Black.ttf'),
        Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
        Lob: require('../assets/fonts/Lobster-Regular.ttf')
                  });
                  if (!loaded) {
                    return <AppLoading/>
                  }
             
            return(
            <View style={{backgroundColor:COLORS.white, height:"100%",paddingTop:20}}  >

                <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={20} ph={20} bg="transparent" br={0} mv={0} mh={0}>
                <ViewAtom fd="row" jc="flex-start" ai="center" w="70%" bg="transparent"  pv={10}br={0} mv={0} mh={0}
               
                >
              
                                 <Feather name="chevron-left" size={SIZES.h1}     color={COLORS.primary}  onPress={()=> {navigation.navigate("BookingFour"); }}/>

                                <TextAtom text="Booking Summary" c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>

                </ViewAtom>

                                <TextAtom text="Summary" c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>
                                
                               
                </ViewAtom>
                <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={10} ph={20} bg="transparent" br={0} mv={0} mh={0}>
                                
                <TextAtom text="Booking info" c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>

                <ViewAtom fd="row" jc="space-between" ai="flex-start" w="55%" pv={10} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                <ViewAtom  pv={8} ph={8} bg={COLORS.gray} br={50} mv={0} mh={0}>              
                <Feather name="calendar" size={SIZES.h3}     color={COLORS.black}/>
                </ViewAtom>
                    <ViewAtom fd="column" jc="space-between" ai="flex-start" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                    <TextAtom text="Date & Time" c={COLORS.black} f="Poppins" s={SIZES.body4} w="500"/>
                    <TextAtom text={`${s.day}, ${s.date} ${s.month} ${s.year}`} c={COLORS.gray2} f="Poppins" s={SIZES.body5} w="500"/>
                    <TextAtom text={t[0].s_time} c={COLORS.gray2} f="Poppins" s={SIZES.body5} w="500"/>
                
                    </ViewAtom>
                </ViewAtom>

                <ViewAtom w="100%" pv={.2} ph={0} bg={COLORS.gray} br={0} mv={15} mh={0}>              
                </ViewAtom>

                <ViewAtom fd="row" jc="space-between" ai="flex-start" w="55%" pv={10} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                <ViewAtom  pv={8} ph={8} bg={COLORS.gray} br={50} mv={0} mh={0}>              
                <Feather name="smile" size={SIZES.h3}     color={COLORS.black}/>
                </ViewAtom>
                    <ViewAtom fd="column" jc="space-between" ai="flex-start" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                    <TextAtom text="Appointment Type" c={COLORS.black} f="Poppins" s={SIZES.body4} w="500"/>
                   
                    <TextAtom text="Video" c={COLORS.gray2} f="Poppins" s={SIZES.body5} w="500"/>
                
                    </ViewAtom>
                </ViewAtom>
             

                <ViewAtom w="100%" pv={.2} ph={0} bg={COLORS.gray} br={0} mv={15} mh={0}>              
                </ViewAtom>

            

                    <TextAtom text="Doctor info" c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>
              
                <ViewAtom fd="row" jc="space-between" ai="flex-start" w="55%" pv={10} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                            <ViewAtom  pv={8} ph={8} bg={COLORS.gray} br={50} mv={0} mh={0}>              
                            <Image style={styles.userImg} source={{ uri: d.img}} />
                            </ViewAtom>
                                <ViewAtom fd="column" jc="space-between" ai="flex-start" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                                <TextAtom text={`Dr.${d.name}`}c={COLORS.black} f="Poppins" s={SIZES.body4} w="500"/>
                            
                                <TextAtom text={d.doctor.type} c={COLORS.gray2} f="Poppins" s={SIZES.body5} w="500"/>
                                <TextAtom text="Glasses" c={COLORS.gray2} f="Poppins" s={SIZES.body5} w="500"/>
                            
                                </ViewAtom>
                </ViewAtom>

                <ViewAtom w="100%" pv={.2} ph={0} bg={COLORS.gray} br={0} mv={15} mh={0}>               
                </ViewAtom>

                    <TextAtom text="Payment info" c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>
                  
                <ViewAtom fd="row" jc="space-between" ai="flex-start" w="55%" pv={10} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                            <ViewAtom  pv={8} ph={8} bg={COLORS.gray} br={50} mv={0} mh={0}>              
                   {card.CardType==="Visa"? <Image style={styles.cardImg} source={Visa} />:<Image style={styles.cardImg} source={Mastercard} />}
                            </ViewAtom>
                                <ViewAtom fd="column" jc="space-between" ai="flex-start" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                                <TextAtom text={card.CardType} c={COLORS.black} f="Poppins" s={SIZES.body4} w="500"/>
                            
                                <TextAtom text={maskCardNumber(card.isNumberUpdated)} c={COLORS.gray2} f="Poppins" s={SIZES.body5} w="500"/>
                            
                            
                                </ViewAtom>
                </ViewAtom>
                <ViewAtom fd="row" jc="space-between" ai="flex-start" w="90%" pv={10} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                <TextAtom text="Total price" c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>
                <TextAtom text="KES 4000/=" c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>

                </ViewAtom>
                

                    <ViewAtom  ai="center" w="100%" pv={30} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                    <Button text={"Pay Now"}width="100%"bg={COLORS.primary}  borderRadius={7} screen="AuthScreen"  onMethodSelected={onMethodSelected}/>
                       
                    </ViewAtom>



                </ViewAtom>
                {/* <Appointments/> */}
               
             {/* <View style={{position:"absolute", width:"100%",bottom:0, backgroundColor:COLORS.gray }}>
            <BottomTabs navigation={navigation}/>
             </View> */}
            </View>
            )
}
export default BookingSummary
 
const styles = StyleSheet.create({
    userImg: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor:COLORS.white
      },
    cardImg: {
        height: 30,
        width: 40,
        borderRadius: 10,
        backgroundColor:COLORS.gray2,
        resizeMode: 'contain',
      },
  });
  
  
  
  