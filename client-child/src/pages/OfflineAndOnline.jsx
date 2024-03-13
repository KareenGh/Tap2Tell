import React, { useRef, useState, useEffect } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { vh, vw } from "react-native-expo-viewport-units";
import NetInfo from "@react-native-community/netinfo";
// import { varelaroundRegular } from '../consts/fonts'

const OfflineAndOnline = (props) => {
    const [isConnected, setIsConnected] = useState(true)
    const [isFirstTime, setIsFirstTime] = useState(true)

    useEffect(() => {
        unsubscribe()
    }, [])

    const unsubscribe = () => {
        NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected)
            if (isFirstTime && state.isConnected == false) setIsFirstTime(false)
        })
    }
    const upAnim = useRef(new Animated.Value(props.height)).current

    function move() {
        upAnim.setValue(props.height)
        Animated.timing(
            upAnim,
            {
                toValue: props.height - vh(5),
                duration: 700,
                useNativeDriver: true
            }
        ).start()
    }
    function down() {
        upAnim.setValue(0)
        Animated.timing(
            upAnim,
            {
                delay: 3000,
                toValue: props.height + vh(5),
                useNativeDriver: true
            }
        ).start()
    }
    if (!isConnected) move()
    if (isConnected) down()

    return (
        <Animated.View
            style={{
                ...props.style,
                width: vw(100),
                position: "absolute",
                bottom: 0,
                transform: [{ translateY: upAnim }],
            }}
        >
            {!isFirstTime ? <Text allowFontScaling={false} style={[isConnected ? styles.online : styles.offline, styles.internet]}> {isConnected ? "חזרה למצב מקוון" : "אין אינטרנט , בדוק את החיבור ונסה שנית"}</Text> :
                <View></View>}
        </Animated.View>
    );

}

const styles = StyleSheet.create({

    online: {
        backgroundColor: "green",

    },
    offline: {
        backgroundColor: "gray",
    },
    internet: {
        fontSize: vh(2),
        textAlign: "center",
        paddingVertical: vh(1),
        fontFamily: 'MPLUS1pBold',

    },
    offline: {
        backgroundColor: "gray",
    },
    internet: {
        fontSize: vh(2),
        textAlign: "center",
        paddingVertical: vh(1),
        fontFamily: 'MPLUS1pBold',

    }
})
export default OfflineAndOnline;