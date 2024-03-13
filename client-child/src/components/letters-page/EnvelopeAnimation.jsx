import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { vw, vh } from 'react-native-expo-viewport-units';
import { useLetterImageStoreContext } from '../../stores/index.store';
import SVGImage from '../generic-components/SVGImage';
import ExclamationMark from '../../../assets/images/ExclamationMark.svg';
import Envelope from '../../../assets/images/confirm-image/BlueEnvelopeIcon.svg'
import { StyleSheet } from 'react-native';

function EnvelopeAnimation(props) {
    const letterStore = useLetterImageStoreContext();
    const deg = useRef(new Animated.Value(0)).current;
    const top = useRef(new Animated.Value(0)).current;
    const left = useRef(new Animated.Value(0)).current;
    const width = useRef(new Animated.Value(0)).current;


    const marginTop = top.interpolate({
        inputRange: [0, 1],
        outputRange: [vh(30), vh(-8.3)]
    })
    const rotate = deg.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['0deg', '270deg', '230deg']
    })
    const iconSize = width.interpolate({
        inputRange: [0, 1],
        outputRange: [vw(30), vw(12)]
    })

    const singleIconMarginLeft = left.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: [vw(-50), vw(37), vw(30), vw(44)]
    })

    useEffect(() => {
        letterStore.setStopAnimation(false)
        left.setValue(0)
        top.setValue(0)
        width.setValue(0)
        Animated.timing(
            left, {
            delay: 500,
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false
        }).start(() => {
            Animated.timing(
                left, {
                toValue: 2,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: false
            }).start(() => {
                Animated.timing(
                    left, {
                    toValue: 1,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: false
                }).start(() => {
                    Animated.timing(deg, {
                        toValue: 2,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(() => {
                        Animated.timing(deg, {
                            toValue: 1,
                            duration: 100,
                            useNativeDriver: true,
                        }).start(() => {
                            Animated.timing(deg, {
                                toValue: 0,
                                duration: 100,
                                useNativeDriver: true,
                            }).start(() => {
                                Animated.timing(
                                    top,
                                    {
                                        toValue: 1,
                                        duration: 500,
                                        useNativeDriver: false,
                                    }
                                ).start(() => {
                                    Animated.timing(

                                        left,
                                        {
                                            toValue: 3,
                                            duration: 0.001,
                                            easing: Easing.linear,
                                            useNativeDriver: false
                                        }
                                    ).start(() => {
                                        Animated.timing(
                                            width,
                                            {
                                                toValue: 1,
                                                duration: 500,
                                                useNativeDriver: false,
                                            }
                                        ).start(() => letterStore.setStopAnimation(true))
                                    })
                                })
                            })
                        })
                    })
                })
            })
        });
    }, [])

    return (
        <View style={styles.darkBackground}>
            <View style={styles.animationContainer}>
                <View style={styles.iconsContainer}>
                    {letterStore.newResponseDetailsLength > 0 ?
                        <Animatable.View style={{
                            marginLeft: singleIconMarginLeft,
                            top: marginTop,
                            width: iconSize,
                            height: iconSize,
                        }}>
                            <Animatable.View style={{ transform: [{ rotate: rotate }] }}>
                                <SVGImage style={{
                                }} source={Envelope} />
                            </Animatable.View>
                        </Animatable.View>
                        : null}
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    animationContainer: {
        flex: 1,
        width: vw(100),
        height: vh(100),
        top: 0,
        right: 0,
        position: 'absolute'
    },
    darkBackground: {
        backgroundColor: "#000000a3",
        width: vw(100),
        height: vh(100),
        position: "absolute",
        top: 0,
        right: 0
    },
    iconsContainer: {
        display: "flex",
        flexDirection: "row",
    },
});
export default EnvelopeAnimation