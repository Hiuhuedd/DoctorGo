
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { COLORS, SIZES } from '../constants/theme';
import { BackHandler } from 'react-native';
import TextAtom from '../components/Atoms/TextAtom';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
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
        
          navigation.navigate("Home")


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
        
      navigation.navigate("") 
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
  return (
    <View style={styles.container}>
         <Image source={require('../assets/dr.go.png')} style={styles.deliveryIcon} />
      { isSignUp? <TextAtom text="Sign up" c={COLORS.white} f="Poppins" s={SIZES.h4} w="500"/>:  <TextAtom text="Sign in" c={COLORS.white} f="Poppins" s={SIZES.h4} w="500"/>} 
      <View style={styles.inputContainer}>
      <TextAtom text="Email" c={COLORS.white} f="Poppins" s={SIZES.body5} w="500"/>

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
      <TextAtom text="Password" c={COLORS.white} f="Poppins" s={SIZES.body5} w="500"/>
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
            <Ionicons name={isPasswordHidden ? 'eye-off' : 'eye'} size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {/* {error ? <Text style={styles.error}>{error}</Text> : null} */}
      <TouchableOpacity style={styles.button} onPress={isSignUp ? handleSignUp : handleLogin}>
        <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
      </TouchableOpacity>
      {isSignUp ? (
        <View style={styles.policyContainer}>
          <Text style={styles.policyText}>By signing up, you agree to our </Text>
          <TouchableOpacity style={styles.policyLinks}>
              <Text style={styles.policyLink}>Terms of Service</Text>
              <Text style={styles.policyText}> and </Text>
              <Text style={styles.policyLink}>Privacy</Text><Text style={styles.policyLink}>Policy</Text>
          </TouchableOpacity>
       
        <TouchableOpacity style={styles.signupButton} onPress={() => setIsSignUp(false)}>
        <Text style={styles.signupButtonText}>Log in to your account</Text>
        </TouchableOpacity>
      
        </View>
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
backgroundColor:COLORS.primary
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
borderColor: COLORS.white,
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
backgroundColor:COLORS.white,
paddingVertical: 15,
paddingHorizontal: 20,
borderRadius: 5,
marginBottom: 20,
width:"100%"
},
buttonText: {
color: COLORS.primary,
fontSize: 18,
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
color: COLORS.white,
},
policyLink: {
fontSize: 12,
color: COLORS.white,
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