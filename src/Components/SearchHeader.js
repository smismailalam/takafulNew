import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import left from '@icons/left.png';
import Search from '@icons/Search.png';

const {width, height} = Dimensions.get('window');
const screenHeight = parseInt(height);

class SearchHeader extends Component {
  render() {
    const {backPress, searchPress, onChangeText} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={backPress}
            style={styles.backBtn}>
            <Image source={left} style={styles.icon} resizeMode="contain" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Hospitals here...."
            placeholderTextColor={'#c4c4c4'}
            onChangeText={onChangeText}
          />
          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={searchPress}
            style={styles.backBtn}>
            <Image source={Search} style={styles.icon} resizeMode="contain" />
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}
export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: 'center',
    height: 75,
    backgroundColor: '#fff',
    paddingLeft: 15,
    elevation: 4,
    paddingTop: StatusBar.currentHeight,
  },
  backBtn: {
    padding: 10,
    paddingLeft: 5,
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  body: {
    flexDirection: 'row',
  },
  searchInput: {
    fontSize: 14,
    color: '#000',
    width: width - 30,

    // borderBottomWidth: 0.8,
    // borderBottomColor: colors.bg,
  },
});
