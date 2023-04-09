import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ViewAtom from '../components/Atoms/ViewAtom';
import TextAtom from '../components/Atoms/TextAtom';
import appTheme from "../constants/theme"
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage'
import BottomTabs from '../components/Molecules/BottomTabs';

const {COLORS, SIZES, FONTS}=appTheme
const DoctorContactsList = ({navigation}) => {

    const [ap,setap]=useState([])
    console.log(ap);
    useEffect(() => {
        AsyncStorage.getItem('Appointments').then((data) => {
          const existingData = data ? JSON.parse(data) : {};
          if(existingData){
            const apList =Object.entries(existingData)
            const Doctors =  apList.map((item) => item[1].SelectedDoctor);
            
            const uniqueDoctors = Doctors.filter((doctor, index, self) =>
            index === self.findIndex((d) => d.name === doctor.name)
            );
           setap(uniqueDoctors);
          }
    
    });
      }, []);
const onPressContact=(i)=>{
  navigation.navigate("ChatScreen", {
    contact:i,
  })
}

const contacts = [
    {   
      id:1,        
      lastMessage: 'Good news! Your test results came back negative.',
      date: '12:01 PM',
    },
    {   
      id:12,        
      lastMessage: 'Good news! Your test results came back negative.',
      date: '12:01 PM',
    },
    {
      id:2, 
      lastMessage: 'I have received your prescription request and will process it shortly.',
      date: 'Yesterday',
    },
    {
      id:3, 
      lastMessage: 'Your follow-up appointment has been scheduled for next week.',
      date: 'Yesterday',
    },
    {
      id:9, 
      lastMessage: 'Your follow-up appointment has been scheduled for next week.',
      date: 'Yesterday',
    },
    {
      id:4, 
      lastMessage: 'Please remember to take your medication as prescribed.',
      date: '2 days ago',
    }, 
    {
      id:11, 
      lastMessage: 'Please remember to take your medication as prescribed.',
      date: '2 days ago',
    }, 
    {
      id:5, 
      lastMessage: 'I recommend that you schedule a check-up appointment soon.',
      date: '3 days ago',
    },
    {
      id:8, 
      lastMessage: 'I recommend that you schedule a check-up appointment soon.',
      date: '3 days ago',
    },
    {
      id:6, 
      lastMessage: 'Your physical therapy sessions have been scheduled for the next month.',
      date: '4 days ago',
    },
    {
      id:7, 
      lastMessage: 'I have received your medical history and will review it shortly.',
      date: '6 days ago',
    },
    {
      id:10, 
      lastMessage: 'I have received your medical history and will review it shortly.',
      date: '6 days ago',
    },
  ];
  function mergeArraysById(arr1, arr2) {
    const mergedArr = [];
    for (const item1 of arr1) {
      const item2 = arr2.find((item) => item.id === item1.id);
      if (item2) {
        const mergedItem = {...item1, ...item2};
        mergedArr.push(mergedItem);
      }
    }
    return mergedArr;
  }



  const renderItem = ({ item }) => {
  
    return (
      <TouchableOpacity style={styles.contactContainer} onPress={() => onPressContact(item)}>
        <Image source={{uri:item.img}} style={styles.contactImage} />
        <View style={styles.contactInfo}>
        <TextAtom text={`Dr. ${item.name}`} c={COLORS.primary} f="Poppins" s={SIZES.body3} w="500"/>
        <TextAtom text={item.lastMessage} c={COLORS.gray2} f="Poppins" s={SIZES.body5} w="500"/>
        </View>
        <Text style={styles.contactDate}>{item.date}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{backgroundColor:COLORS.white,  height:SIZES.height,paddingTop:20}}  >

    <ViewAtom fd="column" jc="flex-start" ai="flex-start" w="100%" pv={20} ph={20} bg="transparent" br={0} mv={0} mh={0}>
    <ViewAtom fd="row" jc="flex-start" ai="center" w="70%" bg="transparent"  pv={10}br={0} mv={0} mh={0}
   
    >
  
                     <Feather name="chevron-left" size={SIZES.h1}     color={COLORS.primary}  onPress={()=> {navigation.navigate("Home"); }}/>

                    <TextAtom text="Doctors" c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>

    </ViewAtom>

                    <TextAtom text="My Doctors List" c={COLORS.primary} f="Poppins" s={SIZES.h5} w="500"/>
                    
                   
    </ViewAtom>
    <FlatList
    data={mergeArraysById(contacts, ap)}
    keyExtractor={(item) => item}
    renderItem={renderItem}
    contentContainerStyle={styles.contactsListContainer}
    />
   <View style={{position:"absolute", width:"100%",bottom:0, backgroundColor:COLORS.gray }}>

{/* <Divider/> */}
<BottomTabs navigation={navigation}/>
 </View>

</View>
      );
    };
    
    export default DoctorContactsList;
const styles = StyleSheet.create({
  contactsListContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  contactMessage: {
    color: '#777',
  },
  contactDate: {
    fontSize: 12,
    color: '#777',
  },
});
