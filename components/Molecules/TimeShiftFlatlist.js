import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import TextAtom from '../Atoms/TextAtom';
import ViewAtom from '../Atoms/ViewAtom';



const TimeShiftFlatlist=({data,setId})=> {
    const [ Stime, setStime]=useState("10:00 am")
    
    useEffect(() => {
     
    }, [])
    
    const handleTime=(d,i)=>{
        if(Stime===d){
        setStime("unselected")
        }else{
         
            setStime(d)
            setId(i)
        }
    }
   
  return (
    
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => {


        if(Stime===item.s_time){
            return (
               // Render your grid item UI here...
           
            
                <TouchableOpacity onPress={()=>{handleTime(item.s_time,item.id)}}>
           
                   <ViewAtom fd="column" jc="center" ai="center"  pv={11} ph={27} bg={COLORS.primary} br={17} mv={5} mh={3}>
                        <TextAtom text={item.s_time} c={COLORS.white} f="Poppins" s={SIZES.body5} w="500"/>
                   </ViewAtom>
                   
               </TouchableOpacity>
           
             );
       
        }else{
           return (
               // Render your grid item UI here...
           
            
                <TouchableOpacity onPress={()=>{handleTime(item.s_time,item.id)}}>
           
                   <ViewAtom fd="column" jc="center" ai="center"  pv={11} ph={27} bg={COLORS.gray3} br={17} mv={5} mh={3}>
                        <TextAtom text={item.s_time} c={COLORS.black} f="Poppins" s={SIZES.body5} w="500"/>
                   </ViewAtom>
                   
               </TouchableOpacity>
           
             );
        }
      }}
      numColumns={3} // Render 4 columns
      style={{ paddingVertical: 15}}
    />
  );
}
export default TimeShiftFlatlist

