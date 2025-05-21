// images.d.ts
declare module '*.png' {
  const value: ImageSourcePropType;
  export default value;
}
declare module '*.jpg' {
  const value: ImageSourcePropType;
  export default value;
}
declare module '*.gif' {
  const value: ImageSourcePropType;
  export default value;
}
declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
