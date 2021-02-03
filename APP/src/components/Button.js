import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const CustomButton = (props) => {  
  const { text = 'Enter', style = {}, textStyle = {}, onPress, disabled } = props;

  return (
      <TouchableOpacity disabled={disabled}  onPress={onPress} style={[styles.button, style]} activeOpacity={0.92}>
          <Text style={[styles.text, textStyle]}>{props.text}</Text>        
      </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  button: {
    display: 'flex',      
    backgroundColor:"#0278ae",
    fontWeight: 'bold',
    padding: 10,
    position:"relative",
    borderRadius: 2,
    alignItems:"center",
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2AC062',
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  text: {
      fontSize: 16,
      color: '#FFFFFF',
  },
});
