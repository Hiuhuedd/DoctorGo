import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Platform,TextInput,BackHandler } from 'react-native';
import MapView, { Marker, AnimatedRegion,Circle,Callout} from 'react-native-maps';
import { GOOGLE_MAP_KEY } from '../utils';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from '../components/Molecules/BottomSheet';
import { COLORS } from '../constants/theme';
import BottomSheetDeli from '../components/Molecules/BottomSheetDeli';



const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.07;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DeliMap = ({ navigation}) => {
    //==============================BOTTOM SHEET============================
    const closeSheet = (t) => {


        if (sheetRef.current) {
          sheetRef.current.close();
        }
      };
      const openSheet = () => {
        if (sheetRef.current) {
          sheetRef.current.open();
        }
    };
    const onMethodSelected = (method) => {
      closeSheet();
    };
    const sheetRef = useRef(null);  
     //==============================REDUX============================
    const coords = useSelector (
        (state) => state.userReducer.coords
        );
    const nearestclinic = useSelector (
        (state) => state.userReducer.nearestclinic
        );
 //==============================CLINIC IMAGE============================
        const photo_reference=`${nearestclinic.img[0].photo_reference}`
        // const photoReference = 'your_photo_reference_here';
        const maxWidth = 500;
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo_reference}&maxwidth=${maxWidth}&key=${GOOGLE_MAP_KEY}`;
        
        
//==============================Backpress============================


const handleBackPress=()=>{
    
    navigation.navigate("Medicine")
    return true
   
}
useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress',handleBackPress);
    openSheet()
}, [])
useEffect(() => {
   
    BackHandler.addEventListener('hardwareBackPress',handleBackPress);
    return()=>{
        BackHandler.removeEventListener('hardwareBackPress',handleBackPress);
        
    }
}, [])
//==============================MAP STATE============================

        const { latitude, longitude} = coords;
        const [ pin, setPin ] = useState({
            latitude: latitude,
            longitude: longitude,
        })
        const mapRef = useRef()
    const markerRef = useRef()
 

    const [state, setState] = useState({
        curLoc: {
            latitude: latitude,
            longitude: longitude,
        },
        destinationCords: {    
            latitude: nearestclinic.geo.lat,
            longitude:  nearestclinic.geo.lng,
        },
        isLoading: true,
        coordinate: new AnimatedRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),
        time: 0,
        distance: 0,
        heading: 0

    })

    const { curLoc, time, distance, destinationCords, isLoading, coordinate,heading } = state
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const [SelectedMarker, setSelectedMarker] = useState(destinationCords);
 


  
    const onCenter = () => {
        openSheet()
        mapRef.current.animateToRegion({
            latitude: curLoc.latitude,
            longitude: curLoc.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    }

    const fetchTime = (d, t) => {
        updateState({
            distance: d,
            time: t
        })
    }
    useEffect(() => {
        setSelectedMarker(true);
      }, []);
      const CustomMarker = () => (
        <View style={styles.marker}>
          <Image source={require('../assets/userPoint.png')} style={styles.markerImage} />
        </View>
      );
      const CustomMarker2 = () => (
        <View style={styles.marker}>
            <Text style={styles.text}> {nearestclinic.name}</Text>
          <Image source={require('../assets/afia.png')} style={styles.markerImage} />
        </View>
      );
    return (
        <View style={styles.container}>

          
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapRef}
                    customMapStyle={mapStyle}
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        ...curLoc,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >




                    <Marker coordinate={pin}>
                         <CustomMarker/>
                    </Marker>
                    
                    <Circle center={pin} radius={2000} strokeColor="#fff" fillColor="#00000a10"  />

                {Object.keys(destinationCords).length > 0 && (
                    
                    <Marker coordinate={destinationCords}>
                        <CustomMarker2/>                                       
                    </Marker>
                )}

                {Object.keys(destinationCords).length > 0 && (
                
                <MapViewDirections
                    origin={curLoc}
                    destination={destinationCords}
                    apikey={GOOGLE_MAP_KEY}
                    strokeWidth={3}
                    strokeColor={COLORS.primary}
                    optimizeWaypoints={true}
                    onStart={(params) => {
                        console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                    }}
                    onReady={result => {
                        console.log(`Distance: ${result.distance} km`)
                        console.log(`Duration: ${result.duration} min.`)
                        fetchTime(result.distance, result.duration),
                            mapRef.current.fitToCoordinates(result.coordinates, {                        
                            });
                    }}
                    onError={(errorMessage) => {
                        // console.log('GOT AN ERROR');
                    }}
                />
                )}
                </MapView>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 50,
                        right: 0
                    }}
                    onPress={onCenter}
                >
                    <Image source={require('../assets/greenIndicator.png')} />
                </TouchableOpacity>
               
               
             
            </View> 
            <BottomSheetDeli onMethodSelected={closeSheet} ref={sheetRef} navigation={navigation} nearestclinic={nearestclinic} photoUrl={photoUrl} state={state}/> 
        </View>
    );  
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
  text:{
fontWeight:"500",
color:"#008873",
fontSize:13

  },

  marker: {
    width: 200,
    height: 100,
    alignItems: 'center',
    paddingTop:10,
    // backgroundColor:"#00000a10" ,
    // borderRadius:5

  },
  markerImage: {
   
    width: 78,
    height: 70
  },
});

export default DeliMap;

const mapStyle = [
{
elementType: 'geometry',
stylers: [
{
color: '#f5f5f5'
},
{
lightness: 20
}
]
},
{
elementType: 'labels.text.stroke',
stylers: [
{
color: '#f5f5f5'
},
{
weight: 2
}
]
},
{
elementType: 'labels.text.fill',
stylers: [
{
color: '#616161'
}
]
},
{
elementType: 'labels.icon',
stylers: [
{
visibility: 'on'
}
]
},
{
featureType: 'administrative',
elementType: 'labels.text.fill',
stylers: [
{
color: '#757575'
}
]
},
{
featureType: 'administrative.land_parcel',
stylers: [
{
visibility: 'off'
}
]
},
{
featureType: 'administrative.neighborhood',
stylers: [
{
visibility: 'off'
}
]
},
{
featureType: 'poi',
elementType: 'labels.text.fill',
stylers: [
{
color: '#757575'
}
]
},
{
featureType: 'poi.park',
elementType: 'geometry',
stylers: [
{
color: '#e5e5e5'
}
]
},
{
featureType: 'poi.park',
elementType: 'labels.text.fill',
stylers: [
{
color: '#9e9e9e'
}
]
},
{
featureType: 'road',
elementType: 'geometry',
stylers: [
{
color: '#ffffff'
}
]
},
{
featureType: 'road',
elementType: 'labels.text.fill',
stylers: [
{
color: '#757575'
}
]
},
{
featureType: 'road.highway',
elementType: 'geometry',
stylers: [
{
color: '#dadada'
}
]
},
{
featureType: 'road.highway',
elementType: 'labels.text.fill',
stylers: [
{
color: '#616161'
}
]
},
{
featureType: 'road.highway.controlled_access',
elementType: 'geometry',
stylers: [
{
color: '#4E4E4E'
}
]
},
{
featureType: 'road.local',
elementType: 'labels.text.fill',
stylers: [
{
color: '#616161'
}
]
},
{
featureType: 'transit',
elementType: 'labels.text.fill',
stylers: [
{
color: '#757575'
}
]
},
{
featureType: 'water',
elementType: 'geometry',
stylers: [
{
color: '#000000'
}
]
},
{
featureType: 'water',
elementType: 'labels.text.fill',
stylers: [
{
color: '#3D3D3D'
}
]
}
];