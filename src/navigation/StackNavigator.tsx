import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../screens/Auth/Register';
import VerifyOtp from '../screens/Auth/VerifyOtp';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
  </Stack.Navigator>
);

export default AuthStack;
