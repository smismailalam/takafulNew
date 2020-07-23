import {createAppContainer} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import UserScreen from '../src/Screens/UserScreen';
import AuthenticationScreen from '../src/Screens/AuthenticationScreen';
import DiscountScreen from '../src/Screens/DiscountScreen';
import HospitalScreen from '../src/Screens/HospitalScreen';
import OldInvoiceScreen from '../src/Screens/OldInvoice';
import OffersScreen from '../src/Screens/OffersScreen';
import RedeemScreen from '../src/Screens/RedeemScreen';
import AudioCall from '../src/Components/AudioCall';
import ChatScreen from '../src/Screens/ChatScreen';
import NearByList from '../src/Screens/NearByDocsList';
import VideoCall from '../src/Screens/VideoCall';
import History from '../src/Screens/History';
import OlaDoc from '../src/Screens/OlaDoc';
import TicketHistory from '../src/Screens/TicketHistory';
import {StatusBar} from 'react-native';
import Lodge_a_Claim from '../src/Screens/Lodge_a_Claim';
import StepsScreen from '../src/Screens/StepsScreen';
import PayAsYouDriveScreen from '../src/Screens/PayAsYouDriveScreen';
import Live from '../src/Screens/Live';

const AppNavigator = createStackNavigator(
  {
    Authentication: {
      screen: AuthenticationScreen,
      navigationOptions: TransitionPresets.SlideFromRightIOS,
    },
    User: {
      screen: UserScreen,
      navigationOptions: TransitionPresets.SlideFromRightIOS,
    },
    LodgeClaim: {
      screen: Lodge_a_Claim,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Discount: {
      screen: DiscountScreen,
      navigationOptions: {
        headerTitle: 'Discount Center',
      },
    },
    OldInvoice: {
      screen: OldInvoiceScreen,
      navigationOptions: {
        headerTitle: 'Old Invoices',
      },
    },
    Hospital: {
      screen: HospitalScreen,
      navigationOptions: {
        headerTitle: 'Panel Hospitals',
      },
    },
    Offers: {
      screen: OffersScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Redeem: {
      screen: RedeemScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Call: {
      screen: AudioCall,
      navigationOptions: () => ({
        header: null,
      }),
    },
    NearByList: {
      screen: NearByList,
      navigationOptions: () => ({
        headerTitle: 'Near By Doctors',
        headerStyle: {
          marginTop: StatusBar.currentHeight,
          backgroundColor: '#ffffff',
        },
      }),
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: TransitionPresets.SlideFromRightIOS,
    },
    Live: {
      screen: Live,
      navigationOptions: TransitionPresets.SlideFromRightIOS,
    },
    VideoCall: {
      screen: VideoCall,
      navigationOptions: () => ({
        header: null,
      }),
    },
    History: {
      screen: History,
      navigationOptions: TransitionPresets.SlideFromRightIOS,
    },
    OlaDoc: {
      screen: OlaDoc,
      navigationOptions: TransitionPresets.SlideFromRightIOS,
    },
    TicketHistory: {
      screen: TicketHistory,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Steps: {
      screen: StepsScreen,
      navigationOptions: TransitionPresets.SlideFromRightIOS,
    },
    PayAsYouDrive: {
      screen: PayAsYouDriveScreen,
      navigationOptions: () => ({
        headerTitle: 'Pay As You Drive',
        headerStyle: {
          marginTop: StatusBar.currentHeight,
          backgroundColor: '#ffffff',
        },
      }),
    },
  },
  {
    initialRouteName: 'Authentication',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
