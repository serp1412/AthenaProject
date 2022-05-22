import React, { memo } from 'react';
import { ColorValue, Text, TouchableOpacity } from 'react-native';

export interface ButtonProps {
    title: string,
    onPress: () => void,
    backgroundColor?: ColorValue,
    textColor?: ColorValue,
    padding?: number,
    cornerRadius?: number,
}

const Button = memo(
    ({ title,
        onPress,
        backgroundColor,
        padding = 15,
        cornerRadius = 3,
        textColor = 'white' }: ButtonProps) => {

        return (
            <TouchableOpacity
                style={{
                    backgroundColor: backgroundColor,
                    padding: padding,
                    alignItems: 'center',
                    borderRadius: cornerRadius
                }}
                activeOpacity={0.7}
                onPress={onPress} >
                <Text style={{
                    color: textColor,
                    fontWeight: 'bold'
                }}>{title}</Text>
            </TouchableOpacity >
        );
    },
);

export default Button;