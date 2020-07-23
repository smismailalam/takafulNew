import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Card from '../Card';
import NearByColors from '../../../assets/Colors';
import HospitalCard from './HospitalCard';
import Ripple from 'react-native-material-ripple';
import {doctorsList} from '../../Data/Dis_item';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import * as Animatable from 'react-native-animatable';
export default class NearByCenters extends Component {
  constructor(props) {
    super(props);
    this.renderNearByItem = this.renderNearByItem.bind(this);
    this.state = {
      rowOne: doctorsList,
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(info => {
      global.latitude = info.coords.latitude;
      global.longitude = info.coords.longitude;
    }).then(() => {
      // console.log(global.latitude, global.longitude)
    });
  }

  googlePlaces(type) {
    var lats = global.latitude;
    var lng = global.longitude;
    var url =
      'https://www.google.com/maps/search/' + type + '/' + lats + ',' + lng;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  renderNearByItem() {}

  render() {
    return (
      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        useNativeDriver={true}>
        <Card style={{...this.props.style, ...styles.main}}>
          <View style={styles.header}>
            <View style={{ flex:1, flexDirection:'row' }}>
              <Image
                style={styles.titleLogo}
                source={require('../../../assets/icons/android/drawable-xxxhdpi/doctors.png')}
              />
              <Text style={styles.headerText}>Near By Doctors</Text>
            </View>
            <View style={{ flex:1, alignItems:'flex-end' }}>
              <TouchableOpacity style={{ flexDirection:'row' }} onPress={() => { this.props.navigation.navigate('NearByList') }}>
                {/* <Text style={{ color:'#1872b1',fontFamily: 'Ubuntu-Regular', }}>View All</Text> */}
                <Image
                  style={{ width:22, height:18, marginLeft:5 }}
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/arrow.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                {this.state.rowOne.map((item, index) => {
                  return (
                    <Ripple
                      key={index}
                      // style={{...styles.nearByItemCard, borderRadius: 10}}
                      // rippleSize={100}
                      onPress={() => {
                        item.navigate === ''
                          ? this.googlePlaces(item.type)
                          : this.props.navigation.navigate(item.navigate);
                      }}>
                      <ImageBackground style={{ width:180, height:65 , flexDirection:'row' }} source={require('../../../assets/icons/android/drawable-xxxhdpi/Step-Shape.png')}>
                        <View style={styles.nearByHeader}>
                          <Image
                            style={{width: 35, height: 35}}
                            source={item.logo}
                          />
                        </View>
                        <View
                          style={{
                            flex: 2,
                            justifyContent: 'center',
                            // marginHorizontal: 10,

                          }}>
                          <Text
                            style={{
                              color: '#383838',
                              fontSize: 13,
                              lineHeight: 22,
                              letterSpacing: 0.16,
                              fontFamily: 'Ubuntu-Regular',
                            }}>
                            {item.name}
                          </Text>
                        </View>
                      </ImageBackground>
                    </Ripple>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </Card>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom:15
  },
  nearByHeader: {
    flex: 1.2,
    marginLeft:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 18,
    // lineHeight: 22,
    color: '#383838',
    // letterSpacing: 0.16,
    // flex: 1,
    marginLeft: 10,
  },
  title: {
    color: '#0E74BC',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
    // fontFamily: fonts.cardHeading,
  },
  titleLogo: {
    width: 18,
    height: 16,
  },
  items: {
    flex: 9,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  nearByItemCard: {
    flex: 1,
    flexDirection: 'row',
    marginRight:10,
    // marginHorizontal: 10,
    // backgroundColor:'#ccc'
  },

  main: {
    paddingRight: 6,
    flex: 0.7,
    padding: 0,
    marginBottom: Dimensions.get('window').width * 0.03,
    marginTop: Dimensions.get('window').width * 0.03,
    paddingBottom: 15,
    paddingTop: 15,
    elevation: 1,
  },
  details: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsText: {
    marginVertical: 5,
    color: '#0E74BC',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 6,
  },
});
