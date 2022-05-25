import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AppNavigator } from './src';

const App = () => {

  return (
    <>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
