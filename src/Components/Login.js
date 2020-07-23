import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Linking,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

// var validator = require("email-validator");

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phone: '',
    };
  }

  onChangeEmail(val) {
    if (validator.validate(val)) {
      this.setState({email: val});
    } else {
      this.setState({email: null});
    }
  }

  onChangephone(val) {
    this.setState({phone: val});
  }

  render() {
    return (
      // <View style={{
      //     flexDirection: "column", position: 'absolute',
      //     left: '0%',
      //     right: '-4.11%',
      //     top: 20
      // }}>w
      // <ImageBackground
      //     source={require('../../assets/icons/android/drawable-xxxhdpi/reg_layer_w.png')}
      //     style={{ width: '100%', height: '100%', justifyContent: 'center', flexDirection: 'column', ...this.props.style, resizeMode: 'stretch' }}>

      <Animatable.View
        animation={this.props.loginAnimation}        
        style={{...styles.main}}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login</Text>
        </View>

        <View style={styles.register}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-start',
            }}>
            <View style={{...styles.inputField}}>
              <TextInput
                // onChangeText={text => this.onChangeEmail(text)}
                style={{
                  maxHeight: 45,
                  width: '100%',
                  flex: 0.9,
                  fontSize: 16,
                  color: 'rgba(0,0,0)',
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: 'rgba(0, 102, 222, 0.5)',
                  textAlign: 'center',
                }}
                placeholder="Enter your user ID"
                placeholderTextColor="rgba(0,0,0)"
                // selectionColor='#ffffff'
                textContentType="emailAddress"
                keyboardType="email-address"
              />
            </View>
            <View style={{flex: 0.3}}></View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-start',
            }}>
            <View style={styles.inputField}>
              <TextInput
                // onChangeText={text => this.onChangephone(text)}
                style={{
                  maxHeight: 45,
                  width: '100%',
                  flex: 0.9,
                  fontSize: 16,
                  color: 'rgba(0,0,0)',
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: '#E5E5E5',
                  textAlign: 'center',
                }}
                placeholder="Enter Password"
                // placeholderTextColor='rgba(0,0,0)'
                // selectionColor='#ffffff'
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
                maxLength={11}
              />
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('User')}
              style={{
                // ...styles.signUpBtn,
                // flex: 1,
                flexDirection: 'column',
                // borderRadius: 10,
                justifyContent: 'center',
                flex: 0.3, // height: 40,
                // maxHeight: 63,
                alignItems: 'center',
                borderColor: '#ffffff',
              }}
              // onPress={() => this.props.handleView(this.state.email, this.state.phone)}
              // easing='Bounce'
            >
              <Image
                style={{
                  maxHeight: 60,
                  width: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                source={require('../../assets/icons/android/drawable-xxxhdpi/login_btn.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <Text
            style={{
              color: '#0066DE',
              fontWeight: 'bold',
              letterSpacing: 0.16,
              fontSize: 17,
              lineHeight: 25,
            }}>
            Reset Password
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => this.props.handleView('register')}
          style={{
            flex: 1.5,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            // paddingHorizontal: 20
          }}>
          <Image
            source={require('../../assets/icons/android/drawable-xxxhdpi/arrow_left.png')}
            style={{width: 59, height: 10}}
          />
          <Text
            style={{
              color: '#0066de',
              fontWeight: 'bold',
              fontSize: 17,
              lineHeight: 22,
              paddingRight: 10,
            }}>
            {' '}
            Sign Up{' '}
          </Text>
        </TouchableOpacity>

        <View style={styles.courtesy}>
          <Text
            style={{color: '#1A1A1A', fontWeight: 'bold', letterSpacing: 0.16}}>
            Powered By{' '}
          </Text>
          <Text
            onPress={() => Linking.openURL('https://www.avolox.com/')}
            style={{color: '#ca171e', fontWeight: 'bold', letterSpacing: 0.16}}>
            Avolox
          </Text>
        </View>
      </Animatable.View>
      // </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, flexGrow: 1, flexShrink: 1, flexDirection: 'column'},
  register: {
    flex: 3,
    flexDirection: 'column',
  },
  inputField: {
    flex: 0.6,
    elevation: 6,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  signUpBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.3,
    backgroundColor: '#03D159',
    borderRadius: 4,
    maxHeight: 50,
    marginRight: 10,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // paddingLeft: 20,
    // marginLeft: 10,
    // marginHorizontal: 10,
    // paddingHorizontal: 10,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 22,
    lineHeight: 37,
    color: '#1A1A1A',
    letterSpacing: 0.16,
  },
  // alert: {

  // },
  courtesy: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    flex: 9,
    color: '#0E74BC',
    marginLeft: 8,
  },
  titleLogo: {
    width: 24,
    height: 24,
  },
  items: {
    flex: 9,
    marginLeft: 14,
    // marginTop: 10
  },
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  main: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 20,
    // padding: 0,
    // paddingRight: 3,
    // paddingLeft: 3,
    // marginTop: 15,
    // height: 140,
    // width: 110,
    // marginRight: 8,
    // elevation: 0,
    // borderWidth: 1,
    // borderColor: '#F2F2F2',
  },
});
