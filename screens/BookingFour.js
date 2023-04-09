import React ,{useState,useEffect}from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions,Image ,ImageBackground, Platform,TextInput,BackHandler,Switch } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Divider } from "react-native-elements";
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
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import CreditCard from '../components/Molecules/CreditCard';
import { useDispatch } from 'react-redux';

const {COLORS, SIZES, FONTS}=appTheme


const BookingFour= ({navigation}) =>{
 
    //==============================Backpress============================
    const [value, setValue] = React.useState('card');
    const [cinfo, setcinfo] = React.useState({});
    const [isUpdateCard, setisUpdateCard] = React.useState(false);
        
    const showAlert = (type, title, msg) => {
        Toast.show({
          type: type,
          title: title,
          textBody: msg,
        });
      };
        const onMethodSelected = (method) => {
            const { CardType, isCVCUpdated, isDateUpdated, isNameUpdated, isNumberUpdated } = cinfo;
            if (isNumberUpdated) {
                navigation.navigate("BookingSummary")
            } else {
            showAlert(ALERT_TYPE.WARNING, "Oops!", "Please fill all the card fields");
            }
           };
         const dispatch = useDispatch();
        const handleCardDetails = (card) => {
            setcinfo(card);
          dispatch({
            type: "ON_UPDATE_CARD",
             payload:card,
          });

           };
 
      
            const handleBackPress=()=>{
                
                navigation.navigate("Home") 
                return true
            
            }
            useEffect(() => {
                if(value==="insurance"){
                    showAlert(ALERT_TYPE.WARNING, "Oops, sorry!", "Insurance payment is coming soon. Please use card.");
                    setValue("card")
                }
            }, [value])
            useEffect(() => {
            }, [isUpdateCard])
            useEffect(() => {

                BackHandler.addEventListener('hardwareBackPress',handleBackPress);
            }, [])
            useEffect(() => {
            
                BackHandler.addEventListener('hardwareBackPress',handleBackPress);
                return()=>{
                    BackHandler.removeEventListener('hardwareBackPress',handleBackPress);
                    
                }
            }, [])
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
            <View style={{backgroundColor:COLORS.white,  height:SIZES.height,paddingTop:20}}  >

                <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={20} ph={20} bg="transparent" br={0} mv={0} mh={0}>
                <ViewAtom fd="row" jc="flex-start" ai="center" w="70%" bg="transparent"  pv={5}br={0} mv={0} mh={0}
               
                >
              
                <Feather name="chevron-left" size={SIZES.h1}     color={COLORS.primary}  onPress={()=> {navigation.navigate("BookingThree")}}/>

            <TextAtom text="Booking Appointments" c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>

                </ViewAtom>
      
                      <TextAtom text="Step 4/4" c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>
            <TextAtom text="Pick payment Option" c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>
                </ViewAtom>



                <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={5} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                                
                    <CreditCard isUpdateCard={isUpdateCard} handleCardDetails={handleCardDetails} />

                    <ViewAtom fd="row" jc="space-between" ai="flex-start" w="100%" pv={5} ph={0} bg="transparent" br={0} mv={0} mh={0}>
             
                    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                        <View>
                        <ViewAtom fd="row" jc="flex-start" ai="center" w="100%" pv={10} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                        <RadioButton  value="card" status={value === 'card' ? 'checked' : 'unchecked'} uncheckedColor={COLORS.gray2} color={COLORS.primary} />
             <TextAtom text="Credit Card/Debit card" c={COLORS.black} f="Poppins" s={SIZES.body4}w="700"/>

                        </ViewAtom>
                        <ViewAtom w="100%" pv={.2} ph={0} bg={COLORS.gray} br={0} mv={15} mh={0}>              
                </ViewAtom>
                        <ViewAtom fd="row" jc="flex-start" ai="center" w="100%" pv={10} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                 
                    <RadioButton  value="insurance" status={value === 'insurance' ? 'checked' : 'unchecked'} uncheckedColor={COLORS.gray2} color={COLORS.primary} />
             <TextAtom text="Insurance" c={COLORS.gray2} f="Poppins" s={SIZES.body4} w="700"/>
                    

                        </ViewAtom>
                        </View>
                       
                        
                    </RadioButton.Group>
               
                    <ViewAtom fd="column" jc="center" ai="flex-end" w="40%" pv={10} ph={5} bg="transparent" br={0} mv={0} mh={0}>
                <TextAtom text="Update card details" c={COLORS.gray2} f="Poppins" s={SIZES.body5} w="500"/>

                    <Switch
                        value={isUpdateCard}
                            onValueChange={value => setisUpdateCard(value)}
                            trackColor={{ false: '#767577', true:COLORS.primary }}
                            thumbColor={isUpdateCard? COLORS.white : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            />
                </ViewAtom>
                    </ViewAtom>
                  
              

                    <ViewAtom  ai="center" w="100%" pv={30} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                    <Button text={"Next"}width="90%"bg={COLORS.primary}  borderRadius={7} screen="BookingSummary"  onMethodSelected={onMethodSelected}/>
                       
                    </ViewAtom>



                </ViewAtom>
                {/* <Appointments/> */}
               
             {/* <View style={{position:"absolute", width:"100%",bottom:0, backgroundColor:COLORS.gray }}>
            <BottomTabs navigation={navigation}/>
             </View> */}
            </View>
            )
}
export default BookingFour
 
const styles = StyleSheet.create({
   
  });
  
  
  
  