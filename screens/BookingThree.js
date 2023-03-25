import React ,{useState,useEffect,useRef}from 'react';
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
import Calendar from '../components/Molecules/Calendar';
import TimeShiftFlatlist from '../components/Molecules/TimeShiftFlatlist';
import { useDispatch, useSelector } from 'react-redux';
import Doctors from '../components/Molecules/Doctors';
import DoctorDetailsBottomSheet from "../components/Molecules/DoctorDetailsBottomSheet"
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const {COLORS, SIZES, FONTS}=appTheme




const BookingThree= ({navigation}) =>{
  const t = useSelector(state => state.bookingReducer.TimeShift);
  const speci = useSelector(state => state.bookingReducer.Doctor);
 const [Filtered,setFiltered]=useState([])
    const { height } = Dimensions.get('window');
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
    useEffect(() => {
    
      DoctorArr.filter(d=>{return d.doctor.doctor.toLowerCase()===speci.doctor.toLowerCase()})
      const filteredAppointments = DoctorArr.filter(appointment => {
        return appointment.doctor.doctor.toLowerCase() === speci.doctor.toLowerCase() && appointment.doctor.type.toLowerCase() === speci.type.toLowerCase()
      });
      console.log(filteredAppointments);
      setFiltered(filteredAppointments)
    }, [])
  
              //==============================PAGE DATA============================
        const [doc, setdoc]=useState(null)
        const dispatch = useDispatch();
        const showAlert = (type, title, msg) => {
            Toast.show({
              type: type,
              title: title,
              textBody: msg,
            });
          };
          const onMethodSelected = (method) => {
            if (!doc) {
              showAlert(ALERT_TYPE.WARNING, "Oops!", "Please select your preferred doctor");
            }else{
              navigation.navigate("BookingFour")
            }
          };
  
 
           const DoctorArr=[
                        
                        {
                        id:1, 
                        name:"Janet Alisson",
                        doctor: {doctor:"specialist",
                                type:"Dentist",
                                },
                        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__340.jpg",
                        rating:4.5,
                        shift:"10:00 am"
                    }, 
                        {
                        id:2, 
                        name:"Janet Alisson",
                        doctor: {doctor:"specialist",
                                type:"Dermatologist",
                                },
                        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__340.jpg",
                        rating:4.5,
                        shift:"8:00 am"
                    }, 
                        {
                        id:2, 
                        name:"Janet Alisson",
                        doctor: {doctor:"specialist",
                                type:"neurologist",
                                },
                        img:"https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808__340.jpg",
                        rating:4.5,
                        shift:"2:00 pm"
                    }, 
                    {
                        id:4, 
                        name:"Sarah Brown",
                        doctor: {
                            doctor:"specialist",
                            type:"Pediatrician",
                        },
                        img:"https://images.unsplash.com/photo-1623854767276-5025b88735d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU2fHxkb2N0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                        rating:4,
                        shift:"11:00 am"
                    },
                    {
                        id:5, 
                        name:"Sarah Brown",
                        doctor: {
                            doctor:"general",
                            type:"General",
                        },
                        img:"https://images.unsplash.com/photo-1623854767276-5025b88735d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU2fHxkb2N0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                        rating:4,
                        shift:"9:00 am"
                    },
                    {
                        id:6, 
                        name:"Sarah Brown",
                        doctor: {
                            doctor:"specialist",
                            type:"Family Medicine",
                        },
                        img:"https://images.unsplash.com/photo-1623854767276-5025b88735d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU2fHxkb2N0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                        rating:4,
                        shift:"3:00 pm"
                    },
                    {
                        id:7, 
                        name:"John Smith",
                        doctor: {
                            doctor:"general",
                            type:"General",
                        },
                        img:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                        rating:4.5,
                        shift:"5:00 pm"
                    },
                    {
                        id:8, 
                        name:"John Smith",
                        doctor: {
                            doctor:"specialist",
                            type:"Endocrinologist",
                        },
                        img:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                        rating:4.5,
                        shift:"11:00 am"
                    },
                    {
                        id:9, 
                        name:"John Smith",
                        doctor: {
                            doctor:"specialist",
                            type:"Cardiologist",
                        },
                        img:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                        rating:4.5,
                        shift:"9:00 am"
                    },
                    {
                        id:10, 
                        name:"Maria Garcia",
                        doctor: {
                            doctor:"specialist",
                            type:"Dermatologist",
                        },
                        img:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9jdG9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
                        rating:3.5,
                        shift:"10:00 am"
                    },
                    {
                        id:11, 
                        name:"Maria Garcia",
                        doctor: {
                            doctor:"specialist",
                            type:"Pediatrician",
                        },
                        img:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9jdG9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
                        rating:3.5,
                        shift:"9:00 am"
                    },
                    {
                        id:12, 
                        name:"Maria Garcia",
                        doctor: {
                            doctor:"specialist",
                            type:"Dentist",
                        },
                        img:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9jdG9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
                        rating:5,
                        shift:"7:00 am"
                    },
                    {
                        id:13,
                        name: "Fred Hopkins",
                        doctor: {
                            doctor: "general",
                            type: "General"
                        },
                        img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                        rating:2,
                        shift: "9:00 am"
                    },
                    {
                        id:14,
                        name: "Emily Williams",
                        doctor: {
                            doctor: "specialist",
                            type: "Cardiologist"
                        },
                        img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                        rating: 2.5,
                        shift: "10:00 am"
                    },
                    {
                        id:15,
                        name: "Emily Williams",
                        doctor: {
                            doctor: "general",
                            type: "General"
                        },
                        img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                        rating: 2.5,
                        shift: "10:00 am"
                    },
                    {
                      id:12, 
                      name:"Maria Garcia",
                      doctor: {
                          doctor:"General",
                          type:"General",
                      },
                      img:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9jdG9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
                      rating:5,
                      shift:"7:00 am"
                  },
           ]
        const   handleSetDoctor=(d)=>{
           setdoc(DoctorArr[d-1])
           setTimeout(() => {
               openSheet() 
           }, 100);
         
        }


        //==============================BOTTOM SHEET============================
const closeSheet = (t) => {


    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
};
const onDoctorSelected = (method) => {
    dispatch({
            type: "SELECTED_DOCTOR",
             payload:doc,
          });

  closeSheet();

};
const sheetRef = useRef(null);  
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
                <ViewAtom fd="row" jc="flex-start" ai="center" w="70%" bg="transparent"  pv={5}br={0} mv={0} mh={0}
               
                >
              
                <Feather name="chevron-left" size={SIZES.h1}     color={COLORS.primary}  onPress={()=> {navigation.navigate("BookingTwo")}}/>

            <TextAtom text="Booking Appointments" c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>

                </ViewAtom>

                                
                               
                </ViewAtom>
                <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                                
                    <ScrollView style={{height:height-100}}>
                <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={0} ph={20} bg="transparent" br={0} mv={0} mh={0}>

                      <TextAtom text="Step 3/4" c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>
                </ViewAtom>
                        <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={0} ph={20} bg="transparent" br={0} mv={0} mh={0}>                        
                        <TextAtom text={`Select Your ${speci.type}`} c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>
                        </ViewAtom>
                  
               <Doctors doctorsArr={Filtered} handleSetDoctor={handleSetDoctor}/>
             
                    </ScrollView>
                    
                  { doc&& <DoctorDetailsBottomSheet  onMethodSelected={onDoctorSelected} navigation={navigation} doctor={doc} ref={sheetRef} />
                  }
                </ViewAtom>
                {/* <Appointments/> */}
               
             {/* <View style={{position:"absolute", width:"100%",bottom:0, backgroundColor:COLORS.gray }}>
            <BottomTabs navigation={navigation}/>
             </View> */}
            </View>
            )
}
export default BookingThree
 
const styles = StyleSheet.create({
   
  });
  
  
  
  