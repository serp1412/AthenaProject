import React, { useCallback, useMemo, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { Colors, SVGs } from "../constants";
import { InputOutline } from "../components/InputOutline";
import Spacer from "../components/Spacer";
import Button from "../components/Button";
import SvgUri from 'react-native-svg-uri';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { Icon } from "../components/Icon";
// import images from "../constants/images";
// import common from "../styles/common";

const FormScreen = () => {
    const propertyValueRef = useRef<InputOutline>(null);
    const borrowRef = useRef<InputOutline>(null);

    const dollarComponent = useCallback(() => {
        return (
            <Text style={styles.dollar}>{'$  '}</Text>
        )
    }, [])

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
                    <InputOutline
                        ref={propertyValueRef}
                        onSubmitEditing={(_) => {
                            borrowRef.current?.focus();
                        }}
                        //   style={common.input}
                        placeholder={'Estimated property value'}
                        secondaryPlaceholder={'Value'}
                        value={''}
                        leadingIcon={dollarComponent}
                        keyboardType={'number-pad'}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        blurOnSubmit={false}
                        error={undefined}
                        onChangeText={(value) => {
                            // onChange(value);
                            // if (onEmailChange) onEmailChange(value);
                        }}
                    //   onBlur={onBlur}
                    />
                    <Spacer orientation={'vertical'} space={25} />
                    <InputOutline
                        ref={borrowRef}
                        //   onSubmitEditing={(_) => {
                        //     borrowRef.current?.focus();
                        //   }}
                        //   style={common.input}
                        placeholder={'Borrow amount'}
                        secondaryPlaceholder={'Value'}
                        value={''}
                        leadingIcon={dollarComponent}
                        keyboardType={'number-pad'}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        blurOnSubmit={false}
                        error={undefined}
                        onChangeText={(value) => {
                            // onChange(value);
                            // if (onEmailChange) onEmailChange(value);
                        }}
                    //   onBlur={onBlur}
                    />
                    <Spacer orientation={'vertical'} space={50} />
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
            <SafeAreaView style={{
                marginHorizontal: 20,
                marginBottom: 20
            }}>
                <Button
                    title={'Calculate'.toUpperCase()}
                    onPress={() => {
                        //TODO: calculate
                    }}
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