import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

class ImageCom extends Component {
  render() {
    const {uri} = this.props;
    return <Image source={uri} style={styles.container} />;
  }
}
export default ImageCom;

const styles = StyleSheet.create({
  container: {
    width: 15,
    height: 15,
  },
});
