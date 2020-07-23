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
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
} from 'react-native';

import {BarChart, Grid} from 'react-native-svg-charts';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import Video from 'react-native-video';
import Identity from '../Components/cards/Identity';
import NearByCards from '../Components/cards/NearByCards';
import ConsultADoc from '../Components/cards/ConsultADoc';
import WalkingRecord from '../Components/cards/WalkingRecord';
import AvailDiscounts from '../Components/cards/AvailDiscounts';
import Navigation from '../Components/Navigation';
import Policy from '../Components/Policy';
import * as Animatable from 'react-native-animatable';
import Ripple from 'react-native-material-ripple';

import axios from 'axios';

export default class TicketHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onBack: true,
      messages: [],
      currentMessage: '',
      ticket: null,
      connection: null,
    };
  }

  componentDidMount() {
    this.loadTicketDetail();
  }

  loadTicketDetail() {
    var data = this.props.navigation.getParam('data');

    if (data.ticket) {
      this.setState({
        ticket: data,
      });
    }
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

  drawMessages() {
    if (this.state.ticket) {
      console.log('Ticket DATA ======= ', this.state.ticket);
      return (
        <View>
          <View style={{marginHorizontal: 10}}>
            {this.state.ticket.ticket.map((message, index) => {
              var isSenderPatient =
                message.senderID === this.state.ticket.ticket.patientID;

              return (
                <View
                  key={index}
                  style={{
                    alignItems: isSenderPatient ? 'flex-end' : 'flex-start',
                    marginleft: 10,
                    marginVertical: 5,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    {/* <View style={{ flex: 0.4 }}></View> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        // flex: 0.6,
                        // width: 100,
                        // maxWidth: 500,
                        borderRadius: 20,
                        backgroundColor: isSenderPatient
                          ? '#0b9444'
                          : '#0d74bc',
                        borderTopRightRadius: isSenderPatient ? 1 : 20,
                        borderBottomLeftRadius: isSenderPatient ? 20 : 2,
                        // '#8babf6',
                        padding: 10,
                        paddingHorizontal: 15,
                      }}>
                      {this.state.imageModal
                        ? this.showImageModal(this.state.modalMessage)
                        : null}

                      <View
                        style={{
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingHorizontal: 5,
                          paddingBottom: 10,
                        }}>
                        {message.file == null ? (
                          <Text style={{flexWrap: 'wrap', color: '#fdfeff'}}>
                            {/* {message.file == null ?  */}
                            {message.text}
                            {/* : message.file.originalName */}
                            {/* {console.log(global.API_URL + "/images/" + message.file.path)} */}
                          </Text>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                imageModal: true,
                                modalMessage: message,
                              });
                            }}>
                            <Text style={{color: '#fdfeff'}}>
                              {message.file.originalName}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                      <View
                        style={{
                          paddingLeft: 5,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                          paddingTop: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 10,
                            color: '#fdfeff',
                            fontWeight: '700',
                          }}>
                          {this.currentDateTime()}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
          <View />
        </View>
      );
    }
  }

  render() {
    setTimeout(() => {
      this.scroll.scrollToEnd();
    });
    console.log(this.props.navigation.getParam('header'));
    return (
      <View style={styles.screen}>
        {/* <View style={{ flex: 0.1 }}></View> */}
        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            paddingHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'space-around',
            borderBottomWidth: 0.3,
            borderBottomColor: '#6f7a94',
            backgroundColor: '#f8fbfd',
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{flex: 0.05, alignItems: 'center', marginRight: 10}}>
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
                  fontSize: 17,
                  fontWeight: '700',
                  color: '#7a8ca5',
                }}>
                {this.props.navigation.getParam('header')}
              </Text>
              {/* <Text style={{fontSize: 15, color: '#7a8ca5'}}>
                Chat Session Expired
              </Text> */}
            </View>
          </View>
        </View>

        <ScrollView
          ref={c => {
            this.scroll = c;
          }}
          style={{flex: 1}}>
          <View style={{flex: 1, padding: 10}}>
            {this.state.ticket != null ? this.drawMessages() : null}
          </View>
          <StatusBar
            translucent
            backgroundColor="#061843"
            barStyle="light-content"
          />
        </ScrollView>

        <View
          style={{
            flex: 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#eeee',
          }}>
          <Text
            style={{
              fontSize: 14,
              // lineHeight: 20,
              fontWeight: '700',
              color: '#6f7a94',
            }}>
            Chat Session Expired
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    // backgroundColor: '#061843',
    paddingTop: StatusBar.currentHeight,
    // paddingVertical: 20,
    // justifyContent: 'center'
    // padding: 70,
    // justifyContent: 'center'
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
