// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home/Home';
import NavigationBar from './components/BottomNavigation/Navigation';
import CoinGraph from './components/Home/CryptoGraph';
import TradeTab from './components/TradeTab/Trade';
import AssetsTab from './components/AssetsTab/Assets';
import Login from './components/AccountVerification/Login/Login';
import Register from './components/AccountVerification/Signup/Signup';
import Onboarding from './components/AccountVerification/Onboaring';
import ConfirmInfo from './components/AccountVerification/Signup/ConfirmInfo';
import UnderReview from './components/AccountVerification/Signup/UnderReview';
import SplashScreen from './components/SplashScreen';
import PhoneVerifcation from './components/AccountVerification/Signup/PhoneVerification';
import GettingVerified from './components/AccountVerification/Signup/GettingVerified';
import DocumentVerification from './components/AccountVerification/Signup/DocumentVerification';
import DocumentUpload from './components/AccountVerification/Signup/DocumentUpload';
import LoginVerification from './components/AccountVerification/Login/LoginVerification';
import Market from './components/Home/Market';
import Notifications from './components/Home/Notifications';
import P2PNavigation from './components/P2P&Screens/P2PNavigation';
import P2PTrade from './components/P2P&Screens/P2PTrade';
import Orders from './components/P2P&Screens/Orders';
import Chatlist from './components/P2P&Screens/ChatScreens/Chatlist';
import Chatinterface from './components/P2P&Screens/ChatScreens/Chatinterface';
import TraderProfile from './components/P2P&Screens/ChatScreens/TraderProfile';
import Profile from './components/P2P&Screens/Profile&Screens/ProfileScreen';
import AddPaymentDetails from './components/P2P&Screens/Profile&Screens/PaymentMethods/AddPaymentDetails';
import P2PPaymentMethods from './components/P2P&Screens/Profile&Screens/PaymentMethods/P2PPaymentMethods';
import SelectPaymentMethod from './components/P2P&Screens/Profile&Screens/PaymentMethods/SelectPaymentMethod';
import PlacingOrder from './components/P2P&Screens/P2PBuying/PlacingOrder';
import MakingPayment from './components/P2P&Screens/P2PBuying/MakingPayment';
import OrderCreated from './components/P2P&Screens/P2PBuying/OrderCreated';
import OrderCancelled from './components/P2P&Screens/P2PBuying/OrderCancelled';
import LivenessCheck from './components/AccountVerification/Signup/LivenessCheck';
import SelectCoin from './components/P2P&Screens/Profile&Screens/Deposit/SelectCoin';
import DepositCoin from './components/P2P&Screens/Profile&Screens/Deposit/DepsotisCoin';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="NavigationBar"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="NavigationBar" component={NavigationBar} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CoinGraph" component={CoinGraph} />
        <Stack.Screen name="TradeTab" component={TradeTab} />
        <Stack.Screen name="AssetsTab" component={AssetsTab} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="ConfirmInfo" component={ConfirmInfo} />
        <Stack.Screen name="UnderReview" component={UnderReview} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="PhoneVerifcation" component={PhoneVerifcation} />
        <Stack.Screen name="GettingVerified" component={GettingVerified} />
        <Stack.Screen
          name="DocumentVerification"
          component={DocumentVerification}
        />
        <Stack.Screen name="DocumentUpload" component={DocumentUpload} />
        <Stack.Screen name="LoginVerification" component={LoginVerification} />
        <Stack.Screen name="Market" component={Market} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="P2PNavigation" component={P2PNavigation} />
        <Stack.Screen name="P2PTrade" component={P2PTrade} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Chatlist" component={Chatlist} />
        <Stack.Screen name="Chatinterface" component={Chatinterface} />
        <Stack.Screen name="TraderProfile" component={TraderProfile} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="AddPaymentDetails" component={AddPaymentDetails} />
        <Stack.Screen name="P2PPaymentMethods" component={P2PPaymentMethods} />
        <Stack.Screen
          name="SelectPaymentMethod"
          component={SelectPaymentMethod}
        />
        <Stack.Screen name="MakingPayment" component={MakingPayment} />
        <Stack.Screen name="OrderCreated" component={OrderCreated} />
        <Stack.Screen name="PlacingOrder" component={PlacingOrder} />
        <Stack.Screen name="OrderCancelled" component={OrderCancelled} />
        <Stack.Screen name="LivenessCheck" component={LivenessCheck} />
        <Stack.Screen name="SelectCoin" component={SelectCoin} />
        <Stack.Screen name="DepositCoin" component={DepositCoin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
