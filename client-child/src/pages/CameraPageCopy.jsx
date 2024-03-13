//react
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

//expo
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';

//components
import { useGenAlert } from '../contexts/generalAlertContext';
import { useLetterImageStoreContext } from '../stores/index.store';

import { playAudio } from '../utils/playAudio';

function CameraPageCopy(props) {
    const letterStore = useLetterImageStoreContext()
    const { openGenAlert } = useGenAlert();
    const [image, setImage] = useState(null);
    const currentlyCapturing = useRef(false);



    const pickImage = async () => {
        console.log('pickImage to true');
        letterStore.setAtCameraPage(true);
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
        console.log('result: ', result);
        if (!result.cancelled) {
            setImage(result.uri);
            handleShortCapture(result.uri);
            return;
        }
        const countImagePath = letterStore.countImagePathMap();
        if (Number(countImagePath) !== 0) {
            props.navigation.navigate('letter-gallery')
        } else {
            props.navigation.navigate('letter-picture')
        }
    };

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
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    openGenAlert({ text: 'הגישה למצלמה נדחתה,אנא אשרו גישה', isPopup: true })
                    const countImagePath = letterStore.countImagePathMap();
                    if (Number(countImagePath) !== 0) {
                        props.navigation.navigate('letter-gallery')
                    } else {
                        props.navigation.navigate('letter-picture')
                    }
                }
            }
            pickImage();
        })();
    }, []);

    useEffect(() => {
        props.navigation.addListener('focus', async (e) => {
            props.navigation.replace('camera')
        })
    })

    useEffect(() => {
        image && props.navigation.navigate('confirm-image')

    }, [image])

    const handleShortCapture = async (uri) => {
        console.log('in fun');
        // (*) when user exits the camera page DURING this function, there's no event listener for us to know that he left, nor that he came back. 
        // so if the user didn't get to ```captureState.current = false```, the user won't be able to take a picture, till he leaves the page and returns
        if (currentlyCapturing.current) {
            return
        }
        currentlyCapturing.current = true
        const sound = new Audio.Sound();
        playAudio(sound, require('../../assets/letterAudio/cameraSound.mp3'));
        letterStore.setUrlFromCamera(uri);
        currentlyCapturing.current = false
    };

    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: "black" }} ></View>
    );
};

export default (CameraPageCopy)