import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    pointColor: string;
    pointDisabled: string;
    font: {
      headingBold: string;
      subTitleBold: string;
      subTitleRegular: string;
      bodyRegular: string;
    };
    shadow: {
      defaultShadow: string;
      buttonShadow: string;
    };
    fontColor: {
      titleColor: string;
      contentColor: string;
      commentColor: string;
    };
    activated: string;
    grayColor: string;
    header: string;
    main: string;
    chatBackground: string;
    myChat: string;
    otherChat: string;
  }
}
