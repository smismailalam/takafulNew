import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const {width} = Dimensions.get('window');

class Header extends PureComponent {
  render() {
    const {back_press} = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#e9e9e9" />
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> */}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={back_press}>
            <Image
              source={require('../../assets/icons/android/drawable-xxxhdpi/header_back.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Steps</Text>
          </View>
        </View>
        {/* <TouchableOpacity
            style={{justifyContent: 'center', paddingRight: 20}}
            onPress={back_press}>
            <Image
              source={require('../../assets/icons/android/drawable-xxxhdpi/header_back.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity> */}
        {/* </View> */}
      </View>
    );
  }
}
export default Header;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#e9e9e9',
    paddingLeft: 20,
    marginTop: StatusBar.currentHeight,
    paddingRight: 10,
  },
  headerTextContainer: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
  },
});
