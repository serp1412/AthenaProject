import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, SVGs} from '../../constants';
import Spacer from '../../components/Spacer';
import SvgUri from 'react-native-svg-uri';

const ResultScreen = ({route}) => {
  const lvr: number = route.params?.lvr;

  return (
    <View style={styles.main}>
      <SvgUri width="200" height="200" source={SVGs.result} />
      <Spacer orientation={'vertical'} space={50} />
      <Text style={styles.title}>{'Your LVR is'}</Text>
      <Spacer orientation={'vertical'} space={50} />
      <Text style={styles.result}>{lvr.toFixed(2) + ' %'}</Text>
      <Spacer orientation={'vertical'} space={50} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.resultBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.black,
  },
  result: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.main,
  },
});

export default ResultScreen;

export const ResultScreenNavOptions = () => ({
  headerStyle: {
    backgroundColor: Colors.resultBackground,
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
  },
  title: '',
  headerBackTitleVisible: false,
  headerTintColor: Colors.black,
});
