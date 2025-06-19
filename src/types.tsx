export type RootStackParams = {
  Home: undefined;
  Login: {email?: string};
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
  Home: undefined;
  Chat: undefined;
};
