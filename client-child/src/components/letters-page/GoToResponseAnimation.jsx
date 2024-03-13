import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { vw, vh } from 'react-native-expo-viewport-units';
import { useLetterImageStoreContext } from '../../stores/index.store';
import SVGImage from '../generic-components/SVGImage';
import Envelope from '../../../assets/images/confirm-image/BlueEnvelopeIcon.svg'
import { useGenAlert } from '../../contexts/generalAlertContext';
import { observer } from 'mobx-react-lite';
import { StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';


function GoToResponseAnimation(props) {
    const letterStore = useLetterImageStoreContext();
    const { openGenAlert } = useGenAlert();

    const zoomIn = {
        0: {
            transform: [{ translateY: vh(-30) }, { translateX: vw(0) }],
            scale: 0.4
        },
        0.6: {
            transform: [{ translateY: vh(30) }, { translateX: vw(0) }],
            scale: 1
        },
        0.65: {
            transform: [{ translateY: vh(30) }, { translateX: vw(0) }],
            scale: 1
        },
        1: {
            transform: [{ translateY: vh(30) }, { translateX: vw(-80) }],
            // scale: 1
        }
    };

    const moveToMsgFromRel = async () => {
        if (letterStore.newResponseDetailsLength > 0) {
            try {
                props.navigation.navigate('msg-from-relative')
            } catch (err) {
                // const { sound } = await Audio.Sound.createAsync(
                //     require('../../../assets/letterAudio/oops-problem.mp3')
                // );

                const sound = new Audio.Sound();
                await sound.loadAsync(require('../../../assets/letterAudio/oops-problem.mp3'));
                const playRes = await sound.playAsync();
                setTimeout(() => {
                    sound && sound.unloadAsync();
                }, playRes.playableDurationMillis ? playRes.playableDurationMillis + 1000 : playRes.durationMillis + 1000);

                await openGenAlert({ text: 'אופס,סליחה יש שגיאה. נסו שנית מאוחר יותר', isPopup: false })
            }
        }
    }
    return (
        <View style={styles.darkBackground}>

            <Animatable.View
                style={{ width: vw(35), height: vh(35), position: 'absolute', top: vh(0), left: vw(34) }}
                animation={zoomIn}
                duration={1500}
                onAnimationEnd={moveToMsgFromRel}
            >
                <SVGImage source={Envelope} />
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    darkBackground: {
        backgroundColor: "#000000a3",
        width: vw(100),
        height: vh(100),
        position: "absolute",
        top: 0,
        right: 0
    },

});

export default observer(GoToResponseAnimation)