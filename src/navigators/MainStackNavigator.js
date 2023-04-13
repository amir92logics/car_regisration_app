import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CarsListScreen} from '../screens/CarsListScreen';

const MainStack = createStackNavigator();

export function MainStackNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={'CarsList'}
        component={CarsListScreen}
        options={{
          title: 'Registered Cars',
        }}
      />
    </MainStack.Navigator>
  );
}
