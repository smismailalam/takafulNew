import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Svg, {Image, Circle, ClipPath} from 'react-native-svg';
import ImageCom from './ImageCom';

const {width, height} = Dimensions.get('window');
const w2 = width * 2;

class AudioCallHeader extends Component {
  render() {
    const {connectionStatus, time, backPress} = this.props;
    return (
      <View style={[styles.container]}>
        <Svg height={height / 2.8} width={w2}>
          <ClipPath id="clip">
            <Circle r={height / 2.8} cx={width / 2} fill="#0267ae" />
          </ClipPath>
          <Image
            href={require('../../assets/icons/call_bg.jpg')}
            height={height / 2.8}
            width={w2}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clip)"
          />
        </Svg>
        <View style={{position: 'absolute', top: 30}}>
          <View style={styles.contentContainer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity activeOpacity={0.6} onPress={backPress}>
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
                  <Text style={styles.connectionStatus}>
                    {connectionStatus}
                  </Text>
                </View>
                <View style={{paddingTop: 10}}>
                  <Text style={styles.timingText}>{time}</Text>
                </View>
              </View>
              <View style={styles.right} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default AudioCallHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: -100,
    // width,
  },
  contentContainer: {
    padding: 20,
  },
  backImg: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#0267ae',
    justifyContent: 'center',
    alignItems: 'center',
    // elevation:10
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: width / 2 - 120,
  },
  right: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  appText: {
    color: '#fff',
    fontSize: 22,
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
