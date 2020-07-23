import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Card from '../Card';
import fonts from '../../Styling/fonts';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
const message =
  'Direct call or chat live with our doctors. Available for your services 24/7.';
const signalR = require('@aspnet/signalr');
import * as Animatable from 'react-native-animatable';

class TibbeNawabiNotifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: message,
      messages: [],
      auth: null,
    };
  }

  render() {
    return (
      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        useNativeDriver={true}>
        <Card style={{...styles.main, ...this.props.style}}>
          <View style={styles.header}>
            <Icon name="ios-notifications" size={20} color="#ffe178" />
            <Text style={styles.title}>Notifications</Text>
          </View>
          <View style={{ flex:1 }}>
            <ImageBackground style={{ height:40, marginBottom:15 }} source={require('../../../assets/icons/android/drawable-xxxhdpi/Notification-shape.png')}>
              <View style={{ flex:1, justifyContent:'center' , paddingHorizontal:20 }}>
                <Text style={{ fontFamily:'Ubuntu-Light', color:'#383838', fontSize:11, }}>There are many variations of passages of lorem ipsum</Text>
              </View>
            </ImageBackground>
            <ImageBackground style={{ height:40, marginBottom:15 }} source={require('../../../assets/icons/android/drawable-xxxhdpi/Notification-shape.png')}>
              <View style={{ flex:1, justifyContent:'center' , paddingHorizontal:20 }}>
                <Text style={{ fontFamily:'Ubuntu-Light', color:'#383838', fontSize:11, }}>There are many variations of passages of lorem ipsum</Text>
              </View>
            </ImageBackground>
            <ImageBackground style={{ height:40, marginBottom:15 }} source={require('../../../assets/icons/android/drawable-xxxhdpi/Notification-shape.png')}>
            <View style={{ flex:1, justifyContent:'center' , paddingHorizontal:20 }}>
                <Text style={{ fontFamily:'Ubuntu-Light', color:'#383838', fontSize:11, }}>There are many variations of passages of lorem ipsum</Text>
              </View>
            </ImageBackground>
            <ImageBackground style={{ height:40, marginBottom:15 }} source={require('../../../assets/icons/android/drawable-xxxhdpi/Notification-shape.png')}>
            <View style={{ flex:1, justifyContent:'center' , paddingHorizontal:20 }}>
                <Text style={{ fontFamily:'Ubuntu-Light', color:'#383838', fontSize:11, }}>There are many variations of passages of lorem ipsum</Text>
              </View>
            </ImageBackground>
            <ImageBackground style={{ height:40, marginBottom:15 }} source={require('../../../assets/icons/android/drawable-xxxhdpi/Notification-shape.png')}>
            <View style={{ flex:1, justifyContent:'center' , paddingHorizontal:20 }}>
                <Text style={{ fontFamily:'Ubuntu-Light', color:'#383838', fontSize:11, }}>There are many variations of passages of lorem ipsum</Text>
              </View>
            </ImageBackground>
          </View>
        </Card>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    width: '100%',
    flex: 0.37,
    elevation: 1,
    // marginTop: 20,
    // paddingHorizontal: 15,
    // paddingLeft: 14,
    // paddingRight: 7,
    // elevation: 5,
    padding: 0,
    paddingTop: 15,
    // marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    flex: 2,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 15,
  },
  messageText: {
    fontFamily: fonts.heeboRegular,
    flex: 1,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.01,
    color: '#1A1A1A',
    // borderWidth: 1.5,
    // borderColor: '#DDDDDD',
  },
  options: {
    flexDirection: 'row',
    flex: 2,
    marginTop: 25,
    // paddingBottom: 25
  },
  title: {
    flex: 8.5,
    color: '#383838',
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'Ubuntu-Medium',
  },
  titleLogo: {
    width: 26,
    height: 26,
  },
  optionsItem1: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1.5,
    borderRightColor: '#DDDDDD',
    justifyContent: 'center',
    color: '#27AE60',
  },
  optionsItem2: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9B51E0',
  },
  optionImageView: {
    flex: 4,
    justifyContent: 'center',
  },
  optionImage: {
    width: 36,
    height: 36,
  },
  optionText: {
    marginTop: 10,
    fontFamily: fonts.regularText,
    fontStyle: 'normal',
    // fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.01,
  },
  optionTextView: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
  },
});

export default TibbeNawabiNotifications;
