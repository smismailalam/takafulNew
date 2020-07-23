import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  PixelRatio,
  StatusBar,
  BackHandler,
  FlatList,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {ScrollableTabView} from 'react-native-scrollable-tab-view';
import {TouchableRipple} from 'react-native-paper';
import Ripple from 'react-native-material-ripple';
import {Brands, discountList} from '../Data/Dis_item';
import {StackActions} from 'react-navigation';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import axios from 'axios';
import SearchInput, {createFilter} from 'react-native-search-filter';
import SearchHeader from '../Components/SearchHeader';

const FirstRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#ff4081'}]} />
);

const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
);

const ThirdRoute = () => (
  <View style={[styles.scene, {backgroundColor: 'green'}]} />
);
const KEYS_TO_FILTERS = ['name'];

export default class HospitalScreen extends Component {
  // static navigationOptions = {
  //   // headerStyle: {
  //   //   marginTop: StatusBar.currentHeight,
  //   //   // backgroundColor: '#f4511e',
  //   // },
  //   headerShown: false,
  // };
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      hospitals: [],
      onBack: true,
      searchItem: '',
    };
  }

  componentDidMount() {
    var lat = global.lat ? global.lat : '24.831574';
    var long = global.long ? global.long : '67.073809';
    // var lat = global.lat;
    // var long = global.long;
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('User');
      return true;
    });
    var url = `${
      global.API_URL
    }/api/Salamti/GetHospitals?latitude=${lat}&longitude=${long}&city=karachi&all=true`;
    try {
      axios
        .get(url)
        .then(response => {
          if (response.status === 200)
          {
            console.log('response' , response.data);
            this.setState({
              hospitals: response.data,
            });
          }
        })
        .catch(error => {});
    } catch (error) {}
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  tabsView(title) {
    console.log(title);
    this.state.tabView.map(item => {
      // if(title == item.key) {
      return (
        <View style={{...styles.scene, backgroundColor: item.color}}>
          <Text>Hello World</Text>
        </View>
      );
    });
  }

  renderDiscountList(item) {
    return (      
        <View style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: 10,
          backgroundColor: '#ffffff',
          elevation: 4,
          borderRadius:25,
          marginBottom:10,
        }}>
          <View
            style={{
              flex: 1,
              flexDirection:'row',
              margin:10
            }}>
              <View style={{ flex:6 }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#3a3a3a',
                    fontWeight: '700',
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    // lineHeight: 20,
                    // letterSpacing: 0.16,
                    color: '#a5a5a5',
                  }}>
                  {item.distance ? (item.distance / 1000).toFixed(2) + ' km' : ''}
                </Text>              
              </View>
              <View style={{ flex:1 , alignContent:'flex-end' }}>
                <Ripple
                  // rippleColor="rgba(0, 0, 0, 0.32)"
                  // rippleSize={176}
                  rippleDuration={400}
                  onPress={() => {
                    this.props.navigation.navigate('Live' , { lat:item.latitude, long:item.longitude ,name: item.name,parent:'hospital' })
                  }}
                >
                  <Image
                    style={{ width:45 , height:42  }}
                    source={require('../../assets/icons/android/drawable-xxxhdpi/arrow-Cirlcle-.png')}
                  />
                </Ripple>
              </View>
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
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    padding: 5,
                    marginBottom: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{width: 60, height: 60, borderRadius: 50}} />
                  <View style={{marginLeft: 20}}>
                    <View style={{width: 120, height: 20, borderRadius: 4}} />
                    <View
                      style={{
                        marginTop: 6,
                        width: 80,
                        height: 20,
                        borderRadius: 4,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    padding: 5,
                    marginBottom: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{width: 60, height: 60, borderRadius: 50}} />
                  <View style={{marginLeft: 20}}>
                    <View style={{width: 120, height: 20, borderRadius: 4}} />
                    <View
                      style={{
                        marginTop: 6,
                        width: 80,
                        height: 20,
                        borderRadius: 4,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    padding: 5,
                    marginBottom: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{width: 60, height: 60, borderRadius: 50}} />
                  <View style={{marginLeft: 20}}>
                    <View style={{width: 120, height: 20, borderRadius: 4}} />
                    <View
                      style={{
                        marginTop: 6,
                        width: 80,
                        height: 20,
                        borderRadius: 4,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    padding: 5,
                    marginBottom: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{width: 60, height: 60, borderRadius: 50}} />
                  <View style={{marginLeft: 20}}>
                    <View style={{width: 120, height: 20, borderRadius: 4}} />
                    <View
                      style={{
                        marginTop: 6,
                        width: 80,
                        height: 20,
                        borderRadius: 4,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    padding: 5,
                    marginBottom: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{width: 60, height: 60, borderRadius: 50}} />
                  <View style={{marginLeft: 20}}>
                    <View style={{width: 120, height: 20, borderRadius: 4}} />
                    <View
                      style={{
                        marginTop: 6,
                        width: 80,
                        height: 20,
                        borderRadius: 4,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    padding: 5,
                    marginBottom: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{width: 60, height: 60, borderRadius: 50}} />
                  <View style={{marginLeft: 20}}>
                    <View style={{width: 120, height: 20, borderRadius: 4}} />
                    <View
                      style={{
                        marginTop: 6,
                        width: 80,
                        height: 20,
                        borderRadius: 4,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    padding: 5,
                    marginBottom: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{width: 60, height: 60, borderRadius: 50}} />
                  <View style={{marginLeft: 20}}>
                    <View style={{width: 120, height: 20, borderRadius: 4}} />
                    <View
                      style={{
                        marginTop: 6,
                        width: 80,
                        height: 20,
                        borderRadius: 4,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    padding: 5,
                    marginBottom: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{width: 60, height: 60, borderRadius: 50}} />
                  <View style={{marginLeft: 20}}>
                    <View style={{width: 120, height: 20, borderRadius: 4}} />
                    <View
                      style={{
                        marginTop: 6,
                        width: 80,
                        height: 20,
                        borderRadius: 4,
                      }}
                    />
                  </View>
                </View>
              </View>
            </SkeletonPlaceholder>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  screen: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    // backgroundColor: '#e9e9e9',
    margin:10
  },
  cards: {
    justifyContent: 'space-around',
    marginVertical: 20,
    width: '100%',
    paddingHorizontal: 20,
    flex: 0.65,
  },
  identity: {
    flex: 0.35,
    // paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
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
  },
});
