
import { useState, useEffect } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import ViewAtom from "../components/Atoms/ViewAtom";
import { COLORS, SIZES } from "../constants/theme";
import { CheckBox, Divider, Icon } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import TextAtom from "../components/Atoms/TextAtom";
import Modal from "react-native-modal";
import CardAtom from "../components/Atoms/CardAtom";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({navigation}) {
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(false);


  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "275898878094230",
    useProxy:false
  });

  if (request) {
    console.log(
      "You need to add this url to your authorized redirect urls on your Facebook app: " +
        request.redirectUri
    );
  }

  useEffect(() => {
      if(user){
          showModal()
        AsyncStorage.setItem('drgo-user', JSON.stringify(user)).then(()=>{
            setTimeout(() => {
              hideModal()
                navigation.navigate("Home")
            }, 2000);
        })
  }
  
  }, [user]);
  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
      })();
    }
  }, [response]);
  
  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return;
    }
  };

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
    
        <ViewAtom fd="column" jc="center" ai="center" w="100%" pv={0} ph={5} bg="transparent"  mv={0} mh={0}>
        <Image source={require('../assets/7.png')} style={styles.logoImg} />
      <TextAtom ta="right" text="Get started" c={COLORS.black} f="Poppins" s={ SIZES.h5} w="500"/>
        </ViewAtom>   
      <Image source={require('../assets/10.png')} style={styles.deliveryIcon} />
      <ViewAtom jc="center" ai="center" w="100%" pv={10} ph={0} bg="transparent" br={0} mv={0} mh={0}>          

      <TextAtom ta="center" text="Join our community of patients" c={COLORS.black} f="Poppins" s={ SIZES.h5} w="500"/>
      <TextAtom ta="center" text="to receive personalized care and support." c={COLORS.black} f="Poppins" s={ SIZES.h5} w="500"/>

<TouchableWithoutFeedback onPress={handlePressAsync} style={{alignItems:"center",marginVertical:10}}>
                  <>
                            <ViewAtom   fd="row" jc="space-between" ai="center" bg={COLORS.gray}  w="90%"  br={5} pv={0} ph={20} >
                                <ViewAtom  pv={10}  ph={10} br={50}mv={0} mh={5}>
                                    <Icon  name="logo-facebook" type='ionicon' color={COLORS.primary}/>
                                </ViewAtom>
                                <ViewAtom mv={0} mh={15}>
                                <TextAtom ta="right" text="continue with facebook" c={COLORS.gray2} f="Poppins" s={ SIZES.h5} w="500"/>
                            
                                </ViewAtom>
                          </ViewAtom>
                  </>
                </TouchableWithoutFeedback >
                <ViewAtom   fd="row" jc="space-between" ai="center"   w="90%"  pv={3} ph={5} >
                <TouchableWithoutFeedback onPress={{}} style={{alignItems:"center",marginVertical:5}}>
                  <>
                            <ViewAtom   fd="row" jc="space-between" ai="center" bg={COLORS.gray}   pv={3} ph={15} br={5} >
                            <ViewAtom  pv={5}  ph={5} br={50}mv={0} mh={5}>
                                    <Icon  name="logo-google" type='ionicon' color={COLORS.black} size={SIZES.h3}/>
                                </ViewAtom>
                          </ViewAtom>
                  </>
                </TouchableWithoutFeedback >
                <TouchableWithoutFeedback onPress={{}} style={{alignItems:"center",marginVertical:5}}>
                  <>
                            <ViewAtom   fd="row" jc="space-between" ai="center" bg={COLORS.gray}   pv={3} ph={15} br={5} >
                                <ViewAtom  pv={5}  ph={5} br={50}mv={0} mh={5}>
                                    <Icon  name="logo-twitter" type='ionicon' color={COLORS.black} size={SIZES.h3}/>
                                </ViewAtom>
                          </ViewAtom>
                  </>
                </TouchableWithoutFeedback >
                <TouchableWithoutFeedback onPress={{}} style={{alignItems:"center",marginVertical:5}}>
                  <>
                            <ViewAtom   fd="row" jc="space-between" ai="center" bg={COLORS.gray}   pv={3} ph={15} br={5} >
                                <ViewAtom  pv={5}  ph={5} br={50}mv={0} mh={5}>
                                    <Icon  name="incognito" type='material-community' color={COLORS.black} size={SIZES.h3}/>
                                </ViewAtom>
                          </ViewAtom>
                  </>
                </TouchableWithoutFeedback >
                <TouchableWithoutFeedback onPress={()=>{navigation.navigate("AuthScreen")}} style={{alignItems:"center",marginVertical:5}}>
                  <>
                            <ViewAtom   fd="row" jc="space-between" ai="center" bg={COLORS.gray}   pv={3} ph={15} br={5} >
                            <ViewAtom  pv={5}  ph={5} br={50}mv={0} mh={5}>
                                    <Icon  name="mail-outline" type='ionicon' color={COLORS.black} size={SIZES.h3}/>
                                </ViewAtom>
                          </ViewAtom>
                  </>
                </TouchableWithoutFeedback >
                          </ViewAtom>
                          <View style={styles.policyContainer}>
          <Text style={styles.policyText}>By signing up, you agree to our </Text>
          <TouchableWithoutFeedback style={styles.policyLinks}>
              <Text style={styles.policyLink}>Terms of Service</Text>
              <Text style={styles.policyText}> and </Text>
              <Text style={styles.policyLink}>Privacy</Text><Text style={styles.policyLink}>Policy</Text>
          </TouchableWithoutFeedback>
      
        </View>

      </ViewAtom>
      
    </View>
  );
}

// function Profile({ user }) {
//   return (
//     <View style={styles.profile}>
//       <Image source={{ uri: user.picture.data.url }} style={styles.image} />
//       <Text style={styles.name}>{user.name}</Text>
//       <Text>ID: {user.id}</Text>
//     </View>
//   );
// }

const styles = StyleSheet.create({
    containerStyle: {},

    textStyle: {
      fontSize: SIZES.h5,
      // fontWeight: 500,
      fontFamily: 'Poppins',
      textAlign:"center",
      color:COLORS.white
    },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor:COLORS.white
  },
  profile: {
    alignItems: "center",
  },
  name: {
    fontSize: SIZES.body3,
  },
  logoImg:{
    width:"30%",
    height: "20%", 
},
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  deliveryIcon:{
    width:"55%",
    height: "22%",
    // marginRight:10,
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
});

