import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import CheckBox from 'react-native-check-box';
import TextInputMask from 'react-native-text-input-mask';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      health_id: '',
      name: '',
      email: '',
      phone: '',
      cnic: true,
      health: false,
    };
  }

  check_cnic = () => {
    const {cnic} = this.state;
    if (!cnic) {
      this.setState({
        health: false,
        cnic: true,
      });
    }
  };
  check_health = () => {
    const {health} = this.state;
    if (!health) {
      this.setState({
        health: true,
        cnic: false,
      });
    }
  };

  render() {
    const {health_id, name, email, phone, cnic, health} = this.state;
    return (
      <Animatable.View
        animation={this.props.registerAnimation}
        style={{...styles.main}}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create An Account</Text>
        </View>
        <View style={styles.inputDataContainer}>
          <View style={{flex: 0.2}}>
            <CheckBox
              onClick={this.check_cnic}
              isChecked={this.state.cnic}
              rightText="CNIC"
              rightTextStyle={styles.checkbox}
              checkedImage={
                <Image
                  source={require('../../assets/icons/android/drawable-xxxhdpi/radio_check.png')}
                  style={styles.checkboxImage}
                />
              }
              unCheckedImage={
                <Image
                  source={require('../../assets/icons/android/drawable-xxxhdpi/radio_uncheck.png')}
                  style={styles.checkboxImage}
                />
              }
            />
          </View>
          <View style={{flex: 0.4}}>
            <CheckBox
              onClick={this.check_health}
              isChecked={this.state.health}
              rightText="Health ID"
              rightTextStyle={styles.checkbox}
              checkedImage={
                <Image
                  source={require('../../assets/icons/android/drawable-xxxhdpi/radio_check.png')}
                  style={styles.checkboxImage}
                />
              }
              unCheckedImage={
                <Image
                  source={require('../../assets/icons/android/drawable-xxxhdpi/radio_uncheck.png')}
                  style={styles.checkboxImage}
                />
              }
            />
          </View>
        </View>
        <View style={styles.register}>
          <View style={styles.registerSubContainer}>
            <View style={styles.inputField}>
              {health ? (
                <TextInput
                  style={styles.input}
                  placeholder="Enter Health ID"
                  placeholderTextColor="#000"
                  selectionColor="rgba(0, 102, 222, 0.5)"
                  keyboardType="phone-pad"
                  onChangeText={health_id => this.setState({health_id})}
                  onSubmitEditing={() => this.refs.name.focus()}
                  blurOnSubmit={false}
                  returnKeyLabel="Next"
                  returnKeyType="next"
                />
              ) : (
                // <TextInputMask
                //   style={styles.input}
                //   placeholder="Enter CNIC #"
                //   placeholderTextColor="#000"
                //   refInput={ref => { this.input = ref }}
                //   onSubmitEditing={() => this.refs.name.focus()}
                //   onChangeText={health_id => this.setState({health_id})}
                //   selectionColor="rgba(0, 102, 222, 0.5)"
                //   blurOnSubmit={false}
                //   onChangeText={(formatted, extracted) => {
                //     console.log(formatted) 
                //     console.log(extracted) 
                //   }}
                //   mask={"[00000]-[0000000]-[0]"}
                // />
                <TextInput
                  style={styles.input}
                  placeholder="Enter CNIC #"
                  placeholderTextColor="#000"
                  selectionColor="rgba(0, 102, 222, 0.5)"
                  keyboardType="phone-pad"
                  onChangeText={health_id => this.setState({health_id})}
                  onSubmitEditing={() => this.refs.name.focus()}
                  blurOnSubmit={false}
                  returnKeyLabel="Next"
                  returnKeyType="next"
                />
              )}
            </View>
            <View style={{flex: 0.4}}></View>
          </View>
          <View style={styles.registerSubContainer}>
            <View style={styles.inputField}>
              <TextInput
                ref="name"
                style={styles.input}
                placeholder="Enter Name"
                placeholderTextColor="#000"
                selectionColor="rgba(0, 102, 222, 0.5)"
                textContentType="name"
                keyboardType="default"
                onChangeText={name => this.setState({name})}
                onSubmitEditing={() => this.refs.email.focus()}
                blurOnSubmit={false}
                returnKeyLabel="Next"
                returnKeyType="next"
              />
            </View>
            <View style={{flex: 0.3}}></View>
          </View>
          <View style={styles.registerSubContainer}>
            <View style={styles.inputField}>
              <TextInput
                ref="email"
                style={styles.input}
                placeholder="Enter Email Address"
                placeholderTextColor="#000"
                selectionColor="rgba(0, 102, 222, 0.5)"
                textContentType="emailAddress"
                keyboardType='email-address'
                onChangeText={email => this.setState({email})}
                onSubmitEditing={() => this.refs.num.focus()}
                blurOnSubmit={false}
                returnKeyLabel="Next"
                returnKeyType="next"
              />
            </View>
            <View style={{flex: 0.3}}></View>
          </View>
          <View style={styles.registerSubContainer}>
            <View style={styles.inputField}>
              <TextInput
                ref="num"
                style={styles.input}
                placeholder="Enter Phone Number"
                placeholderTextColor="#000"
                selectionColor="rgba(0, 102, 222, 0.5)"
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
                onChangeText={phone => this.setState({phone})}
                blurOnSubmit={false}
                returnKeyLabel="go"
                returnKeyType="go"
              />
              {/* <TextInputMask
                ref="num"
                style={styles.input}
                placeholder="Enter Phone Number"
                placeholderTextColor="#000"
                selectionColor="rgba(0, 102, 222, 0.5)"
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
                onChangeText={phone => this.setState({phone})}
                blurOnSubmit={false}
                returnKeyLabel="go"
                returnKeyType="go"
                mask={"03[000000000]"}
              /> */}
            </View>
            <View style={{flex: 0.3}}>
              <TouchableOpacity
                onPress={() =>
                  this.props.handleView(
                    'otp',
                    health_id,
                    name,
                    email,
                    phone,
                    health,
                  )
                }
                style={styles.signUpBtn}>
                <Text style={styles.registerBtnText}>Register </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.courtesy}>
          <Text style={styles.powerText}>Powered By </Text>
          <Text
            onPress={() => Linking.openURL('https://www.avolox.com/')}
            style={styles.avoloxText}>
            Avolox
          </Text>
        </View>
      </Animatable.View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 20,
  },
  header: {
    flexDirection: 'row',
    flex: 1.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  headerText: {
    fontSize: 22,
    lineHeight: 37,
    color: '#1A1A1A',
    letterSpacing: 0.16,
    fontFamily: 'Ubuntu-Medium',
  },
  inputDataContainer: {
    flex: 0.6,
    flexDirection: 'row',
  },
  checkbox: {
    fontSize: 12,
    color: '#000',
    marginLeft: 10,
    fontFamily: 'Ubuntu-Regular',
  },
  checkboxImage: {
    width: 20,
    height: 20,
  },
  register: {
    flex: 4,
    flexDirection: 'column',
  },
  inputField: {
    flex: 0.6,
    elevation: 6,
  },
  registerSubContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
  },
  input: {
    maxHeight: 45,
    width: '100%',
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 102, 222, 0.5)',
    textAlign: 'left',
    paddingLeft: 20,
    fontFamily: 'Ubuntu-Regular',
  },
  signUpBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03D159',
    borderRadius: 4,
    maxHeight: 45,
    marginRight: 10,
    elevation: 4,
    flex: 1,
    alignItems: 'center',
    borderColor: '#ffffff',
    marginLeft: 10,
  },
  registerBtnText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Ubuntu-Medium',
  },
  courtesy: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  powerText: {
    color: '#1A1A1A',
    fontFamily: 'Ubuntu-Medium',
    letterSpacing: 0.16,
  },
  avoloxText: {
    color: '#ca171e',
    fontFamily: 'Ubuntu-Bold',
    letterSpacing: 0.16,
  },
});
