import React from 'react';
import { Image } from 'react-native';

export default function LogoTitle() {
    return (
      <Image
        style={{ marginHorizontal: 50, marginVertical:0, width: 100, height: 30, alignItems:'center', justifyContent:'center' }}
        source={require('../styles/IMAGES/finpeg_logo.png')}
      />
    );
  }
  