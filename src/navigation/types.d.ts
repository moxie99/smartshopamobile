import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';

export type AppNavRoutes = {
  CreateRequestScreen: undefined;
  EditProfile: undefined;
  HomeScreen: undefined;
  IndexScreen: undefined;
  LoginScreen: undefined;
  BvnInfoScreen: undefined;
  BvnServiceScreen: undefined;
  BvnUploadScreen: undefined;
  BvnPersonalInfoScreen: undefined;
  OtpVerificationScreen: undefined;
  NewRequestScreen: undefined;
  RequestDetailsScreen: undefined;
  NextOfKinScreen: undefined;
  PendingAccountScreen: undefined;
  CreatedAccountScreen: undefined;
  FailedAccountScreen: undefined;
  ProductRoot: NavigatorScreenParams<ProductRootTabParamList> | undefined;
  OrderRoot: NavigatorScreenParams<OrderRootTabParamList> | undefined;
  PaymentRoot: NavigatorScreenParams<PaymentRootTabParamList> | undefined;
  MainRoot: NavigatorScreenParams<MainRootTabParamList> | undefined;
};

export type ProductRootTabParamList = {
  ProductHome: undefined;
  AddProducts: undefined;
  AllProducts: undefined;
  DiscountProduct: undefined;
};

export type MainRootTabParamList = {
  Dashboard: undefined;
  Chat: undefined;
};

export type OrderRootTabParamList = {
  OrderHome: undefined;
  CancelledOrders: undefined;
  OngoingOrders: undefined;
  PendingOrders: undefined;
  SuccessfulOrders: undefined;
};

export type PaymentRootTabParamList = {
  RequestPayment: undefined;
  SuccessfulPayment: undefined;
  PaymentHome: undefined;
  Account: undefined;
};

export type StackParamsList = AppNavRoutes;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamsList {}
  }
}
