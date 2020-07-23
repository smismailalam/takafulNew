import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Platform,
  UIManager,
  LayoutAnimation,
  ToastAndroid,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {BarChart, Grid} from 'react-native-svg-charts';
import Card from '../Card';
import fonts from '../../Styling/fonts';
import * as Animatable from 'react-native-animatable';
import CheckBox from 'react-native-check-box';
import {UIActivityIndicator} from 'react-native-indicators';
import AnimateNumber from 'react-native-animate-number';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
class WalkingRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      get_height: false,
      height_anim: 'fadeIn',
      get_weight: false,
      weight_anim: 'slideInRight',
      get_age: false,
      age_anim: 'slideInRight',
      get_gender: false,
      gender_anim: 'slideInRight',
      get_activity_level: false,
      activity_anime: 'slideInRight',
      male: false,
      female: false,
      foot: '',
      inches: '',
      weight_lbs: '',
      age: '',
      activity_level: '',
      gender: '',
      caloriesBurnPerDay: '',
      activity_1: false,
      activity_2: false,
      activity_3: false,
      activity_4: false,
      activity_5: false,
      point1: '1.2',
      point2: '1.37',
      point3: '1.55',
      point4: '1.725',
      point5: '1.9',
      loader: false,
      showContent: true,
      data: [
        {
          value: 50,
          svg: {
            fill: 'rgba(14, 116, 188, 0.5)',
          },
        },
        {
          value: 10,
          svg: {
            fill: 'rgba(14, 116, 188, 0.5)',
          },
        },
        {
          value: 40,
          svg: {
            fill: 'rgba(14, 116, 188, 0.5)',
          },
        },
        {
          value: 95,
          svg: {
            fill: '#0E74BC',
          },
        },
        {
          value: 85,
          svg: {
            fill: 'rgba(14, 116, 188, 0.5)',
          },
        },
      ],
    };
  }

  setFoot = text => {
    var txt = text;
    // console.log()
    if (
      txt === '4' ||
      txt === '5' ||
      txt === '6' ||
      txt === '7' ||
      txt === ''
    ) {
      this.setState({
        foot: txt,
      });
      // console.log('Height ---- ', txt);
    } else {
      this.setState({
        foot: '',
      });
      ToastAndroid.showWithGravity(
        'Height must be greater than or equals to 4 or less than equal to 7 ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  setInches = text => {
    if (
      text === '' ||
      text === '1' ||
      text === '2' ||
      text === '3' ||
      text === '4' ||
      text === '5' ||
      text === '6' ||
      text === '7' ||
      text === '8' ||
      text === '9' ||
      text === '10' ||
      text === '11'
    ) {
      this.setState({
        inches: text,
      });
      // console.log('Inches ', text);
    } else {
      this.setState({
        inches: '',
      });
      ToastAndroid.showWithGravity(
        'Inches must be greater than or equals to 1 or less than equal to 11 ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  renderView = () => {
    const {
      get_height,
      get_weight,
      get_age,
      get_gender,
      get_activity_level,
      loader,
      showContent,
      data,
    } = this.state;
    if (get_height) {
      return (
        <Animatable.View
          style={{
            flex: 1,
            paddingBottom: 10,
          }}>
          <View style={{...styles.inputField}}>
            <Text style={styles.headingText}> Your Height</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                onChangeText={text => this.setFoot(text)}
                style={styles.footInput}
                placeholder="foot"
                placeholderTextColor="#c7c7c7"
                numeric
                maxLength={1}
                keyboardType="decimal-pad"
                value={this.state.foot}
              />
              <TextInput
                onChangeText={text => this.setInches(text)}
                style={styles.inchesInput}
                placeholder="inches"
                placeholderTextColor="#c7c7c7"
                keyboardType="decimal-pad"
                maxLength={2}
                value={this.state.inches}
              />
            </View>
          </View>
          <View style={styles.healthNextBtnContainer}>
            <TouchableOpacity
              style={styles.weightBtn}
              onPress={() => {
                if (this.state.foot !== '') {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                  this.setState({get_weight: true, get_height: false});
                } else {
                  ToastAndroid.showWithGravity(
                    'Please Enter Foots of you Height',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
                }
              }}>
              <Text style={styles.weightBtnText}>Next</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      );
    }
    if (get_weight) {
      return (
        <Animatable.View
          style={{
            flex: 1,
          }}>
          <View style={styles.inputField}>
            <TextInput
              onChangeText={text => this.setState({weight_lbs: text})}
              style={styles.weightInput}
              placeholder="Enter your Weight"
              placeholderTextColor="#c7c7c7"
              keyboardType="decimal-pad"
              maxLength={3}
              value={this.state.weight_lbs}
            />
          </View>
          <View style={styles.weightBtnContainer}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.weight_lbs !== '') {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                  this.setState({get_weight: false, get_age: true});
                } else {
                  ToastAndroid.showWithGravity(
                    'Please Enter Weight',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
                }
              }}
              style={styles.weightBtn}>
              <Text style={styles.weightBtnText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                this.setState({get_weight: false, get_height: true});
              }}
              style={styles.weightBtn}>
              <Text style={styles.weightBtnText}>Back</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      );
    }
    if (get_age) {
      return (
        <Animatable.View
          style={{
            flex: 1,
          }}>
          <View style={{...styles.inputField}}>
            <TextInput
              onChangeText={text => this.setState({age: text})}
              style={styles.ageInput}
              placeholder="Enter your Age"
              placeholderTextColor="#c7c7c7"
              keyboardType="decimal-pad"
              maxLength={3}
            />
          </View>
          <View style={styles.ageBtnContainer}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.age !== '') {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                  this.setState({get_age: false, get_gender: true});
                } else {
                  ToastAndroid.showWithGravity(
                    'Please Enter Age',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
                }
              }}
              style={styles.ageBtn}>
              <Text style={styles.ageBtnText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                this.setState({get_weight: true, get_age: false});
              }}
              style={styles.ageBtn}>
              <Text style={styles.ageBtnText}>Back</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      );
    }
    if (get_gender) {
      return (
        <Animatable.View
          style={{
            flex: 1,
          }}>
          <View style={styles.inputField}>
            <Text style={styles.genderHeadingText}>Gender</Text>
            <CheckBox
              style={{padding: 10}}
              onClick={this.onMale}
              isChecked={this.state.male}
              rightText="Male"
              rightTextStyle={styles.genderCheckBox}
              checkedImage={
                <Image
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/check.png')}
                  style={styles.genderCheckBoxImg}
                />
              }
              unCheckedImage={
                <Image
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/uncheck.png')}
                  style={styles.genderCheckBoxImg}
                />
              }
            />
            <CheckBox
              style={{padding: 10}}
              onClick={this.onFemale}
              isChecked={this.state.female}
              rightText="Female"
              rightTextStyle={styles.genderCheckBox}
              checkedImage={
                <Image
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/check.png')}
                  style={styles.genderCheckBoxImg}
                />
              }
              unCheckedImage={
                <Image
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/uncheck.png')}
                  style={styles.genderCheckBoxImg}
                />
              }
            />
          </View>
          <View style={styles.genderBtnContainer}>
            <TouchableOpacity
              onPress={() => {
                if (!this.state.male && !this.state.female) {
                  ToastAndroid.showWithGravity(
                    'Please Select Gender',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
                } else {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

                  this.setState({
                    get_gender: false,
                    get_activity_level: true,
                  });
                }
              }}
              style={styles.genderBtn}>
              <Text style={styles.genderBtnText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                this.setState({get_gender: false, get_age: true});
              }}
              style={styles.genderBtn}>
              <Text style={styles.genderBtnText}>Back</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      );
    }
    if (get_activity_level) {
      return (
        <Animatable.View
          style={{
            flex: 1,
          }}>
          <View style={{...styles.inputField}}>
            <Text style={styles.genderHeadingText}>Your Activity Level</Text>
            <CheckBox
              style={{padding: 10}}
              onClick={this.changeActivity1}
              isChecked={this.state.activity_1}
              rightText="Little to no exercise"
              rightTextStyle={styles.genderCheckBox}
              checkedImage={
                <Image
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/check.png')}
                  style={styles.genderCheckBoxImg}
                />
              }
              unCheckedImage={
                <Image
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/uncheck.png')}
                  style={styles.genderCheckBoxImg}
                />
              }
            />
            <CheckBox
              style={{padding: 10}}
              onClick={this.changeActivity2}
              isChecked={this.state.activity_2}
              rightText="Slightly active person who does light exercise 1–3 days a week"
              rightTextStyle={styles.genderCheckBox}
              checkedImage={
                <Image
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/check.png')}
                  style={styles.genderCheckBoxImg}
                />
              }
              unCheckedImage={
                <Image
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/uncheck.png')}
                  style={styles.genderCheckBoxImg}
                />
              }
            />
            <CheckBox
              style={{padding: 10}}
              onClick={this.changeActivity3}
              isChecked={this.state.activity_3}
              rightText="Moderately active person who performs moderate exercise 3–5 days a week"
              rightTextStyle={styles.genderCheckBox}
              checkedImage={
                <Image
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/check.png')}
                  style={styles.genderCheckBoxImg}
                />
              }
              unCheckedImage={
                <Image
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/uncheck.png')}
                  style={styles.genderCheckBoxImg}
                />
              }
            />
            <CheckBox
              style={{padding: 10}}
              onClick={this.changeActivity4}
              isChecked={this.state.activity_4}
              rightText="Exercises hard 6–7 days a week"
              rightTextStyle={styles.genderCheckBox}
              checkedImage={
                <Image
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/check.png')}
                  style={styles.genderCheckBoxImg}
                />
              }
              unCheckedImage={
                <Image
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/uncheck.png')}
                  style={styles.genderCheckBoxImg}
                />
              }
            />
            <CheckBox
              style={{padding: 10}}
              onClick={this.changeActivity5}
              isChecked={this.state.activity_5}
              rightText="Extra active person who either has a physically demanding job or has a particularly challenging exercise routine"
              rightTextStyle={styles.genderCheckBox}
              checkedImage={
                <Image
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/check.png')}
                  style={styles.genderCheckBoxImg}
                />
              }
              unCheckedImage={
                <Image
                  source={require('../../../assets/icons/android/drawable-xxxhdpi/uncheck.png')}
                  style={styles.genderCheckBoxImg}
                />
              }
            />
          </View>
          <View style={styles.genderBtnContainer}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.activity_level !== '') {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                  this.caloriesCalculation();
                } else {
                  ToastAndroid.showWithGravity(
                    'Please Select Activity Level',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
                }
              }}
              style={styles.genderBtn}>
              <Text style={styles.genderBtnText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

                this.setState({get_activity_level: false, get_gender: true});
              }}
              style={styles.genderBtn}>
              <Text style={styles.genderBtnText}>Back</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      );
    }
    if (loader) {
      return (
        <View style={styles.loaderContainer}>
          <UIActivityIndicator color={'#0064FF'} size={40} />
        </View>
      );
    }
    if (showContent) {
      return (
        <View style={{  flex:1, flexDirection: 'row'}}>
          <View style={{ flex:1 , justifyContent:'flex-start'}}>
            <ImageBackground style={{ width:'100%',  }} source={require('../../../assets/icons/android/drawable-xxxhdpi/Sleep-Shape.png')}>
              <View style={{ flex:1  }}>
                <View style={{ flex:1, flexDirection:'row', paddingTop:15, paddingHorizontal:10}}>
                  <View style={{ flex:1 }} />
                  <View style={{ flex:2 , alignItems:'center' }}>
                    <Image
                      style={{
                        width: 75,
                        height: 75,
                      }}
                      source={require('../../../assets/icons/android/drawable-xxxhdpi/Moon-icon.png')}
                    />
                  </View>
                </View>
                <View style={{ flex:1 , paddingHorizontal:10, paddingBottom:25 }} >
                  <Text
                    style={{
                      color: '#292B4D',
                      fontSize: 20,
                      fontWeight:'bold',
                      letterSpacing: 2,
                      fontFamily: 'Ubuntu-Medium',
                    }}>
                    6h:50m
                  </Text>
                  <Text
                    style={{
                      color: '#292B4D',
                      fontSize: 16,
                      fontFamily: 'Ubuntu-Regular',
                    }}>
                    Sleep Time
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          
          <View style={{ flex:1, marginLeft:10 }}>
            
            <View style={{  flex:1 , alignContent:'flex-start', marginTop:5}}>
              <ImageBackground style={{width:157, height:55}} source={require('../../../assets/icons/android/drawable-xxxhdpi/Step-Icon-shape.png')}>              
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.props.navigation.navigate('Steps')}
                  style={{
                    padding:10,
                    flexDirection: 'row',
                  }}>

                  <View>
                    <AnimateNumber countBy={2} value={100} timing="linear" />
                    <Text
                      style={{
                        color: '#292B4D',
                        fontSize: 12,
                        fontFamily: 'Ubuntu-Regular',
                        fontWeight:'bold'
                      }}>
                      Walking Steps
                    </Text>
                  </View>

                  <View style={{ flex:1, alignItems:'flex-end' }}>
                    <Image
                      style={{width: 30, height: 40}}
                      source={require('../../../assets/icons/android/drawable-xxxhdpi/Step-icon.png')}
                    />
                  </View>
                </TouchableOpacity>
              </ImageBackground>
            </View>
            
            <View style={{  flex:1, marginTop:10 }}>
              <ImageBackground style={{width:157, height:55}} source={require('../../../assets/icons/android/drawable-xxxhdpi/Step-Icon-shape.png')}>              
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.props.navigation.navigate('Steps')}
                  style={{
                    padding:10,
                    flexDirection: 'row',
                  }}>

                  <View>
                    <AnimateNumber countBy={3} value={500} timing="linear" />
                    <Text
                      style={{
                        color: '#292B4D',
                        fontSize: 12,
                        fontFamily: 'Ubuntu-Regular',
                        fontWeight:'bold'
                      }}>
                      Calories Burnt
                    </Text>
                  </View>

                  <View style={{ flex:1, alignItems:'flex-end' }}>
                    <Image
                      style={{width: 40, height: 40}}
                      source={require('../../../assets/icons/android/drawable-xxxhdpi/hot-icon.png')}
                    />
                  </View>
                </TouchableOpacity>
              </ImageBackground>
            </View>

          </View>
        
        </View>
      );
    }
  };

  onMale = () => {
    this.setState({
      male: true,
      gender: 'male',
      female: false,
    });
  };
  onFemale = () => {
    this.setState({
      male: false,
      gender: 'female',
      female: true,
    });
  };
  changeActivity1 = () => {
    const {activity_1, point1} = this.state;
    if (!activity_1) {
      this.setState(
        {
          activity_1: true,
          activity_level: point1,
          activity_2: false,
          activity_3: false,
          activity_4: false,
          activity_5: false,
        },
        () => {
          console.log('POINTS +++ ', this.state.activity_level);
        },
      );
    }
    if (activity_1) {
      this.setState(
        {
          activity_1: false,
          activity_level: '',
          activity_2: false,
          activity_3: false,
          activity_4: false,
          activity_5: false,
        },
        () => {
          console.log('POINTS +++ ', this.state.activity_level);
        },
      );
    }
  };
  changeActivity2 = () => {
    const {activity_2, point2} = this.state;
    if (!activity_2) {
      this.setState(
        {
          activity_1: false,
          activity_level: point2,
          activity_2: true,
          activity_3: false,
          activity_4: false,
          activity_5: false,
        },
        () => {
          console.log('POINTS +++ ', this.state.activity_level);
        },
      );
    }
    if (activity_2) {
      this.setState(
        {
          activity_1: false,
          activity_level: '',
          activity_2: false,
          activity_3: false,
          activity_4: false,
          activity_5: false,
        },
        () => {
          console.log('POINTS +++ ', this.state.activity_level);
        },
      );
    }
  };
  changeActivity3 = () => {
    const {activity_3, point3} = this.state;
    if (!activity_3) {
      this.setState(
        {
          activity_1: false,
          activity_level: point3,
          activity_2: false,
          activity_3: true,
          activity_4: false,
          activity_5: false,
        },
        () => {
          console.log('POINTS +++ ', this.state.activity_level);
        },
      );
    }
    if (activity_3) {
      this.setState(
        {
          activity_1: false,
          activity_level: '',
          activity_2: false,
          activity_3: false,
          activity_4: false,
          activity_5: false,
        },
        () => {
          console.log('POINTS +++ ', this.state.activity_level);
        },
      );
    }
  };
  changeActivity4 = () => {
    const {activity_4, point4} = this.state;
    if (!activity_4) {
      this.setState(
        {
          activity_1: false,
          activity_level: point4,
          activity_2: false,
          activity_3: false,
          activity_4: true,
          activity_5: false,
        },
        () => {
          console.log('POINTS +++ ', this.state.activity_level);
        },
      );
    }
    if (activity_4) {
      this.setState(
        {
          activity_1: false,
          activity_level: '',
          activity_2: false,
          activity_3: false,
          activity_4: false,
          activity_5: false,
        },
        () => {
          console.log('POINTS +++ ', this.state.activity_level);
        },
      );
    }
  };
  changeActivity5 = () => {
    const {activity_5, point5} = this.state;
    if (!activity_5) {
      this.setState(
        {
          activity_1: false,
          activity_level: point5,
          activity_2: false,
          activity_3: false,
          activity_4: false,
          activity_5: true,
        },
        () => {
          console.log('POINTS +++ ', this.state.activity_level);
        },
      );
    }
    if (activity_5) {
      this.setState(
        {
          activity_1: false,
          activity_level: '',
          activity_2: false,
          activity_3: false,
          activity_4: false,
          activity_5: false,
        },
        () => {
          console.log('POINTS +++ ', this.state.activity_level);
        },
      );
    }
  };

  caloriesCalculation = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.setState({
      get_activity_level: false,
      loader: true,
    });
    const {foot, inches, weight_lbs, age, gender, activity_level} = this.state;
    var heightInches = foot * 12;
    var height = heightInches + parseInt(inches);
    var weightPound = weight_lbs * 2.205;
    console.log('HEIGHT ___ ', height);
    console.log('WEIGHT +++++ ', weightPound);
    if (gender === 'male') {
      var totalMale = 66 + 6.2 * weightPound + 12.7 * height - 6.76 * age;
      console.log('TOTAL MALE BMR', totalMale);
      var CaloriesBurn = totalMale * activity_level;
      console.log(
        `${gender} Need to Burn Calories Per day atmost --- `,
        CaloriesBurn,
      );
      this.setState({
        caloriesBurnPerDay: Math.ceil(CaloriesBurn),
      });
      setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        this.setState({
          loader: false,
          showContent: true,
        });
      }, 2000);
    }
    if (gender === 'female') {
      var totalFemale = 655.1 + 4.35 * weightPound + 4.7 * height - 4.7 * age;
      console.log('TOTAL FEMALE BMR', totalFemale);
      var CaloriesBurn = totalFemale * parseInt(activity_level);
      console.log(
        `${gender} Need to Burn Calories Per day atmost  --- `,
        CaloriesBurn,
      );
      this.setState({
        caloriesBurnPerDay: Math.ceil(CaloriesBurn),
      });
      setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        this.setState({
          loader: false,
          showContent: true,
        });
      }, 2000);
    }
  };

  render() {
    return (
      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        useNativeDriver={true}>
        <Card style={{...styles.main, ...this.props.style}}>
          <View style={styles.header}>
            <View style={styles.titleLogoView}>
              <Image
                style={styles.titleLogo}
                source={require('../../../assets/icons/android/drawable-xxxhdpi/Heart-icon.png')}
              />
            </View>
            <View style={styles.headerTitle}>
              <Text style={{...styles.title}}>Health Statistics</Text>
            </View>
          </View>

          <View style={styles.cardDetails}>{this.renderView()}</View>
        </Card>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  inputField: {
    flex: 1,
    elevation: 6,
  },
  // HEADER
  header: {
    flex:1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  title: {
    color: '#383838',
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'Ubuntu-Bold',
  },
  titleLogoView: {
    // flex: 1,
    justifyContent: 'center',
  },
  titleLogo: {
    width: 18,
    height: 14,
  },
  headerTitle: {
    // flex: 8,
    marginLeft:10,
  },
  graphDetail: {
    flex: 3,
    alignItems: 'flex-end',
  },

  // CARD DETAILS
  cardDetails: {
    flex: 8,
    flexDirection: 'row',
  },
  dailyWalkingDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  detailsText: {
    textAlign: 'right',
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.16,
    fontFamily: 'Ubuntu-Regular',
  },
  graphView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  barChart: {
    flex: 1,
  },

  /////////////
  headingText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
  },
  /////////////////// Health Styling ////////////////////////////
  footInput: {
    maxHeight: 45,
    width: '30%',
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    color: '#000',
    borderBottomWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 102, 222, 0.5)',
    textAlign: 'left',
    paddingLeft: 10,
    marginRight: 10,
  },
  inchesInput: {
    maxHeight: 45,
    width: '30%',
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    color: '#000',
    borderBottomWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 102, 222, 0.5)',
    textAlign: 'left',
    paddingLeft: 10,
  },
  healthNextBtnContainer: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // marginRight: 10,
  },
  healthNextBtn: {
    borderRadius: 4,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 102, 222, 0.5)',
  },
  healthNextBtn: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: '#ffff',
  },
  /////////////////// Health Styling ////////////////////////////

  ////////////////// Weight Styling ////////////////////////////
  weightInput: {
    maxHeight: 40,
    width: '85%',
    fontSize: 16,
    color: '#000',
    borderBottomWidth: 1,
    fontFamily: 'Ubuntu-Regular',
    borderRadius: 4,
    borderColor: 'rgba(0, 102, 222, 0.5)',
    textAlign: 'left',
    paddingLeft: 10,
  },
  weightBtnContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  weightBtn: {
    borderRadius: 4,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 102, 222, 0.5)',
  },
  weightBtnText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: '#ffff',
  },
  /////////////////////////////// Weight Styling //////////////////////////////////

  /////////////////////////////// Age Styling //////////////////////////////////
  ageInput: {
    maxHeight: 40,
    width: '80%',
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    color: '#000',
    borderBottomWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 102, 222, 0.5)',
    textAlign: 'left',
    paddingLeft: 10,
  },
  ageBtnContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  ageBtn: {
    borderRadius: 4,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 102, 222, 0.5)',
  },
  ageBtnText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: '#ffff',
  },
  /////////////////////////////// Age Styling //////////////////////////////////

  genderHeadingText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Ubuntu-Medium',
  },
  genderCheckBox: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10,
    fontFamily: 'Ubuntu-Regular',
  },
  genderCheckBoxImg: {
    width: 20,
    height: 20,
  },
  genderBtnContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  genderBtn: {
    borderRadius: 4,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 102, 222, 0.5)',
  },
  genderBtnText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: '#ffff',
  },

  /////////////////////////////// Gender Styling //////////////////////////////////

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default WalkingRecord;
