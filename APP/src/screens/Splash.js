import React from 'react'

import { Image, View, StyleSheet } from 'react-native'

export function Splash() {
    return (
        <View style={styles.metaBlock}>
            <Image style={{height:100, width:250}} source={require("../styles/IMAGES/finpeg_logo.png")} />
        </View>
    )
}

const styles = StyleSheet.create({
    
    metaBlock:{
        alignContent:'center',
        alignItems:"center",
        justifyContent:"center",
        height:"82%"
    },
});