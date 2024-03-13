import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

import Logo from '../../../assets/images/logo/Logo1.svg';
import HomeButton from '../../../assets/images/gallery/NewHomeButton.svg';
import SvgImage from './SVGImage.jsx';
import { BACKGROUND } from '../../consts/constStyles'
import { useLetterImageStoreContext } from '../../stores/index.store';


export default function TopBarAndBackground(props) {
    // top for gallery page
    const letterStore = useLetterImageStoreContext()
    const goHome = (e) => {
        letterStore.setLetter(null);
        if (props.homeButton) {
            props.homeButton.current = false;
        }
        props.confetti && letterStore.stopTimer()
        if (props.sound) {
            props.sound.unloadAsync()
        }
        props.navigation.navigate("letters-page");
        //change back to simply / when finishing with signin and signup
    }

    return (
        <>
            <View style={styles.header}>
                <SvgImage source={Logo} style={styles.logo} />
                <TouchableWithoutFeedback onPress={goHome} style={styles.touchableOpHB}>
                    <View style={styles.homeButtonContainer} >
                        <SvgImage source={HomeButton} style={styles.homeButton} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <Image source={require('../../../assets/images/NewBackground.png')} style={BACKGROUND} />
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        width: vw(100),
        height: vh(10),
        flexDirection: 'row',
        justifyContent: "space-between",
        zIndex: 5,
    },
    logo: {
        width: vw(27),
        height: vh(11),
        marginLeft: vw(3),
    },
    touchableOpHB: {
        borderRadius: 100,
        height: vh(10)
    },
    homeButton: {
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 15,
    },
    homeButtonContainer: {
        marginRight: vw(3),
        marginTop: vw(3),
        width: vw(13),
        height: vw(13),
    },
})
