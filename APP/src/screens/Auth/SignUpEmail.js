import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput  } from 'react-native';
import { CustomButton as Button} from '../../components/Button';
// import { TextInput } from 'react-native-paper';


export class SignUpEmail extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      vaildEmail: false,
      showError: false
    }
  }

  isEmailValid = () => {
    const {email} = this.state
  
    return email
  }
  
    validate = (email) => {
        email = email.toLowerCase();
        console.log(email);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
        console.log("Email is Not Correct");
            this.setState({email: email})
            this.setState({ vaildEmail: false })
        }
        else {
            this.setState({ email: email })
            this.setState({ vaildEmail: true })
            console.log("Email is Correct");
        }
    }

    onValueChange = (email) => {
      this.setState({showError: true})
      this.validate(email)
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.heading} >Sign Up</Text>
          <Text style={styles.subheading} >Create a fresh Finpeg account</Text>
          <Image  style={{ marginVertical: 20, width: '100%', height: '25%', alignItems:'center', justifyContent:'center' }}
                  source={require('../../styles/IMAGES/sip.jpg')} />
          
          <View style={styles.form}>
            <TextInput style={{ fontSize:18,borderBottomWidth:1 }}
                        label="Email" 
                        placeholder="Email"
                        value={this.state.email}
                        textContentType='emailAddress'
                        keyboardType="email-address"
                        onChangeText={this.onValueChange} />
            {!this.state.showError || this.state.vaildEmail ? true : (
              <Text style={{fontSize:12, margin:5, color:'#F21'}}>Email address is invalid</Text>
            )}
          </View>          
          <View>
            {this.state.vaildEmail ? (
              <Button text="Next" disabled={!this.isEmailValid()}
              onPress={() => this.props.navigation.navigate('SignUpPhone', {email: this.state.email})} />
            ) : (
              <Button text="Next" disabled={true}
                      style={{backgroundColor:"#c3c3c3"}} />
            )} 
            <Text style={styles.footer} >Already Have an Account ? 
            <Text style={{color: '#00a0cc', fontWeight: 'bold', fontSize:16 ,margin:5, textAlign:'right'}} 
                    onPress={() => this.props.navigation.navigate('SignIn')}> Sign In </Text>
            </Text>
          </View>
        </View>
      );
    }
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