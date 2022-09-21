export const mediaQuery = (maxWidth: number) => {
  return `@media screen and (max-width: ${maxWidth}px)`;
};

const media = {
  xxsmall: mediaQuery(300),
  xsmall: mediaQuery(500),
  small: mediaQuery(768),
  medium: mediaQuery(1024),
  large: mediaQuery(1300),
  xlarge: mediaQuery(1440),
  xxlarge: mediaQuery(1919),
};

export default media;
