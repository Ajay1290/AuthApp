import React from 'react'
import { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput  } from 'react-native';
import { CustomButton as Button} from '../../components/Button';
// import { TextInput } from 'react-native-paper';
import { RegisitrationService, UserService } from '../../services/JsonApiFetcher';

export function SignUpPassword({navigation, AuthContext, route}) {
  
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [password, setpassword] = useState('');
  const [confirm_password, setconfirm_password] = useState('');
  const [showError, setshowError] = useState(false);

  const { signUp } = React.useContext(AuthContext)

  const isPassValid = () => {
    return (confirm_password == password) && ((confirm_password != '' && password != ''))
  }

  const onRegister = async () => {
    try {
        const response = await RegisitrationService(name, email, phone, password);
        if(response.status){
            // Success
            signUp(navigation)
            navigation.navigate("SignIn")
        }else{
            // Faliuer
            alert(response['msg'])
            navigation.navigate("SignUpEmail")
        }
    } catch (error) {
        console.log(error);
    }
}

React.useEffect(() => {
  const s = () => {
    setemail(route.params.email)
    setname(route.params.name)
    setphone(route.params.phone)
  }

  s()
  
}, [])

  return (
    <View style={styles.container}>
      <Text style={styles.heading} >Signing Up ...</Text>
      <Text style={styles.subheading} >Security is our first concern.</Text>
      
      <View style={styles.form}>
        <TextInput style={{ fontSize:18,borderBottomWidth:1 }}
                    label="Password" 
                    placeholder="Password"
                    value={password} 
                    onChangeText={password => setpassword(password)} />
        <TextInput style={{ fontSize:18,borderBottomWidth:1,marginVertical:8 }}
                    label="Confirm Password" 
                    placeholder="Confirm Password"
                    keyboardType='default'
                    secureTextEntry={true}
                    value={confirm_password} 
                    onChangeText={confirm_password => setconfirm_password(confirm_password)} />
          {isPassValid() ? true : (
              <Text style={{fontSize:12, margin:5, color:'#F21'}}>Both passwords must be same.</Text>
          )}
      </View>
      <View>
        {isPassValid() ? (
            <Button text="Sign Up" 
                    onPress={() => {onRegister()}} />
          ) : (
            <Button text="Sign Up" disabled={true}
                    style={{backgroundColor:"#c3c3c3"}} />
        )} 
        <Text style={styles.footer} >Already Have an Account ? 
        <Text style={{color: '#00a0cc', fontWeight: 'bold', fontSize:16 ,margin:5, textAlign:'right'}} 
                onPress={() => navigation.navigate('SignIn')}> Sign In </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      paddingHorizontal: 15,
      paddingVertical: 20
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
    afterForm:{
      paddingVertical: 60
    },
    policy:{
      padding: 8,
      marginBottom:10,
      fontSize:14,
      opacity:0.8
    },
    footer:{
      marginTop:10,
      textAlign: 'center',
      padding:5,
      fontSize:14,
      opacity:0.6
    }
})