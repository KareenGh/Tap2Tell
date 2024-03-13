//react
import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
import * as Animatable from 'react-native-animatable';

//images
import blue from '../../../assets/images/circle/Blue.svg';
import lastBubble from '../../../assets/images/monster/lastBubble.svg';
import monster from '../../../assets/images/monster/monsterHold.svg';

//components
import SVGImage from '../generic-components/SVGImage.jsx';

import { styles } from './LetterCircleStar.style';

function BubblesAnimation(props) {
    const left = useRef(new Animated.Value(0)).current;
    const secondLeft = useRef(new Animated.Value(0)).current;
    const lastLeft = useRef(new Animated.Value(0)).current;
    const firstTop = useRef(new Animated.Value(0)).current;
    const secondTop = useRef(new Animated.Value(0)).current;
    const height = useRef(new Animated.Value(0)).current;
    const secondHeight = useRef(new Animated.Value(0)).current;
    const lastHeight = useRef(new Animated.Value(0)).current;
    const lastTop = useRef(new Animated.Value(0)).current;

    const marginLeft = left.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [vw(-40), vw(10), vw(-40)]
    })

    const secondMarginLeft = secondLeft.interpolate({
        inputRange: [0, 1],
        outputRange: [vw(-40), vw(-10)]
    })

    const lastMarginLeft = lastLeft.interpolate({
        inputRange: [0, 1],
        outputRange: [vw(5), vw(-6)]
    })
    const marginTop = firstTop.interpolate({
        inputRange: [0, 1],
        outputRange: [vw(40), vw(-50)]
    })

    const secondMarginTop = secondTop.interpolate({
        inputRange: [0, 1],
        outputRange: [vw(20), vw(-30)]
    })
    const laseMarginTop = lastTop.interpolate({
        inputRange: [0, 1],
        outputRange: ['24%', '15%']
    })


    const bubbleHeight = height.interpolate({
        inputRange: [0, 1],
        outputRange: [vh(0), vh(20)]
    })

    const secondBubbleHeight = secondHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [vh(0), vh(13)]
    })

    const lastBubbleHeight = lastHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [vh(0), vh(9)]
    })




    useEffect(() => {
        Animated.timing(
            left,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false,
            }
        ).start(() => {
            Animated.timing(
                left,
                {
                    toValue: 2,
                    duration: 2000,
                    useNativeDriver: false,
                }
            ).start()
        });
    }, [left])

    useEffect(() => {
        Animated.timing(
            secondLeft,
            {
                toValue: 1,
                duration: 3000,
                delay: 2000,
                useNativeDriver: false,
            }
        ).start();
    }, [secondLeft])

    useEffect(() => {
        Animated.timing(
            lastLeft,
            {
                toValue: 1,
                duration: 3000,
                delay: 3000,
                useNativeDriver: false,
            }
        ).start();
    }, [lastLeft])

    useEffect(() => {
        Animated.timing(
            firstTop,
            {
                toValue: 1,
                duration: 4000,
                // delay: 2000,
                useNativeDriver: false,
            }
        ).start();
    }, [firstTop])

    useEffect(() => {
        Animated.timing(
            secondTop,
            {
                toValue: 1,
                duration: 3000,
                delay: 2000,
                useNativeDriver: false,
            }
        ).start();
    }, [secondTop])

    useEffect(() => {
        Animated.timing(
            lastTop,
            {
                toValue: 1,
                duration: 3000,
                delay: 3000,
                useNativeDriver: false,
            }
        ).start();
    }, [lastTop])


    useEffect(() => {
        Animated.timing(
            height,
            {
                toValue: 1,
                duration: 3000,
                useNativeDriver: false,
            }
        ).start();
    }, [height])

    useEffect(() => {
        Animated.timing(
            secondHeight,
            {
                toValue: 1,
                duration: 3000,
                delay: 2000,
                useNativeDriver: false,
            }
        ).start();
    }, [secondHeight])

    useEffect(() => {
        Animated.timing(
            lastHeight,
            {
                toValue: 1,
                duration: 3000,
                delay: 3000,
                useNativeDriver: false,
            }
        ).start();
    }, [lastHeight])

    return (
        <View style={{ bottom: 0, /* position: 'absolute'  */ }}>
            <View style={{ position: 'absolute' }}>
                <Animatable.View animation={'flash'} onAnimationEnd={() => props.setBubbles(false)} style={{ marginLeft: marginLeft, top: marginTop, height: bubbleHeight, opacity: bubbleHeight === 0 ? 0 : 1 }}><SVGImage style={{ ...styles.bluetwo }} source={blue} /></Animatable.View>
                <Animatable.View style={{ marginLeft: secondMarginLeft, top: secondMarginTop, height: secondBubbleHeight }}><SVGImage style={styles.blueone} source={blue} /></Animatable.View>
            </View>
            <View style={{ ...styles.monsterContainer}}>
                <SVGImage style={{ height:'100%',width:'95%', flex:1/2, zIndex: 20, bottom: 0, position: 'absolute', left: 0 }} source={monster} />
                <Animatable.View style={{ right: lastMarginLeft,/*  bottom: laseMarginTop, */ height: lastBubbleHeight, bottom: laseMarginTop, zIndex: 20, width: vw(30), position: 'absolute' /* opacity: lastBubbleHeight === 0 ? 0 : 1 */ }}><SVGImage source={lastBubble} style={styles.lastBubble} /></Animatable.View>
            </View>
        </View>
    );
}

export default BubblesAnimation