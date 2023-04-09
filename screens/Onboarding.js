import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text,View } from 'react-native';
// import { Svg, Circle } from 'react-native-svg';
import { Button } from '../components/Atoms/Button';
import TextAtom from '../components/Atoms/TextAtom';
import ViewAtom from '../components/Atoms/ViewAtom';
import { COLORS, SIZES } from '../constants/theme';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AnimatedParagraph from '../components/Molecules/AnimatedParagraph';
console.disableYellowBox = true;
const Onboarding = ({navigation}) => {

  const _onFinish = () => {
    // Alert.alert('Animation', 'It is done!');
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [title, settitle] = useState("Next");

  const handleNextStep = (t) => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);    
    }
    if (currentStep==3){
      settitle("Finish")
    }
    if (currentStep==4){
      AsyncStorage.setItem('onboardingComplete', 'true');
      navigation.navigate("MapView")
    }
  };
  const handlePrevStep = (t) => {
    if (currentStep >= 2) {
      setCurrentStep(currentStep - 1);
    }
    if (currentStep!==3) {
      settitle("Next")
    }
  };
  return (

    <View style={styles.container} >
 
      <View  style={styles.imgs}>
              <TouchableOpacity style={styles.skip} onPress={()=>{setCurrentStep(4);settitle("Finish")}}>
              <TextAtom text="Skip" c={COLORS.primary} f="Poppins" s={SIZES.body4} w="600"/>             
              <Feather name="arrow-right" size={SIZES.icon}     color={COLORS.primary}/>

              </TouchableOpacity>
     <ViewAtom fd="column" jc="center" ai="center" w="100%" pv={0} ph={5} bg="transparent" br={0} mv={0} mh={0}>
        <Image source={require('../assets/7.png')} style={styles.logoImg} />
        </ViewAtom>   

       {currentStep === 3 && <Image source={require('../assets/8.png')} style={styles.deliveryIcon} />}
       {currentStep === 2 && <Image source={require('../assets/9.png')} style={styles.deliveryIcon} />}
       {currentStep === 4 && <Image source={require('../assets/11.png')} style={styles.deliveryIcon} />}
       {currentStep === 1 && <Image source={require('../assets/10.png')} style={styles.deliveryIcon} />}
        </View>   
  
 <View style={styles.content} >
        {currentStep === 1 && (
              <>
             <View style={{ alignSelf:"center"}}>
             <TextAtom text="Hello there!" c={COLORS.white} f="Poppins" s={SIZES.h3} w="500"  ta="center"/>             
              </View>  
             <View style={{paddingTop: 10}}>  
             
         
              <AnimatedParagraph    duration={300}   onFinish={_onFinish} style={styles.containerStyle} textStyle={styles.textStyle} content="Did you know that you can book appointments with Equity Afia healthcare professionals and get your medicines delivered right to your doorstep?  Locate your nearest Equity Afia clinic and join our community of patients and healthcare providers to receive personalized care and support." />
          
            </View>
                       
            
              </>
            )}
            {currentStep === 2 && (
        <>
              <View style={{ alignSelf:"center"}}>
              <TextAtom text="Find the right professional" c={COLORS.white} f="Poppins" s={SIZES.h3} w="500"/>             
               </View>  
              <View style={{paddingTop: 10,alignItems:"center"}}>

              <AnimatedParagraph     duration={300}   onFinish={_onFinish} style={styles.containerStyle} textStyle={styles.textStyle} content="Browse through our extensive list of certified Equity Afia doctors, nurses, and specialists to find the perfect fit for your healthcare needs. Read their profiles, ratings, and reviews from other patients." />

              
           
             </View>
             </>
            )}
            {currentStep === 3 && (
              <>
              <View style={{ alignSelf:"center"}}>
              <TextAtom text="Schedule an appointment" c={COLORS.white} f="Poppins" s={SIZES.h3} w="500"/>             
               </View>  
              <View style={{paddingTop: 10}}>
           
              <AnimatedParagraph    duration={300}   onFinish={_onFinish} style={styles.containerStyle} textStyle={styles.textStyle} content="Book a consultation with your chosen healthcare professional at a time and date that works best for you. Receive reminders and notifications to ensure that you never miss an appointment." />

                
           
             </View>
             </>
        
            )}
            {currentStep === 4 && (
              <>
              <View style={{ alignSelf:"center"}}>
              <TextAtom text="Get medication delivered" c={COLORS.white} f="Poppins" s={SIZES.h3} w="500"/>             
               </View>  
              <View style={{paddingTop: 10,alignItems:"center"}}>
          
              <AnimatedParagraph     duration={300}   onFinish={_onFinish} style={styles.containerStyle} textStyle={styles.textStyle} content="Order your prescribed medications through the app and have them delivered straight to your doorstep, hassle-free. Track your orders in real-time and receive alerts when your medications are on the way. Get Started!." />
          
           
             </View>
             </>
        
            )}
        
      
              <View style={styles.buttons}>

        {currentStep>1? <TouchableOpacity   onPress={()=>{handlePrevStep()}} >
        <Feather name="arrow-left" size={SIZES.icon}     color={COLORS.white}/>

        </TouchableOpacity> :  <TextAtom text="prev" c={COLORS.primary} f="Poppins" s={SIZES.h4} w="500"/>
 }
      <TouchableOpacity style={styles.btn} onPress={()=>{handleNextStep()}}  >
          <TextAtom text={title} c={COLORS.primary} f="Poppins" s={SIZES.body4} w="500"/>
        </TouchableOpacity> 
              </View> 
            

            

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display:"flex",
    height:"100%",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:COLORS.gray
  },

  imgs: {
    paddingTop: 50,
    backgroundColor:COLORS.white,
    width:"100%",
    height:"55%",
    display:"flex",
    alignItems:"center",
    position:"relative"
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor:COLORS.primary,
    width:"100%",
    height:"45%",
    // alignItems:"center",
    position:"relative",
  },
 
  deliveryIcon:{
    width:"80%",
    height: "80%",
    // marginTop:"45%",
 
},
  logoImg:{
    width:"30%",
    height: "30%", 
},
  buttons:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    padding:20,
    width:"100%",
    position:"absolute",
    bottom:15,
    left:20,
   
},
 skip:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-end",
    padding:20,
    width:"100%",
    position:"absolute",
   top:15,
   alignItems:"center"
},
btn:{

    backgroundColor: COLORS.white,
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 5,
    shadowColor: COLORS.gray2,
  

},
containerStyle: {},

textStyle: {
  fontSize: SIZES.h5,
  fontWeight: 500,
  fontFamily: 'Poppins',
  textAlign:"center",
  color:COLORS.white
}
});

export default Onboarding;