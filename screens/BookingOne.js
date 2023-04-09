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
import MedicalSpecialistDropdown from '../components/Molecules/MedicalSpecialistDropdown';
import { useDispatch } from 'react-redux';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const {COLORS, SIZES, FONTS}=appTheme


const BookingOne= ({navigation}) =>{
    
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

     
    //==============================PAGE STATE============================
    const [Visit, setVisit] = useState(false);
    const [Video, setVideo] = useState(false);
    const [Phone, setPhone] = useState(false);
  
        const [ConsultationArray, setConsultationArray] = useState([]);
        const [doctor,setdoctor]=useState("")
        const [Specialist,setSpecialist]=useState("")
        const [time,settime]=useState("Anytime")
        const active={c:COLORS.primary,tc:COLORS.white}
        const inactive={c:COLORS.white,tc:COLORS.black}
        const buttonColor1=doctor==="General"?active:inactive
        const buttonColor2=doctor==="General"?inactive:active
        const buttonColor3=time==="Now"?active:inactive
        const buttonColor4=time==="Now"?inactive:active
        const iconsAndTitles = [
            {
              icon: "smile",
              title: 'Visit',
              name: 'Visit',
              value: Visit,
            },
            {
              icon: "video",
              title: 'Video call',
              name: 'Video',
              value: Video,
            },
            {
              icon: "phone",
              title: 'Phone',
              name: 'Phone',
              value: Phone,
            },
          ];
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
          }else if (doctor ==="") {
            showAlert(ALERT_TYPE.WARNING, "Oops!", "Please select your doctor");
          }  
          else{
            if(time==="Now"){
              navigation.navigate("BookingThree")

            }else{
              navigation.navigate("BookingTwo")

            }
          }
        };

          
          
          //==============================PAGE DISPATCH============================
          const dispatch = useDispatch();
          const   handleSetDoctor=(d)=>{
              setdoctor(d)
              if(d==="General"){
                  dispatch({
                    type: "SELECT_DOCTOR",
                     payload:{doctor:"General",type:"General Doctor"},
                   
                  });

              }
          }
          const   handleSetTime=(t)=>{
              settime(t)
              dispatch({
                type: "SELECT_APPOINTMENT_TIME",
                payload: time,
              });
          }
          const   handleSetSpecialist=(s)=>{
            if(doctor==="Specialist"){
                dispatch({
                  type: "SELECT_DOCTOR",
                  payload: {doctor:doctor,type:s},
                });

            }

              setSpecialist(s)
          }
          const handleToggle = (Value,data) => {
            if(data==="Video"){
                if(Value){        
                    setConsultationArray([...ConsultationArray, data]);
                    setVideo(Value);
                }else{
                    setConsultationArray(ConsultationArray.filter((element) => element !== data));
                    setVideo(Value);
                }
            }
            if(data==="Visit"){
                if(Value){        
                    setConsultationArray([...ConsultationArray, data]);
                    setVisit(Value);
                }else{
                    setConsultationArray(ConsultationArray.filter((element) => element !== data));
                    setVisit(Value);
                }
            }
            if(data==="Phone"){
                if(Value){        
                    setConsultationArray([...ConsultationArray, data]);
                    setPhone(Value);
                }else{
                    setConsultationArray(ConsultationArray.filter((element) => element !== data));
                    setPhone(Value);
                }
            }
          }
        useEffect(() => {
            dispatch({
                type: "SELECT_CONSULTATION_METHOD",
                payload:ConsultationArray,
              });
        
        }, [Visit,Video,Phone])
        
              
  
             
            return(
            <View style={{backgroundColor:COLORS.white, height:SIZES.height,paddingTop:20}}  >

                <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={20} ph={20} bg="transparent" br={0} mv={0} mh={0}>
                <ViewAtom fd="row" jc="flex-start" ai="center" w="70%" bg="transparent"  pv={10}br={0} mv={0} mh={0}
               
                >
              
                                 <Feather name="chevron-left" size={SIZES.h1}     color={COLORS.primary}  onPress={()=> {navigation.navigate("Home"); }}/>

                                <TextAtom text="Booking Appointments" c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>

                </ViewAtom>

                                <TextAtom text="Step 1/4" c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>
                                
                               
                </ViewAtom>
                <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={10} ph={20} bg="transparent" br={0} mv={0} mh={0}>
                                
                <TextAtom text="Select Preferred Doctor" c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/>

                <ViewAtom fd="row" jc="space-between" ai="flex-start" w="55%" pv={10} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                <Button text={"General"}width={80}bg={buttonColor1.c} tc={buttonColor1.tc}  onMethodSelected={handleSetDoctor} borderRadius={30} s={SIZES.h5} pv={5} ph={1} />
                <Button text={"Specialist"}width={80} bg={buttonColor2.c} tc={buttonColor2.tc}   onMethodSelected={handleSetDoctor} borderRadius={30} s={SIZES.h5} pv={5} ph={1}  />
                </ViewAtom>
               {doctor==="Specialist"&& <MedicalSpecialistDropdown handleSetSpecialist={handleSetSpecialist} />}

                <ViewAtom w="100%" pv={.2} ph={0} bg={COLORS.gray} br={0} mv={15} mh={0}>              
                </ViewAtom>

                <TextAtom text="Appointment Time" c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/>

                <ViewAtom fd="row" jc="space-between" ai="flex-start" w="55%" pv={10} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                <Button text={"Now"}width={80}  bg={buttonColor3.c} tc={buttonColor3.tc}     onMethodSelected={handleSetTime} borderRadius={30} s={SIZES.h5} pv={5} ph={1} />
                <Button text={"Anytime"}width={80} bg={buttonColor4.c} tc={buttonColor4.tc}   onMethodSelected={handleSetTime} borderRadius={30} s={SIZES.h5} pv={5} ph={1}  />
                </ViewAtom>

                <ViewAtom w="100%" pv={.2} ph={0} bg={COLORS.gray} br={0} mv={15} mh={0}>              
                </ViewAtom>

                    <TextAtom text="Preferred Consultation Method" c={COLORS.black} f="Poppins" s={SIZES.h5}w="500"/>
    

                {iconsAndTitles.map((item, index) => (
                <ViewAtom key={index} fd="row" jc="space-between" ai="center" w="100%" pv={15} ph={5} bg="transparent" br={0} mv={0} mh={0}>
                    <ViewAtom fd="row" ai="center" w="33%" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                    <ViewAtom fd="row" jc="space-between" ai="flex-start" pv={15} ph={15}   bg={COLORS.primaryShade} br={50} mv={0} mh={5} >
                        <Feather name={item.icon} size={SIZES.h5} color={COLORS.white} />
                    </ViewAtom>
                    <TextAtom text={`    ${item.title}`} c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/>
                    </ViewAtom>
                    <Switch
                    value={item.value}
                    onValueChange={(newValue) => handleToggle(newValue, item.name)}
                    trackColor={{ false: '#767577', true: COLORS.primary }}
                    thumbColor={item.value ? COLORS.white : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    />
                </ViewAtom>
                ))}

                    <ViewAtom  ai="center" w="100%" pv={30} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                    <Button text={"Next"}width="100%"bg={COLORS.primary}  borderRadius={7} screen="BookingTwo"  onMethodSelected={onMethodSelected}/>
                       
                    </ViewAtom>



                </ViewAtom>
                {/* <Appointments/> */}
               
             {/* <View style={{position:"absolute", width:"100%",bottom:0, backgroundColor:COLORS.gray }}>
            <BottomTabs navigation={navigation}/>
             </View> */}
            </View>
            )
}
export default BookingOne
 
const styles = StyleSheet.create({
  
  });
  
  
  
  