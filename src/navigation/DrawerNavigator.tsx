import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import User from '../screens/User/Onboarding';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      drawerType: 'slide',
      headerShown: false,
    }}
  >
    <Drawer.Screen name="User" component={User} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
