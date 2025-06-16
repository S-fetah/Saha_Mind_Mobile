export type RootStackParams = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  SecondSignUp: {fullName: string; email: string; birthDate: string};
  Main: undefined;
  GuestMain: undefined;
};

export type ProfileStackParams = {
  ProfileScreen: undefined;
  Settings: undefined;
  Privacy: undefined;
  Security: undefined;
  Help: undefined;
  About: undefined;
};
export type GuestTabParamList = {
  Guest: undefined;
  Chat: undefined;
};
