import React ,{useState,useEffect}from 'react';
import {StyleSheet,Image ,View,Text,ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { COLORS, SIZES } from '../../constants/theme';
import  TextAtom  from '../Atoms/TextAtom';
import ViewAtom from '../Atoms/ViewAtom';
import { image_Diagnosis, image_dr2, image_Pharmacist } from '../../constants/images';
import CardAtom from '../Atoms/CardAtom';
import Modal from "react-native-modal";
import { Rating, AirbnbRating } from 'react-native-ratings';

const Appointments=({appointment,key,past})=>{
  const [modal , setModal]=useState(false)
  const [R , setR]=useState(3)
   
    const  ratingCompleted=(rating) =>{
      setR(rating)
        console.log("Rating is: " + rating)
      }
 
      
    
        const MyComponent=()=>{
          return(
            <View key={key}>

            <ViewAtom fd="column" jc="center" ai="center" w="100%" pv={4} ph={20} bg="transparent" br={0} mv={0} mh={0}>

                    
                  
                

            <CardAtom fd="row" jc="space-between" ai="center" w="99%" pv={5} ph={5} bg={COLORS.white} br={5} mv={0} mh={0}
            el={3} sh='#525252' 
            >


            <CardAtom fd="row" jc="space-between" ai="center" w={3} pv={50} ph={0} bg={COLORS.primary} br={5} mv={0} mh={0}
            el={3} sh='#525252' >
            </CardAtom>
            <ViewAtom fd="column" jc="center" ai="center" w="100%" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>



            <ViewAtom  fd="row" jc="space-between" ai="flex-start" w="100%" pv={3} ph={10} bg="transparent" br={0} mv={0} mh={0}>

            <View>
            <TextAtom text="Appointment date" c={COLORS.gray2} f="Poppins" s={SIZES.body5} w="500"/>

            <ViewAtom fd="row" jc="flex-start" ai="center" w="100%" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                <Feather name="clock" size={SIZES.font}   color={COLORS.primary}/>
                <TextAtom text={`  ${appointment.Schedule.day.slice(0,3)}, ${appointment.Schedule.date} ${appointment.Schedule.month} ${appointment.TimeShift[0].s_time}`} c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>
            </ViewAtom>
            </View>

            <Feather name="more-vertical" size={SIZES.font}   color={COLORS.primary}/>
            </ViewAtom>

            <ViewAtom fd="row" jc="flex-start" ai="center" w="100%" pv={3} ph={10} bg={COLORS.white}  br={0}  mv={0} mh={0} >
            <ViewAtom fd="column" jc="center" ai="center" w="20%" pv={5} ph={10} bg={COLORS.white}  br={50}  mv={0} mh={0} >
                <Image style={styles.userImg}  source={{ uri: appointment.SelectedDoctor.img }} />
            </ViewAtom>
                <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="60%" pv={3} ph={10} bg={COLORS.white}  br={0}  mv={0} mh={0} >
                <TextAtom text={`Dr. ${appointment.SelectedDoctor.name}`} c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>
                <ViewAtom  bg={COLORS.primaryShade} pv={3} ph={5} br={5}  mv={0} mh={0} >
                <TextAtom text={appointment.SelectedDoctor.doctor.type} c={COLORS.white} f="Poppins" s={SIZES.base} w="500"/>
                </ViewAtom>
                </ViewAtom>
            </ViewAtom>
            </ViewAtom>


            </CardAtom>






          
        </ViewAtom>
            </View>
          )
        }
        return(

        <>
     { past? 
     <TouchableWithoutFeedback onPress={()=>{setModal(true)}}>
      <View>
      <MyComponent/>
      </View>
        

     </TouchableWithoutFeedback>
        :
         <MyComponent/>
        }
      
      <Modal isVisible={modal}>
        <View style={{alignItems:"center",justifyContent:"center",flexDirection:"column",position:"relative"}}>

      <CardAtom  ai="center" w="100%" pv={10} ph={10} bg={COLORS.white} br={5} mv={0} mh={0}
         el={3} sh='#525252' >
         <TextAtom text={`Rate Dr. ${appointment.SelectedDoctor.name}`} c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>

                  <Rating
                  type='star'
                  ratingCount={5}
                  imageSize={20}
                  showRating
              
                  onFinishRating={ratingCompleted}
                  ratingColor={COLORS.black}
            ratingBackgroundColor={COLORS.black}
                />
                          <AirbnbRating
                      reviews={["Bad", "OK", "Good",  "Wow", "Amazing", ]}
                      defaultRating={R}
                      size={1}
                    />
          <View style={{position:"absolute", right:15,top:10}}>
          <Feather name="x-square" size={SIZES.h3}   color={COLORS.primary} onPress={()=>{setModal(false)}}/>

            </View> 
         </CardAtom>

        </View>
        
   
      </Modal>
        </>

        )
      }
      
export default Appointments

const styles = StyleSheet.create({
 
       
    userImg: {
     height: 50,
     width: 50,
     borderRadius: 50,
     backgroundColor:COLORS.white
   },

 
});