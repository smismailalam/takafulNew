import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  ScrollView,
  PixelRatio,
  StatusBar,
  PermissionsAndroid,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import PulseLoader from 'react-native-pulse-loader';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Identity from '../Components/cards/Identity';
import NearByCards from '../Components/cards/NearByCards';
import ConsultADoc from '../Components/cards/ConsultADoc';
import OlaDoc from '../Components/cards/OlaDoc';
import Vouch365 from '../Components/cards/Vouch365';
import PanelHospital from '../Components/cards/PanelHospital';
import WalkingRecord from '../Components/cards/WalkingRecord';
import AvailDiscounts from '../Components/cards/AvailDiscounts';
import PayAsYouDrive from '../Components/cards/PayAsYouDrive';
import Policy from '../Components/Policy';
import TibbeNawabiNotifications from '../Components/cards/TibbeNawabiNotifications';
import Modal from 'react-native-modal';
import CheckBox from 'react-native-check-box';
class UserScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      onBack: true,
      showPolicies: false,
      policy1: false,
      policy2: false,
      policy3: false,
      policy4: false,
      policy: '',
    };
  }
  
  componentDidMount() {  
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackBtn,
    );
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  handleBackBtn = () => {
    Alert.alert(
      'Confirmation',
      'Do you want to Close Application?',
      [
        //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => this.closeApp(),
        },
      ],
      {cancelable: false},
    );
    return true;
  };
  closeApp = () => {
    console.log('Close');
    BackHandler.exitApp();
    return false;
  };
  // componentDidMount() {
  //   global.uid = '86';
  //   global.Token =
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6Ijg2IiwiTmFtZSI6Ijk1NjI5IiwiUm9sZSI6IlBhdGllbnQiLCJleHAiOjE2MTgzODA2MDksImlzcyI6Imh0dHA6Ly93d3cudGFrYWZ1bC5jb20ucGsvIiwiYXVkIjoiaHR0cDovL3d3dy50YWthZnVsLmNvbS5way8ifQ.arq9i1kn0y69hJndONzHn2JQcnTsXDHs4owV4N7wPBM';
  // }
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geocoder.init('AIzaSyBdGlQwJq6aRqBe0FOU25xSBzCdN_z_EZE');
        Geolocation.getCurrentPosition(
          position => {
            console.log('position', position);
            this.setState(
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                altitude: position.coords.altitude,
                speed: position.coords.speed,
              },
              () =>
                Geocoder.from(this.state.latitude, this.state.longitude)
                  .then(json => {
                    var addressComponent = json.results[0].address_components;
                    var formAdd = json.results[2].formatted_address;
                    this.setState({userAddress: formAdd});
                    console.log(json.results[2].formatted_address);
                  })
                  .catch(error => console.warn(error)),
            );
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 1500, maximumAge: 10000},
        );
      } else {
        // console.log('Permission Denied');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }

  locationPermission() {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        console.log('result', result);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            this.requestLocationPermission();
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            this.requestLocationPermission();
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            this.requestLocationPermission();
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        // …
      });
  }

  navigation = this.props.navigation;

  policy_1 = () => {
    const {policy1, policy2, policy3, policy4} = this.state;
    if (policy1) {
      this.setState({
        policy: '',
        policy1: false,
        policy2: false,
        policy3: false,
        policy4: false,
      });
    }
    if (!policy1) {
      this.setState({
        policy: 'Motor',
        policy1: true,
        policy2: false,
        policy3: false,
        policy4: false,
      });
    }
  };
  policy_2 = () => {
    const {policy1, policy2, policy3, policy4} = this.state;
    if (policy2) {
      this.setState({
        policy: '',
        policy1: false,
        policy2: false,
        policy3: false,
        policy4: false,
      });
    }
    if (!policy2) {
      this.setState({
        policy: 'Health',
        policy1: false,
        policy2: true,
        policy3: false,
        policy4: false,
      });
    }
  };
  policy_3 = () => {
    const {policy1, policy2, policy3, policy4} = this.state;
    if (policy3) {
      this.setState({
        policy: '',
        policy1: false,
        policy2: false,
        policy3: false,
        policy4: false,
      });
    }
    if (!policy3) {
      this.setState({
        policy: 'Non Motor',
        policy1: false,
        policy2: false,
        policy3: true,
        policy4: false,
      });
    }
  };
  policy_4 = () => {
    const {policy1, policy2, policy3, policy4} = this.state;
    if (policy4) {
      this.setState({
        policy: '',
        policy1: false,
        policy2: false,
        policy3: false,
        policy4: false,
      });
    }
    if (!policy4) {
      this.setState({
        policy: 'Life',
        policy1: false,
        policy2: false,
        policy3: false,
        policy4: true,
      });
    }
  };

  lodgeStart = () => {
    if (this.state.policy === '') {
      ToastAndroid.showWithGravity(
        'Please select policy before lodging claim',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      this.props.navigation.navigate('LodgeClaim', {policy: this.state.policy});
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>        
        <View
          style={{
            alignItems: 'center',
            width: 150,
            height: 150,
            borderRadius: 80,
            alignSelf: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: -30,
            right:-20,
            zIndex: 9999,
          }}>
        <PulseLoader
            backgroundColor="#0f75bd"
            borderColor="#0267ae"
            size={50}
            avatar={require('../../assets/icons/android/drawable-xxxhdpi/policy.png')}
          />
        </View>
        <ScrollView contentContainerStyle={styles.screen}>
          <View style={styles.identity}>
            <Identity style={{flex: 1}} navigation={this.navigation} />
          </View>
          {/* <View style={{flex: 0.03}}>
            <Policy
              policy={this.state.policy}
              policyBtn={() => this.setState({showPolicies: true})}
              lodgeBtn={this.lodgeStart}
            />
          </View> */}
          <View style={styles.cards}>
            <ConsultADoc
              style={styles.uniCardStyle}
              navigation={this.navigation}
            />
            <WalkingRecord
              style={styles.uniCardStyle}
              navigation={this.navigation}
            />
            <PayAsYouDrive
              style={styles.uniCardStyle}
              navigation={this.navigation}
            />
            {/* {
              global.is_pay_as_you_go == 'Y' ? 
                <PayAsYouDrive
                  style={styles.uniCardStyle}
                  navigation={this.navigation}
                /> : null
            } */}
            <Vouch365
              style={styles.uniCardStyle}
              navigation={this.navigation}
            />

            <PanelHospital navigation={this.navigation} />

            <AvailDiscounts navigation={this.navigation} />

            <OlaDoc style={styles.uniCardStyle} navigation={this.navigation} />

            <NearByCards
              style={{...styles.uniCardStyle}}
              navigation={this.navigation}
            />
            <TibbeNawabiNotifications
              style={styles.uniCardStyle}
              navigation={this.navigation}
            />
          </View>

          <StatusBar backgroundColor="#444444" barStyle="light-content" />
        </ScrollView>
        <Modal
          isVisible={this.state.showPolicies}
          animationIn="fadeIn"
          animationInTiming={500}
          animationOut="fadeOut"
          animationOutTiming={500}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                borderRadius: 4,
                padding: 10,
                backgroundColor: '#ffff',
              }}>
              <View style={{alignItems: 'center', padding: 5}}>
                <Text style={{fontSize: 16, fontFamily: 'Ubuntu-Medium'}}>
                  Policies
                </Text>
              </View>
              <View
                style={{
                  width: '85%',
                  height: 0.6,
                  backgroundColor: '#c7c7c7',
                  alignSelf: 'center',
                  margin: 5,
                }}
              />
              <CheckBox
                style={{padding: 10}}
                onClick={this.policy_1}
                isChecked={this.state.policy1}
                rightText="Motor"
                rightTextStyle={{
                  fontSize: 12,
                  color: '#000',
                  marginLeft: 10,
                  fontFamily: 'Ubuntu-Regular',
                }}
                checkedImage={
                  <Image
                    source={require('../../assets/icons/android/drawable-xxxhdpi/radio_check.png')}
                    style={{width: 20, height: 20}}
                  />
                }
                unCheckedImage={
                  <Image
                    source={require('../../assets/icons/android/drawable-xxxhdpi/radio_uncheck.png')}
                    style={{width: 20, height: 20}}
                  />
                }
              />
              <CheckBox
                style={{padding: 10}}
                onClick={this.policy_2}
                isChecked={this.state.policy2}
                rightText="Health"
                rightTextStyle={{
                  fontSize: 12,
                  color: '#000',
                  marginLeft: 10,
                  fontFamily: 'Ubuntu-Regular',
                }}
                checkedImage={
                  <Image
                    source={require('../../assets/icons/android/drawable-xxxhdpi/radio_check.png')}
                    style={{width: 20, height: 20}}
                  />
                }
                unCheckedImage={
                  <Image
                    source={require('../../assets/icons/android/drawable-xxxhdpi/radio_uncheck.png')}
                    style={{width: 20, height: 20}}
                  />
                }
              />
              <CheckBox
                style={{padding: 10}}
                onClick={this.policy_3}
                isChecked={this.state.policy3}
                rightText="Non Motor"
                rightTextStyle={{
                  fontSize: 12,
                  color: '#000',
                  marginLeft: 10,
                  fontFamily: 'Ubuntu-Regular',
                }}
                checkedImage={
                  <Image
                    source={require('../../assets/icons/android/drawable-xxxhdpi/radio_check.png')}
                    style={{width: 20, height: 20}}
                  />
                }
                unCheckedImage={
                  <Image
                    source={require('../../assets/icons/android/drawable-xxxhdpi/radio_uncheck.png')}
                    style={{width: 20, height: 20}}
                  />
                }
              />
              {/* <CheckBox
                style={{padding: 10}}
                onClick={this.policy_4}
                isChecked={this.state.policy4}
                rightText="Life"
                rightTextStyle={{
                  fontSize: 12,
                  color: '#000',
                  marginLeft: 10,
                  fontFamily: 'Ubuntu-Regular',
                }}
                checkedImage={
                  <Image
                    source={require('../../assets/icons/android/drawable-xxxhdpi/radio_check.png')}
                    style={{width: 20, height: 20}}
                  />
                }
                unCheckedImage={
                  <Image
                    source={require('../../assets/icons/android/drawable-xxxhdpi/radio_uncheck.png')}
                    style={{width: 20, height: 20}}
                  />
                }
              /> */}
              <View
                style={{
                  width: '85%',
                  height: 0.6,
                  backgroundColor: '#c7c7c7',
                  alignSelf: 'center',
                  margin: 5,
                }}
              />
              <View
                style={{
                  padding: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    if (this.state.policy !== '') {
                      global.policy = this.state.policy;
                      this.setState({
                        showPolicies: false,
                      });
                    } else {
                      ToastAndroid.showWithGravity(
                        'Please Select Policy for Lodging Claim',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                      );
                    }
                  }}
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 6,
                    borderColor: '#0E74BC',
                  }}>
                  <Text
                    style={{
                      color: '#0E74BC',
                      textAlign: 'center',
                      fontFamily: 'Roboto-MonoBold',
                    }}>
                    Save
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    this.setState({
                      showPolicies: false,
                      policy: '',
                      policy1: false,
                      policy2: false,
                      policy3: false,
                      policy4: false,
                    });
                  }}
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 6,
                    borderColor: 'red',
                  }}>
                  <Text
                    style={{
                      color: 'red',
                      textAlign: 'center',
                      fontFamily: 'Roboto-MonoBold',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  uniCardStyle: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 15,
    marginBottom: '3%',
  },
  screen: {
    // flex: 1,
    // backgroundColor: '#f0f0f0',
    backgroundColor: '#e9e9e9',
    // backgroundColor: '#f9f9f9',
    // backgroundColor: '#efefef',
    // paddingTop: StatusBar.currentHeight,
    // paddingVertical: 20,
    // justifyContent: 'center'
    // padding: 70,
    // justifyContent: 'center'
  },
  cards: {
    justifyContent: 'space-around',
    // marginVertical: 20,
    width: '100%',
    paddingHorizontal:7,
    // paddingHorizontal: '3%',
    flex: 0.5,

    // marginHorizontal: 20
  },
  identity: {
    marginBottom: 10,
    flex: 1,
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

export default UserScreen;
