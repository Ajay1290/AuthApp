import React from 'react'
import { View, Text, StyleSheet, TextInput  } from 'react-native';
import { CustomButton as Button} from '../../components/Button';
import { GenrateOTPService } from '../../services/JsonApiFetcher'

export class ForgotPassword extends React.Component {
    
    constructor() {
      super();
      this.state = {
        email: '',
        vaildEmail: false,
        showError: false,
      }
    }

    validate = (email) => {
      email = email.toLowerCase();
      console.log(email);
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
          this.setState({email: email})
          this.setState({ vaildEmail: false })
      }
      else {
          this.setState({ email: email })
          this.setState({ vaildEmail: true })
      }
    }

    async onGenrateOTP(){
      try {
          const response = await GenrateOTPService(this.state.email);
          console.log(response)
          if(response.status){
              // Success
              this.props.navigation.navigate('LoginByOTP', {email: this.state.email})
              alert("OTP Genreated Successfully please check your email to continue.")
          }else{
              // Faliuer
              alert(response['msg'])
          }
      } catch (error) {
          console.log(error);
      }
    }    

    onValueChange = (email) => {
      this.setState({ showError: true })
      this.validate(email)
    }

    render(){  
      return (
        <View style={styles.container}>
          <Text style={styles.heading} >Forgot Passowrd?</Text>
          <Text style={styles.subheading} >No need to worry follow path as</Text>
          <View style={styles.form}>
              <TextInput style={{ fontSize:18,borderBottomWidth:1 }}
                      label="Email" 
                      placeholder="Email"
                      keyboardType="email-address"
                      value={this.state.email} 
                      onChangeText={email => this.onValueChange(email.toLowerCase())} />
              {!this.state.showError || this.state.vaildEmail ? true : (
                <Text style={{fontSize:12, margin:5, color:'#F21'}}>Email address is invalid</Text>
              )}
              {!this.state.vaildEmail ? (
                <>
                <Button style={{marginVertical:10, padding: 15, backgroundColor:"#c3c3c3"}} 
                  text="Login with OTP" 
                  disabled={true}
                  onPress={() => {this.onGenrateOTP()}} />
                </>
              ) : (
                <>
                <Button style={{marginVertical:10, padding: 15}} 
                      text="Login with OTP" 
                      onPress={() => {this.onGenrateOTP()} }  />
                </>
              )}
          </View>
          <View style={styles.form}>
              <Text style={styles.footer} >
                An OTP (One-Time-Password) will be sent to your emaill address please be sure that OTP will only valid for 60 seconds.
              </Text>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container:{
      paddingHorizontal: 15,
      paddingVertical: 40,
      height:'100%'
    },
    heading:{
      fontSize: 28,
      paddingBottom:8
    },
    subheading:{
      fontSize: 16,
      opacity:0.46
    },
    form:{
      paddingTop: 60
    },
    footer:{
      position: 'absolute',
      bottom:10,
      fontSize:12,
      textAlign: 'center',
      padding:5,
      opacity:0.6
    }
})