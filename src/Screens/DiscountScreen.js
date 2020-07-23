import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  StatusBar,
  BackHandler,
  FlatList,
} from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import axios from 'axios';
import {createFilter} from 'react-native-search-filter';
import SearchHeader from '../Components/SearchHeader';
const KEYS_TO_FILTERS = ['name'];

export default class DiscountScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      hospitals: [],
      onBack: true,
      searchItem: '',
      placeholderCont:[ {id:0}, {id:0}, {id:0}, {id:0}, {id:0}, {id:0}, {id:0}, {id:0}, {id:0},]
    };
  }

  componentDidMount() {
    var url = `${global.API_URL}/api/Salamti/GetDiscountCentres?all=true`;
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
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('User');
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  renderDiscountList(item) {
    return (
      <View style={styles.discountListCont}>
        <View style={styles.discount}>
          <Text style={styles.nameLabel}>{item.name}</Text>
          <Text style={styles.locationLabel}>{item.location}</Text>          
        </View>
        <View style={{ flex:1 }}>
          <ImageBackground style={styles.discountImage} source={require('../../assets/icons/android/drawable-xxxhdpi/Sale-Shape.png')}>
            <View style={styles.p5}>
              <Text style={styles.uptoTxt}>UpTo</Text>
              <Text style={styles.discountPerTxt}>{item.discountTo}%</Text>
              <Text style={styles.discountOff}>off</Text>
            </View>            
          </ImageBackground>
        </View>
      </View>
    );
  }

  render() {
    const filteredEmails = this.state.hospitals.filter(
      createFilter(this.state.searchItem, KEYS_TO_FILTERS),
    );
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <SearchHeader
          backPress={() => {
            this.props.navigation.navigate('User');
          }}
          onChangeText={text =>
            this.setState({
              searchItem: text,
            })
          }
        />

        <ScrollView
          contentContainerStyle={styles.screen}
          showsVerticalScrollIndicator={false}>
          {this.state.hospitals.length > 0 ? (
            this.state.searchItem === '' ? (
              <FlatList
                data={this.state.hospitals}
                renderItem={({item, index, separators}) =>
                  this.renderDiscountList(item)
                }
              />
            ) : (
              <FlatList
                data={filteredEmails}
                renderItem={({item, index, separators}) =>
                  this.renderDiscountList(item)
                }
              />
            )
          ) : (
            <SkeletonPlaceholder>
              <View style={{flex: 1, margin: 10}}>
                {this.state.placeholderCont.map(item=>{
                  return (
                    <View
                      style={styles.placeholderContainer}>
                      <View style={styles.placeholderCircle} />
                      <View style={styles.ml20}>
                        <View style={styles.placeholderFirstLine} />
                        <View style={styles.placeholderSecondLine} />
                      </View>
                    </View>
                  )
                })}
              </View>
            </SkeletonPlaceholder>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eeeeee',
    margin:10
  },
  placeholderContainer:{
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderCircle:{
    width: 60, height: 60, borderRadius: 50
  },
  placeholderFirstLine:{
    width: 120, height: 20, borderRadius: 4
  },
  placeholderSecondLine:{
    marginTop: 6,width: 80,height: 20,borderRadius: 4,
  },
  ml20:{
    marginLeft:20
  },
  discountListCont:{
    flex: 1, flexDirection: 'row', paddingHorizontal: 10, backgroundColor: '#ffffff', marginVertical:7, borderRadius:25
  },
  discount:{
    flex: 4, margin:10
  },
  nameLabel:{ fontSize: 16, color: '#383838', fontFamily:'Ubuntu-Bold' },
  locationLabel:{fontSize: 14, color: '#a5a5a5', fontFamily:'Ubuntu-Light', marginTop:5 },
  discountImage:{width:48, height:60, marginTop:-7},
  p5:{ padding:5 },
  uptoTxt:{color:'#fff', textAlign:'center', fontSize:12, fontFamily:'Ubuntu-Bold'},
  discountPerTxt:{color:'#fff', textAlign:'center', fontSize:14, fontFamily:'Ubuntu-Bold'},
  discountOff:{color:'#fff', textAlign:'right', fontSize:11, fontFamily:'Ubuntu-Bold',paddingRight:5}
});
