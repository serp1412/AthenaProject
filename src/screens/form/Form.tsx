import React, {useCallback, useRef} from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NumberFormat from 'react-number-format';
import Button from '../../components/Button';
import {InputOutline} from '../../components/InputOutline';
import Spacer from '../../components/Spacer';
import {Colors} from '../../constants';

export interface FormProps {
  propertyValue?: string;
  borrowAmount?: string;
  setPropertyValue: (value: string | undefined) => void;
  setBorrowAmount: (value: string | undefined) => void;
  setPropertyNumber: (number: number | undefined) => void;
  setBorrowNumber: (number: number | undefined) => void;
  topError?: string;
  propertyError?: string;
  borrowError?: string;
  calculate: () => void;
}

const Form = (props: FormProps) => {
  const {
    propertyValue,
    borrowAmount,
    setPropertyNumber,
    setBorrowNumber,
    setPropertyValue,
    setBorrowAmount,
    propertyError,
    borrowError,
    topError,
    calculate,
  } = props;

  const propertyValueRef = useRef<InputOutline>(null);
  const borrowRef = useRef<InputOutline>(null);

  const dollarComponent = useCallback(() => {
    return <Text style={styles.dollar}>{'$  '}</Text>;
  }, []);

  return (
    <View style={styles.main}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            padding: 20,
          }}>
          <Text style={styles.headerTitle}>{'Calculate your LVR'}</Text>
          <Spacer orientation={'vertical'} space={25} />
          <Text style={styles.headerSubtitle}>
            {'Enter the values below to calculate your loan to value ratio.'}
          </Text>
          <Spacer orientation={'vertical'} space={25} />
          {topError && (
            <>
              <Text
                style={{
                  color: 'red',
                }}>
                {topError}
              </Text>
              <Spacer orientation={'vertical'} space={10} />
            </>
          )}
          <NumberFormat
            value={propertyValue}
            displayType={'text'}
            thousandSeparator={true}
            onValueChange={({value}) => {
              setPropertyNumber(parseInt(value));
            }}
            renderText={value => (
              <InputOutline
                ref={propertyValueRef}
                onSubmitEditing={_ => {
                  borrowRef.current?.focus();
                }}
                placeholder={'Estimated property value'}
                secondaryPlaceholder={'Value'}
                value={value}
                leadingIcon={dollarComponent}
                keyboardType={'number-pad'}
                autoCorrect={false}
                autoCapitalize={'none'}
                blurOnSubmit={false}
                error={propertyError}
                onChangeText={setPropertyValue}
              />
            )}
          />
          <Spacer orientation={'vertical'} space={25} />
          <NumberFormat
            value={borrowAmount}
            displayType={'text'}
            thousandSeparator={true}
            onValueChange={({value}) => {
              setBorrowNumber(parseInt(value));
            }}
            renderText={value => (
              <InputOutline
                ref={borrowRef}
                placeholder={'Borrow amount'}
                secondaryPlaceholder={'Value'}
                value={value}
                leadingIcon={dollarComponent}
                keyboardType={'number-pad'}
                autoCorrect={false}
                autoCapitalize={'none'}
                blurOnSubmit={false}
                error={borrowError}
                onChangeText={setBorrowAmount}
              />
            )}
          />
          <Spacer orientation={'vertical'} space={50} />
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
      <SafeAreaView
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
        }}>
        <Button
          title={'Calculate'.toUpperCase()}
          onPress={calculate}
          backgroundColor={Colors.secondary}
        />
      </SafeAreaView>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerTitle: {
    color: Colors.main,
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 20,
  },
  dollar: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
