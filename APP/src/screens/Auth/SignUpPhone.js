import React from 'react'
import { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput  } from 'react-native';
import { CustomButton as Button} from '../../components/Button';
// import { TextInput } from 'react-native-paper';


export class SignUpPhone extends React.Component {

  constructor() {
    super();
    this.state = {
      name: '',
      phone: '',
      email: '',
      showError: false
    }
  }

  isValid = () => {
    const {name, phone} = this.state
  
    return name && phone
  }

  componentDidMount(){
    this.setState({email : this.props.route.params.email})
  }

  render() {
      return (
        <View style={styles.container}>
          <Text style={styles.heading} >Sign Up in progress...</Text>
          <Text style={styles.subheading} >It is essential to stay connected.</Text>
          
          <View style={styles.form}>
            <TextInput style={{ fontSize:18,borderBottomWidth:1 }}
                      label="Full Name" 
                      placeholder="Full Name"
                      value={this.state.name} 
                      onChangeText={name => this.setState({name: name})} />
            <TextInput style={{ fontSize:18,borderBottomWidth:1, marginVertical:8 }}
                      label="Phone" 
                      placeholder="Phone"
                      keyboardType='phone-pad'
                      dataDetectorTypes='phoneNumber'
                      value={this.state.phone} 
                      onChangeText={phone => this.setState({phone: phone})} />
          </View>
          <View>
          {this.isValid() ? (
              <Button text="Next" 
                      onPress={() => this.props.navigation.navigate('SignUpPassword', 
                                     {name: this.state.name,
                                      email: this.state.email,
                                      phone: this.state.phone} )} />
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