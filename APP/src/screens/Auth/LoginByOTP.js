import React from 'react'
import { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput  } from 'react-native';
import { CustomButton as Button} from '../../components/Button';
// import { TextInput } from 'react-native-paper';
import { VerifyOTPService, GenrateOTPService } from '../../services/JsonApiFetcher'

export function LoginByOTP({route, navigation, AuthContext}) {

  const [email, setemail] = useState('')
  const [otp, setotp] = useState('')


  const { signInOTP } = React.useContext(AuthContext)

  React.useEffect(() => {

    const s = () => {
      setemail(route.params.email)
    }

    s();

  }, [])

  const onGenrateOTP = async () => {
    try {
        const response = await GenrateOTPService(email);
        if(response.status){
            // Success
            alert(response['msg'])
        }else{
            // Faliuer
            alert(response['msg'])
        }
    } catch (error) {
        console.log(error);
    }
  }    

  const onLoginWithOTP = async () => {
    try {
        const response = await VerifyOTPService(email, otp);
        if(response.status){
            alert(response['msg'])
            signInOTP(response['user_id'].toString())
        }else{
            alert(response['msg'])
        }
    } catch (error) {
        console.log(error);
    }
  }    
    return (
      <View style={styles.container}>
        <Text style={styles.heading} >Login with OTP?</Text>
        <Text style={styles.subheading} >No need to worry follow path as</Text>
        <View style={styles.form}>
            <TextInput style={{ fontSize:18,borderBottomWidth:1, marginVertical:8 }}
                      placeholder="OTP"
                      keyboardType="number-pad"
                      onChangeText={otp => setotp(otp)}
                      label='OTP' />
            <View style={{marginTop: 10}}>
                <Text style={{color: '#00a0cc', fontSize:16 ,margin:5, textAlign:'right'}} 
                    onPress={() => { onGenrateOTP() }}>
                    Re-Genrate OTP
                </Text>
            </View>
        </View>
        <View style={styles.form}>
            {otp != '' ? (
              <Button style={{marginVertical:10, padding: 15}} 
                      text="Login with OTP" onPress={() => {onLoginWithOTP()} } />
            ) : (
              <Button text="Login with OTP" 
                      style={{marginVertical:10, padding: 15, backgroundColor:"#c3c3c3"}} 
                      onPress={() => {onLoginWithOTP()} } />
            ) }
            <Text style={styles.footer} >
              OTP will only valid for 60 seconds please check your email
            </Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
      paddingHorizontal: 15,
      paddingVertical: 40
    },
    heading:{
      fontSize: 28,
      paddingBottom:8
    },
    subheading:{
      fontSize: 14,
      opacity:0.46
    },
    form:{
      paddingVertical: 20
    },
    footer:{
        fontSize:10,
        textAlign: 'center',
        padding:5,
        opacity:0.6
    }
})