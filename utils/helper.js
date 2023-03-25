import { BASE_URL } from "./index"
import * as Location from 'expo-location'
import { GOOGLE_MAP_KEY } from './index';


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
                
                // for(let item of addressResponse){
                //     let currentAddress = `${item.name}, ${item.city}, ${item.country}`
                //     const currentAddressName= `${item.name}, ${item.city}`
                //     console.log(coords)
            
                //     const ClinicSearchName= `Equity Afia ${currentAddressName}`
                //     const clinics=await LocationSearch(ClinicSearchName)
                //     if (clinics.length>1){

                //         const nearestClinic=clinics.map((clinic)=>{
                //         const dist=getDistanceBetweenCoordinates(coords.latitude,coords.longitude, clinic.geo.lat, clinic.geo.lng)
                //         return {...clinic,dist}
                            
                //         })
                //         const n=nearestClinic?.reduce((min, current) => current.dist < min.dist ? current : min);
                       
                // //TO BE FIXED ONCE I UPDATE MY GOOGLE MAPS API
                //                    /// return {currentAddress,coords,item ,clinics,n}
                //                   }
                //                 }
                                return true
            }else{                                

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


    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchTerm}&key=${GOOGLE_MAP_KEY }`
        );
        const data = await response.json();
        console.log("=====================clinic data============",data?.results[0]);
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
