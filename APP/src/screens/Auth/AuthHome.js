import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { CustomButton as Button} from '../../components/Button';

export function AuthHome({ navigation }) {
    return (
        <View style={styles.container} >
            <View style={styles.metaBlock}>
                <Image style={{height:100, width:250}} source={require("../../styles/IMAGES/finpeg_logo.png")} />
            </View>
            <Button 
                textStyle={{fontSize:20}} 
                style={styles.btn} 
                text="Sign in"  
                onPress={() => navigation.navigate('SignIn')}
            />
            <Text style={styles.footerText} >
                Don't have account? 
                <Text style={{color: '#00a0cc', fontSize:18 }} onPress={() => navigation.navigate('SignUpEmail')}> Sign Up </Text>
            </Text>
        </View>        
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 15,
        backgroundColor: "#fff"
    },
    metaBlock:{
        alignContent:'center',
        alignItems:"center",
        justifyContent:"center",
        height:"82%"
    },
    btn:{
        padding: 15
    },
    footerText:{
        marginVertical:15,
        fontSize:16,
        textAlign: 'center',
        opacity:0.6
    }
})