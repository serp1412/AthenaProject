import React from 'react';
import {SVGs} from '../../constants';
import SvgUri from 'react-native-svg-uri';
import FormContainer from './FormContainer';

const FormScreen = ({navigation}) => {
  return <FormContainer navigation={navigation} />;
};

export default FormScreen;

export const FormScreenNavOptions = () => ({
  headerTitle: () => <SvgUri width="100" height="50" source={SVGs.logo} />,
});
