//react
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Linking, Platform } from 'react-native';


//expo
import * as GoogleSignIn from 'expo-google-sign-in';
import { Ionicons } from '@expo/vector-icons';
import { vw, vh } from 'react-native-expo-viewport-units';
import { Audio } from 'expo-av';

//images
import Logo from '../../assets/images/logo/Logo1.svg';
import LittleMonster from '../../assets/images/entrance/LittleMonster.svg';

//components
import SVGImage from '../components/generic-components/SVGImage';
import { BACKGROUND } from '../consts/constStyles';
import { usePreventGoBack } from '../hooks/usePreventGoBack';
import { useIsAuthenticated } from '@hilma/auth-native';
import { useUser } from '@hilma/auth-native';
import { useLetterImageStoreContext } from '../stores/index.store';

// import ResetAuthPage from './ResetAuthPage';

export default function EntrancePage(props) {
    const letterStore = useLetterImageStoreContext()
    const isAuthenticated = useIsAuthenticated()
    
    useEffect(() => {
        if (isAuthenticated && !letterStore.userDetails.id) {
            props.navigation.navigate('letters-page', { isAuthenticated: true });
            return;
        }
        GoogleSignIn.disconnectAsync();
    }, [])
    usePreventGoBack(props.navigation)

    return (
        <View >
            <Image source={require('../../assets/images/NewBackground.png')} style={BACKGROUND}></Image>
            <View style={styles.container}>
                <SVGImage source={Logo} style={styles.logo}></SVGImage>
                <Ionicons name={"ios-play"} size={90} style={styles.playSymbol} color={'white'} onPress={() => { props.navigation.navigate('sign-page') }} />
                <SVGImage source={LittleMonster} style={styles.littleMonster}></SVGImage>
            </View>
        </View>
    )
}


export const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "space-between",
        height: vh(78),
        width: vw(100),
        // backgroundColor: "red",
        // opacity: 0.5,
        top: vh(22)
    },
    logo: {
        width: vw(81),
        height: vh(14),
        alignSelf: "center",
    },
    littleMonster: {
        width: vw(45),
        height: vh(23),
        left: vw(4),
        alignSelf: "flex-start"
    },
    playSymbol: {
        alignSelf: 'center',
        color: '#FF8000',
        // backgroundColor: '#FF8000',
        // width: vh(16),
        // height: vh(16),
        borderRadius: 100,
        textAlign: 'center'
    },
    gif: {
        // bottom: 100,
        width: vw(40),
        height: vh(40)

    }
})