import React from 'react';        
import RootNavigation from './navigation';
import { AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { COLORS } from './constants/theme';
const IColors = {
  label: COLORS.white,
  card: COLORS.primary,
  overlay: 'rgba(0, 0, 0, 0.5)',
  success: COLORS.green,
  danger: COLORS.rose,
  warning: COLORS.gold,
};
const defaultProps = {
  toastConfig: {},
  theme: 'dark',
  colors: [IColors, IColors],
};
const PROJECTID = "c8b80935-74c5-4656-9669-e3686579f5a6";
console.log(`https://u.expo.dev/${PROJECTID}?channel-name=drgo5`);
console.log(`com.dr.go://expo-development-client/?url=https://u.expo.dev/${PROJECTID}?channel-name=drgo5`);
const App = ({ dialogConfig, toastConfig, theme, colors }) => {
  return (
    <AlertNotificationRoot dialogConfig={dialogConfig ?? defaultProps.dialogConfig} toastConfig={toastConfig ?? defaultProps.toastConfig} theme={theme ?? defaultProps.theme} colors={colors ?? defaultProps.colors}>
      <RootNavigation />
    </AlertNotificationRoot>
  );
};

App.defaultProps = defaultProps;

export default App;




