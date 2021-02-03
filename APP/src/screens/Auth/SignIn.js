import React from 'react'
import { View, Text, StyleSheet, TextInput  } from 'react-native';
import { CustomButton as Button} from '../../components/Button';


export class SignIn extends React.Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            vaildEmail: false,
            showError: false
        }
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

    isValid(){
        const {email, password, vaildEmail} = this.state
        return email && password && vaildEmail
    }


    async onLogin(){
        const {email , password} = this.state;
        this.props.signIn(email, password)
    }

    
    render(){
        
        return (
        <View style={styles.container}>
            <Text style={styles.heading} >Login</Text>
            <Text style={styles.subheading} >with your Finpeg account</Text>
            <View style={styles.form}>
                <TextInput  style={{ fontSize:18,borderBottomWidth:1 }}
                            label="Email" 
                            placeholder="Email"
                            keyboardType={'email-address'}
                            value={this.state.email} 
                            onChangeText={this.onValueChange} />
                {!this.state.showError || this.state.vaildEmail ? true : (
                    <Text style={{fontSize:12, margin:5, color:'#F21'}}>Email address is invalid</Text>
                )}
                <TextInput style={{ marginVertical:8, fontSize:18,borderBottomWidth:1 }}
                            label="Password" 
                            placeholder="Password"
                            secureTextEntry={true}
                            value={this.state.password} 
                            secureTextEntry={true}
                            onChangeText={password => this.setState({password: password})} />
                <View style={{marginTop: 10}}>
                    <Text style={{color: '#00a0cc', fontSize:16 ,margin:5, textAlign:'right'}} 
                        onPress={() => { this.props.navigation.navigate('ForgotPassword')}}>
                        Forgot Password ?
                    </Text>
                </View>
            </View>
            <View style={styles.afterForm}>
                <View>
                    <Text style={styles.policy} >
                    By continuing you accept the 
                    <Text style={{color: '#00a0cc', fontSize:14 }} > Terms and Conditions </Text>and 
                    <Text style={{color: '#00a0cc', fontSize:14}} > Privacy Policy </Text> of Finpeg.
                    </Text>
                </View>
                {this.isValid() ? (
                    <Button style={{marginVertical:10, padding: 15}} text="Sign in" onPress={() => this.onLogin()} />
                ) : (
                    <Button style={{marginVertical:10, padding: 15, backgroundColor:"#c3c3c3"}} text="Sign in" onPress={() => this.onLogin()} />
                )}
                <Text style={styles.footer} >Don't Have an Account ? 
                <Text style={{color: '#00a0cc', fontWeight: 'bold', fontSize:16 ,margin:5, textAlign:'right'}} 
                        onPress={() => this.props.navigation.navigate('SignUpEmail')}> Sign Up </Text>
                </Text>
            </View>
        </View>
        );
    }
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