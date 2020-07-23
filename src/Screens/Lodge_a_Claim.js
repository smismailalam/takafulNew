import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
  Dimensions,
  ScrollView,
  PixelRatio,
  StatusBar,
  BackHandler,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
  Alert,
  Easing,
  PermissionsAndroid,
  Linking,
  KeyboardAvoidingView,
  Platform,
  Animated,
  PanResponder,
  Clipboard,
  FlatList,
  Vibration,
} from 'react-native';
import {Header} from 'react-navigation-stack';
import {BarChart, Grid} from 'react-native-svg-charts';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Circle,
} from 'react-native-svg';
import Video from 'react-native-video';
import Identity from '../Components/cards/Identity';
import NearByCards from '../Components/cards/NearByCards';
import ConsultADoc from '../Components/cards/ConsultADoc';
import WalkingRecord from '../Components/cards/WalkingRecord';
import AvailDiscounts from '../Components/cards/AvailDiscounts';
import Navigation from '../Components/Navigation';
import Policy from '../Components/Policy';
import VideoCall from '../Components/VideoCall';
import * as Animatable from 'react-native-animatable';
import Ripple from 'react-native-material-ripple';
import {RNCamera, FaceDetector} from 'react-native-camera';
import Modal from 'react-native-modal';
import {UIActivityIndicator} from 'react-native-indicators';
import AudioCallHeader from '../Components/AudioCallHeader';
import CallHeader from '../Components/CallHeader';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';
import Icon from 'react-native-vector-icons/Ionicons';
import AutoHeightImage from 'react-native-auto-height-image';
import InCallManager from 'react-native-incall-manager';
import FilePickerManager from 'react-native-file-picker';
import PulseLoader from 'react-native-pulse-loader';
import axios from 'axios';
const signalR = require('@aspnet/signalr');
const localStreamWidth = 180;
const localStreamHeight = localStreamWidth - (localStreamWidth / 100) * 5;
import RNFetchBlob from 'rn-fetch-blob';
const KEYBOARD_VERTICAL_OFFSET = Header.HEIGHT + StatusBar.currentHeight;
import Sound from 'react-native-sound';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
var song = null;
const {height, width} = Dimensions.get('window');
const rightMove = width / 3 - 4;
const leftMove = -width / 1.8 - 2;
const up = -height / 2;
const down = height / 2;
import pakistan_takaful_logo_colorful from '../../assets/icons/android/drawable-xxxhdpi/pakistan_takaful_logo_colorful.png';
// export async function request_storage_runtime_permission() {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       {
//         title: 'PakTakaful Storage Permission',
//         message:
//           'PakTakaful App needs access to your storage to download Photos/File.',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('Storage Permission Granted.');
//     } else {
//       console.log('Storage Permission Not Granted');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }
const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export default class Lodge_a_Claim extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  recorder = React.createRef();
  constructor(props) {
    super(props);
    this.showImageModal = this.showImageModal.bind(this);
    this.state = {
      audioCallStatus: null,
      minutes: 0,
      seconds: 0,
      chatView: 'chat',
      onBack: true,
      messages: [],
      currentMessage: '',
      ticket: null,
      connection: null,
      showVideoChatButton: false,
      showRemoteVideo: false,
      localStream: null,
      audioIconAnimation: 'pulse',
      audioIconIteration: 20000,
      requestVideo: false,
      imageModal: false,
      audioMic: true,
      isMuted: false,
      isSpeakerEnabled: false,
      accept_Listen: false,
      session_expired: false,
      timeExceed: false,
      openFile: [],
      camera_denied: false,
      storage_denied: false,
      audio_denied: false,
      scale: new Animated.Value(1),
      imgSrc: '',
      recorder: '',
      height: 0,
      imageLoad: false,
      audioAnimation: 'slideInRight',
      videoAnimation: 'slideInRight',
      file_: [],
      file_uri: '',
      imgAnim: 'slideInUp',
      img_type: '',
      selected_policy: '',
    };
  }
  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.ValueXY();
    this._value = {x: 0, y: 0};
    this.animatedValue.addListener(value => (this._value = value));
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.animatedValue.setOffset({
          x: this._value.x,
          y: this._value.y,
        });
        this.animatedValue.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null,
        {dx: this.animatedValue.x, dy: this.animatedValue.y},
      ]),
      onPanResponderRelease: (e, gestureState) => {
        if (this._value.x > 0 && this._value.y < 0) {
          this.animatedValue.setOffset({
            x: 0,
            y: 0,
          });
          this.animatedValue.setValue({x: 0, y: 0});
        }
        if (this._value.x > 0) {
          this.animatedValue.setOffset({
            x: 0,
            y: this._value.y,
          });
          this.animatedValue.setValue({x: 0, y: 0});
        }
        if (this._value.x < 0) {
          this.animatedValue.setOffset({
            x: leftMove,
            y: this._value.y < 0 ? 0 : this._value.y,
          });

          this.animatedValue.setValue({x: 0, y: 0});
        }
        if (this._value.y > 0) {
          this.animatedValue.setOffset({
            x: this._value.x,
            y: down,
          });

          this.animatedValue.setValue({x: 0, y: 0});
        }
      },
    });
  }

  checkAcceptConnection() {
    return (
      <Modal
        animationIn="fadeIn"
        animationInTiming={400}
        animationOut="fadeOut"
        animationOutTiming={400}
        isVisible={true}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: '90%',
              padding: 15,
              backgroundColor: '#fff',
              borderRadius: 10,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <View styles={{marginRight: 10}}>
                <UIActivityIndicator color={'#0064FF'} size={30} />
              </View>
              <View style={{width: '70%'}}>
                <Text
                  style={{textAlign: 'justify', fontFamily: 'Ubuntu-Regular'}}>
                  Connecting to an agent. This may take some time. We appreciate
                  your patience
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  getStream() {
    InCallManager.setSpeakerphoneOn(false);
    InCallManager.setMicrophoneMute(false);

    mediaDevices.enumerateDevices().then(sourceInfos => {
      // console.log(sourceInfos);
      let videoSourceId;

      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind === 'videoinput' &&
          sourceInfo.facing === (true ? 'front' : 'back')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 500,
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: true ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        })
        .then(stream => {
          this.setState({
            localStream: stream,
          });
        })
        .catch(error => {
          // Log error
          console.log('stream get error', error);
        });
    });
  }
  getVideoStream() {
    InCallManager.setSpeakerphoneOn(false);
    InCallManager.setMicrophoneMute(false);

    mediaDevices.enumerateDevices().then(sourceInfos => {
      // console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind === 'videoinput' &&
          sourceInfo.facing === (true ? 'front' : 'back')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 500,
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: true ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        })
        .then(stream => {
          this.setState({
            localStream: stream,
          });
        })
        .catch(error => {
          // Log error
          console.log('stream get error', error);
        });
    });
  }
  handleBackBtn = () => {
    if (
      this.state.connection.state === signalR.HubConnectionState.Connected &&
      !this.state.session_expired
    ) {
      Alert.alert(
        'Alert',
        'Do you want to Close Connection with Claim Agent?',
        [
          //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => this.connection_Close(),
          },
        ],
        {cancelable: false},
      );
    } else {
      console.log('ALready close peerconne');
      this.props.navigation.navigate('User');
      // );
    }
    return true;
  };
  connection_Close = () => {
    if (this.state.connection.state === signalR.HubConnectionState.Connected) {
      this.state.connection.stop();
      this.props.navigation.navigate('User');
    }
  };
  checkPermissionsStatus = async => {
    if (Platform.OS === 'android') {
      Promise.all([
        check(PERMISSIONS.ANDROID.CAMERA),
        check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE),
        check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE),
        check(PERMISSIONS.ANDROID.RECORD_AUDIO),
        // …
      ]).then(
        ([cameraStatus, readStatus, writeStatus, audioStatus /* … */]) => {
          if (cameraStatus === 'denied') {
            this.setState(
              {
                camera_denied: true,
              },
              () => {
                this.requestForCamera();
              },
            );
          }
          if (readStatus === 'denied' || writeStatus === 'denied') {
            this.setState(
              {
                storage_denied: true,
              },
              () => {
                this.requestForStorage();
                console.log('Camera Status --- ' + cameraStatus);
              },
            );
          }
          if (audioStatus === 'denied') {
            this.setState(
              {
                audio_denied: true,
              },
              () => {
                this.requestForAudio();
              },
            );
          }
          console.log({cameraStatus, readStatus, writeStatus, audioStatus});
        },
      );
    }
    if (Platform.OS === 'ios') {
      Promise.all([
        check(PERMISSIONS.IOS.CAMERA),
        check(PERMISSIONS.IOS.MEDIA_LIBRARY),
        check(PERMISSIONS.IOS.PHOTO_LIBRARY),
        // …
      ]).then(([cameraStatus, readStatus, writeStatus /* … */]) => {
        console.log('Camera Status --- ' + cameraStatus);
        console.log('media Status ----- ', readStatus);
        console.log('photo Status ----- ', writeStatus);
      });
    }
  };
  requestForStorage = () => {
    try {
      request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        {
          title: 'PakTakaful Storage Permission',
          message:
            'PakTakaful App needs access to your Storage for File Sharing.',
        },
      ).then(result => {
        if (result === 'denied') {
          this.setState(
            {
              storage_denied: true,
            },
            () => {
              console.log('audio Status ----- ', result);
            },
          );
        }
        if (result === 'granted') {
          this.setState(
            {
              storage_denied: false,
            },
            () => {
              console.log('audio Status ----- ', result);
            },
          );
        }
        console.log('audio Permission === ', result);
      });
    } catch (err) {
      console.log(err);
    }
  };
  requestForAudio = () => {
    try {
      request(PERMISSIONS.ANDROID.RECORD_AUDIO, {
        title: 'PakTakaful Audio Permission',
        message:
          'PakTakaful App needs access to your Microphone for Audio Calls.',
      }).then(result => {
        if (result === 'denied') {
          this.setState(
            {
              chatView: 'chat',
              audio_denied: true,
            },
            () => {
              this.state.connection
                .invoke('onDeclineAudio', parseInt(this.state.ticket.iD))
                .then(() => {
                  console.log('audio decline invoked');
                })
                .catch(error => {
                  console.log('error', error);
                });

              console.log('audio Status ----- ', result);
            },
          );
        }
        if (result === 'granted') {
          this.setState(
            {
              audio_denied: false,
            },
            () => {
              // if (this.state.chatView === 'AudioCall') {
              //   this.state.connection
              //     .invoke('requestAudio', parseInt(this.state.ticket.iD))
              //     .then(() => {
              //       this.getStream();
              //     })
              //     .catch(error => {
              //       console.log('error', error);
              //     });
              // }
              console.log('audio Status ----- ', result);
            },
          );
        }
        console.log('audio Permission === ', result);
      });
    } catch (err) {
      console.log(err);
    }
  };
  requestForCamera = () => {
    try {
      request(PERMISSIONS.ANDROID.CAMERA, {
        title: 'PakTakaful Camera Permission',
        message: 'PakTakaful App needs access to your Camera for Video Calls.',
      }).then(result => {
        if (result === 'denied') {
          this.setState(
            {
              videoRequest: false,
              chatView: 'AudioCall',
              camera_denied: true,
            },
            () => {
              console.log(
                'Camera Status --- ' + result + this.state.camera_denied,
              );
            },
          );
        }
        if (result === 'granted') {
          this.setState(
            {
              camera_denied: false,
            },
            () => {
              console.log('Camera Status --- ' + result);
            },
          );
        }
        console.log('Camera Permission === ', result);
      });
    } catch (err) {
      console.log('requestForCamera', err);
    }
  };
  async componentDidMount() {
    // await this.getPermissions();
    const {navigation} = this.props;
    var selected_policy = navigation.getParam('policy', 'NO-ID');
    this.setState({
      selected_policy,
    });
    song = new Sound('tone.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });
    song.setVolume(2);
    // this.requestForStorage();
    this.setState({
      accept_Listen: true,
    });

    this.getStream();
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackBtn,
    );

    var data = this.props.navigation.getParam('data');
    console.log('TOKEN ___ ', global.Token);
    if (global.Token) {
      let connection = new signalR.HubConnectionBuilder()
        .withUrl(global.API_URL + '/livechat', {
          accessTokenFactory: () => {
            return global.Token;
          },
          logging: signalR.LogLevel.Information,
        })
        .build();

      setTimeout(() => {
        if (this.state.accept_Listen) {
          this.setState(
            {
              timeExceed: true,
              accept_Listen: false,
            },
            () => {
              connection.invoke('OnTimeExceed').then(response => {
                // console.log('OnTimeExceed ---- ', response);
              });
            },
          );
          Alert.alert(
            'Alert',
            'All Agents are currently Busy....',
            [
              //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              // {
              //   text: 'Cancel',
              //   onPress: () => console.log('Cancel Pressed'),
              //   style: 'cancel',
              // },
              {
                text: 'OK',
                onPress: () => this.props.navigation.navigate('User'),
              },
            ],
            {cancelable: false},
          );
        }
      }, 60000);

      connection.on('update', response => {
        // console.log('update', response);
      });

      connection.on('Hi', event => {
        console.log('New Hi Event ------ ', event);
      });

      connection
        .start()
        .then(() => {
          // setTimeout(() => {
          //     this.handleCallButton()
          // },2000)
          // console.log('connection started', connection);

          this.setState({
            connection,
          });

          connection.invoke('SendToAllDoctors').then(() => {
            // console.log('Send To All Doctors');
          });
          // connection
          //   .invoke('initNewChat')
          connection.on('newWindow', response => {
            console.log('NEW WINDOWS RESPO');
            response = JSON.parse(response, (key, value) => {
              if (value && typeof value === 'object') {
                for (var k in value) {
                  if (
                    /^[A-Z]/.test(k) &&
                    Object.hasOwnProperty.call(value, k)
                  ) {
                    value[k.charAt(0).toLowerCase() + k.substring(1)] =
                      value[k];
                    delete value[k];
                  }
                }
              }
              return value;
            });

            if (response.code === 200) {
              this.checkPermissionsStatus();
              // console.log('InitNewChat response', response);
              this.setState({
                accept_Listen: false,
              });
              response.ticket.id = response.ticket.iD;

              response.ticket.patient.id = response.ticket.patient.iD;

              this.setState(
                {
                  ticket: response.ticket,
                },
                () => {
                  connection.on('message-' + this.state.ticket.id, message => {
                    this.addNewMessage(message);
                    this.scrollView.scrollToEnd({
                      animated: true,
                      index: -1,
                    });
                  });

                  connection.on(
                    'requestAudio-' + this.state.ticket.id,
                    ticketId => {
                      this.setState({
                        audioCallStatus: 'Connected',
                        audioIconIteration: 0,
                      });

                      this.startStream();
                    },
                  );

                  connection.on(
                    'requestVideo-' + this.state.ticket.id,
                    ticketId => {
                      // this.props.navigation.navigate('VideoCall')
                      Vibration.vibrate(PATTERN);
                      this.setState(
                        {
                          showVideoChatButton: true,
                          videoRequest: true,
                        },
                        () => {
                          this.setState({
                            chatView: 'videoRequest',
                          });
                        },
                      );
                    },

                    // this.state.connection.stop();
                    //  this.startStream();
                  );
                  connection.on('disconnect-' + this.state.ticket.id, () => {
                    Alert.alert(
                      'Alert',
                      'You are Disconnected from Agent',
                      [
                        //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                        // {
                        //   text: 'Cancel',
                        //   onPress: () => console.log('Cancel Pressed'),
                        //   style: 'cancel',
                        // },
                        {
                          text: 'OK',
                          onPress: () =>
                            this.setState({
                              session_expired: true,
                              chatView: 'chat',
                              showRemoteVideo: false,
                            }),
                          // onPress: () => this.props.navigation.navigate('User'),
                        },
                      ],
                      {cancelable: false},
                    );
                  });

                  connection.on(
                    'onDeclineAudio-' + this.state.ticket.id,
                    ticketId => {
                      // this.recorder.stopRecording(function() {
                      //   let blob = this.recorder.getBlob();
                      //   invokeSaveAsDialog(blob);
                      // });
                      this.setState({
                        audioCallStatus: 'Call Declined',
                      });
                      if (
                        this.state.showRemoteVideo &&
                        this.state.chatView === 'chat'
                      ) {
                        this.setState({
                          chatView: 'chat',
                          showRemoteVideo: false,
                        });
                      }
                      setTimeout(() => {
                        this.setState({
                          chatView: 'chat',
                          showRemoteVideo: false,
                        });
                      }, 1000);

                      // this.startStream();
                      console.log('onDecline', ticketId);
                    },
                  );

                  connection.on(
                    'addIceCandidate-' + this.state.ticket.id,
                    evt => {
                      var descr = JSON.parse(evt);

                      // console.log('video evt', descr.type);

                      if (descr.type === 'offer') {
                        this.newPeerConnection();

                        setTimeout(() => {
                          this.state.peerConn.setRemoteDescription(
                            new RTCSessionDescription(descr),
                          );
                          this.state.peerConn
                            .createAnswer()
                            .then(sessionDescription =>
                              this.setLocalAndSendMessage(sessionDescription),
                            )
                            .catch(error => this.defaultErrorCallback(error));
                        }, 1000);
                        // this.state.peerConn.createOffer((sessionDescription) => this.setLocalAndSendMessage(sessionDescription), this.defaultErrorCallback);
                      } else if (descr.type === 'answer') {
                        this.state.peerConn.setRemoteDescription(
                          new RTCSessionDescription(descr),
                        );
                      } else if (descr.type === 'candidate') {
                        var candidate = new RTCIceCandidate({
                          sdpMLineIndex: descr.sdpMLineIndex,
                          sdpMid: descr.sdpMid,
                          candidate: descr.candidate,
                        });
                        this.state.peerConn.addIceCandidate(candidate);
                      }
                    },
                  );
                },
              );
            } else if (response.code === 404) {
              // alert('No doctor available');
              // User
              Alert.alert(
                'Alert',
                'No, Claim Agents Available',
                [
                  //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                  //   {
                  //     text: 'Cancel',
                  //     onPress: () => console.log('Cancel Pressed'),
                  //     style: 'cancel',
                  //   },
                  {
                    text: 'OK',
                    onPress: () => this.props.navigation.navigate('User'),
                  },
                ],
                {cancelable: false},
              );
            } else {
              alert('Some error');
            }
          });
          // .catch(err => {
          //   console.log('InitNewChat catch', err);
          // });
        })
        .catch(error => {
          console.log('connection error', error);
        });
    }
    this.interval = setInterval(() => {
      if (this.state.audioCallStatus === 'Connected') {
        if (this.state.seconds === 59) {
          this.setState(prevState => ({
            minutes: prevState.minutes + 1,
            seconds: 0,
          }));
        }
        this.setState(prevState => ({seconds: prevState.seconds + 1}));
      }
    }, 1000);
  }
  addNewMessage(message) {
    // console.log('addNewMessage', message);
    var ticket = {...this.state.ticket};

    if (ticket) {
      ticket.messages.push(message);

      this.setState({
        ticket: ticket,
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    this.backHandler.remove();
    if (this.state.connection.state === signalR.HubConnectionState.Connected) {
      this.state.connection.stop();
      console.log('Connection Stop');
    }
    if (this.state.peerConn) {
      this.state.peerConn.close();
    }
  }
  onSend() {
    let connection = this.state.connection;
    this.scrollView.scrollToEnd({animated: true, index: -1});
    // console.log('state.ticket.id', this.state);
    // if (song != null) {
    //   song.play(success => {
    //     if (!success) {
    //       console.log('Not Play');
    //     }
    //   });
    // }
    if (
      this.state.currentMessage !== '' &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      connection.invoke(
        'message',
        parseInt(this.state.ticket.iD),
        this.state.currentMessage,
      );
      // Keyboard.dismiss();

      this.setState({currentMessage: ''});
      console.log('onSend');
    }
  }
  timeFormate(time) {
    console.log('MSG TIME ::: ', time);
    var hours = time[0] + time[1];

    var min = time[3] === undefined ? `${time[2]}` : time[2] + time[3];
    if (hours <= 11) {
      min = min < 10 ? `0${min}` : min;
      return hours + ':' + min + ' AM';
    } else {
      hours = hours - 12;
      min = min < 10 ? `0${min}` : min;
      hours = hours < 10 ? `0${hours}` : hours;

      return hours + ':' + min + ' PM';
    }
  }
  getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  onZoomStateChange = event => {
    console.log('EVENT ___', event);
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this.state.scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };
  showDialog = message => {
    console.log('Image ', message);
    return (
      <Modal
        animationIn="fadeIn"
        animationInTiming={400}
        animationOut="fadeOut"
        animationOutTiming={400}
        transparent={false}
        style={{flex: 1}}
        // backdropColor="#0000"
        isVisible={this.state.imageModal}
        onBackButtonPress={() => {
          this.setState({
            imageModal: false,
          });
        }}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{
              flex: 0.05,
              justifyContent: 'center',
              alignItems: 'flex-end',
              padding: 10,
            }}
            onPress={() => {
              this.setState({
                imageModal: false,
              });
            }}>
            <Image
              source={require('../../assets/icons/android/drawable-xxxhdpi/cross.png')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>

          <View style={{flex: 1, margin: 10, marginHorizontal: 0}}>
            <PinchGestureHandler
              onGestureEvent={Animated.event(
                [
                  {
                    nativeEvent: {scale: this.state.scale},
                  },
                ],
                {
                  useNativeDriver: true,
                },
              )}
              onHandlerStateChange={this.onZoomStateChange}>
              <Animated.Image
                resizeMode="contain"
                style={{
                  width: width,
                  height: '100%',
                  transform: [{scale: this.state.scale}],
                }}
                source={{uri: this.state.imgSrc}}
              />
            </PinchGestureHandler>
          </View>
        </View>
      </Modal>
    );
  };
  showImageModal = async message => {
    console.log('Image -- ', message);

    var url = global.API_URL + '/images/' + message.path;
    console.log('IMAGE URL +++ ', url);
    var ext = this.getExtention(url);
    var P_ext = '.' + ext[0];

    if (this.state.openFile.length === 0) {
      // ToastAndroid.showWithGravityAndOffset(
      //   'Downloading File ...',
      //   ToastAndroid.LONG,
      //   ToastAndroid.BOTTOM,
      //   25,
      //   50,
      // );
      const {config, fs} = RNFetchBlob;
      let download = fs.dirs.DownloadDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: download + '/doc_' + message.originalName,
          description: 'Downloading',
        },
      };
      config(options)
        .fetch('GET', url)
        .then(res => {
          // ToastAndroid.showWithGravityAndOffset(
          //   'File Downloaded',
          //   ToastAndroid.LONG,
          //   ToastAndroid.BOTTOM,
          //   25,
          //   50,
          // );
          Linking.openURL(url).catch(err =>
            console.error('An error occurred', err),
          );
          // this.state.openFile.push({url: res.data}, () => {
          //   console.log('Image Downloaded Successfully.', res.data);
          // });
        });
    }

    // if (ext[0] === 'jpg' || ext[0] === 'png' || ext[0] === 'jpeg') {
    //   this.setState({
    //     imageModal: true,
    //   });
    // } else {
    // if(message.path)
    // ToastAndroid.showWithGravityAndOffset(
    //   'Downloading File ...',
    //   ToastAndroid.LONG,
    //   ToastAndroid.BOTTOM,
    //   25,
    //   50,
    // );
    // const {config, fs} = RNFetchBlob;
    // let download = fs.dirs.DownloadDir;
    // let options = {
    //   fileCache: true,
    //   addAndroidDownloads: {
    //     useDownloadManager: true,
    //     notification: true,
    //     path: download + '/doc_' + message.originalName,
    //     description: 'Downloading',
    //   },
    // };
    // config(options)
    //   .fetch('GET', url)
    //   .then(res => {
    //     ToastAndroid.showWithGravityAndOffset(
    //       'File Downloaded',
    //       ToastAndroid.LONG,
    //       ToastAndroid.BOTTOM,
    //       25,
    //       50,
    //     );
    //     console.log('Image Downloaded Successfully.', res.data);
    //   });
    // {message.file != null ?
    //     this.showImageModal(message) : null}
    // }
  };
  drawMessages() {
    // console.log('drawMessages', this.state);

    if (this.state.ticket) {
      // console.log('TICKET MESSAGE', this.state.ticket);
      return (
        <View>
          <View style={{marginHorizontal: 10, marginBottom: 15}}>
            {this.state.ticket.messages.map((message, index) => {
              let date = new Date(message.createdAt);
              let getSeconds = date.getSeconds();
              // > 9 ? date.getSeconds() : date.getSeconds();
              let msgTime = `${date.getHours()}${date.getMinutes()}`;
              console.log('TIME ______ ', msgTime);
              let convertedTime = this.timeFormate(msgTime);
              // console.log(convertedTime);
              var isSenderPatient =
                message.senderID === this.state.ticket.patientID;

              return (
                <Animatable.View
                  animation={'slideInUp'}
                  useNativeDriver={true}
                  key={index}
                  style={{
                    alignItems: isSenderPatient ? 'flex-end' : 'flex-start',
                    marginleft: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: isSenderPatient ? 'row-reverse' : 'row',
                    }}>
                    <View
                      style={{
                        marginTop: 5,
                        marginRight: isSenderPatient ? 0 : 5,
                        marginLeft: isSenderPatient ? 5 : 0,
                        width: isSenderPatient ? 0 : 30,
                        height: isSenderPatient ? 0 : 30,
                        // borderRadius: 15,
                        // backgroundColor: '#ffff',
                        // elevation: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {isSenderPatient ? null : (
                        <Image
                          style={{width: 30, height: 30}}
                          source={require('../../assets/icons/android/drawable-xxxhdpi/pakistan_takaful_logo_colorful.png')}
                        />
                      )}
                    </View>
                    {/* <View style={{ flex: 0.4 }}></View> */}
                    <View
                      style={{
                        marginTop: 8,
                        marginBottom: 5,
                        maxWidth: '70%',
                        flexDirection: 'row',
                        borderRadius: 10,
                        backgroundColor: isSenderPatient
                          ? '#0d74bc'
                          : '#0b9444',
                        // borderTopRightRadius: isSenderPatient ? 1 : 20,
                        // borderTopLeftRadius: isSenderPatient ? 20 : 1,
                        padding: 10,
                        // paddingHorizontal: 15,
                      }}>
                      {this.state.imageModal
                        ? this.showDialog(message.file)
                        : null}

                      <View
                        style={{
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          // paddingHorizontal: 5,
                        }}>
                        {message.file == null ? (
                          <Text
                            accessible={true}
                            accessibilityRole="text"
                            selectable={true}
                            selectionColor={
                              isSenderPatient ? '#3BEA84' : '#47A8EC'
                            }
                            onLongPress={this._getChatContent}
                            style={{
                              color: '#fdfeff',
                              textAlign: 'justify',
                              fontFamily: 'Ubuntu-Regular',
                              fontSize: 14,
                            }}>
                            {message.text}
                            {/* : message.file.originalName */}
                            {/* {console.log(global.API_URL + "/images/" + message.file.path)} */}
                          </Text>
                        ) : (
                          <View>
                            {message.file.fileType === 0 ? (
                              <TouchableOpacity
                                onPress={() => {
                                  this.setState(
                                    {
                                      imgSrc:
                                        global.API_URL +
                                        '/images/' +
                                        message.file.path,
                                    },
                                    () => {
                                      this.setState({
                                        imageModal: true,
                                      });
                                    },
                                  );
                                }}
                                style={{
                                  padding: 5,
                                  borderRadius: 15,
                                }}>
                                <AutoHeightImage
                                  width={200}
                                  source={{
                                    uri:
                                      global.API_URL +
                                      '/images/' +
                                      message.file.path,
                                  }}
                                  animated={true}
                                />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() =>
                                  this.showImageModal(message.file)
                                }>
                                <Text
                                  style={{
                                    color: '#fdfeff',
                                    fontFamily: 'Ubuntu-Regular',
                                    fontSize: 14,
                                  }}>
                                  {message.file.originalName}
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        )}
                        <View
                          style={{
                            // flex: 1,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            paddingTop: 4,
                          }}>
                          <Text
                            style={{
                              fontSize: 10,
                              color: '#ffff',
                              fontFamily: 'Ubuntu-Light',
                              textAlign: 'center',
                            }}>
                            {convertedTime}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Animatable.View>
              );
            })}
          </View>
        </View>
      );
    }
  }

  startStream() {
    console.log('start Stream');

    this.newPeerConnection();

    setTimeout(() => {
      this.state.peerConn
        .createOffer()
        .then(sessionDescription =>
          this.setLocalAndSendMessage(sessionDescription),
        )
        .catch(error => this.defaultErrorCallback(error));
    }, 3000);
  }

  handleCallButton() {
    // if (this.state.audio_denied) {
    //   this.requestForAudio();
    // } else {
    this.setState({chatView: 'AudioCall'});
    if (this.state.connection) {
      console.log('this.state.ticket.iD)', parseInt(this.state.ticket.iD));

      this.state.connection
        .invoke('requestAudio', parseInt(this.state.ticket.iD))
        .then(() => {
          this.getStream();
        })
        .catch(error => {
          console.log('error', error);
        });
    }
    // }
  }

  defaultErrorCallback(error) {
    console.log('defaultErrorCallback', error);
  }

  setLocalAndSendMessage(sessionDescription) {
    this.state.peerConn
      .setLocalDescription(sessionDescription)
      .then((a, b, c) => {
        // console.log(
        //   'should invoke',
        //   this.state,
        //   parseInt(this.state.ticket.iD),
        //   JSON.stringify(sessionDescription),
        // );
        this.state.connection
          .invoke(
            'addIceCandidate',
            parseInt(this.state.ticket.iD),
            JSON.stringify(sessionDescription),
          )
          .catch(error => {
            console.log('setLocalAndSendMessage', error);
          });
      });
  }

  newPeerConnection() {
    var peerConn = new RTCPeerConnection({
      iceServers: [
        {url: 'stun:stun.l.google.com:19302'},
        {url: 'stun:stun1.l.google.com:19302'},
        {url: 'stun:stun2.l.google.com:19302'},
        {url: 'stun:stun3.l.google.com:19302'},
        {url: 'stun:stun4.l.google.com:19302'},
        {
          urls: 'turn:54.36.109.50:3479?transport=tcp',
          username: 'test',
          lifetime: 600,
          credential: 'test',
        },
      ],
    });

    // console.log('peerConn', peerConn);

    peerConn.onicecandidate = evt => {
      // console.log('onicecandidate', evt);

      if (evt.candidate) {
        this.state.connection.invoke(
          'addIceCandidate',
          parseInt(this.state.ticket.iD),
          JSON.stringify({
            type: 'candidate',
            sdpMLineIndex: evt.candidate.sdpMLineIndex,
            sdpMid: evt.candidate.sdpMid,
            candidate: evt.candidate.candidate,
          }),
        );
      }
    };

    peerConn.addStream(this.state.localStream);

    peerConn.addEventListener(
      'addstream',
      stream => {
        // this.remoteStream = stream.stream;

        // console.log('remoteStream added', stream);

        this.setState({
          remoteStream: stream,
        });
      },
      false,
    );

    this.setState({
      peerConn,
    });
  }

  handleFilePicker(response) {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled file picker');
    } else if (response.error) {
      console.log('FilePickerManager Error: ', response.error);
    } else {
      this.setState({
        file_: response,
        file_uri: response.uri,
        img_type: response.type,
      });
    }
  }
  sendFile = () => {
    const {file_} = this.state;
    var data = new FormData();
    data.append('prescription', {
      name: file_.fileName,
      type: file_.type,
      uri: file_.uri,
    });
    data.append('ticketId', '2568');
    console.log('DataUPLOAD===', data);
    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };
    axios
      .post(
        global.API_URL +
          '/api/files/uploadprescription?ticketId=' +
          this.state.ticket.id,
        data,
        config,
      )
      .then(response => {
        if (response.status === 200) {
          this.setState(
            {
              imgAnim: 'zoomOut',
            },
            () =>
              setTimeout(() => {
                this.setState({
                  file_: '',
                  file_uri: '',
                });
              }, 200),
          );
        }
      })
      .catch(error => {
        console.log('upload error', error, error.response);
      });
  };

  handleVideoAcceptBtn() {
    if (this.state.camera_denied) {
      this.requestForCamera();
    } else {
      if (this.state.showVideoChatButton) {
        // this.getVideoStream();
        console.log('Video Started');
        this.setState(
          {
            showVideoChatButton: false,
            showRemoteVideo: true,
            chatView: 'VideoCall',
            videoRequest: false,
          },
          () => {
            // console.log('state ticket', this.state);

            this.state.connection
              .invoke('requestVideo', parseInt(this.state.ticket.iD))
              // .then(()=>{
              //     this.getStream()
              // })
              .catch(error => {
                console.log('requestVideo error', error.error, error.response);
              });
          },
        );
      }
    }
  }
  onButtonStart() {
    this.start();
    // this.setState({startDisabled: true, stopDisabled: false});
  }

  // onButtonStop() {
  //   this.setState({counter: '00'});
  // }

  // onButtonClear() {
  //   this.setState({
  //     timer: null,
  //     counter: '00',
  //     miliseconds: '00',
  //   });
  // }

  videoRequest() {
    console.log(this.state.requestVideo);
    return (
      <View style={styles.videoScreen}>
        <StatusBar
          translucent
          backgroundColor="#0f75bd"
          barStyle="light-content"
        />

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              borderRadius: Dimensions.get('window').width / 2,
              width: 160,
              height: 160,
              backgroundColor: '#0f75bd',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 10,
            }}>
            <Image
              style={{width: 100, height: 100}}
              source={require('../../assets/icons/android/drawable-xxxhdpi/film.png')}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginTop: 40,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: '#484848'}}>
            Agent is requesting video call
          </Text>
        </View>
        <View style={{position: 'absolute', bottom: 40, right: 0, left: 0}}>
          <View style={{...styles.respondBtns}}>
            <View>
              <Ripple
                rippleContainerBorderRadius={Dimensions.get('window').width / 2}
                size={10}
                onPress={() => {
                  Vibration.cancel();
                  this.handleVideoAcceptBtn();
                }}
                style={{
                  borderRadius: Dimensions.get('window').width / 2,
                  padding: 15,
                  backgroundColor: '#388e3c',
                }}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../../assets/icons/android/drawable-xxxhdpi/accept.png')}
                />
              </Ripple>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  paddingTop: 5,
                  color: '#484848',
                }}>
                Accept
              </Text>
            </View>
            <View>
              <Ripple
                rippleContainerBorderRadius={Dimensions.get('window').width / 2}
                size={10}
                onPress={() => {
                  Vibration.cancel();
                  this.setState({
                    chatView: 'AudioCall',
                  });
                }}
                style={{
                  borderRadius: Dimensions.get('window').width / 2,
                  padding: 15,
                  backgroundColor: '#d50000',
                }}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../../assets/icons/android/drawable-xxxhdpi/reject.png')}
                />
              </Ripple>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  paddingTop: 5,
                  color: '#484848',
                }}>
                Reject
              </Text>
            </View>
          </View>
        </View>
        {/* </RNCamera> : null}
         */}
      </View>
    );
  }

  handleLoudSpeaker() {
    let isSpeakerEnabled = this.state.isSpeakerEnabled;
    if (isSpeakerEnabled) {
      InCallManager.setSpeakerphoneOn(false);
      this.setState({
        isSpeakerEnabled: false,
      });
    } else if (isSpeakerEnabled == false) {
      console.log('true');
      InCallManager.setSpeakerphoneOn(true);
      this.setState({
        isSpeakerEnabled: true,
      });
    }
  }

  handleMicMute() {
    let isMuted = this.state.isMuted;
    if (isMuted) {
      InCallManager.setMicrophoneMute(false);
      this.setState({
        isMuted: false,
      });
    } else if (isMuted == false) {
      console.log('true');
      InCallManager.setMicrophoneMute(true);
      this.setState({
        isMuted: true,
      });
    }
  }

  audioCall() {
    // console.log('Audio View');
    return (
      <Animatable.View
        useNativeDriver={true}
        duration={200}
        easing="ease-in-out"
        animation={this.state.audioAnimation}
        style={styles.audioCallScreen}>
        <StatusBar
          translucent
          backgroundColor="#0f75bd"
          barStyle="light-content"
        />
        <AudioCallHeader
          connectionStatus={
            this.state.audioCallStatus === 'Connected'
              ? this.state.audioCallStatus
              : this.state.audioCallStatus
          }
          time={
            this.state.audioCallStatus == 'Connected'
              ? this.state.minutes < 10
                ? '0' + this.state.minutes + ':' + this.state.seconds
                : this.state.minutes + ':' + this.state.seconds
              : null
          }
          backPress={() => {
            this.setState({audioAnimation: 'slideOutRight'}, () => {
              setTimeout(() => {
                this.setState({chatView: 'chat'}, () => {
                  this.setState({
                    audioAnimation: 'slideInRight',
                  });
                });
              }, 200);
            });
          }}
        />
        <View
          style={{
            alignItems: 'center',
            width: 150,
            height: 150,
            borderRadius: 80,
            alignSelf: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: height / 4,
            zIndex: 9999,
          }}>
          <PulseLoader
            backgroundColor="#0f75bd"
            borderColor="#0267ae"
            size={160}
            avatar={require('../../assets/icons/android/drawable-xxxhdpi/logo.png')}
          />
          {/* <Image
            style={{width: 100, height: 100, alignSelf: 'center'}}
            source={require('../../assets/icons/android/drawable-xxxhdpi/pakistan_takaful_logo_colorful.png')}
          /> */}
        </View>

        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        />

        <View
          style={{
            flex: 0.2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Ripple
            rippleContainerBorderRadius={Dimensions.get('window').width / 2}
            onPress={() => {
              this.handleLoudSpeaker();
            }}
            rippleOpacity={0.6}
            rippleCentered={true}
            rippleDuration={700}
            style={{
              borderRadius: Dimensions.get('window').width / 2,
              padding: 15,
              backgroundColor: this.state.isSpeakerEnabled ? '#fff' : '#113245',
            }}>
            {this.state.isSpeakerEnabled ? (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../assets/call_icons/loud.png')}
              />
            ) : (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../assets/call_icons/not_loud.png')}
              />
            )}
          </Ripple>

          <Ripple
            rippleContainerBorderRadius={Dimensions.get('window').width / 2}
            onPress={() => {
              // this.onButtonStop();
              this.setState({
                audioCallStatus: null,
                chatView: 'chat',
                minutes: 0,
                seconds: 0,
              });
              if (
                this.state.connection.state ===
                signalR.HubConnectionState.Connected
              ) {
                // this.state.connection.stop();
                this.setState({
                  chatView: 'chat',
                });
              }
              this.state.connection
                .invoke('onDeclineAudio', parseInt(this.state.ticket.iD))
                .then(() => {
                  console.log('audio decline invoked');
                })
                .catch(error => {
                  console.log('error', error);
                });
              if (this.state.peerConn) {
                this.state.peerConn.close();
              }
            }}
            rippleOpacity={0.6}
            rippleCentered={true}
            rippleDuration={700}
            style={{
              borderRadius: Dimensions.get('window').width / 2,
              backgroundColor: '#C62828',
              padding: 20,
            }}>
            <Image
              style={{width: 25, height: 25, transform: [{rotate: '135deg'}]}}
              source={require('../../assets/call_icons/call_decline.png')}
            />
          </Ripple>

          <Ripple
            rippleContainerBorderRadius={30}
            onPress={() => {
              this.handleMicMute();
            }}
            rippleOpacity={0.6}
            rippleCentered={true}
            rippleDuration={700}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 15,
              backgroundColor: this.state.isMuted ? '#fff' : '#113245',
            }}>
            {this.state.isMuted ? (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../assets/call_icons/muted.png')}
              />
            ) : (
              <Image
                style={{width: 25, height: 25}}
                source={require('../../assets/call_icons/not_muted.png')}
              />
            )}
          </Ripple>
        </View>

        <View
          style={{
            flex: 0.2,
            borderRadius: Dimensions.get('window').width / 2,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
          }}
        />
      </Animatable.View>
    );
  }

  videoCall() {
    return (
      <Animatable.View
        useNativeDriver={true}
        duration={200}
        easing="ease-in-out"
        animation={this.state.videoAnimation}
        style={{...styles.screen, marginTop: 0}}>
        <StatusBar backgroundColor="#061843" barStyle="light-content" />
        <View style={{flex: 1}}>
          {/* {console.log('remote stream', this.state.remoteStream)}
          {console.log(
            'show remote utl',
            this.state.remoteStream.stream.toURL(),
          )} */}
          {this.state.remoteStream && this.state.showRemoteVideo ? (
            <RTCView
              streamURL={this.state.remoteStream.stream.toURL()}
              objectFit="cover"
              style={{width: '100%', height: '100%'}}
            />
          ) : null}
          <View
            style={{
              position: 'absolute',
              // top: 10,
              // left: 20,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingTop: 20,
              paddingLeft: 20,
            }}>
            <TouchableOpacity
              onPress={() =>
                this.setState({videoAnimation: 'slideOutRight'}, () => {
                  setTimeout(() => {
                    this.setState({chatView: 'chat'}, () => {
                      this.setState({
                        videoAnimation: 'slideInRight',
                      });
                    });
                  }, 200);
                })
              }>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../assets/icons/android/drawable-xxxhdpi/video_arrow_down.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{flex:1, alignItems: 'center'}}>
                    {
                        //  (this.state.f && this.state.showRemoteVideo) ? 
                         <RTCView streamURL= {this.state.localStream.toURL()} style={{width:200, height: 300}} /> 
                    //   : null
                    }
                </View> */}

        {/* this.state.f.stream.toURL() */}

        {/* f.stream. */}
        {/* {console.log('local stream', this.state.localStream)} */}

        {this.state.localStream && this.state.showRemoteVideo ? (
          <RTCView
            style={styles.camVideo}
            streamURL={this.state.localStream.toURL()}
          />
        ) : null}

        <View style={{...styles.chatBtn}}>
          {/* {console.log(this.state.localStream)} */}
          {/* <View
            style={{
              flex: 0.2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Ripple
              rippleContainerBorderRadius={Dimensions.get('window').width / 2}
              onPress={() => this.setState({chatView: 'chat'})}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../assets/icons/android/drawable-xxxhdpi/arrow-down.png')}
              />
            </Ripple>
          </View> */}
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Ripple
              rippleOpacity={0.6}
              rippleCentered={true}
              rippleDuration={700}
              rippleContainerBorderRadius={Dimensions.get('window').width / 2}
              onPress={() => {
                this.setState({
                  showRemoteVideo: false,
                  audioCallStatus: null,
                  chatView: 'chat',
                });
                if (
                  this.state.connection.state ===
                  signalR.HubConnectionState.Connected
                ) {
                  // this.state.connection.stop();
                  this.setState({
                    chatView: 'chat',
                  });
                }
                this.state.connection
                  .invoke('onDeclineAudio', parseInt(this.state.ticket.iD))
                  .then(() => {
                    console.log('Video decline invoked');
                  })
                  .catch(error => {
                    console.log('error', error);
                  });
                if (this.state.peerConn) {
                  this.state.peerConn.close();
                }
                // this.state.connection
                //   .invoke('onDeclineAudio', parseInt(this.state.ticket.iD))
                //   .then(() => {
                //     console.log('Video decline invoked');
                //   })
                //   .catch(error => {
                //     console.log('error', error);
                //   });
                // // jugarrr --> connection must persist when video call declines

                // if (
                //   this.state.connection.state ===
                //   signalR.HubConnectionState.Connected
                // ) {
                //   // this.state.connection.stop();
                //   this.setState({
                //     chatView: 'chat',
                //   });
                // }
                // if (this.state.peerConn) {
                //   this.state.peerConn.close();
                // }
              }}
              style={{
                borderRadius: Dimensions.get('window').width / 2,
                backgroundColor: '#C62828',
                padding: 20,
                //  zIndex: 10000
              }}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../assets/icons/android/drawable-xxxhdpi/call_decline.png')}
              />
            </Ripple>
          </View>
          <View
            style={{
              flex: 0.2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Ripple
              rippleOpacity={0.6}
              rippleCentered={true}
              rippleDuration={700}
              rippleContainerBorderRadius={Dimensions.get('window').width / 2}
              onPress={() => {
                if (this.state.localStream != null) {
                  const tracks = this.state.localStream.getTracks();
                  // console.log(tracks)
                  tracks.map(item => {
                    if (item.kind == 'video') {
                      item._switchCamera();
                    }
                  });
                }
              }}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../assets/icons/android/drawable-xxxhdpi/camSwap.png')}
              />
            </Ripple>
            <Ripple
              rippleOpacity={0.6}
              rippleCentered={true}
              rippleDuration={700}
              rippleContainerBorderRadius={Dimensions.get('window').width / 2}
              onPress={() => {
                this.handleMicMute();
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 0.5,
                borderColor: '#afb0b3',
                padding: 15,
                backgroundColor: this.state.isMuted ? '#fff' : null,
              }}>
              {this.state.isMuted ? (
                <Icon name="md-mic-off" color="#fff" size={30} />
              ) : (
                <Icon name="md-mic" color="#fff" size={30} />
              )}
            </Ripple>

            <View
              style={{
                borderRadius: Dimensions.get('window').width / 2,
                borderWidth: 0.5,
                borderColor: '#afb0b3',
                padding: 15,
              }}>
              <Ripple
                rippleOpacity={0.6}
                rippleCentered={true}
                rippleDuration={700}
                rippleContainerBorderRadius={Dimensions.get('window').width / 2}
                onPress={() => {
                  //  if(this.state.showRemoteVideo) {
                  this.setState({
                    showRemoteVideo: false,
                    chatView: 'AudioCall',
                  });
                  //  }
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../assets/icons/android/drawable-xxxhdpi/disable_video.png')}
                />
              </Ripple>
            </View>

            {/* <Ripple
                                 size={10}
                                //  onPress={() => this.state.navigation.navigate('VideoCall')}
                             >
                                 <Image style={{width: 30, height: 30}}
                                     source={require('../../assets/icons/android/drawable-xxxhdpi/video_mic_mute.png')}/>
                             </Ripple> */}

            <StatusBar hidden={true} barStyle="dark-content" />
          </View>
        </View>
      </Animatable.View>
    );
  }

  setTimeout() {
    setTimeout(() => {
      if (this.state.audioCallStatus == 'Connecting To a Claim Agent...') {
        this.state.connection
          .invoke('onDeclineAudio', parseInt(this.state.ticket.iD))
          .then(() => {
            this.setState({
              audioCallStatus: 'No Answer...',
            });
            setTimeout(() => {
              this.setState(
                {
                  chatView: 'chat',
                },
                () => {
                  this.setState({
                    audioCallStatus: null,
                  });
                },
              );
            }, 2000);

            console.log('audio decline invoked');
          })
          .catch(error => {
            console.log('error', error);
          });
      } else {
        console.log('call was connected');
      }
    }, 20000);
  }
  msgSend = () => {
    const {file_uri} = this.state;
    if (file_uri != '') {
      this.sendFile();
      this.onSend();
    } else {
      this.onSend();
    }
  };
  selectFile = () => {
    if (this.state.storage_denied) {
      this.requestForStorage();
    } else {
      FilePickerManager.showFilePicker(null, response =>
        this.handleFilePicker(response),
      );
    }
  };

  textChat(animatedStyle) {
    if (this.state.accept_Listen) {
      return this.checkAcceptConnection();
    }
    if (!this.state.timeExceed) {
      return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="height">
          <StatusBar backgroundColor="#0f75bd" barStyle="light-content" />
          {/* {this.state.accept_Listen ? this.checkAcceptConnection() : null} */}
          <View
            style={{
              // flex: 0.11,
              flexDirection: 'row',
              marginTop: StatusBar.currentHeight,
              padding: 15,
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: '#f8fbfd',
              elevation: 10,
              // paddingTop:StatusBar.he
            }}>
            <TouchableOpacity
              // onPress={() => this.props.navigation.goBack()}
              onPress={this.handleBackBtn}
              style={{alignItems: 'center', marginLeft: 10}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/android/drawable-xxxhdpi/chat_back2.png')}
                />
              </View>
            </TouchableOpacity>

            <View
              style={{
                marginLeft: 10,
                flex: 0.2,
                marginRight: 5,
                alignItems: 'center',
              }}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../assets/icons/android/drawable-xxxhdpi/pakistan_takaful_logo_colorful.png')}
              />
            </View>
            <View
              style={{
                flex: 0.7,
                justifyContent: 'space-around',
                alignItems: 'flex-start',
              }}>
              <View style={{alignItems: 'flex-start'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Ubuntu-Medium',
                    color: '#7a8ca5',
                  }}>
                  Claim # &nbsp;
                  {this.state.ticket != null ? this.state.ticket.id : 'null'}
                </Text>
              </View>
            </View>
            {this.state.session_expired ? (
              <View style={{flex: 0.2, alignItems: 'center'}} />
            ) : (
              <TouchableOpacity
                style={{flex: 0.2, alignItems: 'center'}}
                onPress={() => {
                  if (this.state.audio_denied) {
                    this.requestForAudio();
                  } else {
                    this.handleCallButton();
                    this.setTimeout();
                    this.setState({
                      audioCallStatus: 'Connecting to a Claim Agent...',
                    });
                  }
                }}>
                <Image
                  style={{width: 24, height: 24}}
                  source={require('../../assets/icons/android/drawable-xxxhdpi/chat_call.png')}
                />
              </TouchableOpacity>
            )}
          </View>
          {this.state.audioCallStatus == 'Connected' &&
          this.state.chatView === 'chat' &&
          !this.state.showRemoteVideo &&
          !this.state.session_expired ? (
            <View>
              <TouchableOpacity
                onPress={() => this.setState({chatView: 'AudioCall'})}
                style={{
                  width: '100%',
                  backgroundColor: '#0b9444',
                  padding: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontFamily: 'Ubuntu-Regular', color: '#ffff'}}>
                    Tap to return to audio call
                  </Text>
                  <Text style={{fontFamily: 'Ubuntu-Regular', color: '#ffff'}}>
                    {this.state.audioCallStatus == 'Connected'
                      ? this.state.minutes < 10
                        ? '0' + this.state.minutes + ':' + this.state.seconds
                        : this.state.minutes + ':' + this.state.seconds
                      : null}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}

          {this.state.chatView === 'chat' &&
          this.state.showRemoteVideo &&
          this.state.remoteStream &&
          this.state.audioCallStatus !== null &&
          !this.state.session_expired ? (
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => this.setState({chatView: 'VideoCall'})}
                style={{
                  width: '100%',
                  height: 40,
                  backgroundColor: '#0b9444',
                  // padding: 10,
                  justifyContent: 'center',
                  paddingLeft: 20,
                }}>
                <Text style={{fontFamily: 'Ubuntu-Regular', color: '#ffff'}}>
                  Tap to return to video call
                </Text>
              </TouchableOpacity>
              <Animated.View
                useNativeDriver={true}
                {...this.panResponder.panHandlers}
                style={[
                  animatedStyle,
                  {
                    flex: 1,

                    // marginBottom: 50,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    position: 'absolute',
                    zIndex: 100000,
                    top: '20%',
                    right: 0,
                  },
                ]}>
                {this.state.remoteStream && this.state.showRemoteVideo ? (
                  <View>
                    <RTCView
                      streamURL={this.state.remoteStream.stream.toURL()}
                      objectFit="cover"
                      style={styles.camVideoChat}
                    />
                    <RTCView
                      style={styles.camVideoChatLocal}
                      streamURL={this.state.localStream.toURL()}
                    />
                  </View>
                ) : null}

                {/* {this.state.localStream && this.state.showRemoteVideo ? (
                  <RTCView
                    style={styles.camVideoChatLocal}
                    streamURL={this.state.localStream.toURL()}
                  />
                ) : null} */}
              </Animated.View>
            </View>
          ) : null}

          <ScrollView
            ref={c => (this.scrollView = c)}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({animated: true});
            }}
            style={{
              flex: 1,
              marginBottom: 10,
            }}>
            <View style={{justifyContent: 'flex-end'}}>
              <View
                style={{
                  alignItems: 'flex-start',
                  marginTop: 15,
                  marginLeft: 10,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../../assets/icons/android/drawable-xxxhdpi/pakistan_takaful_logo_colorful.png')}
                  />
                  <Animatable.View
                    animation="bounceIn"
                    style={{
                      // marginTop: 8,
                      marginLeft: 5,
                      maxWidth: '60%',
                      flexDirection: 'row',
                      borderRadius: 10,
                      backgroundColor: '#0b9444',
                      padding: 10,
                      marginBottom: 5,
                      // paddingHorizontal: 15,
                    }}>
                    <Text
                      style={{color: '#ffff', fontFamily: 'Ubuntu-Regular'}}>
                      Welcome to Takaful Pakistan 24/7 online claim agency. You
                      need help regarding your policy "
                      {this.state.selected_policy}", simply reply to this
                      message, we are online and ready to serve.
                    </Text>
                  </Animatable.View>
                </View>
              </View>

              {this.drawMessages()}
            </View>
          </ScrollView>
          <View style={{marginBottom: 10}}>
            {this.state.file_uri != '' && !this.state.session_expired ? (
              <Animatable.View
                useNativeDriver={true}
                duration={600}
                easing="ease-in-out"
                animation={this.state.imgAnim}
                style={{
                  marginLeft: 10,
                  height: 100,
                  width: 120,
                  backgroundColor: '#e9e9e9',
                  borderRadius: 8,
                }}>
                <View>
                  {this.state.img_type === 'image/jpeg' ||
                  this.state.img_type === 'image/jpg' ||
                  this.state.img_type === 'image/png' ? (
                    <Image
                      source={{uri: this.state.file_uri}}
                      style={{
                        height: 100,
                        width: 120,
                        borderRadius: 8,
                        alignSelf: 'center',
                      }}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/icons/android/drawable-xxxhdpi/doc.png')}
                      style={{
                        height: 100,
                        width: 80,
                        alignSelf: 'center',
                      }}
                    />
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState(
                      {
                        imgAnim: 'zoomOut',
                      },
                      () => {
                        setTimeout(() => {
                          this.setState(
                            {
                              file_uri: '',
                              file_: [],
                            },
                            () =>
                              this.setState({
                                imgAnim: 'slideInUp',
                              }),
                          );
                        }, 300);
                      },
                    );
                  }}
                  style={{position: 'absolute', top: -6, right: -6}}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../assets/icons/android/drawable-xxxhdpi/close.png')}
                  />
                </TouchableOpacity>
                <View
                  style={{position: 'absolute', bottom: 0, right: 0, left: 0}}>
                  <TouchableOpacity
                    onPress={this.sendFile}
                    style={{
                      backgroundColor: '#c7c7c7',
                      borderBottomRightRadius: 8,
                      borderBottomLeftRadius: 8,
                      alignItems: 'center',
                      opacity: 0.7,
                    }}>
                    <Text
                      style={{color: '#000', fontSize: 14, fontWeight: 'bold'}}>
                      Send
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            ) : null}
            <View style={{padding: 10}}>
              {this.state.session_expired ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',
                    padding: 20,
                    width: '80%',
                    alignSelf: 'center',
                    borderRadius: width / 2,
                  }}>
                  <View style={{alignItems: 'flex-start'}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#fff',
                        fontFamily: 'Ubuntu-Medium',
                      }}>
                      Your Chat Session Expired
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <TextInput
                      onChangeText={text =>
                        this.setState({currentMessage: text})
                      }
                      value={this.state.currentMessage}
                      style={{
                        color: '#000',
                        justifyContent: 'center',
                        padding: 10,
                        paddingLeft: 20,
                        paddingRight: 10,
                        fontFamily: 'Ubuntu-Regular',
                        backgroundColor: '#ffff',
                        borderRadius: 30,
                        borderWidth: 0.7,
                        borderColor: '#c7c7c7',
                        maxHeight: Math.max(45, this.state.height),
                        width: width / 1.4,
                      }}
                      placeholder="Type message"
                      multiline
                      placeholderTextColor="#7a8ca5"
                      selectionColor="#7a8ca5"
                      autoCorrect={true}
                      onContentSizeChange={event => {
                        this.scrollView.scrollToEnd({animated: true});
                        let currentHeight =
                          event.nativeEvent.contentSize.height;
                        console.log('input height', currentHeight);
                        if (currentHeight > 90) {
                          currentHeight = 90;
                        }
                        this.setState({height: currentHeight});
                      }}
                    />
                  </View>
                  <View style={{marginLeft: 5, justifyContent: 'flex-end'}}>
                    <Ripple
                      rippleContainerBorderRadius={
                        Dimensions.get('window').width / 2
                      }
                      rippleOpacity={0.6}
                      rippleCentered={true}
                      rippleDuration={500}
                      style={{
                        borderRadius: 30,
                        width: 46,
                        height: 46,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#4FA4DF',
                        borderWidth: 1,
                        // elevation: 10,
                      }}
                      onPress={() => {
                        setTimeout(() => {
                          this.selectFile();
                        }, 500);
                      }}>
                      <Image
                        style={{width: 20, height: 20, alignSelf: 'center'}}
                        source={require('../../assets/icons/android/drawable-xxxhdpi/attachment.png')}
                      />
                    </Ripple>
                  </View>
                  <View
                    style={{
                      marginLeft: 5,
                      marginRight: 5,
                      justifyContent: 'flex-end',
                    }}>
                    <Ripple
                      rippleContainerBorderRadius={
                        Dimensions.get('window').width / 2
                      }
                      rippleColor={'#ffff'}
                      rippleOpacity={0.6}
                      rippleCentered={true}
                      rippleDuration={700}
                      onPress={this.msgSend}
                      style={{
                        borderRadius: 30,
                        width: 45,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#4FA4DF',
                      }}>
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          alignSelf: 'center',
                        }}
                        source={require('../../assets/icons/android/drawable-xxxhdpi/send.png')}
                      />
                    </Ripple>
                  </View>
                </View>
              )}
            </View>
          </View>
          {/* <View
            style={{
              paddingBottom: 15,
              flex: this.state.file_uri === '' ? 0.1 : 0.3,
              // borderWidth: 1,
              // marginTop: 10,
              // backgroundColor: '#092056',
              // backgroundColor: '#f8fbfd',
            }}>
            {this.state.file_uri != '' ? (
              <Animatable.View
                useNativeDriver={true}
                duration={600}
                easing="ease-in-out"
                animation={this.state.imgAnim}
                style={{
                  marginLeft: 10,
                  height: 100,
                  width: 120,
                  backgroundColor: '#e9e9e9',
                  borderRadius: 8,
                }}>
                <View>
                  <Image
                    style={{
                      height: 80,
                      width: 100,
                      borderRadius: 8,
                      alignSelf: 'center',
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState(
                      {
                        imgAnim: 'zoomOut',
                      },
                      () => {
                        setTimeout(() => {
                          this.setState(
                            {
                              file_uri: '',
                            },
                            () =>
                              this.setState({
                                imgAnim: 'slideInUp',
                              }),
                          );
                        }, 300);
                      },
                    );
                  }}
                  style={{position: 'absolute', top: -6, right: -6}}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../assets/icons/android/drawable-xxxhdpi/close.png')}
                  />
                </TouchableOpacity>
                <View
                  style={{position: 'absolute', bottom: 0, right: 0, left: 0}}>
                  {/* <Image
                  source={require('../../assets/icons/android/drawable-xxxhdpi/close.png')}
                /> 
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#c7c7c7',
                      borderBottomRightRadius: 8,
                      borderBottomLeftRadius: 8,
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#000', fontSize: 14}}>Send</Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            ) : null}
            {this.state.session_expired ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#eeee',
                }}>
                <View style={{alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#7a8ca5',
                      fontFamily: 'Ubuntu-Medium',
                    }}>
                    Your Chat Session Expired
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={{
                  paddingRight: 5,
                  paddingLeft: 5,
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 1.2,
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    onChangeText={text => this.setState({currentMessage: text})}
                    value={this.state.currentMessage}
                    style={{
                      color: '#000',
                      justifyContent: 'center',
                      paddingLeft: 20,
                      paddingRight: 10,
                      fontFamily: 'Ubuntu-Regular',
                      backgroundColor: '#ffff',
                      borderRadius: 30,
                      borderWidth: 0.7,
                      borderColor: '#c7c7c7',
                      maxHeight: Math.max(48, this.state.height),
                    }}
                    placeholder="Type message"
                    multiline
                    placeholderTextColor="#7a8ca5"
                    selectionColor="#7a8ca5"
                    autoCorrect={true}
                    onContentSizeChange={event => {
                      this.scrollView.scrollToEnd({animated: true});
                      let currentHeight = event.nativeEvent.contentSize.height;
                      console.log('input height', currentHeight);
                      if (currentHeight > 90) {
                        currentHeight = 90;
                      }
                      this.setState({height: currentHeight});
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 0.25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ripple
                    rippleContainerBorderRadius={
                      Dimensions.get('window').width / 2
                    }
                    rippleOpacity={0.6}
                    rippleCentered={true}
                    rippleDuration={700}
                    style={{
                      borderRadius: 30,
                      width: 46,
                      height: 46,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#4FA4DF',
                      borderWidth: 1,
                      // elevation: 10,
                    }}
                    onPress={() => {
                      if (this.state.storage_denied) {
                        this.requestForStorage();
                      } else {
                        FilePickerManager.showFilePicker(null, response =>
                          this.handleFilePicker(response),
                        );
                      }
                    }}>
                    <Image
                      style={{width: 20, height: 20, alignSelf: 'center'}}
                      source={require('../../assets/icons/android/drawable-xxxhdpi/attachment.png')}
                    />
                  </Ripple>
                </View>

                <View
                  style={{
                    flex: 0.2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ripple
                    rippleContainerBorderRadius={
                      Dimensions.get('window').width / 2
                    }
                    rippleColor={'#ffff'}
                    rippleOpacity={0.6}
                    rippleCentered={true}
                    rippleDuration={700}
                    onPress={() => {
                      this.onSend();
                    }}
                    style={{
                      borderRadius: 30,
                      width: 45,
                      height: 45,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#4FA4DF',
                    }}>
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        alignSelf: 'center',
                      }}
                      source={require('../../assets/icons/android/drawable-xxxhdpi/send.png')}
                    />
                  </Ripple>
                </View>
              </View>
            )}
          </View> */}
        </KeyboardAvoidingView>
      );
    }
    return null;
  }

  render() {
    const animatedStyle = {
      transform: this.animatedValue.getTranslateTransform(),
    };

    return (
      <View style={{flex: 1}}>
        {this.state.chatView == 'VideoCall' && this.state.localStream
          ? this.videoCall()
          : this.state.chatView == 'chat'
          ? this.textChat(animatedStyle)
          : this.state.chatView == 'AudioCall'
          ? this.audioCall()
          : this.state.chatView == 'videoRequest'
          ? this.videoRequest()
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  audioCallScreen: {
    flex: 1,
    backgroundColor: '#05283c',
  },
  respondBtns: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    alignItems: 'center',
  },
  cards: {
    justifyContent: 'space-around',
    marginVertical: 20,
    width: '100%',
    paddingHorizontal: 20,

    flex: 0.65,

    // marginHorizontal: 20
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
  screen: {
    flex: 1,
    // flexDirection: 'column',
    // backgroundColor: '#ffffff',
    // backgroundColor: '#061843',
    // paddingTop: StatusBar.currentHeight,
    // zIndex: 99,
    // paddingVertical: 20,
    // justifyContent: 'center'
    // padding: 70,
    // justifyContent: 'center'
  },
  camVideo: {
    zIndex: 10000,
    height: localStreamHeight,
    width: localStreamWidth,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    position: 'absolute',
    bottom: '22%',
    right: -1,
    // paddingRightt: 10
  },
  camVideoChat: {
    zIndex: 10000,
    height: localStreamHeight,
    // marginLeft: 20,
    width: 200,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // padding: 10,
    // top: '55%',
    // position: 'absolute',
    // top: 10,
    // bottom: 10,
    // right: 10,
  },
  camVideoChatLocal: {
    zIndex: 10000,
    height: 80,
    width: 60,
    marginTop: '-50%',
    marginLeft: 5,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // padding: 10,
    // top: '55%',
    // position: 'absolute',
    // top: 10,
    // bottom: 10,
    // right: 10,
  },

  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  chatBtn: {
    position: 'absolute',
    bottom: 0,
    // display: 'flex',
    // flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
  },
  cards: {
    justifyContent: 'space-around',
    marginVertical: 20,
    width: '100%',
    paddingHorizontal: 20,

    flex: 0.65,

    // marginHorizontal: 20
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
  videoScreen: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  selfView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  remoteView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    width: '50%',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
  },
  aud_container: {
    flex: 1,
    marginTop: -100,
    width,
  },
  contentContainer: {
    marginTop: 150,
    padding: 20,
    justifyContent: 'center',
  },
  backImg: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#0267ae',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  appText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  connectionStatus: {
    fontSize: 16,
    color: '#ffff',
  },
  timingText: {
    fontSize: 14,
    color: '#ffff',
  },
});
