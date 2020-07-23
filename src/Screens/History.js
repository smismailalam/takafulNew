import React, {Component} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  Image,
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
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import Ripple from 'react-native-material-ripple';
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
// import {chatHistory} from '../Data/Dis_item';

import FilePickerManager from 'react-native-file-picker';

import axios from 'axios';

export default class History extends React.PureComponent {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      onBack: true,
      messages: [],
      currentMessage: '',
      ticket: '',
      connection: null,
      activeBtn: 'history',
      historyTickets: [],
      auth: null,
      fetching: false,
    };
  }

  // By Waleed bhai
  // handleConnection() {
  //     this.url = 'http://192.168.21.3:5000'
  //     this.connection = new signalR.HubConnectionBuilder()
  //         .withUrl(this.url + "/rtc-hub")
  //         .build();
  //     // console.log(this.connection)
  //     this.connection.start()
  //         .then(() => {
  //             this.setState({
  //                     connection: this.connection
  //                 }, () => {
  //                     this.state.connection.invoke("initChat")
  //                         .then((res) => {
  //                             this.setState({
  //                                 ticket: res
  //                             }, () => {
  //                                 console.log('ticket', this.state.ticket)
  //                             })
  //                         })
  //                         .catch((error) => console.log('invoke error', error))
  //                 }
  //             )
  //         })
  //         .catch((error) => console.log(error))
  // }
  // loadTicketHistory() {
  //
  //     axios.get(global.API_URL + '/api/tickets/all')
  //         .then((response) => {
  //
  //             if (response.status === 200) {
  //
  //                 this.setState({
  //                     tickets: response.data,
  //                 });
  //
  //             }
  //
  //             // console.log('response', response);
  //
  //         })
  //         .catch((c) => {
  //             console.log('loadTicketHistory catch', c, c.response);
  //         })
  //
  // }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('User');
      return true;
    });
    this.getData();
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  getData = () => {
    this.setState({
      fetching: true,
    });
    try {
      axios
        .get(
          `${global.API_URL}/api/ChatHistory/GetHistory?userID=${global.uid}`,
        )
        .then(response => {
          const chatHistory = response.data.reverse();
          this.setState(
            {
              chatHistory,
              fetching: false,
            },
            () => {
              console.log('history objects', this.state.chatHistory);
            },
          );
        })
        .catch(error => {
          this.setState({
            fetching: false,
          });
          console.log(error);
        });
    } catch (error) {
      this.setState({
        fetching: false,
      });
      console.log('Catch History Error', error);
    }
  };
  fetchModal() {
    return (
      <Modal
        animationIn="fadeIn"
        animationInTiming={400}
        animationOut="fadeOut"
        animationOutTiming={400}
        isVisible={this.state.fetching}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: '80%',

              padding: 15,
              backgroundColor: '#fff',
              borderRadius: 10,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <View>
                <UIActivityIndicator color={'#0064FF'} size={30} />
              </View>
              <View>
                <Text>Fetching Data ...</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  chatBtn() {
    if (this.state.activeBtn === 'history') {
      return (
        <View
          style={{
            flex: 0.2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 0.2,
            borderBottomColor: '#7a8ca5',
          }}>
          <View
            style={{
              flex: 1,
              borderRadius: 100,
              marginBottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ripple
              rippleSize={80}
              rippleContainerBorderRadius={100}
              onPress={() =>
                this.setState({
                  activeBtn: 'history',
                })
              }
              style={{...styles.activeChatBtn}}>
              <Text style={{...styles.activeBtnText}}>History</Text>
            </Ripple>
          </View>
          <View
            style={{
              flex: 1,
              borderRadius: 100,
              marginBottom: 0,
              marginTop: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ripple
              rippleSize={80}
              rippleContainerBorderRadius={100}
              onPress={() => {
                this.setState(
                  {
                    activeBtn: 'new',
                  },
                  () => {
                    this.props.navigation.navigate('Chat', {
                      data: {
                        auth: this.state.auth,
                      },
                    });
                    this.setState({
                      activeBtn: 'history',
                    });
                  },
                );
              }}
              style={{...styles.chatButtons}}>
              <Text style={{...styles.btnText}}>New Chat</Text>
            </Ripple>
          </View>
        </View>
      );
    } else if (this.state.activeBtn == 'new') {
      return (
        <View style={{flex: 0.2, flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              borderRadius: 100,
              marginBottom: 0,
              marginTop: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ripple
              rippleSize={80}
              rippleContainerBorderRadius={100}
              onPress={() =>
                this.setState({
                  activeBtn: 'history',
                })
              }
              style={{...styles.chatButtons}}>
              <Text style={{...styles.btnText}}>History</Text>
            </Ripple>
          </View>
          <View
            style={{
              flex: 1,
              borderRadius: 100,
              marginBottom: 0,
              marginTop: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ripple
              rippleSize={80}
              rippleContainerBorderRadius={100}
              onPress={() =>
                this.setState({
                  activeBtn: 'new',
                })
              }
              style={{...styles.activeChatBtn}}>
              <Text style={{...styles.activeBtnText}}>New Chat</Text>
            </Ripple>
          </View>
        </View>
      );
    }
  }

  handleMesssge() {
    this.connection.on('message', data => {
      console.log('object', data);
      this.setState(
        prevState => {
          return {
            messages: prevState.messages.concat(data),
          };
        },
        () => {
          console.log('messages', this.state.messages);
        },
      );
    });
  }

  currentDateTime() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hr = today.getHours();
    var mint = today.getMinutes();
    var s = today.getSeconds();

    today = yyyy + '-' + mm + '-' + dd + hr + ':' + mint + ':' + s;
    return today;
  }
  
  getDate(date) {
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  renderChatHistory(item) {
    if (item.length != 0) {
      let date = new Date(item[item.length - 1].createdAt);
      let parseDate = this.getDate(date);

      return (
        <View style={{ flex: 1, margin:10, borderRadius: 15, padding:10, elevation: 2, backgroundColor: '#ffffff', flexDirection:'row' }}>         
          <View style={{ flex: 3, marginHorizontal: 5, }}>
            <View style={{ flex:1, flexDirection:'row' }}>
              <Text style={{ fontSize: 15, color: '#383838', fontFamily:'Ubuntu-Bold' }}>Ticket#</Text>
              <Text style={{ color:'#1872b1',fontFamily:'Ubuntu-Medium', fontSize:14 }}>{item[0].ticketID}</Text>
            </View>

            <View>
              <Text numberOfLines={1} style={{ color: '#989898', fontSize:12, fontFamily:'Ubuntu-Regular'}}>
                {parseDate}
              </Text>
            </View>

          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', }}>
            <Ripple
            rippleColor="rgba(0, 0, 0, 0.32)"
            rippleSize={176}
            rippleDuration={400}
            onPress={() => {
              this.props.navigation.navigate('TicketHistory', {
                header: `Ticket# ${item[0].ticketID}`,
                data: {
                  ticket: item,
                },
              });
            }}>
              <Image
                style={{ width:45 , height:42  }}
                source={require('../../assets/icons/android/drawable-xxxhdpi/arrow-Cirlcle-.png')}
              />
            </Ripple>
          </View>

          {/* <View style={{marginHorizontal: 5}}>
            <Text numberOfLines={1} style={{ color: '#989898', fontSize:12, fontFamily:'Ubuntu-Regular'}}>
              {parseDate}
            </Text>
          </View> */}
        </View>

        // </Ripple>
      );
    } else {
      return null;
    }
  }

  handleFilePicker(response) {
    if (response.didCancel) {
      console.log('User cancelled file picker');
    } else if (response.error) {
      console.log('FilePickerManager Error: ', response.error);
    } else {
      var data = new FormData();

      data.append('prescription', {
        name: response.fileName,
        type: response.type,
        uri: response.uri,
      });

      data.append('ticketId', '2568 ');

      console.log('data o-', data);

      const config = {
        headers: {'Content-Type': 'multipart/form-data'},
      };

      axios
        .post(
          global.API_URL +
            '/api/Default/FileUpload?ticketId=' +
            this.state.ticket.id,
          data,
          config,
        )
        .then(response => {
          console.log('upload success 2', response);
        })
        .catch(error => {
          console.log('upload error', error, error.response, error.request);
          alert('Upload failed!');
        });
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'space-around',
            borderBottomWidth: 0.3,
            borderBottomColor: '#6f7a94',
            backgroundColor: '#f8fbfd',
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{alignItems: 'center', marginRight: 10}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Image
                style={{width: 24, height: 24}}
                source={require('../../assets/icons/android/drawable-xxxhdpi/chat_back2.png')}
              />
            </View>
          </TouchableOpacity>
          {/* <View style={{marginLeft: 10, flex: 0.20, marginRight: 5, alignItems: 'center'}}>
                        <Image style={{width: 35, height: 35}}
                               source={require('../../assets/icons/android/drawable-xxxhdpi/pakistan_takaful_logo_colorful.png')}/>
                    </View> */}
          <View
            style={{
              flex: 0.8,
              justifyContent: 'space-around',
              alignItems: 'flex-start',
            }}>
            <View style={{alignItems: 'flex-start'}}>
              <Text style={{fontSize: 17, fontWeight: '700', color: '#7a8ca5'}}>
                Chat History
              </Text>
            </View>
          </View>
        </View>
        {this.state.fetching ? (
          this.fetchModal()
        ) : (
          <FlatList
            data={this.state.chatHistory}
            style={{flex: 0.7}}
            initialNumToRender={12}
            keyExtractor={item => item.ticketID}
            renderItem={({item, index, separators}) =>
              this.renderChatHistory(item)
            }
          />
        )}

        <StatusBar
          translucent
          backgroundColor="#061843"
          barStyle="light-content"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e9e9e9',
    // backgroundColor: '#061843',
    paddingTop: StatusBar.currentHeight,
    // paddingVertical: 20,
    // justifyContent: 'center'
    // padding: 70,
    // justifyContent: 'center'
  },
  chatButtons: {
    backgroundColor: '#f8fbfd',
    justifyContent: 'center',
    borderRadius: 100,
    alignItems: 'center',
    padding: 15,
    borderColor: '#000000',
    elevation: 1,
    width: '90%',
  },
  activeChatBtn: {
    backgroundColor: '#7a8ca5',
    justifyContent: 'center',
    borderRadius: 100,
    alignItems: 'center',
    padding: 15,
    borderColor: '#000000',
    elevation: 1,
    width: '90%',
  },
  activeBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#f8fbfd',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#7a8ca5',
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
});
