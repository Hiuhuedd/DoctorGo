import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { COLORS, SIZES } from '../constants/theme';
import { BackHandler } from 'react-native';
import TextAtom from '../components/Atoms/TextAtom';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ViewAtom from '../components/Atoms/ViewAtom';
import Modal from "react-native-modal";
import { ActivityIndicator } from "react-native";
import CardAtom from '../components/Atoms/CardAtom';

console.disableYellowBox = true;

export default function AuthScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  // const validatePassword = (password) => {
  //   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\w).{6,}$/
  //   return passwordRegex.test(password);
  // };
  const showAlert = (type, title, msg) => {
    Toast.show({
      type: type,
      title: title,
      textBody: msg,
    });
  };
  
  const [visible, setVisible] = useState(false);

  const handleLogin = async () => {
    setError("");
    setTimeout(async () => {
      if (!validateEmail(email)) {
        setError("Invalid email address");
        return;
      }
      // if (!validatePassword(password)) {
      //   setError("Invalid password");
      //   return;
      // }
  
      // Retrieve user credentials from AsyncStorage
      try {
        const userData = await AsyncStorage.getItem("userData");
        const { email: storedEmail, password: storedPassword } = JSON.parse(userData);
  
        // Check if the provided email and password match the stored credentials
        if (email === storedEmail && password === storedPassword) {
          // Authentication successful, handle login logic
          showAlert(ALERT_TYPE.SUCCESS, "Success!", "Login Successful");
        
          AsyncStorage.getItem('goalsComplete').then(value => {
            setVisible(true)
            if (value !== null && value === 'true') {
              setTimeout(() =>{
                navigation.navigate("Home")
                setVisible(false)
              }, 3000)
              
            }else{
              
              setTimeout(() =>{
                setVisible(false)
                navigation.navigate("Home")
              }, 2000)
              
            }
          });

        } else {
          setError(`This account is not registered yet!`);
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  };
  
  const handleSignUp = () => {
    setError("")
    setTimeout(async() => {
      
      if (!validateEmail(email)) {
        setError('Invalid email address');
        return;
      }
      // if (!validatePassword(password)) {
      //   setError('Invalid password');
      //   return;
      // }
      // Save signup data to AsyncStorage
      try {
        await AsyncStorage.setItem('userData', JSON.stringify({ email, password }));
        setIsSignUp(false);
      } catch (error) {
        console.log(error);
      }
    }, 2000);
  };

             useEffect(() => {
                  if(error){
                    showAlert(ALERT_TYPE.WARNING, "Oops!", error);
                  } 
              }, [error])
     //==============================Backpress============================
     const handleBackPress=()=>{
        
      navigation.navigate("LoginScreen") 
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

  return (
    <View style={styles.container}>
      <Modal isVisible={visible}>
      <CardAtom  ai="center" w="100%" pv={10} ph={10} bg={COLORS.white} br={5} mv={0} mh={0}
         el={3} sh='#525252' >
         <TextAtom text="Signing in to your account" c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/>
         <ViewAtom fd="column" jc="center" ai="center" w="100%" pv={0} ph={5} bg="transparent" br={0} mv={5} mh={0}>
         <ActivityIndicator size="small" color={COLORS.primary} />
   
        </ViewAtom> 
         </CardAtom>
        </Modal>
<Image source={require('../assets/7.png')} style={styles.deliveryIcon} />
      { isSignUp? <TextAtom text="Sign up" c={COLORS.black} f="Poppins" s={SIZES.h4} w="500"/>:  <TextAtom text="Sign in" c={COLORS.black} f="Poppins" s={SIZES.h4} w="500"/>} 
      <View style={styles.inputContainer}>
      <TextAtom text="Email" c={COLORS.black} f="Poppins" s={SIZES.body5} w="500"/>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <View style={styles.passwordContainer}>
      <TextAtom text="Password" c={COLORS.black} f="Poppins" s={SIZES.body5} w="500"/>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCompleteType="password"
            secureTextEntry={isPasswordHidden}
          />
          <TouchableOpacity onPress={() => setIsPasswordHidden(!isPasswordHidden)} style={styles.eye} >
            <Ionicons name={isPasswordHidden ? 'eye-off' : 'eye'} size={24} color="#555" />
          </TouchableOpacity>
        </View>
      </View>

       


      {/* {error ? <Text style={styles.error}>{error}</Text> : null} */}
      <TouchableOpacity style={styles.button} onPress={isSignUp ? handleSignUp : handleLogin}>
        <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
      </TouchableOpacity>

      <View style={styles.policyContainer}>
          <Text style={styles.policyText}>By signing up, you agree to our </Text>
          <TouchableOpacity style={styles.policyLinks}>
              <Text style={styles.policyLink}>Terms of Service</Text>
              <Text style={styles.policyText}> and </Text>
              <Text style={styles.policyLink}>Privacy</Text><Text style={styles.policyLink}>Policy</Text>
          </TouchableOpacity>
      
        </View>
      {isSignUp ? (
      
        <TouchableOpacity style={styles.signupButton} onPress={() => setIsSignUp(false)}>
        <Text style={styles.signupButtonText}>Log in to your account</Text>
        </TouchableOpacity>
      
   
        ) : (
        <TouchableOpacity style={styles.signupButton} onPress={() => setIsSignUp(true)}>
        <Text style={styles.signupButtonText}>Create an account</Text>
        </TouchableOpacity>
        )
}
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
paddingHorizontal: 20,
backgroundColor:"#fff"
},
title: {
fontSize: 32,
fontWeight: 'bold',
marginBottom: 50,
fontFamily:"Poppins",
color:COLORS.white
},
inputContainer: {
width: '100%',
marginBottom: 20,
},
input: {
height: 50,
borderWidth: 1,
borderColor: COLORS.black,
borderRadius: 5,
paddingHorizontal: 10,
marginBottom: 20,
width:"100%"
},
passwordContainer: {
flexDirection: 'column',
// alignItems: 'center',
position:"relative"
},
eye: {
position:"absolute",
top:30,
right:5

},

button: {
backgroundColor:COLORS.primary,
paddingVertical: 15,
paddingHorizontal: 20,
borderRadius: 5,
marginBottom: 20,
width:"100%"
},
buttonText: {
color: COLORS.white,
fontSize: 14,
fontWeight: 'bold',
textAlign: 'center',
},
signupButton: {
marginTop: 20,
},
signupButtonText: {
color: '#333',
fontSize: 16,
fontWeight: 'bold',
textAlign: 'center',
},
policyContainer: {
flexDirection: 'column',
alignItems: 'center',
},
policyLinks: {
flexDirection: 'row',
alignItems: 'center',
paddingTop:5,
},
policyText: {
fontSize: 12,
color: COLORS.black,
},
policyLink: {
fontSize: 12,
color: COLORS.gray2,
textDecorationLine: 'underline',
},
error: {
color: 'red',
marginBottom: 20,
},
deliveryIcon:{
  width:"30%",
  height: "15%",
  // marginRight:10,
},
});