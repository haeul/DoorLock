/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
//import { Provider } from 'react-redux';
//import store from './redux/store';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthProvider} from './contexts/AuthContext';
import Login from './components/login';
import Main from './components/main';
import Join from './components/join';
import PwState from './components/pwState';
import Usagedetails from './components/Usagedetails';
import TemporaryPw from './components/TemporaryPw';
import UseBook from './components/UseBook';
import Reservation from './components/Reservation';


const Stack = createStackNavigator();

function App() {
  return (
    //<Provider>
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="main"
          screenOptions={{
            cardStyle: {backgroundColor: '#fff'}, // 원하는 백그라운드 컬러 설정
          }}>
          <Stack.Screen name="main" component={Main} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="join" component={Join} />
          <Stack.Screen name="pwState" component={PwState} />
          <Stack.Screen name="Usagedetails" component={Usagedetails} />
          <Stack.Screen name="TemporaryPw" component={TemporaryPw} />
          <Stack.Screen name="UseBook" component={UseBook} />
          <Stack.Screen name="Reservation" component={Reservation} />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
    //</Provider>
  );
}

export default App;
