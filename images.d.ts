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
declare module '@env' {
  export const API_BASE: string;
  export const SUPABASE_URL: string;
  export const SUPABASE_KEY: string;
  export const SUPABASE_SERVICE_ROLE_KEY: string;
  export const SUPABASE_EMAIL: string;
  export const SUPABASE_PASSWORD: string;
  export const JWT_SECRET: string;
}
