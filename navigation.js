import React, {  useContext,useEffect} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, NavigationContext, } from "@react-navigation/native";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import FirstScreen from "./screens/FirstScreen";
import FlashMessage from 'react-native-flash-message';
import MapView from './screens/MapView';
import Home from "./screens/Home";
import BookingOne from "./screens/BookingOne";
import BookingTwo from "./screens/BookingTwo";
import BookingThree from "./screens/BookingThree";
import BookingFour from "./screens/BookingFour";
import BookingSummary from "./screens/BookingSummary";
import AuthScreen from "./screens/AuthScreen";
import LoginScreen from "./screens/LoginScreen";
import AppointmentsScreen from "./screens/Appointments";
import Onboarding from "./screens/Onboarding";
import AccountScreen from "./screens/AccountScreen";
import ChatScreen from "./screens/ChatScreen"
import DoctorContactsList from "./screens/DoctorContactsList"
import * as Notifications from "expo-notifications";
import { NotificationsHandler } from "./utils/notifications";
import Medicine from "./screens/Medicine";
import MedicineDetails from "./screens/MedicineDetails";
import DeliMap from "./screens/DeliMap";
//Screens

const store = configureStore();
export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };
 //======== ============================================================
  const { registerForPushNotificationsAsync, handleNotificationResponse } =
  NotificationsHandler();

useEffect(() => {
  registerForPushNotificationsAsync();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const responseListener =
    Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );

    const schedulingOptions = {
      content: {
        title: "Doctor.Go",
        body: "You have 1 appointment today",
      },
      trigger: {
        seconds: 10,
      },
    };
    
    // Schedule the notification
    Notifications.scheduleNotificationAsync(schedulingOptions);
  return () => {
    if (responseListener)
      Notifications.removeNotificationSubscription(responseListener);
  };
  

}, []);

//=======================================================================
  const navigation = useContext(NavigationContext) 
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="FirstScreen" screenOptions={screenOptions}>
          <Stack.Screen name="FirstScreen" component={FirstScreen} />
          <Stack.Screen name="MapView" component={MapView} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="BookingOne" component={BookingOne} />
          <Stack.Screen name="BookingTwo" component={BookingTwo} />
          <Stack.Screen name="BookingThree" component={BookingThree} />
          <Stack.Screen name="BookingFour" component={BookingFour} />
          <Stack.Screen name="BookingSummary" component={BookingSummary} />
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Appointments" component={AppointmentsScreen} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="AccountScreen" component={AccountScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="DoctorContactsList" component={DoctorContactsList} />
          <Stack.Screen name="Medicine" component={Medicine} />
          <Stack.Screen name="MedicineDetails" component={MedicineDetails} />
          <Stack.Screen name="DeliMap" component={DeliMap} />
     
        </Stack.Navigator>
        <FlashMessage
        position="top"
      />
      </NavigationContainer>
    </ReduxProvider>
  );
}
