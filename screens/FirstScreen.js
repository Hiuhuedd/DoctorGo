import React, { useState, useEffect} from 'react'
import { View,  Image,StyleSheet,ActivityIndicator} from "react-native";
import { getUserLocation } from '../utils/helper';
import { useDispatch, useSelector } from "react-redux";
import appTheme, { COLORS } from '../constants/theme';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default FirstScreen  = ({navigation}) =>{
  
  const dispatch = useDispatch();
const [loader, setloader] = useState(false)


useEffect(() => {
   getUserLocation().then((res)=>{
    if(res){
      setloader(true)
      // dispatch({
      //   type: "ON_UPDATE_LOCATION",
      //   payload: {
      //       location: res.item,
      //       coords:res.coords,ss
      //       clinics:res.clinics,
      //       nearestclinic:res.n
      //   },
      // });
      AsyncStorage.getItem('onboardingComplete').then(value => {
        if (value !== null && value === 'true') {
          setTimeout(() =>{
              // navigation.navigate('MapView')
              navigation.navigate('Home')
          }, 3000)
          
        }else{
          setTimeout(() =>{
              navigation.navigate('Onboarding')
          }, 3000)
          
        }
      });
    
    }
  })
}, [])

const [loaded] = useFonts({
  Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
  Poppins1: require('../assets/fonts/Poppins-Black.ttf'),
});


if (!loaded) {
  return <AppLoading/>
}




return(
    <View      style={styles.logo}>

        <Image source={require('../assets/7.png')} style={styles.deliveryIcon} />


        { loader? 
          <ActivityIndicator size="small" color="#111" />
                :<></>
                }
        
    </View>
    
)
  }

  
const styles = StyleSheet.create({
  deliveryIcon:{
      width:"50%",
      height: "20%",
      // marginRight:10,
      marginTop:50
  },
 
  logo:{
    flex: 1,
    display:"flex",
    flexDirection:"column",
    alignItems: 'center',
    justifyContent:"center",
    backgroundColor:"#fff" 

  }
})


