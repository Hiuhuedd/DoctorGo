import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ImageBackground, Platform, TextInput, BackHandler, Switch } from 'react-native';
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
import MedicalSpecialistDropdown from '../components/Molecules/MedicalSpecialistDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { Avatar } from '../constants/images';
import SwipeToDelete from '../components/Molecules/SwipeToDelete';
import AsyncStorage from '@react-native-async-storage/async-storage'

const { COLORS, SIZES, FONTS } = appTheme


const AccountScreen = ({ navigation }) => {
    const all = useSelector(state => state.userReducer.nearestclinic);
    console.log(all.name);
    //==============================Backpress============================
    const handleBackPress = () => {

        navigation.navigate("Home")
        return true

    }
    useEffect(() => {

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    }, [])
    useEffect(() => {

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);

        }
    }, [])


    //==============================PAGE STATE============================


    const [User,setUser]=useState(null)

    useEffect(() => {
      const getUser=async()=>{

          const value =  await AsyncStorage.getItem('drgo-user')
 
          if (value !== null) {
              const user=JSON.parse(value)
              const nameArray = user.name.split(" ");
                const lastName = nameArray[nameArray.length - 1];
                setUser({...user,lastName}) 
                console.log(User);
            }else{
                 setUser(null) 
                }
      }

      getUser()
  }, [])


    const [ConsultationArray, setConsultationArray] = useState([]);



    const showAlert = (type, title, msg) => {
        Toast.show({
            type: type,
            title: title,
            textBody: msg,
        });
    };

    const onMethodSelected = (method) => {
        if (ConsultationArray.length < 1) {
            showAlert(ALERT_TYPE.WARNING, "Oops!", "Please select your preferred consultation method");
        } else {
            navigation.navigate("Home")
        }
    };

    const settings = [
        { icon: 'activity', title: 'Medical Bio' },
        { icon: 'bell', title: 'Notifications' },
        { icon: 'clock', title: 'Order history' },
        { icon: 'settings', title: 'Privacy & Settings' },
        { icon: 'navigation', title: 'Shipping Address' },
    ];
    const [itemsArr,setItemsArr]=useState(settings)
    //==============================PAGE DISPATCH============================
    const dispatch = useDispatch();
    const handleRemove=(item)=>{
        const updatedSettings = settings.filter((setting) => setting !== item);
         setItemsArr(updatedSettings);
    }


    //==============================PAGE FONTS============================

 

    return (
        <View style={{ backgroundColor: "#FBFBFB",  height:SIZES.height, paddingTop: 20 }}  >

{/* 
           {itemsArr.map((item)=>{
            return(
                <SwipeToDelete item={item} onDelete={()=>handleRemove(item)}  />
            )
           })} */}

            <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={20} ph={20} bg="transparent" br={0} mv={0} mh={0}>
                <ViewAtom fd="row" jc="flex-start" ai="center" w="70%" bg="transparent" pv={10} br={0} mv={0} mh={0}

                >

                    <Feather name="chevron-left" size={SIZES.h1} color={COLORS.primary} onPress={() => { navigation.navigate("Home"); }} />

                    <TextAtom text="Profile" c={COLORS.black} f="Poppins" s={SIZES.h3} w="500" />

                </ViewAtom>

      


            </ViewAtom>
            <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={10} ph={20} bg="transparent" br={0} mv={0} mh={0}>


                <View style={{ position: "relative", width: "100%", alignItems: "center" }}>

                    <ViewAtom fd="column" ai="center" w="100%" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                        <View style={{ width: 150,height: 150, borderRadius:100,    borderWidth: 2, borderColor:COLORS.primaryShade,  }}>
                        <ViewAtom ai="center" jc="center" pv={3} ph={3} br={50} mv={20} mh={5} >
                        <Image source={User?{ uri: User.picture.data.url }:Avatar} style={{ width: 100, height: 100 }} resizeMode="cover" borderRadius={50} />

                     </ViewAtom>

                        </View>
                        <View style={{ position: "absolute", padding: 2, backgroundColor: COLORS.gray, bottom: 30, right: 90, borderRadius: 50 }} >
                            <ViewAtom ai="center" jc="center" pv={5} ph={5} bg={COLORS.primary} br={50} mv={0} mh={0} >
                                <Feather name="edit-3" size={SIZES.h5} color={COLORS.white} />
                            </ViewAtom>
                        </View>
                        <TextAtom text={User?.name} c={COLORS.black} f="Poppins" s={SIZES.h5} w="500" />
                    </ViewAtom>
                        <ViewAtom  fd="row"
                                jc="space-between"
                                ai="center"
                                pv={5}
                                ph={5}
                                bg={COLORS.primaryShade}
                                br={5}
                                mv={10}
                                mh={5}
                              
                            >
                             <Feather name="map-pin" size={SIZES.base} color={COLORS.white} />   
                             <TextAtom text={`  ${all.name}`}  c={COLORS.white} f="Poppins" s={SIZES.base} w="500" />

                        </ViewAtom>
                </View>





                <ViewAtom w="100%" pv={.3} ph={0} bg={COLORS.gray4} br={0} mv={15} mh={0}>
                </ViewAtom>

                {settings.map((setting, index) => (
                    <ViewAtom key={index} fd="row" jc="space-between" ai="center"w="100%" pv={15} ph={5}          bg="transparent"   br={0}   mv={0} mh={0}>
                        <ViewAtom fd="row" ai="center" w="40%" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
            <ViewAtom  fd="row" jc="space-between" ai="flex-start" pv={10}  ph={10}bg={COLORS.primaryShade} br={50}
                                mv={0} mh={5}     >
                                <Feather name={setting.icon} size={SIZES.h5} color={COLORS.white} />
                            </ViewAtom>
                            <TextAtom text={`     ${setting.title}`} c={COLORS.black} f="Poppins" s={SIZES.h5} w="500" />
                        </ViewAtom>
                        <Feather name="chevron-right" size={SIZES.h4} color={COLORS.primary} />
                    </ViewAtom>
                ))}
             


                <ViewAtom ai="center" w="40%" pv={30} ph={15} bg="transparent" br={0} mv={0} mh={0}>
                    <Button text={"Sign out"} width="100%" bg={COLORS.primary} borderRadius={7} screen="BookingTwo" onMethodSelected={onMethodSelected} />

                </ViewAtom>



            </ViewAtom>
            {/* <Appointments/> */}

            {/* <View style={{position:"absolute", width:"100%",bottom:0, backgroundColor:COLORS.gray }}>
            <BottomTabs navigation={navigation}/>
             </View> */}
        </View>
    )
}
export default AccountScreen

const styles = StyleSheet.create({
    userImg: {
        width: 50,
        height: 100,
        borderRadius: 50,
        // backgroundColor:COLORS.primary
    },

});



