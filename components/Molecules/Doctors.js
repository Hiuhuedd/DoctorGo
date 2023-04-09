import React ,{useState,useEffect}from 'react';
import {StyleSheet,Image ,View,Text,ScrollView, TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { COLORS, SIZES } from '../../constants/theme';
import  TextAtom  from '../Atoms/TextAtom';
import ViewAtom from '../Atoms/ViewAtom';
import { image_Diagnosis, image_dr2, image_Pharmacist } from '../../constants/images';
import CardAtom from '../Atoms/CardAtom';

const Doctors=({doctorsArr,handleSetDoctor})=>{
    const [SDoc,setSDoc]=useState()
    const handleDoctor=(d)=>{
        handleSetDoctor(d)
      setSDoc(d)
  }
    const [loaded] = useFonts({
        Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
        Poppins1: require('../../assets/fonts/Poppins-Black.ttf'),
        Roboto: require('../../assets/fonts/Roboto-Regular.ttf'),
        Lob: require('../../assets/fonts/Lobster-Regular.ttf')
                  });
      
      
      if (!loaded) {
        return <AppLoading/>
      }
      const icon =<Feather name="star" size={SIZES.icon}   color={COLORS.primary}/>
      return(

       doctorsArr.map((doctor)=>{

     
            if(SDoc===doctor.id){
            return(    <>
                <TouchableWithoutFeedback onPress={()=>handleDoctor(doctor.id)}>
              <View>

             <ViewAtom fd="column" jc="center" ai="center" w="100%" pv={5} ph={15} bg="transparent" br={0} mv={0} mh={0}>
                  <CardAtom fd="row" jc="space-between" ai="center" w="99%" pv={5} ph={5} bg={COLORS.primary} br={5} mv={5} mh={0}
                 el={3} sh='#525252' 
                 >
      
      
                 <CardAtom fd="row" jc="space-between" ai="center" w={3} pv={50} ph={0} bg={COLORS.white} br={5} mv={0} mh={0}
                 el={3} sh='#525252' >
                 </CardAtom>
                 <ViewAtom fd="column" jc="center" ai="center" w="100%" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
      
          
      
                 <ViewAtom  fd="row" jc="space-between" ai="flex-start" w="100%" pv={3} ph={10} bg="transparent" br={0} mv={0} mh={0}>
      
                 <View>
                 <TextAtom text="Shift" c={COLORS.gray4} f="Poppins" s={SIZES.body5} w="500"/>
      
                 <ViewAtom fd="row" jc="flex-start" ai="center" w="100%" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                     <Feather name="clock" size={SIZES.font}   color={COLORS.white}/>
                     <TextAtom text={`  Wed Jun 20 - ${doctor.shift}`} c={COLORS.white} f="Poppins" s={SIZES.h5} w="500"/>
                  </ViewAtom>
                 </View>
      
                 <Feather name="more-vertical" size={SIZES.font}   color={COLORS.white}/>
                 </ViewAtom>
      
                  <ViewAtom fd="row" jc="flex-start" ai="center" w="100%" pv={3} ph={10} bg={COLORS.primary}  br={0}  mv={0} mh={0} >
                 <ViewAtom fd="column" jc="center" ai="center" w="20%" pv={5} ph={10} bg={COLORS.white}  br={50}  mv={0} mh={0} >
                 <Image style={styles.userImg} source={{ uri: doctor.img }} />
                   </ViewAtom>
                     <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="60%" pv={3} ph={10} bg={COLORS.primary}  br={0}  mv={0} mh={0} >
                    
                     <ViewAtom fd="row" jc="space-between" ai="center" w="80%" pv={0} ph={0} bg={COLORS.primary}  br={0}  mv={0} mh={0} >
                     <TextAtom text={doctor.name} c={COLORS.white} f="Poppins" s={SIZES.h5} w="500"/>
                     <TextAtom text={doctor.rating} c={COLORS.gray4} f="Poppins" s={SIZES.body5} w="500"/>
                     </ViewAtom>
                     
                     <ViewAtom  bg={COLORS.primaryShade} pv={3} ph={5} br={5}  mv={0} mh={0} >
                        <TextAtom text={doctor.doctor.type} c={COLORS.black} f="Poppins" s={SIZES.base} w="500"/>
                        <TextAtom text={`Rate Ksh ${doctor.rate}/=`} c={COLORS.black} f="Poppins" s={SIZES.base} w="500"/>
                     </ViewAtom>
                    
                     </ViewAtom>
                 </ViewAtom>
                 </ViewAtom>
      
      
                 </CardAtom>
      
      
      
      
      
      
               
             </ViewAtom>
              </View>
                </TouchableWithoutFeedback>
           
             </>)
            }else{
           return(     <>
            <TouchableWithoutFeedback onPress={()=>handleDoctor(doctor.id)}>
              <View>
             <ViewAtom fd="column" jc="center" ai="center" w="100%" pv={5} ph={15} bg="transparent" br={0} mv={0} mh={0}>
                  <CardAtom fd="row" jc="space-between" ai="center" w="99%" pv={5} ph={5} bg={COLORS.white} br={5} mv={5} mh={0}
                 el={3} sh='#525252' 
                 >
      
      
                 <CardAtom fd="row" jc="space-between" ai="center" w={3} pv={50} ph={0} bg={COLORS.primary} br={5} mv={0} mh={0}
                 el={3} sh='#525252' >
                 </CardAtom>
                 <ViewAtom fd="column" jc="center" ai="center" w="100%" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
      
          
      
                 <ViewAtom  fd="row" jc="space-between" ai="flex-start" w="100%" pv={3} ph={10} bg="transparent" br={0} mv={0} mh={0}>
      
                 <View>
                 <TextAtom text="Shift" c={COLORS.gray2} f="Poppins" s={SIZES.body5} w="500"/>
      
                 <ViewAtom fd="row" jc="flex-start" ai="center" w="100%" pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                     <Feather name="clock" size={SIZES.font}   color={COLORS.primary}/>
                     <TextAtom text={`  Wed Jun 20 - ${doctor.shift}`} c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>
                  </ViewAtom>
                 </View>
      
                 <Feather name="more-vertical" size={SIZES.font}   color={COLORS.primary}/>
                 </ViewAtom>
      
                  <ViewAtom fd="row" jc="flex-start" ai="center" w="100%" pv={3} ph={10} bg={COLORS.white}  br={0}  mv={0} mh={0} >
                 <ViewAtom fd="column" jc="center" ai="center" w="20%" pv={5} ph={10} bg={COLORS.white}  br={50}  mv={0} mh={0} >
                 <Image style={styles.userImg} source={{ uri: doctor.img }} />
                   </ViewAtom>
                     <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="60%" pv={3} ph={10} bg={COLORS.white}  br={0}  mv={0} mh={0} >
                    
                     <ViewAtom fd="row" jc="space-between" ai="center" w="80%" pv={0} ph={0} bg={COLORS.white}  br={0}  mv={0} mh={0} >
                     <TextAtom text={doctor.name} c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>
                     <TextAtom text={doctor.rating} c={COLORS.gray2} f="Poppins" s={SIZES.body5} w="500"/>
                     </ViewAtom>
                     <ViewAtom  bg={COLORS.primaryShade} pv={3} ph={5} br={5}  mv={0} mh={0} >
                        <TextAtom text={doctor.doctor.type} c={COLORS.black} f="Poppins" s={SIZES.base} w="500"/>
                     </ViewAtom>
                     </ViewAtom>
                 </ViewAtom>
                 </ViewAtom>
      
      
                 </CardAtom>
      
      
      
      
      
      
               
             </ViewAtom>

              </View>
                </TouchableWithoutFeedback>
           
             </>)
            }
         
        

       })
    
      )

}
export default Doctors

const styles = StyleSheet.create({
 
       
    userImg: {
     height: 50,
     width: 50,
     borderRadius: 50,
     backgroundColor:COLORS.white
   },

 
});