import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Card from '../Card';
import HospitalCard from './HospitalCard';
import {HeaderTitle} from 'react-navigation-stack';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Ripple from 'react-native-material-ripple';

class PanelHospital extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hospitals: [],
    };
  }
  componentDidMount() {
    // var lat = global.lat;
    // var long = global.long;
    var lat = global.lat ? global.lat : '24.831574';
    var long = global.long ? global.long : '67.073809';
    var url = `${
      global.API_URL
    }/api/Salamti/GetHospitals?latitude=${lat}&longitude=${long}&city=karachi`;
    try {
      axios
        .get(url)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              hospitals: response.data,
            });
          }
        })
        .catch(error => {});
    } catch (error) {}
  }

  render() {
    return (
      <Animatable.View
        style={{marginBottom: 10}}
        animation="fadeInUp"
        useNativeDriver={true}>
        <Card style={{...styles.main, ...this.props.style}}>
          <View style={styles.header}>
            <View style={styles.titleLogoView}>
              <Image
                style={styles.titleLogo}
                source={require('../../../assets/icons/android/drawable-xxxhdpi/Panel-Icon.png')}
              />
            </View>

            <View style={styles.headerTitle}>
              <Text style={{fontSize: 20, ...styles.headerText}}>
                Panel Hospitals
              </Text>
            </View>

            <View style={{ flex:1, alignContent:'flex-end', alignItems:'flex-end' }}>
              <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate('Hospital', {
                    header: {
                      headerTitle: 'Panel Hospitals',
                    },
                  });
                }}>
                {/* <Text>View All</Text> */}
                <Image
                  style={{ width:22, height:18, marginLeft:5 }}
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/arrow.png')}
                />
              </TouchableOpacity>
            </View>
          
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.discountCards}>
              {this.state.hospitals.map((item, index) => {
                var distance = item.distance / 1000;
                distance = distance.toFixed(2);
                return (
                  <HospitalCard
                    key={item.name}
                    title={item.name}
                    percentage={distance}
                    lat={item.latitude}
                    lng={item.longitude}
                    type="hospital"
                    navigate={this.props.navigation}
                  />
                );
              })}
            </View>
          </ScrollView>
        </Card>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  // CARD
  main: {
    flex:1,
  },
  nearByHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // HEADER
  header: {
    // flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  titleLogoView: {
    // flex:1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  titleLogo: {
    width: 18,
    height: 17,
  },
  headerTitle: {
    marginLeft:10
    // flex: 5.2,
  },
  headerText: {
    fontSize: 18,
    lineHeight: 22,
    color: '#383838',
    letterSpacing: 0.16,
    fontFamily: 'Ubuntu-Medium',
    // fontWeight: '700'
  },

  // CARD DETAILS
  discountCards: {
    flexDirection: 'row',
  },
  discountCardItem: {
    width: Dimensions.get('window').width / 2,
    flexDirection: 'column',
  },
});

export default PanelHospital;
