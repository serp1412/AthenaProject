import React, {
    useRef,
    forwardRef,
    useImperativeHandle,
    useEffect,
    useState,
    useCallback,
} from 'react';
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableWithoutFeedback,
    View,
    Text,
} from 'react-native';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    interpolateColor,
} from 'react-native-reanimated';
import { Colors } from '../constants';

export interface InputOutlineMethods {
    /**
     * Requests focus for the given input or view. The exact behavior triggered will depend on the platform and type of view.
     */
    focus: () => void;
    /**
     * Removes focus from an input or view. This is the opposite of focus()
     */
    blur: () => void;
    /**
     * Returns current focus of input.
     */
    isFocused: Boolean;
    /**
     * Removes all text from the TextInput.
     */
    clear: () => void;
}

export interface InputOutlineProps extends TextInputProps {
    /**
     * Placeholder on top of the TextInput
     * @default Placeholder
     * @type string
     */
    placeholder?: string;
    /**
     * Placeholder inside the TextInput
     * @default Placeholder
     * @type string
     */
    secondaryPlaceholder?: string;
    /**
     * Font size for TextInput.
     * @default 14
     * @type number
     */
    fontSize?: number;
    /**
     * Color of TextInput font.
     * @default 'black'
     * @type string
     */
    fontColor?: string;
    /**
     * Vertical padding for TextInput Container. Used to calculate animations.
     * @default 12
     * @type number
     */
    paddingVertical?: number;
    /**
     * Vertical padding for TextInput Container.
     * @default 16
     * @type number
     */
    paddingHorizontal?: number;
    /**
     * Color when focused.
     * @default 'blue'
     * @type string
     */
    activeColor?: string;
    /**
     * Color when blurred (not focused).
     * @default 'grey'
     * @type string
     */
    inactiveColor?: string;
    /**
     * Background color of the InputOutline.
     * @default 'white'
     * @type string
     */
    backgroundColor?: string;
    /**
     * Error message is displayed. If anything is provided to error besides null or undefined, then the component is
     * within an error state, thus displaying the error message provided here and errorColor.
     * @default undefined
     * @type string
     */
    error?: string;
    /**
     * Color that is displayed when in error state. Error state is anything that is not null or undefined.
     * @default 'red'
     * @type string
     */
    errorColor?: string;
    /**
     * Leading Icon for the TextInput.
     * @default undefined
     * @type React.FC
     */
    leadingIcon?: React.FC;
    /**
     * Trailing Icon for the TextInput.
     * @default undefined
     * @type React.FC
     */
    trailingIcon?: React.FC;
    /**
     * Border radius applied to container.
     * @default 5
     * @type number
     */
    roundness?: number;
    /**
     * Helper text that can be displayed to assist users with Inputs. `error` prop will override this.
     * @default undefined
     * @type string
     */
    errorFontSize?: number;
    /**
     * Font family of error text.
     * @default undefined
     * @type string
     */
    errorFontFamily?: string;
}

type InputOutline = InputOutlineMethods;

const defaults = {
    fontSize: 16,
    activeColor: Colors.secondary,
    inactiveColor: Colors.grey,
    roundness: 0,
    style: {
        height: 50,
    },
};

