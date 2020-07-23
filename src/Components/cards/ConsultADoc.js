import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity , ImageBackground} from 'react-native';
import Card from '../Card';
import fonts from '../../Styling/fonts';
const message =
  'Direct call or chat live with our doctors. Available for your services 24/7.';
import * as Animatable from 'react-native-animatable';

class ConsultADoc extends Component {
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
            <Image
              style={styles.titleLogo}
              source={require('../../../assets/icons/android/drawable-xxxhdpi/consult_icon.png')}
            />
            <Text style={styles.title}>Consult a Doctor</Text>
          </View>
          <View style={styles.options}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('History')}
              style={styles.optionsItem1}>
              <View style={styles.optionImageView}>
                <ImageBackground style={{ width:85 , height:72 , justifyContent:'center' , alignItems:'center' }} source={require('../../../assets/icons/android/drawable-xxxhdpi/Shape.png')}>
                  <Image
                    style={styles.optionImage}
                    source={require('../../../assets/icons/android/drawable-xxxhdpi/watch.png')}
                  />
                </ImageBackground>
              </View>
              <View style={styles.optionTextView}>
                <Text style={{...styles.optionText, color: '#383838'}}>
                  Chat History
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Chat')}
              style={styles.optionsItem1}>
                  <View style={styles.optionImageView}>
                    <ImageBackground style={{ width:85 , height:72 , justifyContent:'center' , alignItems:'center' }} source={require('../../../assets/icons/android/drawable-xxxhdpi/Shape.png')}>
                      <Image
                        style={styles.optionImage}
                        source={require('../../../assets/icons/android/drawable-xxxhdpi/message_icon.png')}
                      />
                    </ImageBackground>
                    {/* <ImageBackground style={{ width:100 , height:100 , paddingHorizontal:30 , paddingVertical:25 }} source={require('../../../assets/icons/android/drawable-xxxhdpi/Shape.png')}>
                      <Image
                        style={styles.optionImage}
                        source={require('../../../assets/icons/android/drawable-xxxhdpi/message_icon.png')}
                      />
                    </ImageBackground> */}
                  </View>
                  <View style={styles.optionTextView}>
                    <Text style={{...styles.optionText, color: '#383838'}}>
                      Live Chat
                    </Text>
                  </View>
            </TouchableOpacity>
          </View>          
        </Card>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 0,
  },
  header: {
    // flex: 2,
    flexDirection: 'row',
    marginBottom:5,
  },
  messageText: {
    fontFamily: 'Ubuntu-Regular',
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
    // flex: 2,
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Ubuntu-Bold',
    color: '#383838',
    marginLeft: 10,
    fontSize: 18,
    padding:0
  },
  titleLogo: {
    width: 18,
    height: 25,
  },
  optionsItem1: {
    flex: 1,
    alignItems: 'center',
  },
  optionsItem2: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9B51E0',
  },
  optionImageView: {
    flex: 1,
  },
  optionImage: {
    width: 30,
    height: 28,
    marginBottom:10
  },
  optionText: {
    // marginTop: 10,
    fontFamily: 'Ubuntu-Medium',
    // fontStyle: 'normal',
    // fontWeight: '500',
    fontSize: 12,
    // lineHeight: 22,
    letterSpacing: 0.01,
  },
  optionTextView: {
    flex: 1,
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ConsultADoc;
