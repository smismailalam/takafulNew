import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
const {width} = Dimensions.get('window');
import moment from 'moment';

class StepsCount extends PureComponent {
  constructor() {
    super();
    this.state = {
      date: new Date(),
    };
  }
  render() {
    const today = this.state.date;
    const day = moment(today).format('ddd');
    const date = moment(today).format('D');
    const month = moment(today).format('MMMM');
    const {current, total} = this.props;
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={styles.dateText}>{day},</Text>
          </View>
          <View style={{marginLeft: 7, marginRight: 7}}>
            <Text style={styles.dateText}>{date}</Text>
          </View>
          <View>
            <Text style={styles.dateText}>{month}</Text>
          </View>
        </View>
        <View>
          <View style={styles.stepsContainer}>
            <View>
              <Image
                source={require('../../assets/icons/android/drawable-xxxhdpi/steps.png')}
                style={{width: 60, height: 60}}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{justifyContent: 'center', marginRight: 5}}>
                <Text style={styles.currentStepsText}>{current}</Text>
              </View>
              <View style={{justifyContent: 'flex-end'}}>
                <Text style={styles.totalSteps}>/{total}</Text>
              </View>
            </View>
            <View style={{marginTop: 5}}>
              <Text style={{fontSize: 14, color: '#000'}}>Daily Steps</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default StepsCount;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    color: '#000',
  },
  stepsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  currentStepsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  totalSteps: {
    fontSize: 18,
    color: '#b8b8b8',
  },
});
