import React ,{useState,useEffect, useCallback}from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions,Image , Platform,BackHandler,Switch, ActivityIndicator } from 'react-native';
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
import Doctors from '../components/Molecules/Doctors';
import { useDispatch } from 'react-redux';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getPastAppointments, getUpcomingAppointments, handleAppointmentsRetrieval } from '../utils/helper';
import TaskList from '../components/Molecules/task-list';
const {COLORS, SIZES, FONTS}=appTheme


const AppointmentsScreen= ({navigation}) =>{
 
  const [data, setData] = useState([])

  useEffect(() => {
    setTimeout(async() => {
        // Retrieve existing data from AsyncStorage
        const data=await AsyncStorage.getItem('Appointments')
        const existingData = data ? JSON.parse(data) : false;
        if(existingData){
          const arr=Object.entries(existingData).map(apt=>{
            return apt[1]
          })
       
            setData(arr.slice(0,2));
        }

    }, 20);
    
  }, []);


  const handleToggleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done
      }
      return newData
    })
  }, [])
 
  const handlePressTaskItemLabel = useCallback(item => {
    
  }, [])
  const handleRemoveItem = useCallback(item => {
    console.log(item);
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      return newData
    })
  
  }, [])
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
  
        const [past, setpast]=useState(false)
        const dispatch = useDispatch();
        const showAlert = (type, title, msg) => {
            Toast.show({
              type: type,
              title: title,
              textBody: msg,
            });
          };
          const onMethodSelected = (method) => {
           
          };
  
 
     
       

            return(
            <View style={{backgroundColor:COLORS.white,  height:SIZES.height,paddingTop:20}}  >

                <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={20} ph={20} bg="transparent" br={0} mv={0} mh={0}>


                <ViewAtom fd="row" jc="flex-start" ai="center" w="70%" bg="transparent"  pv={5}br={0} mv={0} mh={0} >
                 <TextAtom text="Schedule" c={COLORS.black} f="Poppins" s={SIZES.h2} w="600"/>
                </ViewAtom>

                <ViewAtom  jc="center" ai="center" w="100%" bg="transparent" pv={0} ph={0}  mv={0} mh={0} >

                <ViewAtom fd="row" jc="space-around" ai="center" w="100%" bg={COLORS.gray} pv={4} ph={3} br={20} mv={0} mh={0} >
                    <TouchableOpacity onPress={()=>{setpast(!past)}}  style={{width:"45%"}} >
                <ViewAtom fd="row" jc="center" ai="center" w="100%" bg={past?COLORS.gray:COLORS.primary} pv={7} ph={3} br={20} mv={0} mh={0} >
                 <TextAtom text="Upcoming" c={past?COLORS.black:COLORS.white} f="Poppins" s={SIZES.h5} w="600"/>
                </ViewAtom>

                    </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setpast(!past)}} style={{width:"45%"}} >
                <ViewAtom fd="row" jc="center" ai="center" w="100%" bg={!past?COLORS.gray:COLORS.primary} pv={7} ph={3} br={20} mv={0} mh={0} >
                 <TextAtom text="Past"  c={!past?COLORS.black:COLORS.white} f="Poppins" s={SIZES.h5} w="600"/>
                </ViewAtom>

                </TouchableOpacity>
                </ViewAtom>
               

                </ViewAtom>

                                
                               
                </ViewAtom>
                <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={5} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                                
                    <ScrollView style={{height:SIZES.height-150,width:"100%"}}>
            
                      
                  
              { data.length>0?
              <TaskList
              data={data}
              onToggleItem={handleToggleTaskItem}
              onPressLabel={handlePressTaskItemLabel}
              onRemoveItem={handleRemoveItem}
            />
              :
              <ViewAtom fd="column" jc="center" ai="center" w="100%" pv={20} ph={20} bg="transparent" br={0} mv={0} mh={0}>

                <ActivityIndicator size="small" color={COLORS.primaryShade} />
              </ViewAtom>
                 
                }
             
                    </ScrollView>
            

             

              

                    {/* <ViewAtom  ai="center" w="100%" pv={30} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                    <Button text={"Next"}width="90%"bg={COLORS.primary}  borderRadius={7} screen="BookingFour"  onMethodSelected={onMethodSelected}/>
                       
                    </ViewAtom> */}



                </ViewAtom>
                {/* <Appointments/> */}
               
             <View style={{position:"absolute", width:"100%",bottom:0, backgroundColor:COLORS.gray }}>
            <BottomTabs navigation={navigation}/>
             </View>
            </View>
            )
}
export default AppointmentsScreen
 
const styles = StyleSheet.create({
   
  });
  
  
  
  