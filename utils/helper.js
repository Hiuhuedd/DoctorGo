

import { BASE_URL } from "./index"
import * as Location from 'expo-location'
import { GOOGLE_MAP_KEY } from './index';

import AsyncStorage from '@react-native-async-storage/async-storage'

const moment = require('moment');
export const getUserLocation= async()=>{


            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted'){
                alert('Permission to access location is not granted')
            }
            
            let location = await Location.getCurrentPositionAsync({});
            
            const { coords } = location

            if(coords){

                const { latitude, longitude} = coords;
                let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude})
                
                for(let item of addressResponse){
                    let currentAddress = `${item.name}, ${item.city}, ${item.country}`
                    const currentAddressName= `${item.name}, ${item.city}`
                    console.log(coords)
            
                    const ClinicSearchName= `Equity Afia`
                    const clinics=await LocationSearch(ClinicSearchName)
                    if (clinics.length>1){

                        const nearestClinic=clinics.map((clinic)=>{
                        const dist=getDistanceBetweenCoordinates(coords.latitude,coords.longitude, clinic.geo.lat, clinic.geo.lng)
                        return {...clinic,dist}
                            
                        })
                        const n=nearestClinic?.reduce((min, current) => current.dist < min.dist ? current : min);
                       
                // //TO BE FIXED ONCE I UPDATE MY GOOGLE MAPS API
                return {currentAddress,coords,item ,clinics,n}
              }
            }
            
            
            
          }else{                                
              console.log({currentAddress,coords,item ,clinics,n});

                //notify user something went wrong with location
            }



}
 
const getDistanceBetweenCoordinates=(lat1, lon1, lat2, lon2)=> {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
  }

export const LocationSearch = async(searchTerm) => {
console.log("search=============",searchTerm,GOOGLE_MAP_KEY);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchTerm}&key=${GOOGLE_MAP_KEY }`
        );
        const data = await response.json();
        console.log("=====================clinic data============",data);
        const resFomat=data?.results.map(clinic=>{
           const fmt= {
            name:clinic.name,
              geo:clinic.geometry.location,
              icon:clinic.icon, 
              iMask: clinic.icon_mask_base_uri,
              totalRating: clinic.user_ratings_total,
              rating: clinic.rating,
              type: clinic.types,
              img: clinic.photos,
                }
                return fmt
        })
      
      
      
   
    return resFomat
     
    } catch (error) {
   alert(error.message);
    }
 

  return
};


export const greet=() =>{
  const time = new Date().getHours();
  if (time < 12) {
    return 'Good morning';
  } else if (time < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}


export const getDatesAndDays= () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const numDays = new Date(year, month + 1, 0).getDate();
  const datesAndDays = [];

  for (let i = 1; i <= numDays; i++) {
    const date = new Date(year, month, i);
    const day = date.toLocaleString('en-us', { weekday: 'short' });
    const dayName = day.slice(0, 3);
    console.log(day); 
    // const MonthName = day.slice(0, 3); 
    const dateStr = `${i}${getOrdinalSuffix(i)}`;

    datesAndDays.push({ date: dateStr,day:dayName });
  }

  return datesAndDays;
}

function getOrdinalSuffix(day) {
  const j = day % 10;
  const k = day % 100;

  if (j === 1 && k !== 11) {
    return "st";
  }

  if (j === 2 && k !== 12) {
    return "nd";
  }

  if (j === 3 && k !== 13) {
    return "rd";
  }

  return "th";
}

export const checkAppointmentStatus=(appointments) =>

{
  const now = new Date(); // get the current date and time

  for (let i = 0; i < appointments.length; i++) {
    const appointment = appointments[i][1];
    const s_time = appointment.TimeShift[0].s_time;

    const appointmentDate = new Date(`${appointment.Schedule.year}-${appointment.Schedule.month}-${appointment.Schedule.date}T${s_time}`);

    if (appointmentDate > now) {
      console.log(`Appointment ${i+1} is upcoming`);
    } else {
      console.log(`Appointment ${i+1} is past`);
    }
  }
}

export const getUpcomingAppointments = (appointments) => {
  const now = new Date().getTime();

  const upcomingAppointments = appointments.filter((appointment) => {
    const s_time = appointment[1].TimeShift[0].s_time;
    const d = `${appointment[1].Schedule.month} ${appointment[1].Schedule.date} ${appointment[1].Schedule.year} ${s_time} `;
    const formatStr = 'MMM Do YYYY h:mm a';
    const dateMoment = moment(d, formatStr);
    const appointmentDate = dateMoment.valueOf();

    return appointmentDate > now;
  });

  return upcomingAppointments;
};


export const getPastAppointments=(appointments)=> {
  const now = new Date().getTime();

  const pastAppointments = appointments.filter((appointment) => {
    const s_time = appointment[1].TimeShift[0].s_time;
    const d = `${appointment[1].Schedule.month} ${appointment[1].Schedule.date} ${appointment[1].Schedule.year} ${s_time} `;
    const formatStr = 'MMM Do YYYY h:mm a';
    const dateMoment = moment(d, formatStr);
    const appointmentDate = dateMoment.valueOf();

    return appointmentDate < now;
  });

  return pastAppointments;
}
 
   //==============================LOCAL STORAGE ============================
   export const handleAppointmentStorage=(all,card)=>{
    // Retrieve existing data from AsyncStorage
    AsyncStorage.getItem('Appointments').then((data) => {
        // Parse the existing data from a string to a JavaScript object
        const existingData = data ? JSON.parse(data) : {};
        
        // Get the current time as a string
        const currentTime = new Date().toISOString();
        
        // Set the new data property to the current time
        existingData[currentTime] = {...all,id: currentTime};
        
       
        // Convert the updated data object back to a string
        const updatedData = JSON.stringify(existingData);
        console.log(updatedData);
        // Save the updated data string to AsyncStorage
        AsyncStorage.setItem('Appointments', updatedData);
});
  
    const updatedCard = JSON.stringify(card);
    // Save the updated card data string to AsyncStorage
    AsyncStorage.setItem('card', updatedCard);
}
export const handleAppointmentsRetrieval=async()=>{
  // Retrieve existing data from AsyncStorage
 const data=await AsyncStorage.getItem('Appointments')
    const existingData = data ? JSON.parse(data) : false;
    if(existingData){
        return Object.entries(existingData)
    }
 

}