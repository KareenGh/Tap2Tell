import React from 'react'
import { View, Image, StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import { BACKGROUND } from '../../consts/constStyles';

export const LoadingPage = () => {
    return (
        <View>
            <Image style={BACKGROUND} source={require('../../../assets/images/MainBackground.png')} />
            <Image source={require('../../../assets/gif/animation.gif')} style={LoadingStyle.s} />
        </View>
    );
}


const LoadingStyle = StyleSheet.create({
    s: {
        width: vw(55),
        height: vh(25),
        zIndex: 2,
        position: 'absolute',
        alignSelf: 'center',
        top: vh(35),
    }
})