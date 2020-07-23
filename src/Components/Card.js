import React from 'react';
import { View, StyleSheet } from 'react-native' 

const Card = props => {
    return (
      <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
      
    );
  };
  
  const styles = StyleSheet.create({
    card: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#fff'
    }
  });

  export default Card;