import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  BackHandler,
} from 'react-native';
import Header from '../Components/Header';
import StepsCount from '../Components/StepsCount';
import StepsChart from '../Components/StepsChart';
const {width} = Dimensions.get('window');

class StepsScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor() {
    super();
    this.state = {
      steps: 10000,
      km: 0,
      calories_burned: 0,
    };
  }
  componentDidMount() {
    this.distance_Calculation();
    this.calories_Burned();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('User');
      return true;
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  distance_Calculation = () => {
    const {steps} = this.state;
    var meters = steps * 0.762;
    var km = meters / 1000;
    this.setState({
      km,
    });
  };
  calories_Burned = () => {
    const {steps} = this.state;
    var calories_burned = steps * 0.04;
    this.setState({
      calories_burned,
    });
  };
  render() {
    const data = [
      {label: '1', value: 500},
      {label: '2', value: 312},
      {label: '3', value: 424},
      {label: '4', value: 745},
      {label: '5', value: 89},
      {label: '6', value: 434},
      {label: '7', value: 650},
      {label: '8', value: 980},
      {label: '9', value: 123},
      {label: '10', value: 186},
      {label: '11', value: 689},
      {label: '12', value: 643},
      {label: '13', value: 500},
      {label: '14', value: 312},
      {label: '15', value: 424},
      {label: '16', value: 745},
      {label: '17', value: 89},
      {label: '18', value: 424},
      {label: '19', value: 745},
      {label: '20', value: 89},
    ];
    return (
      <SafeAreaView style={styles.container}>
        <Header back_press={() => this.props.navigation.navigate('User')} />
        <ScrollView style={{paddingBottom: 30}}>
          <ScrollView
            style={{
              flex: 1,
              position: 'relative',
              overflow: 'scroll',
              marginTop: 30,
              // height: 400,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <View style={{marginVertical: 10}} />
            <StepsChart data={data} round={100} unit="" />
            <View style={{marginVertical: 10}} />
          </ScrollView>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#000', fontSize: 16}}>Dates</Text>
          </View>
          <View style={{marginVertical: 5}} />
          <View
            style={{
              flex: 1.4,
              paddingTop: 30,
              backgroundColor: '#fafafa',
            }}>
            <StepsCount current="800" total="2000" />
            <View style={styles.distanceContainer}>
              <Text style={{color: '#454545', fontSize: 14}}>Distance</Text>
              <Text style={{color: '#000', fontSize: 16}}>
                {this.state.km} km
              </Text>
            </View>
            <View style={styles.calorieContainer}>
              <Text style={{color: '#454545', fontSize: 14}}>
                Calories Burned
              </Text>
              <Text style={{color: '#000', fontSize: 16}}>
                {this.state.calories_burned}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default StepsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  distanceContainer: {
    marginTop: 20,
    padding: 10,
    paddingLeft: 20,
    width,
    backgroundColor: '#ffff',
  },
  calorieContainer: {
    marginTop: 20,
    padding: 10,
    paddingLeft: 20,
    marginBottom: 20,
    width,
    backgroundColor: '#ffff',
  },
});
