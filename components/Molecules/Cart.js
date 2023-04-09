import React ,{useState,useEffect}from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Platform,TextInput, ScrollView, } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Axios from 'axios';
import { Button } from '../Atoms/Button';
import Feather from 'react-native-vector-icons/Feather';
import appTheme from '../../constants/theme';
import ViewAtom from '../../components/Atoms/ViewAtom';
import TextAtom from '../../components/Atoms/TextAtom';
import { Icon } from 'react-native-elements';
import CardAtom from '../Atoms/CardAtom';

const {COLORS, SIZES, FONTS}=appTheme
const Cart = React.forwardRef(({ cartMedicines,onMethodSelected,navigation },ref)=> {
    const [cartItems, setCartItems] = useState(cartMedicines);
    useEffect(() => {
      const med=  cartMedicines.map((item) =>({
            ...item,
            quantity: 1,
          }))
          setCartItems(med)
    }, [cartMedicines])
    
  console.log("================m",cartItems,cartMedicines);
    const handleAdd = (index) => {
      const newCartItems = [...cartItems];
      newCartItems[index].quantity++;
      setCartItems(newCartItems);
    };
  
    const handleRemove = (index) => {
      const newCartItems = [...cartItems];
      if (newCartItems[index].quantity > 1) {
        newCartItems[index].quantity--;
      } else {
        newCartItems.splice(index, 1);
      }
      setCartItems(newCartItems);
    };
    
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
      };
    
  
      const renderItem = ({ item, index }) => {
        return (
            <CardAtom jc="center" ai="center" w='95%' pv={0} ph={0} bg={COLORS.white} br={5} mv={5} mh={0}
         el={1} sh='#525252' >
             <View key={index} style={{flexDirection:"row",width:"100%",justifyContent:"space-between" ,paddingHorizontal:15}}>
                   <ViewAtom fd="row" jc="flex-start" ai="flex-start"  pv={10} ph={0}  bg="transparent" br={0} mv={0} mh={0}>
                 <Image source={item.imageUrl} style={styles.itemImage} />
   
                   </ViewAtom>
            
                   <ViewAtom fd="column" jc="flex-start" ai="flex-start" pv={15} ph={0}  bg="transparent" br={0} mv={0} mh={0}>
       
                 <TextAtom text={item.name} c={COLORS.black} f="Poppins" s={SIZES.h3} w="500"/>

                 <TextAtom text={`Ksh ${item.price}/=`} c={COLORS.black} f="Poppins1" s={SIZES.h5} w="500"/>
   
                   </ViewAtom>
                   <ViewAtom fd="row" jc="space-between" ai="center"  pv={15} ph={0}  bg="transparent" br={0} mv={0} mh={0}>
                   <TouchableOpacity onPress={() => handleRemove(index)}>
                   <ViewAtom fd="column" jc="center" ai="center"   pv={3} ph={3} bg={COLORS.primaryShade}  br={50}  mv={2} mh={5} >
                              <Feather name="minus" size={SIZES.font}   color={COLORS.white}/>
                        </ViewAtom>   
                     {/* <Text style={{}}>-</Text> */}
                   </TouchableOpacity>
                   <TextAtom text={item.quantity} c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/>
              
                   <TouchableOpacity onPress={() => handleAdd(index)}>
                   <ViewAtom fd="column" jc="center" ai="center"   pv={3} ph={3} bg={COLORS.primaryShade}  br={50}  mv={2} mh={5} >
                              <Feather name="plus" size={SIZES.font}   color={COLORS.white}/>
                        </ViewAtom>   
                     {/* <Text>+</Text> */}
                   </TouchableOpacity>
   
                   </ViewAtom>
                 </View>
             
         </CardAtom>
         
        );
      };

  return (
    <RBSheet
      ref={ref}
      height={SIZES.height-150}
      openDuration={250}
      dragFromTopOnly  
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          alignItems:"center",
          backgroundColor:COLORS.white
         
        },
      }}
      >
     
    <ScrollView style={{flexDirection:"column",width:SIZES.width,padding:10,height:SIZES.height-200}}>
        
     

      {cartItems.length === 0 ? (
        <Text style={styles.emptyMessage}>Your cart is empty</Text>
      ) : (
        <>

<ViewAtom fd="column" jc="flex-start" ai="center" pv={15} ph={0}  bg="transparent" br={0} mv={0} mh={0}>

            {cartItems.map((item, index) => renderItem({ item, index }))}
</ViewAtom>
       
       
        </>
      )}
    <ViewAtom  ai="center" w="100%" pv={30} ph={5} bg="transparent" br={0} mv={0} mh={0}>
    <ViewAtom fd="row" jc="space-between" ai="center"w="100%" pv={15} ph={5}          bg="transparent"   br={0}   mv={0} mh={0}>
                        <ViewAtom fd="row" ai="center"  pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
            <ViewAtom  fd="row" jc="space-between" ai="flex-start" pv={10}  ph={10}bg={COLORS.primaryShade} br={50}
                                mv={0} mh={15}     >
                                <Feather name='credit-card' size={SIZES.h5} color={COLORS.white} />
                            </ViewAtom>
                            <ViewAtom  fd="column"  ai="flex-start" pv={10}  ph={10} br={50}
                                mv={0} mh={15}     >
                            <TextAtom text={`Payment method`} c={COLORS.black} f="Poppins" s={SIZES.h5} w="500" />
                            <TextAtom text={`Visa ****8834`} c={COLORS.black} f="Poppins" s={SIZES.padding} w="500" />
                              
                            </ViewAtom>
                        </ViewAtom>
                        <Feather name="chevron-right" size={SIZES.h4} color={COLORS.primary} />
                    </ViewAtom>
        {/* <TouchableOpacity onPress={()=>navigation.navigate("BookingFour")}>

        </TouchableOpacity> */}
          <ViewAtom w="100%" pv={.3}  bg={COLORS.gray}   br={0}   mv={0} mh={0}></ViewAtom>
    <ViewAtom fd="row" jc="space-between" ai="center"w="100%" pv={15} ph={5}          bg="transparent"   br={0}   mv={5} mh={0}>
                        <ViewAtom fd="row" ai="center"  pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
            <ViewAtom  fd="row" jc="space-between" ai="flex-start" pv={10}  ph={10}bg={COLORS.primaryShade} br={50}
                                mv={0} mh={15}     >
                                <Feather name='navigation' size={SIZES.h5} color={COLORS.white} />
                            </ViewAtom>
                            <ViewAtom  fd="column"  ai="flex-start" pv={10}  ph={10} br={50}
                                mv={0} mh={15}     >
                            <TextAtom text={`Delivery address`} c={COLORS.black} f="Poppins" s={SIZES.h5} w="500" />
                            <TextAtom text={`Redsoil Rd. street 26`} c={COLORS.black} f="Poppins" s={SIZES.padding} w="500" />
                              
                            </ViewAtom>
                        </ViewAtom>
                        <Feather name="chevron-right" size={SIZES.h4} color={COLORS.primary} />
                    </ViewAtom>
                    <ViewAtom w="100%" pv={.3}  bg={COLORS.gray}   br={0}   mv={0} mh={0}></ViewAtom>
                 <ViewAtom fd="row" jc="space-between" ai="center"w="100%" pv={5} ph={5}          bg="transparent"   br={0}   mv={5} mh={0}>
                        <ViewAtom fd="row" ai="center"  pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
            <ViewAtom  fd="row" jc="space-between" ai="flex-start" pv={0}  ph={10}
                                mv={0} mh={15}     >
                            <TextAtom text={`Sub-Total`} c={COLORS.black} f="Poppins" s={SIZES.h5} w="500" />
                              
                            </ViewAtom>
                                                   </ViewAtom>
                        <TextAtom text={`Ksh ${calculateTotal().toFixed(2)}/=`} c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/>
                    </ViewAtom>
                 <ViewAtom fd="row" jc="space-between" ai="center"w="100%" pv={5} ph={5}          bg="transparent"   br={0}   mv={0} mh={0}>
                        <ViewAtom fd="row" ai="center"  pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
            <ViewAtom  fd="row" jc="space-between" ai="flex-start" pv={0}  ph={10}
                                mv={0} mh={15}     >
                            <TextAtom text={`Delivery fee`} c={COLORS.black} f="Poppins" s={SIZES.h5} w="500" />
                              
                            </ViewAtom>
                                                   </ViewAtom>
                        <TextAtom text={`Ksh 0.00/=`} c={COLORS.black} f="Poppins" s={SIZES.h5} w="500"/>
                    </ViewAtom>
                 <ViewAtom fd="row" jc="space-between" ai="center"w="100%" pv={5} ph={5}          bg="transparent"   br={0}   mv={0} mh={0}>
                        <ViewAtom fd="row" ai="center"  pv={0} ph={0} bg="transparent" br={0} mv={0} mh={0}>
            <ViewAtom  fd="row" jc="space-between" ai="flex-start" pv={0}  ph={10}
                                mv={0} mh={15}     >
                            <TextAtom text={`Total`} c={COLORS.black} f="Poppins1" s={SIZES.h5} w="500" />
                              
                            </ViewAtom>
                                                   </ViewAtom>
                  <TextAtom text={`Ksh ${calculateTotal().toFixed(2)}/=`} c={COLORS.black} f="Poppins1" s={SIZES.h5} w="500"/>
                    </ViewAtom>
                    {/* <View style={{}}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>${calculateTotal().toFixed(2)}</Text>
          </View> */}
        </ViewAtom>                 
 
    <ViewAtom  ai="center" w="100%" pv={30} ph={0} bg="transparent" br={0} mv={0} mh={0}>
       <Button text={"Checkout"} width="85%"bg={COLORS.primary}  borderRadius={5} screen="BookingFour"  onMethodSelected={onMethodSelected}/>
        </ViewAtom>                 
    </ScrollView>
  

 
         
    </RBSheet>
  )
})

export default Cart


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      emptyMessage: {
        fontSize: 18,
        textAlign: 'center',
      },
      itemsContainer: {
        flex: 1,
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 10,
        overflow: 'hidden',
      },
      itemImage: {
        width:50,
        height: 50,
        objectFit:'contain'
    
      },
      itemDetailsContainer: {
        flex: 1,
        marginLeft: 20,
      },
      itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    
      },
      cartItemDetails: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      cartItemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      cartItemPrice: {
        fontSize: 14,
        color: '#aaa',
      },
     quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      quantityButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        marginHorizontal: 5,
      },
      quantity: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 10,
      },
      cartItemTotal: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      removeButton: {
        marginLeft: 10,
        padding: 5,
        backgroundColor: '#ff6961',
        borderRadius: 5,
      },
      removeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
     totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      },
     totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      checkoutButton: {
        backgroundColor: '#008080',
        padding: 10,
        borderRadius: 5,
        marginVertical: 20,
      },
      checkoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
      }





})