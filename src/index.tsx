import React, {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  FormScreen,
  FormScreenNavOptions,
  ResultScreen,
  ResultScreenNavOptions,
} from './screens';

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Form">
    <Stack.Screen
      name="Form"
      component={FormScreen}
      options={FormScreenNavOptions}
    />
    <Stack.Screen
      name="Result"
      component={ResultScreen}
      options={ResultScreenNavOptions}
    />
  </Stack.Navigator>
);

export const AppNavigator = () => {
  const screenStack = useMemo(() => {
    return MainStack;
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={screenStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
