import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const IdentityBackgroundImage = props => {
    return (
        <Image
        style = {styles.bgImage}
        source={require('../../assets/icons/android/drawable-xxxhdpi/user_card_logo.png')} 
          />      
    );
  };
  
  const styles = StyleSheet.create({
   
  });

  export default IdentityBackgroundImage;