import React from 'react';
import { BarChart, Grid } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from "react-native-svg";
import {StyleSheet} from 'react-native'

class BarChartView extends React.PureComponent {
  render() {

    const Gradient = () => (
      <Defs key={'gradient'}>
          <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
              <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
              <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
          </LinearGradient>
      </Defs>
  )
    return (
      <BarChart
          style={{width: 100, height: 100}}
          data={this.props.data}
          gridMin={0}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          yAccessor={({ item }) => item.value}
          contentInset={{ top: 20, bottom: 20 }}
      >
          {/* <Grid/> */}
          <Gradient/>
      </BarChart>
    )
  }
};

  const styles = StyleSheet.create({
    card: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.26,
      elevation: 8,
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      backgroundColor: '#FFFFFF'
    }
  });

export default BarChartView