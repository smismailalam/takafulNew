import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  DeviceEventEmitter,
  NativeModules,  
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AppContainer from './navigation/navigator';
import UserScreen from './src/Screens/UserScreen';
import AvailDiscounts from './src/Components/cards/AvailDiscounts';
import NearByCards from './src/Components/cards/NearByCards';
import Navigation from './src/Components/Navigation';
import Policy from './src/Components/Policy';
import AuthenticationScreen from './src/Screens/AuthenticationScreen';
import Login from './src/Components/Login';
import Register from './src/Components/Register';
// import SplashScreen from './src/Screens/SplashScreen'
import SplashScreen from 'react-native-splash-screen';
import Pedometer from 'rn-universal-pedometer';
const mSensorManager = NativeModules.SensorManager;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      splash: true,
    };
    // http://54.36.109.50/TakafulAPI//default/index
    // global.API_URL = 'http://192.168.21.212:5000';
    global.API_URL = 'https://iteck.pk/TakafulAPI';
    // global.API_URL = 'http://110.93.216.20:130';
    // global.API_URL = '192.168.21.';
  }
  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      this.refs.toast.show('Location permission denied by user.', 1500);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      this.refs.toast.show('Location permission revoked by user.', 1500);
    }

    return false;
  };
  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) return;
    Geolocation.getCurrentPosition(
      position => {
        console.log(position.coords);
        global.lat = position.coords.latitude;
        global.long = position.coords.longitude;
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 50,
        forceRequestLocation: true,
      },
    );
  };
  async componentDidMount() {
    this.getLocation();
  }
  getData = () => {
    const now = new Date();
    Pedometer.startPedometerUpdatesFromDate(now.getTime(), pedometerData => {
      // console.log('Pedometer Data ===== ', pedometerData);
    });
  };

  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    backgroundColor: '#E5E5E5',
  },
});
