import React, {Component} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
  BackHandler,
  Keyboard,
  ToastAndroid,
  ImageBackground,
  Alert,
} from 'react-native';
import Register from '../Components/Register';
import Login from '../Components/Login';
import Otp from '../Components/Otp';
import axios from 'axios';
import firebase from 'react-native-firebase';
import DeviceInfo from 'react-native-device-info';
import Modal from 'react-native-modal';
import moment from 'moment';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import AsyncStorage from '@react-native-community/async-storage';
class AuthenticationScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.handleScreenRender = this.handleScreenRender.bind(this);
    this.handleView = this.handleView.bind(this);
    this.state = {
      view: 'register',
      registerAnimation: null,
      loginAnimation: null,
      otpAnimation: null,
      prev: null,
      splash: true,
      health_id: '',
      name: '',
      email: '',
      phone: '',
      otp: '',
      fcmtoken: '',
      device_uid: '',
      check_device: false,
      verified: false,
      register_device: false,
      verify_otp: false,
    };
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
    var device_uid = DeviceInfo.getUniqueId();
    this.setState(
      {
        device_uid,
      },
      () => {
        // this.checkDevice();
      },
    );
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.view === 'otp') {
        this.setState(
          {
            otpAnimation: 'bounceOutRight',
            registerAnimation: 'bounceInLeft',
          },
          () => {
            this.setState({view: 'register'});
          },
        );
        return true;
      } else if (this.state.view === 'login') {
        if (this.state.prev === 'otp') {
          this.setState(
            {
              loginAnimation: 'bounceOutRight',
              registerAnimation: 'bounceInLeft',
            },
            () => {
              this.setState({view: 'register'});
            },
          );
          return true;
        } else if (this.state.prev === 'register') {
          this.setState(
            {
              loginAnimation: 'bounceOutRight',
              registerAnimation: 'bounceInLeft',
            },
            () => {
              this.setState({view: 'register'});
            },
          );
          return true;
        }
      } else {
        return false;
      }
    });
  }
  response(response){
    var chassisNos = '';
    var engineNos = '';
    var vehicles = [];
    for (var i = 0; i < response.PolicyDetails.length; i++) {
      var expireDate = new Date(
        response.PolicyDetails[i].expiry_date,
      );
      expireDate.setHours(expireDate.getHours() + 6);

      expireDate = expireDate.getTime();
      var nowDate = new Date();
      nowDate = nowDate.getTime();
      var status = expireDate > nowDate;

      if (
        response.PolicyDetails[i].class_name == 'Motor' &&
        status == true
      ) {
        
        var dt = response.PolicyDetails[i]
        var vehicle = {
          issue_date:dt.issue_date,
          billing_start_date:dt.billing_start_date,
          assorted_code:dt.assorted_code,
          ignition:0,
          engine_no:dt.vehicledetails[0].engine_no,
          chassis_no:dt.vehicledetails[0].chassis_no,
          sum_covered:dt.vehicledetails[0].sum_covered,
          reg_no:dt.reg_no ? dt.vehicledetails[0].reg_no : dt.vehicledetails[0].engine_no ? dt.vehicledetails[0].engine_no : dt.vehicledetails[0].chassis_no,
        }
        vehicles.push(vehicle);
        
        if(!chassisNos){
          chassisNos = (dt.vehicledetails[0].chassis_no).trim();
          engineNos = (dt.vehicledetails[0].engine_no).trim();
        }else{
          chassisNos = chassisNos+','+(dt.vehicledetails[0].chassis_no).trim();
          engineNos = engineNos+','+(dt.vehicledetails[0].engine_no).trim();
        }
        global.chassisNos = chassisNos;
        global.engineNos = engineNos;
        global.vehicles = vehicles;
        // 
        
        global.sum_covered = response.PolicyDetails[
          i
        ].vehicledetails[0].sum_covered;
        global.assorted_code = response.PolicyDetails[i].assorted_code;
        global.chassis_no = response.PolicyDetails[
          i
        ].vehicledetails[0].chassis_no
          .toString()
          .trim();
        global.engine_no = response.PolicyDetails[
          i
        ].vehicledetails[0].engine_no
          .toString()
          .trim();
        global.reg_no = response.PolicyDetails[
          i
        ].vehicledetails[0].reg_no
          .toString()
          .trim();
        global.assorted_codeM =
          response.PolicyDetails[i].assorted_code;
        global.policy_noM = response.PolicyDetails[i].policy_no;
        global.is_pay_as_you_go =
          response.PolicyDetails[i].is_pay_as_you_go;
        global.issue_dateM =
          response.PolicyDetails[i].issue_date;
        global.expiry_dateM =
          response.PolicyDetails[i].expiry_date;
        global.billing_start_dateM =
          response.PolicyDetails[i].billing_start_date;
        global.billing_end_dateM =
          response.PolicyDetails[i].billing_end_date;
      }
      if (
        response.PolicyDetails[i].class_name == 'Health' &&
        status == true
      ) {
        global.assorted_codeH =
          response.PolicyDetails[i].assorted_code;
        global.policy_noH = response.PolicyDetails[i].policy_no;
        global.issue_dateH =
          response.PolicyDetails[i].issue_date;
        global.expiry_dateH =
          response.PolicyDetails[i].expiry_date;
      }
    }
    var vehicle1 = { "assorted_code" : "070000033986","billing_start_date": "7/7/2020 12:00:00 AM", "chassis_no": "JAANKR552J7101667", "engine_no": "PKS13043034", "ignition": 0, "issue_date": "11/7/2019 12:00:00 AM", "reg_no": "PKS13043034" , "sum_covered" : 2000};
    global.vehicles.push(vehicle1);
    var vehicle1 = { "assorted_code" : "070000033986","billing_start_date": "7/7/2020 12:00:00 AM", "chassis_no": "JAANKR52J7101668", "engine_no": "3F8397", "ignition": 0, "issue_date": "11/7/2019 12:00:00 AM", "reg_no": "3F8397", "sum_covered" : 2500};
    global.vehicles.push(vehicle1);
    var vehicle1 = { "assorted_code" : "070000033986","billing_start_date": "7/7/2020 12:00:00 AM", "chassis_no": "RS413PK10043076", "engine_no": "3F8394", "ignition": 0, "issue_date": "11/7/2019 12:00:00 AM", "reg_no": "3F8394", "sum_covered" : 3000};
    global.vehicles.push(vehicle1);
    if(global.engineNos){
      global.engineNos = global.engineNos+',PKS13043034,3F8397,3F8394';
    }
    else{
      global.engineNos = 'Z538182,13043062,Z538510';
    }

    this.setState(
      {
        verified: true,
        check_device: false,
        verify_otp:false
      },
      () => {
        this.props.navigation.navigate('User');
      },
    );
  }

  checkDevice = async () => {
    var fcm = await AsyncStorage.getItem('FCM');
    const {device_uid, check_device} = this.state;
    console.log('DEVICE ID ____ ', device_uid, this.state.fcm);
    this.setState({
      check_device: true,
    });
    try {
      axios
        .get(
          `${
            global.API_URL
          }/api/Auth/VerifyDeviceID?deviceID=${device_uid}&FCM=${fcm}`,
        )
        .then(response => {
          if (response.status === 200);
          {
            console.log('auth', response.data);
            global.cnci = response.data.cnic;
            global.healthNo = response.data.healthID;
            global.uid = response.data.id;
            global.token = response.data.token;
            axios.defaults.headers.common['Authorization'] =
              `Bearer ` + response.data.token;
              this.GetDataJson(global.cnci , 'C');
          }
        })
        .catch(error => {
          this.setState({
            check_device: false,
          });
          if (error.response.status === 500) {
            // ToastAndroid.showWithGravity(
            //   'Device not Registered',
            //   ToastAndroid.SHORT,
            //   ToastAndroid.CENTER,
            // );
          }
          console.log('Error VerifyDeviceID ', error);
        });
    } catch (error) {
      this.setState({
        check_device: false,
      });
      ToastAndroid.showWithGravity(
        'Server not Responding',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      console.log('CATCH VerifyDeviceID ', error);
    }
  };

  verifyingModal() {
    return (
      <Modal
        animationIn="fadeIn"
        animationInTiming={400}
        animationOut="fadeOut"
        animationOutTiming={400}
        isVisible={this.state.check_device}>
        <View style={styles.checkDeviceModalContainer}>
          <View style={styles.checkDeviceModalSubContainer}>
            <View style={styles.checkDeviceModalBlock}>
              <View>
                <UIActivityIndicator color={'#0064FF'} size={30} />
              </View>
              <View>
                <Text>Checking Device ...</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          console.log('fcmToken:', fcmToken);
          AsyncStorage.setItem('FCM', fcmToken);
          this.setState(
            {
              fcmToken,
            },
            () => this.checkDevice(),
          );
        } else {
          console.log('No fcmToken:');
        }
      });
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }
  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const {title, body} = notification;
        console.log('onNotification:');

        const localNotification = new firebase.notifications.Notification({
          // sound: 'sampleaudio',
          show_in_foreground: true,
        })
          // .setSound('sampleaudio.wav')
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .android.setChannelId('PakTakaful') // e.g. the id you chose above
          .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
          .android.setColor('#000000') // you can set a color here
          .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
      });

    const channel = new firebase.notifications.Android.Channel(
      'PakTakaful',
      'Pak Takaful',
      firebase.notifications.Android.Importance.High,
    ).setDescription('Demo app description');
    // .setSound('sampleaudio.wav');
    firebase.notifications().android.createChannel(channel);

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {title, body} = notificationOpen.notification;
        console.log('onNotificationOpened:');
        // Alert.alert(title, body);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      console.log('getInitialNotification:');
      // Alert.alert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log('JSON.stringify:', JSON.stringify(message));
    });
  }

  handleScreenRender() {
    if (this.state.view === 'register') {
      return (
        <Register
          registerAnimation={this.state.registerAnimation}
          handleView={this.register}
        />
      );
    } else if (this.state.view === 'otp') {
      return (
        <Otp
          otpAnimation={this.state.otpAnimation}
          handleView={this.OTP}
          phone={this.state.otp}
        />
      );
    }
    // else if (this.state.view === 'login') {
    //   return (
    //     <Login
    //       navigation={this.props.navigation}
    //       loginAnimation={this.state.loginAnimation}
    //       handleView={this.handleView}
    //     />
    //   );
    // }
  }
  verifyOTPModal() {
    return (
      <Modal
        animationIn="fadeIn"
        animationInTiming={400}
        animationOut="fadeOut"
        animationOutTiming={400}
        isVisible={this.state.verify_otp}>
        <View style={styles.verifyOTPModalContainer}>
          <View style={styles.verifyOTPModalSubContainer}>
            <View style={styles.verifyOTPModalBlock}>
              <View>
                <UIActivityIndicator color={'#0064FF'} size={30} />
              </View>
              <View>
                <Text>Verifying OTP ...</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  OTP = code => {
    this.setState({
      verify_otp: true,
    });
    console.log('OTP - ', code);
    try {
      axios
        .get(`${global.API_URL}/api/Auth/VerifyOTP?otp=${code}`)
        .then(response => {
          if (response.status === 200);
          {
            console.log(response.data);
            this.postUser();
          }
        })
        .catch(error => {
          this.setState({
            verify_otp: false,
          });
          ToastAndroid.showWithGravity(
            `${error.message}`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          console.log('Error VerifyOTP ', error);
        });
    } catch (error) {
      this.setState({
        verify_otp: false,
      });
      console.log('CATCH VerifyOTP ', error);
    }
  };
  postUser = () => {
    const {health_id, name, email, phone, fcmToken, device_uid} = this.state;
    const data = {
      HealthID: health_id,
      Name: name,
      Email: email,
      Phone_Number: phone,
      DeviceID: device_uid,
      FCM_Token: fcmToken,
    };
    console.log(data);
    try {
      axios
        .post(global.API_URL + '/api/Auth/UserDetails', data)
        .then(response => {
          if (response.status === 200) {
            console.log('Response POST UserDetails ');
            this.login_Patient();
          }
        })
        .catch(error => {
          this.setState({
            verify_otp: false,
          });
          // ToastAndroid.showWithGravity(
          //   `${error.message}`,
          //   ToastAndroid.SHORT,
          //   ToastAndroid.CENTER,
          // );
          console.log('Error POST UserDetails ', error);
        });
    } catch (error) {
      console.log('CATCH UserDetails ', error);
    }
  };
  GetDataJson(p_value , p_type){
    axios
    .get(
      `http://54.36.109.50:81/avoloxapi/api/Customer/GetDataJson?p_value=${
        p_value
      }&p_type=${p_type}`,
    )
    .then(res => {
      if (res.status === 200)
      {
        var response = res.data;
        if (response) {
          global.name = response.name;
          this.response(response);
        }
        else{
          this.setState({
            verify_otp: false,
          },()=>{
            if(p_type == 'H'){
              ToastAndroid.showWithGravity(
                `user ${p_value} not found in Takaful system`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }
            else{
              this.GetDataJson(global.healthNo , 'H');
            }
          });
        }
      }
      else{
        ToastAndroid.showWithGravity(
          `Takaful system not responding`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        this.setState({
          verify_otp: false,
        })
      }
    })
    .catch(error => {
      console.log('error', error);
    });
  }

  login_Patient = () => {
    const {health_id, device_uid} = this.state;
    const data = {
      Username: health_id,
      Password: device_uid,
      Role: 2,
    };
    // console.log('Login ---- ', data);
    try {
      axios
        .post(global.API_URL + '/api/Auth/Login', data)
        .then(response => {
          if (response.status === 200) {
            console.log('Response ---- ', response.data);
            console.log('Response Token ---- ', response.data.token);
            global.uid = response.data.id;
            global.cnci = response.data.cnic;
            global.healthNo = response.data.healthId;
            axios.defaults.headers.common['Authorization'] =
              `Bearer ` + response.data.token;
            global.Token = response.data.token;
            console.log('global.healthNo', global.healthNo);

            this.GetDataJson(global.cnci , 'C');
          }
        })
        .catch(error => {
          this.setState({
            verify_otp: false,
          });
          // ToastAndroid.showWithGravity(
          //   `${error.message}`,
          //   ToastAndroid.SHORT,
          //   ToastAndroid.CENTER,
          // );
          console.log('Error Login ', error);
        });
    } catch (error) {
      this.setState({
        verify_otp: false,
      });
      console.log('CATCH Login ', error);
    }
  };
  phonenumber(inputtxt)
  {
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if(inputtxt.match(phoneno)){
      return true
    }
    else{
      return false
    }
  }
  register = async (view, h_id, name, email, phone, health) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({
      health_id: h_id,
      name,
      email,
      phone,
    });
    const data = {
      HealthID: h_id,
      Phone_Number: phone,
    };
    console.log('DATA SEND ', data);
    if (h_id != '') {
      var p_value = h_id;
      var p_type = health == true ? 'H' : 'C';
      await AsyncStorage.setItem('p_value', p_value);
      await AsyncStorage.setItem('p_type', p_type);
      if (name != '') {
        if (email != '' && reg.test(email) === true) {
          if (phone != '' && phone.length == 11) {
            this.setState({
              register_device: true,
            });
            try {
              axios
                .post(global.API_URL + '/api/Auth/GetOTP', data)
                .then(response => {
                  if (response.status === 200) {
                    console.log('Response GET OTP ', response.data);
                    if (view === 'otp') {
                      this.setState({
                        registerAnimation: 'bounceOutLeft',
                        otpAnimation: 'bounceInRight',
                        otp: response.data,
                        register_device: false,
                      });
                      // alert('Your OTP Verification Code is ', response.data);
                      setTimeout(() => {
                        this.setState({view: 'otp'});
                      }, 200);
                    }
                  }
                })
                .catch(error => {
                  this.setState({
                    register_device: false,
                  });
                  if (error.response.status === 400) {
                    {
                      health
                        ? ToastAndroid.showWithGravity(
                            'Health ID not Found',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                          )
                        : ToastAndroid.showWithGravity(
                            'CNIC not Found',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                          );
                    }
                  }
                  console.log('Error GET OTP ', error.response);
                });
            } catch (error) {
              this.setState({
                register_device: false,
              });
              console.log('CATCH GETOTP ', error);
            }
          } else {
            ToastAndroid.showWithGravity(
              'Phone Field cannot be Empty or either invalid',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        } else {
          ToastAndroid.showWithGravity(
            'Email Field cannot be Empty either invalid',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      } else {
        ToastAndroid.showWithGravity(
          'Name Field cannot be Empty',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    } else {
      ToastAndroid.showWithGravity(
        'Health ID cannot be Empty',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };
  registerModal() {
    return (
      <Modal
        animationIn="fadeIn"
        animationInTiming={400}
        animationOut="fadeOut"
        animationOutTiming={400}
        isVisible={this.state.register_device}>
        <View style={styles.registerModalContainer}>
          <View style={styles.registerModalSubContainer}>
            <View style={styles.registerModalBlock}>
              <View>
                <UIActivityIndicator color={'#0064FF'} size={30} />
              </View>
              <View>
                <Text>Registering Device ...</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  handleView(view, h_id, name, email, phone) {
    this.setState({
      phone,
    });
    if (view === 'register') {
      if (this.state.view === 'login') {
        this.setState(
          {
            loginAnimation: 'bounceOutRight',
            registerAnimation: 'bounceInLeft',
          },
          () => {
            this.setState({view: 'register'});
          },
        );
      } else {
        this.setState(
          {
            registerAnimation: 'bounceOutLeft',
            otpAnimation: 'bounceInRight',
          },
          () => {
            this.setState({view: 'register'});
          },
        );
      }
    } else if (view === 'otp') {
      this.setState(
        {
          registerAnimation: 'bounceOutLeft',
          otpAnimation: 'bounceInRight',
        },
        () => {
          this.setState({view: 'otp'});
        },
      );
    }

    // else if (view === 'login') {
    //   if (this.state.view === 'register') {
    //     this.setState({ registerAnimation: 'bounceOutLeft', loginAnimation: 'bounceInRight', })
    //     setTimeout(() => {
    //       this.setState({ view: 'login', prev: 'register' })
    //     }, 200);
    //   } else if (this.state.view === 'otp') {
    //     this.setState({ otpAnimation: 'bounceOutLeft', loginAnimation: 'bounceInRight', })
    //     setTimeout(() => {
    //       this.setState({ view: 'login', prev: 'otp' })
    //     }, 200);
    //   }
    // }
  }
  render() {
    return (
      <ImageBackground
        source={require('../../assets/icons/android/drawable-xxxhdpi/registration_bg.png')}
        style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        {this.state.check_device ? this.verifyingModal() : null}
        {this.state.register_device ? this.registerModal() : null}
        {this.state.verify_otp ? this.verifyOTPModal() : null}
        <View style={styles.subContainer}>
          <View style={styles.logoCenter}>
            <Image
              source={require('../../assets/icons/android/drawable-xxxhdpi/pakistan_takaful_logo.png')}
              style={styles.logo}
            />
          </View>

          <ImageBackground
            source={require('../../assets/icons/android/drawable-xxxhdpi/reg_layer_w.png')}
            resizeMode="stretch"
            style={styles.bottomLayer}>
            {this.handleScreenRender()}
          </ImageBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height,
    resizeMode: 'center',
  },
  subContainer: {
    flex: 1,
  },
  logoCenter: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 4,
  },
  logo: {
    width: 240,
    height: 208,
  },
  bottomLayer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 6,
  },
  registerModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerModalSubContainer: {
    width: '80%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  registerModalBlock: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  verifyOTPModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyOTPModalSubContainer: {
    width: '80%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  verifyOTPModalBlock: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  checkDeviceModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkDeviceModalSubContainer: {
    width: '80%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  checkDeviceModalBlock: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default AuthenticationScreen;
