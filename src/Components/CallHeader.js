import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import ImageCom from './ImageCom';

class CallHeader extends Component {
  render() {
    const {connectionStatus, time} = this.props;
    return (
      <View
        style={{
          alignSelf: 'center',
          width: width,
          height: height / 3,
          backgroundColor: '#0f75bd',
        }}>
        <View style={styles.contentContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => console.log('Image LCik')}>
              <View style={styles.backImg}>
                <ImageCom
                  uri={require('../../assets/icons/android/drawable-xxxhdpi/white_arr_down.png')}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.centerContent}>
              <View style={{paddingTop: 10}}>
                <Text style={styles.appText}>Takaful Voice Call</Text>
              </View>
              <View style={{paddingTop: 30}}>
                <Text style={styles.connectionStatus}>{connectionStatus}</Text>
              </View>
              <View style={{paddingTop: 10}}>
                <Text style={styles.timingText}>{time}</Text>
              </View>
            </View>
            <View style={styles.right} />
          </View>
        </View>
      </View>
    );
  }
}
export default CallHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    marginTop: 35,
    padding: 20,
    justifyContent: 'center',
  },
  backImg: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#0267ae',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  appText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  connectionStatus: {
    fontSize: 16,
    color: '#ffff',
  },
  timingText: {
    fontSize: 14,
    color: '#ffff',
  },
});
