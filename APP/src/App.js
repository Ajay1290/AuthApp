import React from 'react'
import { useEffect, useReducer, useMemo, useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Home as HomeScreen } from './screens/Home';
import { Splash as SplashScreen } from './screens/Splash';


import { LoginService } from './services/JsonApiFetcher'
import AuthStack from './stacks/AuthStack';

const Stack = createStackNavigator();

const AuthContext = React.createContext();

export default function App({navigation}) {


  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            isLoading: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

   
  useEffect(() => {
  
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e)
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();

  }, []);

  const authContext = useMemo(() => ({
    signIn: async (email, password) => {
      try{
          const response = await LoginService(email, password)
          if(response.status){
              alert(response['msg'])
              AsyncStorage.setItem('userToken', response['user_id'].toString());        
              dispatch({ type: 'SIGN_IN', token: response['user_id'].toString() });
          }else{
              alert(response['msg'])
              navigation.navigate("AuthHome")
          }
      } catch (error) {
          console.log(error);
      }
    },
    signInOTP: (userToken) => {
      AsyncStorage.setItem('userToken', userToken);        
      dispatch({ type: 'SIGN_IN', token: userToken });
    },
    signOut: () => {
        AsyncStorage.removeItem('userToken')
        dispatch({ type: 'SIGN_OUT' })
    },
    signUp: (navigation) => {
      alert("Registration Successfull Pleas Login to Continue.")
      navigation.navigate('SignIn')
    },
  }), []);

  if(state.isLoading){
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        {state.userToken != null ? (
            <Stack.Navigator>
              <Stack.Screen name="Home" children={ props => <HomeScreen AuthContext={AuthContext} state={state} {...props} />} />
            </Stack.Navigator>
          ) : ( 
            <AuthStack Stack={Stack} AuthContext={AuthContext} state={state} />
        )}
      </AuthContext.Provider>
    </NavigationContainer>
  )

}

