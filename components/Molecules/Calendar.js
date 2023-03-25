import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, View ,TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, SIZES } from '../../constants/theme';
import {getDatesAndDays} from "../../utils/helper"
import TextAtom from '../Atoms/TextAtom';
import ViewAtom from '../Atoms/ViewAtom';

function Calendar({onDateSelected}) {
  function getDateObject(dateString) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // array of day names

    const now = new Date();
    const cyear = now.getFullYear();
    const dayOfWeek =days[now.getDay()]
    const monthName = monthNames[now.getMonth()];
    return {date: dateString, day: dayOfWeek,month: monthName,year: cyear  };
    
  }
    const TodaysDate=() =>{
        const day = new Date().getDate(); // get current day of the month
        const suffixes = ['th', 'st', 'nd', 'rd']; // array of suffixes
      
  // determine the suffix based on the last digit of the day
  const suffix =
    day % 10 === 1 && day !== 11
      ? suffixes[1]
      : day % 10 === 2 && day !== 12
      ? suffixes[2]
      : day % 10 === 3 && day !== 13
      ? suffixes[3]
      : suffixes[0];

  return `${day}${suffix}`; // return day with suffix
      }

      const tdatefnc=TodaysDate()
    const [ datesAndDays, setdatesAndDays]=useState([])
    const [ SDate, setSDate]=useState(tdatefnc)
    const ITEM_HEIGHT=40
    useEffect(() => {
        setdatesAndDays(getDatesAndDays())
        onDateSelected(getDateObject(SDate)) 
      
        scrollToActiveItem()
    }, [SDate])
    
    const handleDate=(d)=>{
        setSDate(d)
    }
    const flatListRef = useRef(null);
    const scrollToActiveItem = () => {
      if (datesAndDays.length > 0 && SDate !== null) {
        flatListRef.current.scrollToIndex({
          index: SDate.slice(0, -2)-1,
          animated: true,
          viewPosition: 0.5, // Set viewPosition to 0.5 to center the item
        });
      
       };
    };
  return (
    <FlatList
      data={datesAndDays}
      keyExtractor={item => item.date}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index
      })}
      onScrollToIndexFailed={() => {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }}
      ref={flatListRef}
      onContentSizeChange={() => flatListRef.current.scrollToIndex({ index: SDate.slice(0, -2)-1 })}
      renderItem={({ item }) => {    
        if (SDate===item.date) {
          // scrollToActiveItem() 
            return(
            <TouchableOpacity onPress={()=>{handleDate(item.date)}}>

                <ViewAtom fd="column" jc="center" ai="center"  pv={10} ph={3} bg={COLORS.gray4} br={30} mv={0} mh={3}>
                <ViewAtom   pv={3} ph={3} bg={COLORS.primary} br={50} mv={0} mh={0}>
                    
                    <TextAtom text={item.date} c={COLORS.gray} f="Poppins" s={SIZES.body5} w="500"/>

                </ViewAtom>
                    <TextAtom text={item.day} c={COLORS.black} f="Poppins" s={SIZES.body4} w="500"/>
                

                </ViewAtom>
                </TouchableOpacity>
            )
        }else{
            return(
            <TouchableOpacity onPress={()=>{handleDate(item.date)}}>

            <ViewAtom fd="column" jc="center" ai="center"  pv={10} ph={3} bg={COLORS.gray3} br={30} mv={0} mh={3}>
                <ViewAtom   pv={1} ph={1} bg={COLORS.gray4} br={50} mv={0} mh={0}>
                
                <TextAtom text={item.date} c={COLORS.black} f="Poppins" s={SIZES.body5} w="500"/>

                </ViewAtom>
                <TextAtom text={item.day} c={COLORS.black} f="Poppins" s={SIZES.body5} w="500"/>
                

            </ViewAtom>
            </TouchableOpacity>
            
            )

        }
    }
    }
    />
  );
}

export default Calendar;