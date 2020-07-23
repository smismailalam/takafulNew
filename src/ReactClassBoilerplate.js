import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, ScrollView, PixelRatio, StatusBar, BackHandler } from 'react-native'

// import { Divider } from 'react-native-paper'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from "react-native-svg";
import Video from 'react-native-video'
import Identity from '../Components/cards/Identity'
import NearByCards from '../Components/cards/NearByCards'
import ConsultADoc from '../Components/cards/ConsultADoc'
// import BarChartView from '../Components/BarChartView'
import WalkingRecord from '../Components/cards/WalkingRecord'
import AvailDiscounts from '../Components/cards/AvailDiscounts'
import Navigation from '../Components/Navigation'
import Policy from '../Components/Policy'

export default class Boilerplate extends Component {
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    this.state = {
      onBack: true
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
  BackHandler.exitApp();
}

  render() {
    return (
        <ScrollView style={styles.screen}>
          <StatusBar translucent backgroundColor="#424242" />
        </ScrollView> 
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E5E5E5'
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
    alignItems: 'center'
  },
  container: { flex: 1, justifyContent: "center", alignItems: 'center' },
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
  }
})
