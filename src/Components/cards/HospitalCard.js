import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Card from '../Card';
import BarChart from 'react-native-svg-charts';

class HospitalCard extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View>
        {
          this.props.type == 'hospital' ?
            <TouchableOpacity onPress={() => {
              this.props.navigate.navigate('Live' , { lat:this.props.lat, long:this.props.lng ,name: this.props.title , parent:'home' })
            }}>
              <ImageBackground style={{ width:200, height:70 }} source={require('../../../assets/icons/android/drawable-xxxhdpi/Discount-shape-.png')}>
                <View style={{ flex:1, flexDirection:'row' , paddingHorizontal:20 }}>
                  <View style={{ flex:3 , justifyContent:'center' }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        color: '#383838',
                        fontSize: 14,
                        lineHeight: 22,
                        fontFamily: 'Ubuntu-Medium',
                      }}>
                      {/* {this.props.title.substring(0,15)} */}
                      {/* {this.props.title} */}
                      { ((this.props.title).length > 20) ? 
                        (((this.props.title).substring(0,20)) + '...') : 
                        this.props.title }
                    </Text>
                  </View>
                  <View style={{ flex:1, justifyContent:'center' }}>
                    <Text
                      style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight:'bold',
                        fontFamily: 'Ubuntu-Medium',
                      }}>
                      {this.props.percentage}
                    </Text>
                    <Text
                      style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight:'bold',
                        fontFamily: 'Ubuntu-Regular',
                      }}>km</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>  : 
            <ImageBackground style={{ width:200, height:70 }} source={require('../../../assets/icons/android/drawable-xxxhdpi/Discount-shape-.png')}>
              <View style={{ flex:1, flexDirection:'row' , paddingHorizontal:20}}>
                <View style={{ flex:3 , justifyContent:'center' }}>
                  <Text
                    style={{
                      textAlign: 'left',
                      color: '#383838',
                      fontSize: 14,
                      lineHeight: 22,
                      fontFamily: 'Ubuntu-Medium',
                    }}>
                    {this.props.title.substring(0,15)}
                  </Text>
                </View>
                <View style={{ flex:1, justifyContent:'center' , paddingLeft:15 }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize:12,
                      // textAlign: 'center',
                      fontFamily: 'Ubuntu-Regular',
                    }}>Up To
                    
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize:15,
                      letterSpacing:1.5,
                      // textAlign: 'center',
                      fontFamily: 'Ubuntu-Bold',
                    }}>{this.props.percentage}</Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize:12,
                      textAlign: 'right',
                      fontFamily: 'Ubuntu-Regular',
                    }}>off</Text>
                </View>
              </View>
          </ImageBackground>
              
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 5,
    marginHorizontal: 5,
    flex: 4,
  },
  main: {
    flexDirection: 'column',
    borderColor: '#F2F2F2',
    width: '100%',
    minWidth: 150,
    // height: 200,
    height: 80,
    flex: 1,
    marginHorizontal: 10,
    // paddingLeft: 14,
    // paddingRight: 7,
    padding: 0,
    paddingTop: 10,
    elevation: 0,
    borderWidth: 1,
    borderRadius: 10,
  },
  percentage: {
    // borderBottomColor: '#4DE9DF',
    // borderBottomWidth: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
    flex: 0.6,
  },
});

export default HospitalCard;
