import React ,{useState,useEffect}from 'react';
import { View, Text, StyleSheet, Dimensions,Image ,ImageBackground, Platfor,BackHandler, TouchableOpacity,ActivityIndicator} from 'react-native';
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
import { greet } from '../utils/helper';

import AsyncStorage from '@react-native-async-storage/async-storage'
const {COLORS, SIZES, FONTS}=appTheme

const Home= ({navigation}) =>{
 const [ap,setap]=useState([])
 const [localStorageData,setLocal]=useState([])

  useEffect(() => {
    AsyncStorage.getItem('Appointments').then((data) => {
      // Parse the existing data from a string to a JavaScript object
      if(data){
        const existingData =  JSON.parse(data);
        const apList =Object.entries(existingData)
        setTimeout(() => {
          setap(apList);
        }, 2000);
      }

});
  }, []);

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
            <View style={{backgroundColor:COLORS.white, height:"100%" }}  >

                <ImageBackground source={require('../assets/dr.jpg')} style={{width: '100%',height:200,marginBottom:30 }} resizeMode="cover" >
                        <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={40} ph={20} bg="transparent" br={0} mv={0} mh={0}>
                      
                        <ViewAtom fd="column" jc="center" ai="center"   pv={10} ph={10} bg={COLORS.primaryShade}  br={50}  mv={0} mh={0} >
                              <Feather name="bell" size={SIZES.font}   color={COLORS.black}/>
                        </ViewAtom>

                        <ViewAtom fd="column" jc="flex-start" ai="flex-start" pv={10} ph={0} bg="transparent"  br={0}  mv={0} mh={0} >
                            <TextAtom text={greet()} c={COLORS.gray2} f="Poppins" s={SIZES.h4} w="500"/>

                              <TextAtom text="Hiuhu" c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>
                        </ViewAtom>
                              
                    
                      

                                <View style={{ position:"relative", marginTop:30}}>
                                <ViewAtom fd="column" jc="center" ai="center"   pv={12} ph={40} bg={COLORS.primaryShade}  br={5}  mv={0} mh={0} >
                                  <TextAtom text="Urgent care" c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/>
                                </ViewAtom>
                              
                                <Image style={styles.userImg2}  source={require("../assets/ambulance-lights.png")}/>
                                </View>

                        </ViewAtom>
                </ImageBackground>
                <EcareServices/>
                <ViewAtom fd="row" jc="space-between" ai="center" w="100%" pv={0} ph={20} bg="transparent" br={0} mv={0} mh={0}>

                                <TextAtom text="My appointments" c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>
                                <TouchableOpacity onPress={()=>{navigation.navigate("Appointments")}}>

                                <TextAtom text="See all" c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>
                                </TouchableOpacity>
                </ViewAtom>
                <ViewAtom   ai="center" w="100%" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>

             {  ap.length>0?
              <Appointments Appointment={ap.slice(0,2).reverse()}/>:  
              <ViewAtom   ai="center" w="100%" pv={0} ph={0} bg="transparent" br={0} mv={20} mh={0}>
                <Image source={require('../assets/no.gif')} style={styles.deliveryIcon} /> 
                <TextAtom text="Tap the plus icon to get started" c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>
              </ViewAtom>


                
                }
                </ViewAtom>
            
             <View style={{position:"absolute", width:"100%",bottom:0, backgroundColor:COLORS.gray }}>

            {/* <Divider/> */}
            <BottomTabs navigation={navigation}/>
             </View>
            </View>
            )
}
export default Home
 
const styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
      height:100,
      width:100,
    },
    circleBg: {
        alignItems: 'center',
        alignContent:"center",
        display:"flex",
        justifyContent: 'center',  
        backgroundColor:COLORS.primary,
        borderRadius:50,
        padding:10, 
        maxHeight:40,
        maxWidth:40,
       
      },
    circleBg: {
        alignItems: 'center',
        alignContent:"center",
        display:"flex",
        justifyContent: 'center',  
        backgroundColor:COLORS.gray,
        borderRadius:50,
        padding:10, 
        maxHeight:40,
        maxWidth:40,
       
      },
    circleBg2: {
        alignItems: 'center',
        alignContent:"center",
        display:"flex",
        justifyContent: 'center',  
        backgroundColor:COLORS.primary,
        borderRadius:50,
        padding:8, 
        maxHeight:30,
        maxWidth:30,
        marginTop:10,
        elevation: 19,
        shadowColor: '#525252',
      },
      text: {
        fontSize: SIZES.largeTitle,
        color:COLORS.black,
        marginTop:7,
        textTransform:"capitalize",
        fontFamily:"Poppins",
        fontWeight:"900",
        
    },

      text2: {
      fontSize: SIZES.h3,
      color:COLORS.black,
      fontFamily:"Poppins",

    },
    text_: {
        fontSize: SIZES.h4,
        color:COLORS.primary,
        fontFamily:"Poppins",
        // marginVertical:10,
        textTransform:"capitalize",
      },
    text___: {
        fontSize: SIZES.h5,
        color:COLORS.primary,
        fontFamily:"Poppins",
        textTransform:"capitalize",
      },

      pickerOption: {
        alignItems: 'center',
        alignContent:"center",
        display:"flex",
        width:'100%',
        flexDirection:"row",
        justifyContent: 'space-between',  
        borderRadius:5,
        alignSelf: 'center',
        textAlign:"center",
        padding:10
      },
  Option: {
        alignItems: 'center',
        alignContent:"center",
        display:"flex",
        flexDirection:"column",
        justifyContent: 'center',  
      },

   
      text__: {
        fontSize: SIZES.body5,
        color:COLORS.gray2,
        marginVertical:5,
        textTransform:"capitalize"
      },
     
       
       userImg: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor:COLORS.white
      },
       userImg2: {
        height: 20,
        width: 20,
        position:"absolute",
        top:10,
        left:10,
         backgroundColor:"transparent"
      },
      aptCard:{
        width: '90%',
        padding:5,
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:COLORS.white,
        borderRadius:5,
        elevation: 5,
        shadowColor: '#525252',
        display:"flex",
        marginTop:8
        // alignItems:"center",
        // justifyContent:"center"


      },
      card:{
        width: '100%',
        justifyContent:"space-between",
        display:"flex",
        flexDirection:"column"
        // alignItems:"center",
        // justifyContent:"center"


      },
      topcard:{
        width: '100%',
        justifyContent:"space-between",
        display:"flex",
        flexDirection:"row",
        borderBottomColor:COLORS.gray,
        padding:3,
        paddingHorizontal:10,
        borderColor:COLORS.gray
        
    },
    bottom:{
        padding:3,
        paddingHorizontal:10,
        width: '100%',
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        // justifyContent:"center"


      },
 cardborder:{
        width: 3,
        height:"100%",
        backgroundColor:COLORS.primary,
        borderRadius:5,
        elevation: 5,
        shadowColor: '#525252',
    
      },
      deliveryIcon:{
        width:"50%",
        height: "45%",
        marginRight:15,
        marginTop:50
    },
    
  });
  
  
  
  