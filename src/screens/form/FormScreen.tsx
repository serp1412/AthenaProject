import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { Colors, SVGs } from "../../constants";
import { InputOutline } from "../../components/InputOutline";
import Spacer from "../../components/Spacer";
import Button from "../../components/Button";
import SvgUri from 'react-native-svg-uri';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormViewModel from "./FormViewModel";
import NumberFormat from "react-number-format";
// import { Icon } from "../components/Icon";
// import images from "../constants/images";
// import common from "../styles/common";

const FormScreen = () => {
    const propertyValueRef = useRef<InputOutline>(null);
    const borrowRef = useRef<InputOutline>(null);
    const [propertyValue, setPropertyValue] = useState<string | undefined>(undefined)
    const [borrowAmount, setBorrowAmount] = useState<string | undefined>(undefined)
    const [propertyNumber, setPropertyNumber] = useState<number | undefined>(undefined)
    const [borrowNumber, setBorrowNumber] = useState<number | undefined>(undefined)
    const [propertyError, setPropertyError] = useState<string | undefined>(undefined)
    const [borrowError, setBorrowError] = useState<string | undefined>(undefined)
    const [topError, setTopError] = useState<string | undefined>(undefined)
    const viewModel = useMemo(() => {
        return new FormViewModel()
    }, [])

    const dollarComponent = useCallback(() => {
        return (
            <Text style={styles.dollar}>{'$  '}</Text>
        )
    }, [])

    const calculate = useCallback(() => {
        setPropertyError(viewModel.validatePropertyValue(propertyNumber))
        setBorrowError(viewModel.validateBorrowAmount(borrowNumber))
        if (propertyError || borrowError) {
            return
        }

        if (propertyNumber && borrowNumber) {
            setTopError(viewModel.validateResult(propertyNumber, borrowNumber))
            if (topError) {
                return
            }
        }

        console.log(' SUCCESSS ===== >');

        // TODO: navigate to result
    }, [propertyNumber,
        borrowNumber,
        setPropertyError,
        setBorrowError,
        setTopError,
        propertyError,
        borrowError,
        topError])

    return (
        <View style={styles.main}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <KeyboardAwareScrollView style={{
                    flex: 1,
                    padding: 20,
                }}>
                    <Text style={styles.headerTitle}>{'Calculate your LVR'}</Text>
                    <Spacer orientation={'vertical'} space={25} />
                    <Text style={styles.headerSubtitle}>{'Enter the values below to calculate your loan to value ratio.'}</Text>
                    <Spacer orientation={'vertical'} space={25} />
                    {topError && <>
                        <Text style={{
                            color: 'red'
                        }}>{topError}</Text>
                        <Spacer orientation={'vertical'} space={10} />
                    </>}
                    <NumberFormat
                        value={propertyValue}
                        displayType={'text'}
                        thousandSeparator={true}
                        onValueChange={({ value }) => {
                            setPropertyNumber(parseInt(value))
                        }}
                        renderText={value => (
                            <InputOutline
                                ref={propertyValueRef}
                                onSubmitEditing={(_) => {
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
                            //   onBlur={onBlur}
                            />
                        )} />
                    <Spacer orientation={'vertical'} space={25} />
                    <NumberFormat
                        value={borrowAmount}
                        displayType={'text'}
                        thousandSeparator={true}
                        onValueChange={({ value }) => {
                            setBorrowNumber(parseInt(value))
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
                            //   onBlur={onBlur}
                            />
                        )} />
                    <Spacer orientation={'vertical'} space={50} />
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
            <SafeAreaView style={{
                marginHorizontal: 20,
                marginBottom: 20
            }}>
                <Button
                    title={'Calculate'.toUpperCase()}
                    onPress={calculate}
                    backgroundColor={Colors.secondary} />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerTitle: {
        color: Colors.main,
        fontSize: 30,
        fontWeight: 'bold'
    },
    headerSubtitle: {
        fontSize: 20
    },
    dollar: {
        fontSize: 18,
        fontWeight: 'bold'
    },
});

export default FormScreen;

export const FormScreenNavOptions = () => ({
    headerTitle: () => <SvgUri
        width="100"
        height="50"
        source={SVGs.logo}
    />
});