const InputOutlineComponent = forwardRef<InputOutline, InputOutlineProps>(
    (props, ref) => {
        // establish provided props
        const {
            // theme colors
            inactiveColor = defaults.inactiveColor,
            activeColor = defaults.activeColor,
            errorColor = 'red',
            backgroundColor = 'white',

            // fonts
            fontSize = defaults.fontSize,
            fontColor = 'black',

            error,
            errorFontSize = 11,
            errorFontFamily,

            // styling
            paddingHorizontal = 16,
            paddingVertical = 0,
            roundness = defaults.roundness,
            style = defaults.style,

            // features
            placeholder,
            leadingIcon,
            trailingIcon,

            // others
            value: _providedValue = '',
            onChangeText,
            ...inputProps
        } = props;
        // value of input
        const [value, setValue] = useState(_providedValue);

        // animation vars
        const inputRef = useRef<TextInput>(null);
        const placeholderMap = useSharedValue(_providedValue ? 1 : 0);
        const placeholderSize = useSharedValue(0);
        const colorMap = useSharedValue(0);

        // helper functions
        const focus = () => inputRef.current?.focus();
        const blur = () => inputRef.current?.blur();
        const isFocused = () => Boolean(inputRef.current?.isFocused());
        const clear = () => {
            Boolean(inputRef.current?.clear());
            setValue('');
        };

        const errorState = useCallback(
            () => error !== null && error !== undefined,
            [error],
        );

        const handleFocus = () => {
            placeholderMap.value = withTiming(1); // focused
            if (!errorState()) colorMap.value = withTiming(1); // active
            focus();
        };

        const handleBlur = () => {
            if (!value) placeholderMap.value = withTiming(0); // blur
            if (!errorState()) colorMap.value = withTiming(0); // inactive
            blur();
        };

        const handleChangeText = (text: string) => {
            onChangeText && onChangeText(text);
            setValue(text);
        };

        const handlePlaceholderLayout = useCallback(
            ({ nativeEvent }) => {
                const { width } = nativeEvent.layout;
                placeholderSize.value = width;
            },
            [placeholderSize],
        );

        const renderLeadingIcon = useCallback(() => {
            if (leadingIcon) return leadingIcon({});
            return null;
        }, [leadingIcon]);

        const renderTrailingIcon = useCallback(() => {
            if (trailingIcon) return trailingIcon({});
            return null;
        }, [trailingIcon]);

        // handle value update
        useEffect(() => {
            if (_providedValue.length) placeholderMap.value = withTiming(1); // focused;
            setValue(_providedValue);
        }, [_providedValue, placeholderMap]);
        // error handling
        useEffect(() => {
            if (errorState()) {
                colorMap.value = 2; // error -- no animation here, snap to color immediately
            } else {
                colorMap.value = isFocused() ? 1 : 0; // to active or inactive color if focused
            }
        }, [error, colorMap, errorState]);

        const animatedContainerStyle = useAnimatedStyle(() => ({
            borderColor:
                placeholderSize.value > 0
                    ? interpolateColor(
                        colorMap.value,
                        [0, 1, 2],
                        [inactiveColor, activeColor, errorColor],
                    )
                    : inactiveColor,
        }));

        useImperativeHandle(ref, () => ({
            focus: handleFocus,
            blur: handleBlur,
            isFocused: isFocused(),
            clear: clear,
        }));

        const styles = StyleSheet.create({
            container: {
                borderWidth: 1,
                borderRadius: roundness,
                alignSelf: 'stretch',
                flexDirection: 'row',
                backgroundColor,
            },
            inputContainer: {
                flex: 1,
                paddingVertical,
                paddingHorizontal,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            input: {
                flex: 1,
                fontSize,
                color: fontColor,
            },
            placeholderText: {
                fontSize,
            },
            errorText: {
                color: errorColor,
                fontSize: errorFontSize,
                fontFamily: errorFontFamily,
                top: 5,
                paddingBottom: 5,
            },
            trailingIcon: {
                position: 'absolute',
                right: paddingHorizontal,
                alignSelf: 'center',
            },
        });

        return (
            <View style={{ flexShrink: 1, flexDirection: 'column' }}>
                <Animated.View
                    onLayout={handlePlaceholderLayout}>
                    <Animated.Text
                        style={[styles.placeholderText, { marginBottom: 5 }]}>
                        {placeholder}
                    </Animated.Text>
                </Animated.View>
                <Animated.View
                    style={[styles.container, animatedContainerStyle, style]}>
                    <TouchableWithoutFeedback
                        onPress={handleFocus}>
                        <View style={styles.inputContainer}>
                            {leadingIcon && <View>{renderLeadingIcon()}</View>}
                            <TextInput
                                {...inputProps}
                                ref={inputRef}
                                style={styles.input}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChangeText={handleChangeText}
                                selectionColor={errorState() ? errorColor : activeColor}
                                placeholder={props.secondaryPlaceholder ?? ''}
                                value={value}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    {trailingIcon && (
                        <View style={styles.trailingIcon}>{renderTrailingIcon()}</View>
                    )}
                </Animated.View>
                {errorState() && (
                    <Text style={[styles.errorText]}>{error}</Text>
                )}
            </View>
        );
    },
);

const InputOutline = InputOutlineComponent;
export { InputOutline };
