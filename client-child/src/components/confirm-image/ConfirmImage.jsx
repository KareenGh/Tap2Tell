//react 
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Share, AppState, Platform } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import { Audio } from 'expo-av';
import Axios from 'axios';

//hilma
import { useFiles } from '@hilma/fileshandler-native';

//images
import LittleMonster from '../../../assets/images/confirm-image/newLittleMonster.png';
import SendImage from '../../../assets/images/confirm-image/BlueEnvelopeIcon.svg';
import TryAgain from '../../../assets/images/confirm-image/TryAgain.svg';

//components
import SvgImage from '../generic-components/SVGImage.jsx';
import Styles from './ConfirmImage.style.js';
import { useLetterImageStoreContext } from '../../stores/index.store';
import { useGenAlert } from '../../contexts/generalAlertContext';
import ConfettiPage from '../generic-components/Confetti';
import { observer } from 'mobx-react-lite';

import { AnalyticsEvent } from '../../consts/consts';
import { playAudio } from '../../utils/playAudio';



function ConfirmImage(props) {
    // share method handles the popup of apps to share by, uses try and catch
    const { openGenAlert } = useGenAlert();
    let newImage;
    const letterStore = useLetterImageStoreContext()
    const filesUploader = useFiles();
    const [disabled, setdisabled] = useState(false);
    const unmounted = useRef(false);

    useEffect(() => {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            playThroughEarpieceAndroid: false
        });
        unmounted.current = false;
        AppState.addEventListener('change', handleAppStateChange);
        return () => {
            unmounted.current = true;
            AppState.removeEventListener('change', handleAppStateChange);
        }
    }, [])


    //When screen activity change, this function called. Necessary when child back to app after he send the image.
    const handleAppStateChange = nextAppState => {
        if (nextAppState === 'active' && letterStore.messageSent) {
            letterStore.messageSent = false
            props.navigation.navigate('message-sent')
        }
    };

    const handleShare = async () => {
        if (letterStore.idRegex(letterStore.userDetails.id)) {
            AnalyticsEvent(letterStore.selectedLetter.letter, 'pic_sent', 'letter');
            const sound = new Audio.Sound();
            playAudio(sound, require('../../../assets/letterAudio/sending-audio.mp3'));

            const id = await filesUploader.addFile(props.url);
            setdisabled(true)
            letterStore.messageSent = true
            // setTimeout(async () => {
            if (unmounted.current) { return }
            try {
                // files handler
                if (!letterStore.idRegex(letterStore.userDetails.id)) {
                    getErr('user id:', 'validation err');
                    return;
                }
                const res = await filesUploader.request({ // files handler
                    url: `/api/letter-image/post-image-url`,
                    method: "POST",
                    data: JSON.stringify({ imageId: id, letter: letterStore.selectedLetter.letter, userId: letterStore.userDetails.id })
                });
                newImage = res.data;
                const newItem = {
                    id: res.data.id,
                    imagePath: res.data.imagePath,
                    updated: res.data.updated,
                    letter: letterStore.selectedLetter.letter
                }
                if (letterStore.idRegex(newItem.id)) {
                    try {
                        const result = await Share.share({
                            message: `${letterStore.userDetails && letterStore.userDetails.name} מזמינ/ה אותך לראות את האות שיצר/ה, *${newItem.letter}* \n https://tap2tell.carmel6000.com/${newImage.id}`
                        })
                        if (result.action === Share.sharedAction && !unmounted.current) {
                            setdisabled(false)
                            if (Platform.OS === 'ios') {
                                letterStore.messageSent = false
                                props.navigation.navigate('message-sent')
                            }
                        }
                    }
                    catch (err) {
                        getErr('err with share', err)
                    }
                }

            } catch (err) {
                getErr('addImagePathToDB catch:', err)
            }
            // }, 2000) // audio before sharing/sending
        } else {
            console.log('validation err');
        }
    }

    const getErr = async (text, err) => {
        console.log(`${text}`, err);
        const sound = new Audio.Sound();
        playAudio(sound, require('../../../assets/letterAudio/oops-problem.mp3'));

        // props.navigation.navigate('camera')
        props.navigation.replace('camera')

        await openGenAlert({ text: 'אופס,סליחה יש שגיאה. נסו שנית מאוחר יותר', isPopup: false })
    }


    const tryAgain = async () => {
        setdisabled(true)
        const sound = new Audio.Sound();

        playAudio(sound, require('../../../assets/letterAudio/take-picture-again-audio.mp3'))
        props.navigation.navigate('camera')
        // props.navigation.replace('camera')

    }

    return (
        <View style={disabled || !props.url ? { ...Styles().container, opacity: 0.7 } : Styles().container}>
            {/* if confetti stay in background, cant press on buttons */}
            {letterStore.confettiTimer && props.url ? <View style={Styles().confettiContainer}><ConfettiPage /></View> : null}
            {disabled || !props.url ? <Image source={require('../../../assets/gif/animation.gif')} style={Styles().animation} /> : null}
            <Text allowFontScaling={false} style={Styles().text}>כל הכבוד!</Text>
            <View style={Styles().monsterContainer}>
                <View style={Styles().galleryImageContainer} >
                    <Image source={{ uri: props.url }} // gets the image uri from camera through photoData
                        style={Styles().exampleLetterImage} />
                </View>
                <Image source={LittleMonster} style={Styles().littleMonster} />
            </View>

            <View style={Styles().iconsContainer}>
                <TouchableOpacity disabled={!disabled && !letterStore.confettiTimer && props.url ? false : true} onPress={handleShare} >
                    <SvgImage source={SendImage} style={disabled || !props.url ? { ...Styles().sendImage, opacity: 0.7 } : Styles().sendImage} />
                </TouchableOpacity>
                <TouchableOpacity disabled={!disabled && !letterStore.confettiTimer && props.url ? false : true} onPress={tryAgain} >
                    <SvgImage source={TryAgain} style={disabled || !props.url ? { ...Styles().tryAgain, opacity: 0.7 } : Styles().tryAgain} />
                </TouchableOpacity >
            </View>

        </View>
    );
}

export default observer(ConfirmImage);