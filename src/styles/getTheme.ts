import { DefaultTheme } from 'styled-components';
import {
  themeOcean,
  themeCamping,
  themeCosmos,
  themeFire,
  themeTravel,
} from './theme';

export const getTheme = (theme: string): DefaultTheme => {
  switch (theme) {
    case 'ocean':
      return themeOcean;
    case 'fire':
      return themeFire;
    case 'camping':
      return themeCamping;
    case 'cosmos':
      return themeCosmos;
    case 'travel':
      return themeTravel;
    default:
      return themeFire;
  }
};
