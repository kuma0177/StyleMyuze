import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './StackNavigator';
import { useAppSelector } from '../store/hooks';
import { AuthState } from '../utils/types/Auth';
import TabNavigator from './TabNavigator';
import Onboarding from '../screens/User/Onboarding';
import Loader from '../styles/components/Loader';
import FitPreferences from '../screens/Secondary/FitPreferences';
import TryOnHistory from '../screens/Secondary/TryOnHistory';
import PrivacyPolicy from '../screens/Secondary/PrivacyPolicy';
import HelpAndSupport from '../screens/Secondary/Help&Support';
import Profile from '../screens/User/Profile';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user } = useAppSelector(s => s.auth) as AuthState;
  const { loading } = useAppSelector(s => s.async) as any;

  if (!user?.id) {
    if (loading) return <Loader />;

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthStack} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  if (user?.isNew) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={'Onboarding'}
        >
          <Stack.Screen name="Onboarding" component={Onboarding} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={'App'}
      >
        <Stack.Screen name="App" component={TabNavigator} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="UserProfile" component={Profile} />
        <Stack.Screen name="FitPreferences" component={FitPreferences} />
        <Stack.Screen name="TryOnHistory" component={TryOnHistory} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
