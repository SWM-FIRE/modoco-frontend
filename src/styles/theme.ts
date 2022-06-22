import { DefaultTheme } from 'styled-components';

const defaultTheme: DefaultTheme = {
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

export { defaultTheme };
