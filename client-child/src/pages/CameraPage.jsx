//react
import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useSafeState } from '../hooks/useSafeState';
import { View, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

//expo
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as ImageManipulator from 'expo-image-manipulator';

//components
import Styles from '../components/camera/Camera.style';
import { useGenAlert } from '../contexts/generalAlertContext';
import { useLetterImageStoreContext } from '../stores/index.store';

import { playAudio } from '../utils/playAudio';

function CameraPage(props) {
    const [hasCameraPermission, setHasCameraPermission] = useSafeState(null);
    const cameraRef = useRef(null);
    const letterStore = useLetterImageStoreContext()
    const { openGenAlert } = useGenAlert();
    const [imageOrientation, setImageOrientation] = useSafeState(1)
    const [opacity, setOpacity] = useSafeState(1)
    useEffect(() => {
        props.navigation.addListener('beforeRemove', async (e) => {
            if (Platform.OS === 'android') await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
        })
    }, [])
    // Screen Ratio and image padding
    const [imagePadding, setImagePadding] = useSafeState(0);
    const [ratio, setRatio] = useSafeState('4:3');  // default is 4:3

    const { height: screenHeight, width: screenWidth } = useMemo(() => Dimensions.get('window'), [])
    const screenRatio = useMemo(() => screenHeight / screenWidth, [])
    const [isRatioSet, setIsRatioSet] = useSafeState(false);
    const [cameraReady, setCameraReady] = useState(false)
    // let cameraReady = useRef(false);
    const currentlyCapturing = useRef(false);


    useEffect(() => {
        cameraPermission()
    }, [hasCameraPermission])

    async function cameraPermission() {
        if (hasCameraPermission === false) {
            openGenAlert({ text: 'הגישה למצלמה נדחתה,אנא אשרו גישה', isPopup: true })
            const countImagePath = letterStore.countImagePathMap();
            if (Number(countImagePath) !== 0) {
                props.navigation.navigate('letter-gallery')
            } else {
                props.navigation.navigate('letter-picture')
            }
        }
    }

    async function askPermissions() {
        // await ScreenOrientation.lockPlatformAsync({ screenOrientationArrayIOS: [1, 3, 4] })


        if (Platform.OS === 'android') await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)
        //transfers to asking permission and then camera once allowed
        try {
            const camera = await Permissions.askAsync(Permissions.CAMERA);
            const hasCameraPermission = (camera.status === 'granted');
            setHasCameraPermission(hasCameraPermission);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        props.navigation.addListener('focus', async (e) => {
            // setCameraReady(false)
            // setOpacity(1);
            // setImageOrientation(1)
            // askPermissions();
            props.navigation.replace('camera')
            if (Platform.OS === 'android') await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)
        })
    })

    const changed = (e) => {
        setImageOrientation(e.orientationInfo.orientation);

    }
    ScreenOrientation.addOrientationChangeListener((e) => changed(e));

    useEffect(() => {
        askPermissions();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            return async () => {
                setCameraReady(false)
            };
        }, []));



    const handleShortCapture = async () => {
        // (*) when user exits the camera page DURING this function, there's no event listener for us to know that he left, nor that he came back. 
        // so if the user didn't get to ```captureState.current = false```, the user won't be able to take a picture, till he leaves the page and returns
        if (!cameraRef.current || currentlyCapturing.current) {
            return
        }
        currentlyCapturing.current = true
        const sound = new Audio.Sound();
        playAudio(sound, require('../../assets/letterAudio/cameraSound.mp3'));
        // todo check what happens to sound, if goes back in the middle

        const orientationIndex = await ScreenOrientation.getOrientationAsync();
        const photoData = await new Promise(async resolve => {
            await cameraRef.current.takePictureAsync({ quality: 0, onPictureSaved: resolve, skipProcessing: false, exif: false });
            await cameraRef.current.pausePreview();
        })
        if (Platform.OS === 'android') {
            await ScreenOrientation.lockAsync(orientationIndex + 1)
        }
        cameraRef.current.resumePreview();
        //image is available here
        letterStore.setUrlFromCamera({ photoData: photoData, imageOrientation: imageOrientation }); //?
        const rightImg = await changeImageOrientation(photoData)
        letterStore.setUrlFromCamera(rightImg.uri) //? line 109.. ?
        try {
            setOpacity(0)
            if (Platform.OS === 'android') await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            props.navigation.navigate('confirm-image')
        }
        catch (error) {
            console.log(error);
            playAudio(sound, require('../../assets/letterAudio/oops-problem.mp3'))

            await openGenAlert({ text: 'אופס, סליחה יש שגיאה. נסו שנית מאוחר יותר', isPopup: false })

        }
        // finally { // ?
        currentlyCapturing.current = false
        // }
    };

    const changeImageOrientation = async (pickedImage) => {
        const operations = [];
        // for Android only - check exif info and do pre-rotate
        // this fixes for Galaxy S and maybe others
        if (Platform.OS === 'android') {
            let rotateOperation;
            let orientation = imageOrientation;
            // landscape - upside down
            rotateOperation = { rotate: 0 };
            if (rotateOperation) {
                operations.push(rotateOperation);
            }
        }

        // add resize op as last op
        let resizeObj = {};
        if (pickedImage.height > pickedImage.width) {
            resizeObj = { height: 640 };
        } else {
            resizeObj = { width: 640 };
        }
        operations.push({ resize: resizeObj });
        let manipResult = await ImageManipulator.manipulateAsync(
            pickedImage.uri,
            operations,
            [{
                rotate: 0
            }, {
                resize: {
                    width: props.width, // also resizing here, which is just an additional thing I'm doing
                    height: props.height
                }
            }], {
            compress: 1
        });

        return {
            uri: manipResult.uri,
            name: 'photo.jpg',
            type: 'image/jpeg',
            width: manipResult.width,
            height: manipResult.height,
        };
    }

    const handleCameraReady = async () => {
        // cameraReady.current = true;
        setCameraReady(true)
        // setCameraReady(true);
        if (!isRatioSet) {
            await prepareRatio();
        }
    }

    // set the camera ratio and padding.
    // this code assumes a portrait mode screen
    const prepareRatio = async () => { // todo move out
        let desiredRatio = '4:3';  // Start with the system default
        if (Platform.OS !== 'android')
            // This issue only affects Android
            return

        const Ratios = await cameraRef.current.getSupportedRatiosAsync();
        // Calculate the width/height of each of the supported camera ratios
        // These width/height are measured in landscape mode
        // find the ratio that is closest to the screen ratio without going over
        let distances = {};
        let realRatios = {};
        let minDistance = null;
        for (const ratio of Ratios) {
            const parts = ratio.split(':');
            const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
            realRatios[ratio] = realRatio;
            // ratio can't be taller than screen, so we don't want an abs()
            const distance = screenRatio - realRatio;
            distances[ratio] = realRatio;
            if (minDistance == null) {
                minDistance = ratio;
            } else {
                if (distance >= 0 && distance < distances[minDistance]) {
                    minDistance = ratio;
                }
            }
        }
        // set the best match
        desiredRatio = minDistance;
        // calculate the difference between the camera width and the screen height
        const remainder = Math.floor((screenHeight - realRatios[desiredRatio] * screenWidth) / 2);
        // set the preview padding and preview ratio
        setImagePadding(remainder / 2);
        setRatio(desiredRatio);
        // Set a flag so we don't do this
        // calculation each time the screen refreshes
        setIsRatioSet(true);
    };


    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: "black" }} >
            { opacity === 1
                && <Camera
                    ref={cameraRef}
                    type={Camera.Constants.Type.back}
                    style={[Styles(imageOrientation).preview, { marginTop: imagePadding, marginBottom: imagePadding }]}
                    ratio={ratio}
                    onCameraReady={handleCameraReady}
                />}

            {cameraReady ?

                <TouchableWithoutFeedback onPress={handleShortCapture}>
                    <View style={props.pressed ? { ...Styles(imageOrientation).captureBtn, opacity: 0.7 } : Styles(imageOrientation).captureBtn} />
                </TouchableWithoutFeedback> : null}


        </View>
    );
};


export default (CameraPage)