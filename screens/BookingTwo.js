import React ,{useState,useEffect}from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions,Image ,ImageBackground, Platform,TextInput,BackHandler,Switch } from 'react-native';
import { Divider } from "react-native-elements";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Button } from '../components/Atoms/Button';
import BottomTabs from '../components/Molecules/BottomTabs';
import { ScrollView } from 'react-native-gesture-handler';
import EcareServices from '../components/Molecules/EcareServices';
import Appointments from '../components/Molecules/Appointments';
import { RadioButton } from 'react-native-paper';
import Calendar from '../components/Molecules/Calendar';
import TimeShiftFlatlist from '../components/Molecules/TimeShiftFlatlist';
import { useDispatch } from 'react-redux';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import Feather from 'react-native-vector-icons/Feather';
import ViewAtom from '../components/Atoms/ViewAtom';
import TextAtom from '../components/Atoms/TextAtom';
import appTheme from "../constants/theme"
const {COLORS, SIZES, FONTS}=appTheme


const BookingTwo= ({navigation}) =>{
 
    //==============================Backpress============================
    const handleBackPress=()=>{
                
        navigation.navigate("Home") 
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
 
              //==============================PAGE DATA============================


    const timeShiftArray=[
        { id: 0, s_time: "8:00 am" },
        { id: 1, s_time: "9:00 am" },
        { id: 2, s_time: "10:00 am" },
        { id: 3, s_time: "11:00 am" },
        { id: 4, s_time: "12:00 pm" },
        { id: 5, s_time: "1:00 pm" },
        { id: 6, s_time: "2:00 pm" },
        { id: 7, s_time: "3:00 pm" },
        { id: 8, s_time: "4:00 pm" },
        { id: 9, s_time: "5:00 pm" },
        { id: 10, s_time: "6:00 pm" },
    ]
     //==============================PAGE DISPATCH============================
     const dispatch = useDispatch();
    const [Id,setId]=useState(4)
    const [Id1,setId1]=useState(8)

    const showAlert = (type, title, msg) => {
        Toast.show({
          type: type,
          title: title,
          textBody: msg,
        });
      };
      
      const onMethodSelected = (method) => {
                 navigation.navigate("BookingThree")
    };
        const onDateSelected = (date) => {
            const today = new Date().getDate().toString();
            const sd= parseInt(date.date.substring(0, date.date.length - 2));
               if (sd < today) {
                showAlert(ALERT_TYPE.WARNING, "Oops!", "Please select a future schedule");
                }else{
                dispatch({
                    type: "SELECT_SCHEDULE",
                    payload: date,
                  });
                }
           };
           useEffect(() => {
            const filteredArray = [timeShiftArray[Id],timeShiftArray[Id1]]
            
            dispatch({
                type: "SELECT_TIME_SHIFT",
                payload: filteredArray,
              });
        }, [Id,Id1])
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
              
                <Feather name="chevron-left" size={SIZES.h1}     color={COLORS.primary}  onPress={()=> {navigation.navigate("BookingOne")}}/>

            <TextAtom text="Booking Appointments" c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>

                </ViewAtom>

                                <TextAtom text="Step 2/4" c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>
                                
                               
                </ViewAtom>
                <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={10} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                                
                <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={0} ph={20} bg="transparent" br={0} mv={0} mh={0}>
                <TextAtom text="Select Schedule" c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/>

                </ViewAtom>
                    <Calendar onDateSelected={onDateSelected}/>


                <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={0} ph={20} bg="transparent" br={0} mv={0} mh={0}>

                <ViewAtom w="100%" pv={.2} ph={0} bg={COLORS.gray} br={0} mv={15} mh={0}>            
                </ViewAtom>
                 <TextAtom text="Select Time shift" c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/>
                 <TextAtom text="Morning" c={COLORS.black} f="Poppins" s={SIZES.body5} w="500"/>



               <TimeShiftFlatlist data={timeShiftArray.slice(0,6)} setId={setId}/>
                 <TextAtom text="Evening" c={COLORS.black} f="Poppins" s={SIZES.body5} w="500"/>
               <TimeShiftFlatlist data={timeShiftArray.slice(6,11)} setId={setId1}/>
                </ViewAtom>
                

              

                    <ViewAtom  ai="center" w="100%" pv={30} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                    <Button text={"Next"}width="90%"bg={COLORS.primary} borderRadius={7} screen="BookingThree"  onMethodSelected={onMethodSelected}/>
                       
                    </ViewAtom>



                </ViewAtom>
                {/* <Appointments/> */}
               
             {/* <View style={{position:"absolute", width:"100%",bottom:0, backgroundColor:COLORS.gray }}>
            <BottomTabs navigation={navigation}/>
             </View> */}
            </View>
            )
}
export default BookingTwo
 
const styles = StyleSheet.create({
   
  });
  
  
  
  