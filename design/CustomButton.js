import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CustomButton = ({label, onPress}) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        style={{
            backgroundColor: '#5C038C',
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
        }}>
        <Text
            style={{
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 20,
            fontFamily: 'Clash',
            color: '#fff',
            }}>
            {label}
        </Text>
        </TouchableOpacity>
    );
}

export default CustomButton;