import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, View ,Image} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Constants from 'expo-constants';
import ViewAtom from '../components/Atoms/ViewAtom';
import TextAtom from '../components/Atoms/TextAtom';
import appTheme from "../constants/theme"
import Feather from 'react-native-vector-icons/Feather';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import CardAtom from '../components/Atoms/CardAtom';
import CustomMessage from '../components/Molecules/CustomMessage';
import CustomInputToolbar from '../components/Molecules/CustomInputToolbar';

const {COLORS, SIZES, FONTS}=appTheme 

firebase.initializeApp({
    apiKey: "AIzaSyAcOZp_3inuc1_NGHxoSD2DaFasZ6qirZA",
    authDomain: "drgo-8623d.firebaseapp.com",
    projectId: "drgo-8623d",
    storageBucket: "drgo-8623d.appspot.com",
    messagingSenderId: "953104000697",
    appId: "1:953104000697:web:b0fe4297875562a81e5d68",
    measurementId: "G-73DM7MSXH8"
});

const db = firebase.firestore();
const chatsRef = db.collection('chats');


const ChatScreen = ({route,navigation}) => {
  const {contact} = route.params;
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === 'added')
        .map(({ doc }) => {
          const message = doc.data();
          return {
            ...message,
            createdAt: message.createdAt.toDate(),
          };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });

    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    },
    [messages],
  );

  const handleSend = useCallback(
    async (messages) => {
      const writes = messages.map((m) => chatsRef.add(m));
      await Promise.all(writes);
    },
    [messages],
  );

  return (
    <View style={{  height: "100%", paddingTop: 0 ,backgroundColor:COLORS.primaryShade}}  >
       <ViewAtom fd="row" jc="flex-start" ai="center"   ph={10} pv={40}br={0} mv={0} mh={0}>
        <Feather name="chevron-left" size={SIZES.h1}     color={COLORS.primary}  onPress={()=> {navigation.navigate("DoctorContactsList")}}/>
        <Image source={{uri:contact.img}} style={styles.contactImage} />
        <ViewAtom fd="column" jc="flex-start" ai="flex-start" bg="transparent"  mh={10}>
        <TextAtom text={`Dr. ${contact.name}`} c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>
        <TextAtom text={` Last seen ${contact.date}`} c={COLORS.black} f="Poppins" s={SIZES.base} w="500"/>

        </ViewAtom>
      <CardAtom fd="column" jc="center" ai="center" bg={COLORS.primary} ph={10} pv={5} br={5} mh={4} >
        <Icon name="videocam-outline" size={SIZES.body3} type='ionicon' color={COLORS.black} /> 
      
        </CardAtom>
      <CardAtom fd="column" jc="center" ai="center" bg={COLORS.primary} ph={10} pv={5} br={5} mh={4} >
        <Icon name="call-outline" size={SIZES.body3} type='ionicon' color={COLORS.black} /> 
      
        </CardAtom>
        {/* videocam-outline */}
      </ViewAtom>
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{
          _id: Constants.installationId,
          name: Constants.deviceName,
        }}
        inverted:true
        renderMessage={(message) => <CustomMessage {...message} />}
        renderInputToolbar={(props) => <CustomInputToolbar {...props} />}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});




//////////////////////////////////////////////////////////////////////////////////////////////////

