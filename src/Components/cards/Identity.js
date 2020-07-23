import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const {width: screenWidth} = Dimensions.get('window');

class Identity extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      policy_no: '',
      v_from: '',
      v_thru: '',
      activeSlide: 0,
      issue_date:'',
      expiry_date:'',
      health_Card: [
        {
          id: '11',
        },
      ],
    };
  }
  componentDidMount(){
    if(global.issue_dateH){
      var issue_date =  global.issue_dateH;
      issue_date = issue_date.split(" ");
      issue_date = issue_date[0];
      var expiry_date =  global.expiry_dateH;
      expiry_date = expiry_date.split(" ");
      expiry_date = expiry_date[0];
      this.setState({
        issue_date,
        expiry_date,
      })
    }
    else if(global.issue_dateM){
      var issue_date =  global.issue_dateM;
      issue_date = issue_date.split(" ");
      issue_date = issue_date[0];
      var expiry_date =  global.expiry_dateM;
      expiry_date = expiry_date.split(" ");
      expiry_date = expiry_date[0];
      this.setState({
        issue_date,
        expiry_date,
      }) 
    }
  }

  renderFunction = () => {
    return (
      <Animatable.View
        style={{ marginTop:25 }}
        animation="fadeInUp"
        duration={1500}
        useNativeDriver={true}>
          <ImageBackground
          style={{
            width: screenWidth ,
            height: Height / 4.2,
            padding:15,
          }}
          source={require('../../../assets/icons/android/drawable-xxxhdpi/new-card-image-.png')}> 
          <View style={styles.cardContent}>
            <View style={{ alignItems:'center', marginBottom:10}}>            
              <Image
                style={{ width:120 , height:55  }}
                source={require('../../../assets/icons/android/drawable-xxxhdpi/pakistan_takaful_logo_colorful.png')}
              />
            </View>
            
            <View style={styles.rowOne}>
              <Text
                style={{
                  color: '#383838',
                  fontSize: 17,
                  fontWeight: '500',
                  textAlign:'center',
                  fontFamily: 'Ubuntu-Regular',
                }}>
                {global.name}
              </Text>
            </View>

            <View style={styles.idNo}>
              <Text style={styles.no}>{global.policy_noH ? global.policy_noH : global.policy_noM}</Text>
            </View>

            <View style={styles.cardDetails}>
              
              <View style={{...styles.cardDetailsItemStart}}>
                <Text style={styles.cardDetailsItemLabel}>Member Since</Text>
                <Text style={styles.cardDetailsItemContent}>{this.state.issue_date}</Text>
              </View>

              <View style={{...styles.cardDetailsItemEnd}}>
                <Text style={styles.cardDetailsItemLabel}>Valid Thru</Text>
                <Text style={styles.cardDetailsItemContent}>{this.state.expiry_date}</Text>              
              </View>

            </View>
          
          </View>          
        </ImageBackground>
      </Animatable.View>      
    );
  };
  pagination = () => {
    const {health_Card, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={health_Card.length}
        activeDotIndex={activeSlide}
        containerStyle={{backgroundColor: 'transparent', height: 20}}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: '#383838',
        }}
        inactiveDotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: '#fff',
        }}
        inactiveDotScale={0.6}
      />
    );
  };

  render() {
    return (
      <View>
        { this.renderFunction() }
        <StatusBar translucent backgroundColor="#444" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.7,
    alignItems: 'center',
    flex: 1,
  },
  cardContent: {
    flex: 1,
    // justifyContent: 'center',
  },
  rowOne: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom:10
  },
  titleView: {
    flex: 1,
  },
  logo: {
    width: '20%',
    height: 30,
  },
  cardDetails: {
    // flex: 1,
    flexDirection: 'row',
  },
  idNo: {
    // flex: 1,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10
  },
  cardDetailsItemStart: {
    flex: 1,
    flexDirection: 'row',
    color: '#fff',
    justifyContent:'flex-start',
  },
  cardDetailsItemEnd: {
    flex: 1,
    flexDirection: 'row',
    color: '#fff',
    justifyContent:'flex-end'
  },
  cardDetailsItemLabel: {
    fontSize: 12,
    opacity: 0.5,
    color: '#383838',
    fontFamily: 'Ubuntu-Light',
  },
  cardDetailsItemContent: {
    fontSize:11,
    color: '#383838',
    marginLeft:15,
    fontFamily: 'Ubuntu-Regular',
  },
  no: {
    fontFamily: 'Ubuntu-Medium',
    color: '#383838',
    fontSize: 13,
    fontWeight:'bold',
    letterSpacing: 1,
  },
});

export default Identity;
