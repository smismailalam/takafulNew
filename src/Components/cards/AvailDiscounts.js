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
import {Brands, discountList} from '../../Data/Dis_item';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Ripple from 'react-native-material-ripple';
class AvailDiscounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitals:[]
    }
  }

  componentDidMount(){
    var url = `${global.API_URL}/api/Salamti/GetDiscountCentres`;      
    try {
      axios
        .get(url)
        .then(response => {
          if (response.status === 200)
          {
            this.setState({
              hospitals:response.data,
            })
          }
        })
        .catch(error => {
        });
    } 
    catch (error) {        
    }
  }

  render() {
    return (
      <Animatable.View animation="fadeInUp" useNativeDriver={true}>
        <Card style={{...styles.main, ...this.props.style}}>
          <View style={styles.header}>
            <View style={styles.titleLogoView}>
              <Image
                style={styles.titleLogo}
                source={require('../../../assets/icons/android/drawable-xxxhdpi/discounts_icon.png')}
              />
            </View>
            <View style={styles.headerTitle}>
              <Text style={{fontSize: 20, ...styles.headerText}}>
                Discount Center
              </Text>
            </View>
            <View style={{ flex:1,alignItems:'flex-end' }}>
              <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate('Discount', {
                    header: {
                      headerTitle: 'Discount Center',
                    },
                  });
                }}
                >
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
                // var discount = item.discountFrom == null ? item.discountTo+'%' : item.discountFrom+'-'+item.discountTo+'%'
                var discount = item.discountTo+'%'
                return (
                  <HospitalCard
                    key={item.name}
                    title={item.name}
                    location={item.location}
                    logo="4"
                    type="discount"
                    percentage={discount}
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
    flexDirection: 'column',
    width: '100%',
    // borderWidth: 1, borderColor: '#000000',
    // marginTop: 10,
    // flex: 0.5,
    // borderRadius: 10,
    elevation: 1,
    // marginHorizontal: 15,
    // marginTop: 20,
    // paddingHorizontal: 20
  },
  // HEADER
  header: {
    flex: 2,
    flexDirection: 'row',
    marginBottom: 15,
  },
  nearByHeader: {
    // borderWidth: 1, borderColor: '#000000',
    // paddingTop: 20,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLogoView: {
    // flex: 0.8,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  titleLogo: {
    width: 18,
    height: 18,
  },
  headerTitle: {
    // flex: 5.2,
    marginLeft:10
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
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  discountCardItem: {
    width: Dimensions.get('window').width / 2,
    flexDirection: 'column',
  },
});

export default AvailDiscounts;
