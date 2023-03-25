import React, {  useContext,} from "react";
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
import AppointmentsScreen from "./screens/Appointments";
import Onboarding from "./screens/Onboarding";
import AccountScreen from "./screens/AccountScreen";
import ChatScreen from "./screens/ChatScreen"
import DoctorContactsList from "./screens/DoctorContactsList"

//Screens

const store = configureStore();
export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };
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
          <Stack.Screen name="Appointments" component={AppointmentsScreen} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="AccountScreen" component={AccountScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="DoctorContactsList" component={DoctorContactsList} />
     
        </Stack.Navigator>
        <FlashMessage
        position="top"
      />
      </NavigationContainer>
    </ReduxProvider>
  );
}
