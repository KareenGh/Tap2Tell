//react
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { vw, vh } from 'react-native-expo-viewport-units';

//expo
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

//image
import Monster from '../../../assets/images/monster/Monster.svg';
import Envelope from '../../../assets/images/confirm-image/BlueEnvelopeIcon.svg'

//components
import SvgImage from '../generic-components/SVGImage.jsx';
import { styles } from './MsgFromRelative.style.js';
import { useLetterImageStoreContext } from '../../stores/index.store';
import { observer } from 'mobx-react-lite';
import { playAudio } from '../../utils/playAudio';
import variables from '../../../variables';

function MsgFromRelative(props) {
    const sound = useRef(new Audio.Sound());
    const letterStore = useLetterImageStoreContext();
    const AnimatableView = Animatable.createAnimatableComponent(View);


    useEffect(() => {
        fetchRelativeDetails()
    }, []);
    const fetchRelativeDetails = async () => {
        playAudio(sound.current, require('../../../assets/letterAudio/message-received-audio.mp3'))// איזה כיף קיבלתם הודעה
        try {
            await letterStore.relativeDetailsFun();

        } catch (err) {
            sound.current.unloadAsync()

            const playRes = await sound.current.playAsync();
            setTimeout(() => {
                sound.current && sound.current.unloadAsync();
                sound.current = null
            }, playRes.playableDurationMillis ? playRes.playableDurationMillis + 1000 : playRes.durationMillis + 1000);

        }

    }

    const goToResponsePage = () => {
        sound.current && sound.current.unloadAsync()
        props.navigation.navigate('response')
    }
    const moveLeft = {
        0: {
            transform: [{ translateY: vh(30) }, { translateX: vw(100) }],
            opacity: 1
        },
        0.7: {
            transform: [{ translateY: vh(30) }, { translateX: vw(0) }],
            opacity: 1
        },
        0.8: {
            transform: [{ translateY: vh(30) }, { translateX: vw(0) }],
            opacity: 1
        },
        1: {
            opacity: 0
        }
    };

    if (letterStore.goToResponseAnimation) {
        return (
            <Animatable.View
                style={{ width: vw(35), height: vh(35), position: 'absolute', top: vh(0), left: vw(34) }}
                animation={moveLeft}
                duration={1200}
                onAnimationEnd={() => letterStore.setGoToResponseAnimation(false)}>
                <SvgImage source={Envelope} />
            </Animatable.View>
        )
    } else {
        return (

            <View style={styles.container}>
                <AnimatableView
                    animation={'flipInY'}
                    duration={400}
                    style={{
                        height: vh(45),
                        zIndex: 10
                    }}
                >
                    <View>
                        <View style={styles.textAndArrowContainer}>
                            <Text allowFontScaling={false} style={styles.text1}>איזה כיף!</Text>
                            <Text allowFontScaling={false} style={styles.text2}>קיבלתם הודעה מ{letterStore.relativeName}</Text>
                            <TouchableOpacity style={styles.arrowContainer} onPress={goToResponsePage}>
                                <View>
                                    <AntDesign name="arrowleft" size={45} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </AnimatableView>
                <SvgImage source={Monster} style={styles.monster}></SvgImage>
            </View>

        );

    }
}

export default observer(MsgFromRelative)