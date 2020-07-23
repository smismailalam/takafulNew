import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
// import Card from '../Card'
import Divider from 'react-native-divider';
import BarChart from 'react-native-svg-charts';
import Identity from './cards/Identity';
import {identifier} from '@babel/types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

class Policy extends Component {
  constructor() {
    super();
  }
  render() {
    const {lodgeBtn, policy, policyBtn} = this.props;
    return (
      <View>
        <View style={{...this.props.style, ...styles.policy}}>
          <Animatable.View
            animation="slideInLeft"
            duration={1500}
            useNativeDriver={true}
            style={styles.header}>
            <Text style={styles.headerText}>POLICY</Text>
            <TouchableOpacity onPress={policyBtn}>
              <Text style={styles.title}>Takaful {policy}</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View
            animation="slideInRight"
            duration={1500}
            useNativeDriver={true}
            style={styles.lodge}>
            <TouchableOpacity onPress={lodgeBtn} activeOpacity={0.6}>
              <Text
                style={{
                  fontSize: 17,
                  lineHeight: 22,
                  color: '#0E74BC',
                  letterSpacing: 0.16,
                  textAlign: 'center',
                  fontFamily: 'Ubuntu-Medium',
                }}>
                Lodge A Claim
              </Text>
            </TouchableOpacity>
          </Animatable.View>

          {/* <View style={{  borderWidth: 1, borderColor: '#0E74BC', width: '70%'}}></View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
  },
  policy: {
    // backgroundColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'space-around',
    // paddingTop: 10,
    borderRadius: 6,
    paddingHorizontal: 15,
    // paddingBottom: 10
  },
  header: {
    justifyContent: 'space-between',
    marginHorizontal: 5,
    flex: 1.5,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: '#0E74BC',
  },
  title: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 21,
    lineHeight: 22,
    color: '#0E74BC',
    letterSpacing: 0.16,
    marginTop: 5,
  },
  lodge: {
    flex: 1.2,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#0E74BC',
    // alignContent: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ffff',
    // elevation: 6,
  },
  headerText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: '#0E74BC',
    letterSpacing: 0.16,
  },
  main: {
    flexDirection: 'column',
    borderColor: '#F2F2F2',
    width: '100%',
    height: 200,
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
    borderBottomColor: '#4DE9DF',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    marginTop: 15,
  },
});

export default Policy;
