import React ,{useState,useEffect, useRef}from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions,Image ,ImageBackground, Platform,TextInput,BackHandler, ActivityIndicator, Switch } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Divider } from "react-native-elements";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Button } from '../components/Atoms/Button';
import BottomTabs from '../components/Molecules/BottomTabs';
import appTheme from "../constants/theme"
import { ScrollView } from 'react-native-gesture-handler';
import ViewAtom from '../components/Atoms/ViewAtom';
import TextAtom from '../components/Atoms/TextAtom';
import {RadioButton } from 'react-native-paper';
import AntDesign from "react-native-vector-icons/AntDesign";
import { Badge } from "react-native-elements";
import Modal from "react-native-modal";

import { useDispatch } from 'react-redux';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import MedicinesList from '../components/Molecules/MedicineList';
import Cart from '../components/Molecules/Cart';
import CardAtom from '../components/Atoms/CardAtom';
import { Stripe } from '../constants/images';

const {COLORS, SIZES, FONTS}=appTheme


const Medicine= ({navigation}) =>{
  const [visible, setVisible] = useState(false);
  
  
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
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

    const medicines = [
        {
          name: "Aspirin",
          description: "Used to relieve pain, reduce inflammation, and lower fever.",
          dosage: "1-2 tablets every 4-6 hours",
          grams: "325 mg",
          ageBracket: "Adults and children over 12 years of age",
          price: 5.99,
          imageUrl: require('../assets/t1.png')

        },
        {
          name: "Amoxicillin",
          description: "An antibiotic used to treat bacterial infections.",
          dosage: "500 mg every 8 hours",
          grams: "500 mg",
          ageBracket: "Adults and children over 12 years of age",
          price: 12.99,
          imageUrl: require('../assets/t2.jpg')
        },
        {
          name: "Children's Tylenol",
          description: "Used to relieve pain and reduce fever in children.",
          dosage: "1 teaspoon every 4-6 hours",
          grams: "160 mg",
          ageBracket: "Children 2-11 years of age",
          price: 8.99,
          imageUrl: require('../assets/t4.jpg')
        }
      ];

        const showAlert = (type, title, msg) => {
          Toast.show({
            type: type,
            title: title,
            textBody: msg,
          });
        };
        
    
  //==============================BOTTOM SHEET============================
  const closeSheet = (t) => {

    showModal()
    if (sheetRef.current) {
      sheetRef.current.close();
    }
    setTimeout(() => {
      hideModal()
      navigation.navigate("DeliMap")
    },3000);
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
};
const onMethodSelected = (method) => {
  closeSheet();
};
const sheetRef = useRef(null);  
          
          
          //==============================PAGE DISPATCH============================
        //   const dispatch = useDispatch();
        //   const   handleSetDoctor=(d)=>{
        //       setdoctor(d)
        //       if(d==="General"){
        //           dispatch({
        //             type: "SELECT_DOCTOR",
        //              payload:{doctor:"General",type:"General Doctor"},
                   
        //           });

        //       }
        //   }
         
    
 
        
              
              //==============================PAGE FONTS============================

   
                  const [searchText, setSearchText] = useState('');
                  const [cartItems, setCartItems] = useState([]);

                  const handleAddToCart = (medicine) => {
                   
                    setCartItems([...cartItems, medicine]);
                  };
            return(
            <View style={{backgroundColor:COLORS.white, height:SIZES.height,paddingTop:0}}  >
              <Modal isVisible={visible}>
                <CardAtom  ai="center" w="100%" pv={10} ph={10} bg={COLORS.white} br={5} mv={0} mh={0}
                  el={3} sh='#525252' >
                <Image style={styles.stripe} source={Stripe} />

                  <TextAtom text="Checking out" c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/>
                  <ViewAtom fd="column" jc="center" ai="center" w="100%" pv={0} ph={5} bg="transparent" br={0} mv={5} mh={0}>
                  <ActivityIndicator size="small" color={COLORS.primary} />
            
                  </ViewAtom> 
                  </CardAtom>
               </Modal>
               <ImageBackground  style={{width: '100%',height:200,marginBottom:5,backgroundColor:COLORS.primary,position:"relative", }} resizeMode="cover" >
                        <ViewAtom fd="column" jc="flex-start" ai="flex-start" pv={40} ph={0} w="100%" bg="transparent" br={0} mv={0} mh={0}>
                      
                        
                <ViewAtom fd="row" jc="space-between" ai="center" w="100%" pv={15} ph={10}  bg="transparent" br={0} mv={0} mh={0}>
                <ViewAtom fd="row" jc="flex-start" ai="center" w="70%" bg="transparent"  pv={10}br={0} mv={0} mh={0}
               
                >
              
                                 <Feather name="chevron-left" size={SIZES.h1}     color={COLORS.white}  onPress={()=> {navigation.navigate("Home"); }}/>

                                <TextAtom text="Clinic Pharmacy" c={COLORS.white} f="Poppins" s={SIZES.h3} w="500"/>

                </ViewAtom>

                                {/* <TextAtom text="Step 1/4" c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/> */}
                                <TouchableOpacity style={{position:"relative",marginRight:20}} onPress={()=>{openSheet()}} >
                                <ViewAtom fd="column" jc="center" ai="center"   pv={10} ph={10} bg={COLORS.white}  br={50}  mv={0} mh={0} >
                              <Feather name="shopping-cart" size={SIZES.font}   color={COLORS.black}/>
                        </ViewAtom>         
                        {cartItems.length>0&&<View style={{position:"absolute",right:0}} >
                        <Badge  containerStyle={{ position: 'absolute', top: -2, right: -9 }} value={cartItems.length} status="success" />
                                    
                                
                       </View>}
                                </TouchableOpacity>
                               
                </ViewAtom>
                <View
        style={{
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
          
          backgroundColor: "#fff", 
          alignItems:"center" ,
          elevation: 15,
          shadowColor: '#525252',
        }}
 onPress={()=>{}}
      >
        <View style={{ marginLeft: 10 }}>
          <Feather name="search" size={20} />
          
        </View>

        <TextInput
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            fontWeight: "500",
            flex: 1,
            paddingHorizontal: 8,
            height: "100%",
            fontFamily:"poppins"
          }}
          placeholder="Search medicines"
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            margin: 8,
            backgroundColor: "#e5e5e5",
            padding: 9,
            borderRadius: 20,
            alignItems: "center",
          }}
       
        >
          <AntDesign name="clockcircle" size={11} style={{ marginRight: 6 }} />
          <Text>Search</Text>
        </TouchableOpacity>
      </View> 
                        </ViewAtom>
                </ImageBackground>

    <MedicinesList medicines={medicines} navigation={navigation} searchText={searchText} handleAddToCart={handleAddToCart} cartItems={cartItems} />
    <Cart onMethodSelected={closeSheet} ref={sheetRef} navigation={navigation} cartMedicines={cartItems}/> 

                {/* <Appointments/> */}
               
             <View style={{position:"absolute", width:"100%",bottom:0, backgroundColor:COLORS.gray }}>
            <BottomTabs navigation={navigation}/>
             </View>
            </View>
            )
}
export default Medicine
 
const styles = StyleSheet.create({
  stripe: {
    height: 40,
    width: 70,
  },
  });
  
  
  
  