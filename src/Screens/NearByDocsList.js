import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  PixelRatio,
  StatusBar,
  BackHandler,
  FlatList,
  Linking,
} from 'react-native';
import {BarChart, Grid} from 'react-native-svg-charts';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import Video from 'react-native-video';
import Identity from '../Components/cards/Identity';
import NearByCards from '../Components/cards/NearByCards';
import ConsultADoc from '../Components/cards/ConsultADoc';
// import BarChartView from '../Components/BarChartView'
import WalkingRecord from '../Components/cards/WalkingRecord';
import AvailDiscounts from '../Components/cards/AvailDiscounts';
import Navigation from '../Components/Navigation';
import Policy from '../Components/Policy';
import Card from '../Components/Card';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {ScrollableTabView} from 'react-native-scrollable-tab-view';
import {TouchableRipple} from 'react-native-paper';
import Ripple from 'react-native-material-ripple';
import Brands from '../Data/Dis_item';
import {completeDoctorsList} from '../Data/Dis_item';
import Geolocation from 'react-native-geolocation-service';

const FirstRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#ff4081'}]} />
);

const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
);

const ThirdRoute = () => (
  <View style={[styles.scene, {backgroundColor: 'green'}]} />
);

export default class NearByDocsList extends Component {
  static navigationOptions = {
    headerStyle: {
      marginTop: StatusBar.currentHeight,
      // backgroundColor: '#f4511e',
    },
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('User');
      return true;
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  tabsView(title) {
    console.log(title);
    this.state.tabView.map(item => {
      // if(title == item.key) {
      return (
        <View style={{...styles.scene, backgroundColor: item.color}}>
          <Text>Hello World</Text>
        </View>
      );
    });
  }

  googlePlaces(type) {
    var lats = global.latitude;
    var lng = global.longitude;
    var url =
      'https://www.google.com/maps/search/' + type + '/' + lats + ',' + lng;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  renderDiscountList(item) {
    return (
      <Ripple
        rippleColor="rgba(0, 0, 0, 0.32)"
        rippleSize={176}
        rippleDuration={400}
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          marginVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: '#ffffff',
          elevation: 2,
        }}
        onPress={() => {
          this.googlePlaces(item.type);
        }}>
        <View
          style={{
            flexDirection: 'column',
            flex: 0.15,
            justifyContent: 'center',
            alignItems: 'center',
            //   borderRadius: 10,
            //   borderWidth: 1,
            padding: 10,
            marginLeft: 5,
            //   borderColor: '#e0e0e0',
            marginVertical: 8,
          }}>
          <Image
            style={{justifyContent: 'center', width: 60, height: 60}}
            source={item.logo}
          />
        </View>

        <View
          style={{
            flex: 0.85,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginHorizontal: 10,
            marginVertical: 8,
          }}>
          <Text
            style={{
              flex: 0.8,
              fontSize: 15,
              // lineHeight: 22,
              // letterSpacing: 0.16,
              color: '#3a3a3a',
              fontWeight: '700',
            }}>
            {item.name}
          </Text>
          {/* <Text style={{
            fontSize: 14,
            // lineHeight: 20, 
            // letterSpacing: 0.16,
            color: '#a5a5a5'
          }}>
            {item.location}
          </Text> */}
          <Text
            style={{
              flex: 0.2,
              fontSize: 20,
              // lineHeight: 22,
              // letterSpacing: 0.16,
              color: '#ff7900',
              // color: '#0082DE',
              fontWeight: '700',
            }}>
            {item.count}{' '}
          </Text>
        </View>
      </Ripple>
    );
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}>
        <FlatList
          data={completeDoctorsList}
          renderItem={({item, index, separators}) =>
            this.renderDiscountList(item)
          }
        />

        <StatusBar backgroundColor="#000000" opaque />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  screen: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    flexDirection: 'column',
    backgroundColor: '#eeeeee',
  },
  cards: {
    justifyContent: 'space-around',
    marginVertical: 20,
    width: '100%',
    paddingHorizontal: 20,
    flex: 0.65,
  },
  identity: {
    flex: 0.35,
    // paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  grayView: {
    zIndex: 0,
    flex: 1,
    backgroundColor: 'transparent',
    opacity: 0.2,
  },
  logoView: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
