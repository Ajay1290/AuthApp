import * as React from 'react';

import LogoTitle from '../components/LogoTitle';

import { AuthHome as AuthHomeScreen } from '../screens/Auth/AuthHome';

import { SignIn as SignInScreen } from '../screens/Auth/SignIn';

import { ForgotPassword as ForgotPasswordScreen } from '../screens/Auth/ForgotPassword';
import { LoginByOTP as LoginByOTPScreen } from '../screens/Auth/LoginByOTP';

import { SignUpEmail as SignUpEmailScreen } from '../screens/Auth/SignUpEmail';
import { SignUpPhone as SignUpPhoneScreen } from '../screens/Auth/SignUpPhone';
import { SignUpPassword as SignUpPasswordScreen } from '../screens/Auth/SignUpPassword';


export default function AuthStack({ AuthContext, Stack, state }) {
    
  const { signIn } = React.useContext(AuthContext)
    
    return (
        <Stack.Navigator initialRouteName="AuthHome">
          <Stack.Screen name="AuthHome" component={AuthHomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="SignUpEmail" children={ props => <SignUpEmailScreen AuthContext={AuthContext} {...props} />}
              options={{
                headerTitle: props => <LogoTitle {...props} />,
                headerStatusBarHeight: 0,
              }}
          />
          <Stack.Screen name="SignUpPhone" children={ props => <SignUpPhoneScreen AuthContext={AuthContext} {...props} />}
              options={{
                headerTitle: props => <LogoTitle {...props} />,
                headerStatusBarHeight: 0,
              }}
          />
          <Stack.Screen name="SignUpPassword" children={ props => <SignUpPasswordScreen AuthContext={AuthContext} {...props} />}
              options={{
                headerTitle: props => <LogoTitle {...props} />,
                headerStatusBarHeight: 0,
              }}
          />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}  
              options={{
                headerTitle: props => <LogoTitle {...props} />,
                headerStatusBarHeight: 0,
              }}
          />
          <Stack.Screen name="LoginByOTP" 
                         children={ props => <LoginByOTPScreen AuthContext={AuthContext} {...props} /> }
              options={{
                headerTitle: props => <LogoTitle {...props} />,
                headerStatusBarHeight: 0,
              }}
          />
          <Stack.Screen name="SignIn" children={ props => <SignInScreen signIn={signIn} AuthContext={AuthContext} {...props} /> }
            options={{
              headerTitle: props => <LogoTitle {...props} />,
              headerStatusBarHeight: 0,
              title: 'Sign in',
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
          />
        </Stack.Navigator>
    );
    
  }
