import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../styles/components/CustomTabBar';
import LookBook from '../screens/LookBook';
import Discover from '../screens/Discover';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Lookbook" component={LookBook} />
      <Tab.Screen name="Discover" component={Discover} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
