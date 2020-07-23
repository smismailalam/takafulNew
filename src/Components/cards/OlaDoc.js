import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Card from '../Card';
import fonts from '../../Styling/fonts';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Modal from 'react-native-modal';
import { UIActivityIndicator } from 'react-native-indicators';
class OlaDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
    }
    this.oladocSubmit = this.oladocSubmit.bind(this);
  }
  oladocSubmit(){
    this.props.navigation.navigate('OlaDoc');
  }

  render() {
    return (
      <Animatable.View
        style={{ marginTop:10, height:140, width:'100%', overflow:'hidden'  }}
        animation="fadeInUp"
        duration={1500}
        useNativeDriver={true}>
          <TouchableOpacity onPress={ this.oladocSubmit }>
            <Image
            resizeMode="stretch"
            style={{ 
              position:'relative',
              width:'100%',
              height:140 ,
              // marginBottom:10
            }}
              source={require('../../../assets/icons/android/drawable-xxxhdpi/Oladocimage.png')}
            />
          </TouchableOpacity>
        <Modal
        animationIn="fadeIn"
        animationInTiming={400}
        animationOut="fadeOut"
        animationOutTiming={400}
        isVisible={this.state.loader}>
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
                  Please Wait...
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    width: '100%',
    flex: 0.37,
    padding: 0,
    // paddingTop: 15,
    elevation: 1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // elevation: 8,
    backgroundColor: 'white',
    // padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom:10
  },
  header: {
    flexDirection: 'row',
    flex: 2,
    marginBottom: 5,
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
    fontFamily: 'Ubuntu-Bold',
    // flex: 8.5,
    color: '#0E74BC',
    marginLeft: 15,
    fontSize: 18,
    // fontWeight: 'bold',
  },
  titleLogo: {
    width: 25,
    height: 25,
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
    fontFamily: 'Ubuntu-Regular',
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

export default OlaDoc;
