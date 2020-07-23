import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export default class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      count: 59,
      resend: false,
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.count === 1) {
        this.setState({
          resend: true,
        });
      }
      this.setState(prevState => ({count: prevState.count - 1}));
    }, 1000);
  }
  componentDidUpdate() {
    if (this.state.count === 0) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {code} = this.state;
    const {phone} = this.props;
    return (
      <Animatable.View animation={this.props.otpAnimation} style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Verify Your Number</Text>
        </View>

        <View style={styles.subHeading}>
          <Text style={styles.subHeadingText}>Enter the code {phone} </Text>
        </View>

        <View style={styles.register}>
          <OTPInputView
            style={styles.otpInput}
            pinCount={4}
            codeInputFieldStyle={styles.codeFieldStyle}
            codeInputHighlightStyle={styles.codeHighlightStyle}
            onCodeFilled={code => this.setState({code})}
          />
        </View>

        <View style={styles.bottomText}>
          {this.state.resend ? (
            <TouchableOpacity>
              <Text style={styles.resentText}>Resend Code</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.codeSentText}>
              The code will be sent in {this.state.count}{' '}
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            this.props.handleView(code), clearInterval(this.interval);
          }}
          style={styles.nextBtn}>
          <Image
            source={require('../../assets/icons/android/drawable-xxxhdpi/login_btn.png')}
            style={styles.nextBtnImg}
          />
        </TouchableOpacity>

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
    paddingTop: 20,
    flex: 2.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingTop: 40,
  },
  headerText: {
    fontSize: 22,
    lineHeight: 37,
    color: '#1A1A1A',
    letterSpacing: 0.16,
    fontFamily: 'Ubuntu-Medium',
  },
  subHeading: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
  },
  subHeadingText: {
    color: '#1A1A1A',
    letterSpacing: 0.16,
    fontFamily: 'Ubuntu-Regular',
  },
  register: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  otpInput: {
    width: '70%',
    height: 200,
    justifyContent: 'center',
  },
  codeFieldStyle: {
    borderColor: 'rgba(0, 102, 222, 0.5)',
    color: 'rgba(0, 102, 222, 0.5)',
    borderRadius: 6,
  },
  codeHighlightStyle: {
    color: 'rgba(0, 102, 222, 0.5)',
    borderColor: 'rgba(0, 102, 222, 0.5)',
  },
  bottomText: {
    flex: 0.5,
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
  },
  resendText: {
    fontSize: 16,
    color: 'rgba(0, 102, 222, 0.5)',
    fontFamily: 'Ubuntu-Regular',
  },
  codeSentText: {
    color: '#1A1A1A',
    letterSpacing: 0.16,
    fontFamily: 'Ubuntu-Regular',
  },
  nextBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  nextBtnImg: {
    width: 75,
    height: 55,
  },
  courtesy: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  powerText: {
    color: '#1A1A1A',
    letterSpacing: 0.16,
    fontFamily: 'Ubuntu-Medium',
  },
  avoloxText: {
    color: '#ca171e',
    fontFamily: 'Ubuntu-Bold',
    letterSpacing: 0.16,
  },
});
