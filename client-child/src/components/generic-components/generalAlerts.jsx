import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import { vw, vh } from 'react-native-expo-viewport-units';

export const GeneralAlert = ({ text, isPopup, setShowAlert }) => {
    if (typeof text === "string" && isPopup) return <GeneralPopup text={text} setShowAlert={setShowAlert} />

    let opacityAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    useEffect(() => {
        Animated.timing(
            opacityAnim,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }
        ).start(() => {
            Animated.timing(
                opacityAnim,
                {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                    delay: 2000
                }
            ).start(() => setShowAlert(false));
        });

    }, [opacityAnim])

    return (
        <Animated.View style={{ ...styles.generalAlertContainer, showCancel: false, opacity: opacityAnim }}>
            <Text allowFontScaling={false} style={styles.text}>{text}</Text>
        </Animated.View>
    )
}

export const GeneralPopup = ({ text, setShowAlert }) => {

    return (
        <View style={styles.popupAlertFullWindow} >
            <View style={styles.popupAlertContainer}>
                <Text allowFontScaling={false} style={styles.popupText}>{text}</Text>
                <View style={styles.popupButtonsContainer}>
                    <TouchableOpacity onPress={() => setShowAlert(null)} style={styles.button} ><Text allowFontScaling={false} style={styles.ButtonText}>סגור</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    generalAlertContainer: {
        alignItems: 'center',
        backgroundColor: '#F7FDDC',
        flexDirection: 'row',
        // margin: 'auto',
        marginBottom: vh(1),
        marginRight: vw(2),
        // borderWidth: vw(0.2),
        // borderStyle: 'solid',
        borderRadius: 3,
        padding: 10,
        position: 'absolute',
        bottom: 0,
        // left: 0,
        right: 0,
        width: vw(45),
        height: vh(10),
        lineHeight: vh(2), //must be the same as the height
    },
    text: {
        width: vw(45),
        height: vh(10),
        left: -10,
        color: '#FF8000',
        fontFamily: 'MPLUS1pMedium',
        textAlign: 'center',

    },
    popupAlertFullWindow: {
        //full window for background opacity
        position: 'absolute',
        height: vh(100),
        width: vw(100),
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 3,
        backgroundColor: '#747477bf',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popupAlertContainer: {
        //white background (the popup container)
        backgroundColor: '#F7FDDC',
        width: vw(90),
        maxWidth: 600,
        position: 'absolute',
        minHeight: vh(30),
        maxHeight: vh(80),

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',

        // padding: vh(2.5) vw(10),
        borderRadius: 10,
    },
    popupText: {
        color: '#FF8000',
        fontSize: vw(7),
        textAlign: 'center',
        fontFamily: 'MPLUS1pMedium',

    },
    popupButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    button: {
        borderRadius: 10,
        // width: 'fit-content',
        maxWidth: 210,
        // padding: 10px 10px,
        height: '100%',
        margin: 0,
        // paddingLeft: vw(2),
        // paddingRight: vw(2),
        padding: vw(1.5),

        backgroundColor: '#FF8000',
        // border: '1px solid #cecece',
    },
    ButtonText: {
        fontSize: vw(6),
        color: 'white',
        fontFamily: 'MPLUS1pRegular'

    }



})