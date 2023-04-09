import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, Linking, Platform } from "react-native";
import { openSettings } from "expo-linking";

export const  NotificationsHandler = () => {

  const registerForPushNotificationsAsync = async (alertUser) => {
    if (Device.isDevice) {
      if (!true) return;
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        if (alertUser)
          Alert.alert(
            "Error",
            "To enable Push Notifications please change your settings.",
            [
              {
                text: "OK",
              },
              {
                text: "Open Settings",
                onPress: openSettings,
              },
            ]
          );

        // if (true) setAllowsNotifications(false);
        // throw new Error("User doesn't allow for notifications");
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("TOKEN",token);

      // addPushToken(token);
      // if (true) setAllowsNotifications(true);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  const handleNotification = (notification) => {
    // could be useful if you want to display your own toast message
    // could also make a server call to refresh data in other part of the app
  };

  const handleNotificationResponse = (response) => {
    const data = response.notification.request.content.data;

    if (data && data.url) Linking.openURL(data.url);
  };

  return {
    registerForPushNotificationsAsync,
    handleNotification,
    handleNotificationResponse,
  };
};