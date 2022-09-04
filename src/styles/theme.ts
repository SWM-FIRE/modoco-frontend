import { DefaultTheme } from 'styled-components';

const defaultTheme = {
  shadow: {
    defaultShadow:
      'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
    buttonShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  },
  bgColor: '#121212',
  pointColor: '#8083FF',
  pointDisabled: 'rgba(128,131,255,0.5)',
  font: {
    headingBold: 'font-weight: 700; font-size: 4.8rem;',
    subTitleBold: 'font-weight: 700; font-size: 3.6rem;',
    subTitleRegular: 'font-weight: 400; font-size: 3.6rem;',
    bodyRegular: 'font-weight: 400; font-size: 1.2rem;',
  },
  fontColor: {
    titleColor: 'rgba(255,255,255,0.86)',
    contentColor: 'rgba(255,255,255,0.65)',
    commentColor: 'rgba(255,255,255,0.3)',
  },
  activated: '#2F3135',
  grayColor: '#727272',
};

const themeFire: DefaultTheme = {
  ...defaultTheme,
  header: '#0D0E13',
  main: '#0A0A14',
  chatBackground: '#1E1E22',
  otherChat: '#1F2331',
  myChat: '#353741',
  input: '#313540',
  newMessageAlarm: 'rgba(49, 53, 64, 80%)',
};

const themeOcean: DefaultTheme = {
  ...defaultTheme,
  header: '#265B60',
  main: '#387A81',
  chatBackground: '#1A464A',
  otherChat: '#1E3A41',
  myChat: '#4B6163',
  input: '#1E3A41',
  newMessageAlarm: 'rgba(30, 58, 65, 80%)',
};

const themeCamping: DefaultTheme = {
  ...defaultTheme,
  header: '#1E0E2B',
  main: '#251236',
  chatBackground: '#190B24',
  otherChat: '#3F3046',
  myChat: '#453A4B',
  input: '#413148',
  newMessageAlarm: 'rgba(65, 49, 72, 80%)',
};

const themeTravel: DefaultTheme = {
  ...defaultTheme,
  header: '#5F96B6',
  main: '#517C95',
  chatBackground: '#466B80',
  otherChat: '#2B4651',
  myChat: '#3A5A6B',
  input: '#3A5A6B',
  newMessageAlarm: 'rgba(58, 90, 107, 80%)',
};

const themeCosmos: DefaultTheme = {
  ...defaultTheme,
  header: '#010102',
  main: '#000000',
  chatBackground: '#06070A',
  otherChat: '#1F2331',
  myChat: '#353741',
  input: '#313540',
  newMessageAlarm: 'rgba(49, 53, 64, 80%)',
};

export {
  defaultTheme,
  themeFire,
  themeOcean,
  themeCamping,
  themeTravel,
  themeCosmos,
};
