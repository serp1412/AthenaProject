import React, {useMemo} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
// import {useRecoilValue} from 'recoil';
// import {navRootState} from '../atoms/navigation';
// import LaunchScreen from './app/screens/LaunchScreen';
import {
  FormScreen,
} from './screens';

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Form">
    <Stack.Screen
      name="Form"
      component={FormScreen}
    //   options={FormScreenNavOptions}
    />
  </Stack.Navigator>
);

export const AppNavigator = () => {
  const screenStack = useMemo(() => {
    return MainStack;
  }, []);

  return (
    <Stack.Navigator
    //   mode="modal"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}>
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
