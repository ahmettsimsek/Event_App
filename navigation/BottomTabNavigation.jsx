import { Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile, Chat, Locations} from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import TopTab from './TopTab';
import AuthTopTab from './AuthTopTab';

const Tab = createBottomTabNavigator();


const tabBarStyle = {
  padding: 20,
  borderRadius: 20,
  height: 60,
  position: 'absolute',
  bottom: 10,
  left: 20,
  right: 20,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  paddingBottom: 30,
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      activeColor='#EB6A58'
      tabBarHideKeyboard={true}
      headerShown={false}
      inactiveColor='#3e2465'
      tabBarStyle={{ paddingBottom: 0, flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              color={focused ? COLORS.green : COLORS.gray}
              size={26}
              style={{ alignSelf: 'center' }}
            />
          ),
        }}
      />

      <Tab.Screen
        name='Locations'
        component={Locations}
        options={{
          tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'location' : 'location-outline'}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name='Chat'
        component={AuthTopTab}
        options={{
          tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'}
              color={focused ? COLORS.blue : COLORS.gray}
              size={26}
            />
          ),
        }}
      />

      

      <Tab.Screen
        name='Profile'
        component={TopTab}
        options={{
          tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              color={focused ? COLORS.green : COLORS.gray}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>

    
  );
};

export default BottomTabNavigation;
