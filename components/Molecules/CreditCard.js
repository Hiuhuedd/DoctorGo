import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet,Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Mastercard, Visa } from '../../constants/images';
import { COLORS, SIZES } from '../../constants/theme';
import MyInput from '../Atoms/MyInput';
import TextAtom from '../Atoms/TextAtom';
import ViewAtom from '../Atoms/ViewAtom';

const CreditCard = ({isUpdateCard, handleCardDetails}) => {
    const styles = StyleSheet.compose({
        card: {
        position: 'relative',
        minHeight:"45%",
        maxHeight:"42%",
        width: "95%",
        alignSelf:"center",
        borderRadius: 25, 
        backgroundColor: isUpdateCard? COLORS.black:COLORS.primary,
        // backdropFilter: 'blur(30px)',
        border: '2px solid rgba(234, 179, 8, 0.1)',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 80,
        overflow: 'hidden',
        },
        logo: {
        position: 'absolute',
        top: 10,
        left: 120,
        height: 23,
        width:70,
        // opacity: 0.8,
        },
        chip: {
        height: 50,
        width:50,
        position: 'absolute',
        top: 30,
        left: 20,
        // opacity: 0.8,
        },
        number: {
        position: 'absolute',
        color:isUpdateCard? COLORS.primary:COLORS.black,
        fontWeight: '400',
        letterSpacing: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
        left: 35,
        top: 150,
       width:300
        },
        name: {
        position: 'absolute',
        color:isUpdateCard? COLORS.primary:COLORS.black,
        fontWeight: '400',
        letterSpacing: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
        fontSize: 10,
        left: 40,
        top: 180,
        width:90,
        },
        CVC: {
        position: 'absolute',
        color:isUpdateCard? COLORS.primary:COLORS.gray3,
        fontWeight: '400',
        letterSpacing: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
        width:90,
        fontSize: 10,
        left: 120,
        top: 0,
    },
    from: {
        position: 'absolute',
        color:isUpdateCard? COLORS.primary:COLORS.black,
        fontWeight: '400',
        letterSpacing: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
        fontSize: 10,
        width:100,
        top: 158,
        left: 270,
        },
        switch: {
        position: 'absolute',
        top: 155,
        left: 210,
        },
        to: {
        position: 'absolute',
        color:isUpdateCard? COLORS.primary:COLORS.black,
        fontWeight: '400',
        letterSpacing: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
        fontSize: 10,
        top: 158,
        left: 230,
        },
        ring: {
        position: 'absolute',
        height: 500,
        width: 500,
        borderRadius: 50,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        bottom: -250,
        right: -250,
        boxSizing: 'border-box',
        },
        ringAfter: {
        content: '',
        position: 'absolute',
        height: 600,
        width: 600,
        borderRadius: 50,
        backgroundColor: 'transparent',
        // border: 30px solid rgba(255, 255, 255, 0.1);
        // bottom: -80px;
        // right: -110px;
        // box-sizing: border-box;
    }
    }
    )

    const [isNumberUpdated,setisNumberUpdated]=useState("")
    const [isDateUpdated,setisDateUpdated]=useState("")
    const [isNameUpdated,setisNameUpdated]=useState("")
    const [isCVCUpdated,setisCVCUpdated]=useState("")
    const [isFront,setisFront]=useState(true)
    const [CardType,setCardType]=useState("Visa")
    
    useEffect(() => {
      AsyncStorage.getItem('card').then((data) => {
        // Parse the existing data from a string to a JavaScript object
        if(data){
          const existingData =  JSON.parse(data);
          setTimeout(() => {
            setisNumberUpdated(existingData.isNumberUpdated)
            setisCVCUpdated(existingData.isCVCUpdated)
            setisNameUpdated(existingData.isNameUpdated)
            setisDateUpdated(existingData.isDateUpdated)
            setCardType(existingData.CardType)
          }, 1000);
        }
  
});
    }, []);
    useEffect(() => {
        setCardType( determineCardType(isNumberUpdated))
 
    }, [isNumberUpdated]);
    useEffect(() => {
      if(isNumberUpdated&&isDateUpdated&&isNameUpdated&&isCVCUpdated){
        handleCardDetails({isNumberUpdated,isDateUpdated,isNameUpdated,isCVCUpdated,CardType})
      }
    }, [isNumberUpdated,isDateUpdated,isNameUpdated,isCVCUpdated]);

    function determineCardType(cardNumber) {
        const firstDigit = cardNumber[0];
        const secondDigit = cardNumber[1];
      
        if (firstDigit === '4') {
          return "Visa";
        } else if (firstDigit === '5' && secondDigit >= '1' && secondDigit <= '5') {
          return "Mastercard";
        } else {
          return "Unknown";
        }
      }



  return (
    <View style={styles.card}>
     {isFront?   <>
      <View style={styles.logo}>
       {CardType==="Visa"? <Image source={Visa} style={styles.logo} />:
        <Image source={Mastercard} style={styles.logo} />
        }
      </View>
      <View style={styles.chip} >
        <Image source={require('../../assets/chip.png')} style={styles.chip} />
      </View>
     {isUpdateCard?
     <MyInput editable={isUpdateCard} keyboardType="numeric" secureTextEntry={!isUpdateCard} style={styles.number} placeholder={isNumberUpdated} maxLength={19} setisUpdated={setisNumberUpdated} />
     :
     <>
      {isNumberUpdated?
        <Text style={styles.number}>{isNumberUpdated}</Text>
        // <Text style={styles.number}></Text>
        :
        <Text style={styles.number}>1234 5678 9012 3456</Text>
         }
     </>

      }
     {isNumberUpdated?
     <MyInput editable={isUpdateCard} keyboardType="numeric" secureTextEntry={!isUpdateCard} style={styles.from} placeholder={isDateUpdated} maxLength={5} setisUpdated={setisDateUpdated} />
     :
     <>
      {isDateUpdated?
       <View style={styles.dateContainer}>
       <Text style={styles.from}>{isDateUpdated}</Text>
     </View>
        :
        <View style={styles.dateContainer}>
        <Text style={styles.from}>10/21</Text>
      </View>
         }
     </>

      }
     {isDateUpdated?
     <MyInput editable={isUpdateCard} keyboardType="default" secureTextEntry={!isUpdateCard} style={styles.name} placeholder={isNameUpdated} maxLength={40} setisUpdated={setisNameUpdated} />
     :
     <>
      {isNameUpdated?
       <View style={styles.dateContainer}>
       <Text style={styles.name}>{isNameUpdated}</Text>
     </View>
        :
        <Text style={styles.name}>Your Card Name</Text>
    
         }
     </>

      }
        </>:<>
        <ViewAtom fd="column" jc="center" ai="center" w="100%" pv={30} ph={0} bg="transparent" br={0} mv={0} mh={0}>
            <ViewAtom fd="column" jc="center" ai="center" w="100%"  pv={25} ph={0} bg={COLORS.gray4} br={0} mv={0} mh={3}>
            </ViewAtom>
            <ViewAtom fd="row" jc="space-between" ai="center" w="70%"  pv={5} ph={0}   br={0} mv={20} mh={3}>
            <TextAtom text="CVC" c={COLORS.black} f="Poppins" s={SIZES.body5} w="500"/>
      
          
     <MyInput editable={isUpdateCard} keyboardType="numeric" secureTextEntry={!isUpdateCard} style={styles.CVC} placeholder={isCVCUpdated} maxLength={3} setisUpdated={setisCVCUpdated} />
            </ViewAtom>
    
         </ViewAtom>
        
        
        </>
        
        }
                <View style={styles.switch} >

                <ViewAtom fd="row" jc="center" ai="center"  pv={10} ph={0} bg="transparent" br={0} mv={0} mh={0}>
                <TextAtom text="Flip card" c={COLORS.gray2} f="Poppins" s={SIZES.body5} w="500"/>

                    <Switch
                        value={isFront}
                            onValueChange={value => setisFront(value)}
                            trackColor={{ false: '#767577', true:COLORS.primary }}
                            thumbColor={isFront? COLORS.white : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            />
                

            </ViewAtom>
                </View>
    </View>
  );
};
export default CreditCard

