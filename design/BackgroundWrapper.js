import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

const BackgroundWrapper = ({ children }) => (
    <View style={styles.container}>
        <ImageBackground source={require('../png/Accent.png')} style={styles.background} resizeMode="cover">
        {children}
        </ImageBackground>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#121212'
    },
});

export default BackgroundWrapper;