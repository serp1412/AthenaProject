import React, { useCallback, useMemo, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
} from "react-native";
import { Colors } from "../constants";
import { useForm, Controller } from 'react-hook-form';
import { InputOutline } from "../components/InputOutline";
import Spacer from "../components/Spacer";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "../components/Button";
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
            <View style={{
                flex: 1
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
            </View>
            <SafeAreaView>
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
    // row: {
    //     flexDirection: 'row',
    //     marginVertical: 10,
    //     alignItems: 'center'
    // },
    // footer: {
    //     marginTop: 18,
    //     alignItems: 'center'
    // },
    main: {
        flex: 1,
        padding: 20,
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
    // title: {
    //     fontFamily: 'Gilroy-Medium',
    //     fontSize: 16,
    //     lineHeight: 20,
    //     color: Colors.text
    // },
    // subtitle: {
    //     fontFamily: 'Gilroy-Regular',
    //     fontSize: 12,
    //     lineHeight: 20,
    //     color: Colors.text
    // },
    // versionTitle: {
    //     fontFamily: 'Gilroy-Regular',
    //     fontSize: 12,
    //     lineHeight: 12,
    //     color: Colors.text
    // }
});

export default FormScreen;

export const FormScreenNavOptions = () => ({
    headerShown: false,

    // headerStyle: {
    //   backgroundColor: 'red',
    //   elevation: 0, // remove shadow on Android
    //   shadowOpacity: 0, // remove shadow on iOS
    // },
    // title: ' ',
    // headerBackTitleVisible: false,
    // headerLeft: () => (
    //   <BackButton
    //     handlePop
    //     title={<Translation>{t => t('DELIVERY_NAV_TITLE')}</Translation>}
    //   />
    // ),
    // headerBackImage: () => <Fragment />, // this enables system back for Android
});