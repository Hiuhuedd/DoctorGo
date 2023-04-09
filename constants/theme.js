import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {

    primary: '#eab308',
    // primary: '#0369a1',
    // primary: '#2563eb',
    // primary: '#38bdf8',
    // primary: '#fbbf24',
    // primary: '#14532d',
    // primary: '#581c87',
    // primary: '#701a75',
    // primary: '#b45309',
    // primary: '#008873',
    // primary: '#eab308',

    primaryShade:hexToRGBA('#eab308',.6),
    // primary: '#3b82f6', //blue
    // primary: '#991b1b', //red
    rose: '#be123c', //rose
    green: '#15803d', 
    gray: '#EEF1F3',
    gray3: '#f4f4f5',
    gray4: '#e5e5e5',
    gray2: '#a3a3a3',
    white: '#fff',
    gold: '#eab308',
    black: '#171717',
    fillColor:"#00000a10" 

};
export const WEIGHT = {

    light: 200,
    light2: 300,
    bold: 500,
    bold2: 600,
    bold3: 700,

};

export const SIZES = {
  // global sizes
  icon:20,
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 45,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};



export const FONTS = {
  primaryFam: {
    fontFamily: 'Roboto-regular',
  },
  secondaryFam: {
    fontFamily: 'Poppins-Regular',
  },
};


function hexToRGBA(hex, alpha) {
  // Parse the hex color string into individual R, G, B values
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // If an alpha value is provided, use it, otherwise default to 1
  alpha = alpha === undefined ? 1 : alpha;

  // Build the RGBA color string using the R, G, B, and alpha values
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const appTheme = {COLORS, SIZES,WEIGHT, FONTS};

export default appTheme;
