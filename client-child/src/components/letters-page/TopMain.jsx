//react
import React, { useRef, useEffect } from 'react';
import { Text, TouchableOpacity, View, Animated, Easing, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { vw, vh } from 'react-native-expo-viewport-units';

//images
import iconman from '../../../assets/images/iconMan/Iconman.svg';
import logo from '../../../assets/images/logo/Logo.svg';
import envelope from '../../../assets/images/confirm-image/BlueEnvelopeIcon.svg'
import ExclamationMark from '../../../assets/images/ExclamationMark.svg';

//components
import SVGImage from '../generic-components/SVGImage.jsx';
import { styles } from './TopMain.style';
import { useLetterImageStoreContext } from '../../stores/index.store';
import { useGenAlert } from '../../contexts/generalAlertContext'
//hilma
import { AsyncTools } from '@hilma/tools';

//mobx
import { observer } from 'mobx-react-lite';


function TopMain(props) {
    const letterStore = useLetterImageStoreContext();

    const moveToMsgFromRel = async () => {
        props.setLogOut(false);
        //Change to true make the animation component appear
        letterStore.setGoToResponseAnimation(true)
    }

    const containerPressed = () => {
        if (props.logOut === false) {
            props.setContainerOpened(true);
        } else {
            setTimeout(() => {
                props.setContainerOpened(false);
            }, 200);
        }
        props.setLogOut((prev) => !prev);

    }
    return (
        <View style={styles.content}>
            <SVGImage style={styles.logo} source={logo} />
            <View style={styles.iconsContainer}>
                {letterStore.newResponseDetailsLength > 0 && letterStore.stopAnimation ? <Animatable.View
                    style={{ position: 'absolute', left: vw(7.5), top: vh(-0.8), width: vw(15), height: vw(15), backgroundColor: "rgba(44, 121, 149,0.2)", borderRadius: 100 }}
                    animation={'flash'}
                    iterationCount={'infinite'}
                    duration={2000}
                    delay={200}></Animatable.View> : null}
                {letterStore.newResponseDetailsLength > 0 ? <TouchableOpacity style={styles.toop} onPress={moveToMsgFromRel}><SVGImage style={{ display: letterStore.newResponseDetailsLength > 0 && letterStore.stopAnimation && !letterStore.goToResponseAnimation ? 'flex' : 'none' }} source={envelope} /></TouchableOpacity> : null}
            </View>
            <Text allowFontScaling={false} style={styles.text}>{letterStore.userDetails && letterStore.userDetails.name}</Text>
            <TouchableOpacity onPress={containerPressed} style={styles.man}><SVGImage source={iconman} /></TouchableOpacity>
        </View >
    );
}


export default observer(TopMain)