//react
import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { vw, vh } from 'react-native-expo-viewport-units';

//expo
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

//images
import Background from '../../assets/images/NewBackground.png';
import Portrait from '../../assets/images/Portrait.png'
import Arrow from '../../assets/images/message-sent/Arrow.svg';
import HappyMonster from '../../assets/images/monster/אנימציה-ידיים.gif';
import TryAgain from '../../assets/images/confirm-image/TryAgain.svg';
import MonsterWithoutMouth from '../../assets/images/monster/אנימציה-גירוד-ראש.gif';

//components
import SvgImage from '../components/generic-components/SVGImage';
import { styles } from '../components/msg-from-relative/Response.style';
import { BACKGROUND } from '../consts/constStyles';
import ConfettiPage from '../components/generic-components/Confetti';
import ProgressBar from '../components/generic-components/ProgressBar'

import { useLetterImageStoreContext } from '../stores/index.store';
import { useGenAlert } from '../contexts/generalAlertContext';
import { usePreventGoBack } from '../hooks/usePreventGoBack';

import variables from '../../variables'
import { playAudio } from '../utils/playAudio';
import { fadeIn } from '../consts/animations';
import { LoadingPage } from '../components/generic-components/LoadingPage';
import { Fade, Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder';

const entranceSound = new Audio.Sound();


export default function ResponsePage(props) {
    const letterStore = useLetterImageStoreContext();
    let { openGenAlert } = useGenAlert();
    let soundStarted = useRef(false).current
    const [confetti, setConfetti] = useState(true)
    const [progressBar, setProgressBar] = useState(0)
    const [buttonPressed, setButtonPressed] = useState(false);
    const [sound, setSound] = useState();
    const [currentTime, setCurrentTime] = useState(0);
    const [relativeImgLoaded, setRelativeImgLoaded] = useState(false);
    const imageOpacity = useRef(new Animated.Value(0.5)).current;
    const [duration, setDuration] = useState(0)
    const [imageEnlarged, setImageEnlarged] = useState(false);
    const [loadDuration, setLoadDuration] = useState(0)
    const intervalTimer = useRef();
    const [status, setStatus] = useState('');
    const [notLoaded, setNotLoaded] = useState()
    const [skip, setSkip] = useState(false);
    let startMoveToPage = useRef(false);
    // let didFinished = useRef(false);

    usePreventGoBack(props.navigation)

    useEffect(() => {
        getStatus()
        if (!relativeImgLoaded) {
            animation()
        }
        let confettiTimer = setTimeout(() => {
            setConfetti(false)
        }, 2500)
        return () => {
            sound && sound.unloadAsync();
            clearTimeout(confettiTimer);
            clearInterval(intervalTimer.current);
        }
    }, [])

    useEffect(() => {
        if (sound) {
            sound.setOnPlaybackStatusUpdate((event) => {
                if (event.didJustFinish) {
                    setCurrentTime(0);
                    setTimeout(() => {
                        setProgressBar(0);
                        clearInterval(intervalTimer.current);
                        setButtonPressed(false);
                    }, 300);
                }
            })
        }
    }, [sound]);

    useEffect(() => {
        if (loadDuration !== 0) {
            setDuration(loadDuration)
            interval()
        }
    }, [duration])
    const getStatus = async () => {
        if (letterStore.newResponseDetailsLength > 0) {
            setStatus(letterStore.newResponseDetails[0].imageStatus);
            if (letterStore.newResponseDetails[0].imageStatus === 'DISAPPROVED') {
                // await sound.loadAsync(require('../../assets/letterAudio/try-again-audio.mp3'));
                // const playRes = await sound.playAsync();
                // setTimeout(() => {

                //     sound.unloadAsync();
                // }, playRes.playableDurationMillis ? playRes.playableDurationMillis + 1000 : playRes.durationMillis + 1000);

                playAudio(entranceSound, require('../../assets/letterAudio/try-again-audio.mp3'))
            } else {
                playAudio(entranceSound, require('../../assets/letterAudio/well-done2.mp3'))
            }
        }
    }
    const interval = () => {
        if (duration === 0 && loadDuration !== 0) {
            setDuration(loadDuration)
        }
        if (duration !== 0) {
            intervalTimer.current = setInterval(() => {
                setProgressBar(prev => prev + (100 / duration))

            }, 100);
        }
    }
    const animation = () => {
        if (!relativeImgLoaded) {
            imageOpacity.setValue(1);
        } else {
            imageOpacity.setValue(0.85),
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(imageOpacity, {
                            toValue: 1,
                            duration: 1200,
                            useNativeDriver: false
                        })
                    ])
                ).start()
        }
    }
    const playSound = async () => {
        if (!soundStarted && !buttonPressed && letterStore.newResponseDetailsLength > 0) {
            soundStarted = true;
            const sound = new Audio.Sound();
            try {
                await sound.loadAsync({ uri: `${variables.apiUrl}${letterStore.newResponseDetails[0].responseAudioPath}` });
            }
            catch (err) {// if there is a problem with the audio, let the user skip this step.
                await openGenAlert({ text: 'אופס,סליחה יש שגיאה. לא ניתן לשמוע את ההקלטה', isPopup: false })
                setSkip(true)
                return;
            }
            const playRes = await sound.playFromPositionAsync(currentTime);
            if (playRes.durationMillis) {
                setLoadDuration(playRes.durationMillis);
                setDuration(playRes.durationMillis);
            } else if (playRes.playableDurationMillis) {
                setLoadDuration(playRes.playableDurationMillis);
                setDuration(playRes.playableDurationMillis);
            }
            setSound(sound);
            interval();
            setButtonPressed(true);
            if (playRes.didJustFinish) {
                setCurrentTime(0);
            }
        } else {
            const pauseRes = await sound.pauseAsync();
            setCurrentTime(0);
            setTimeout(() => {
                clearInterval(intervalTimer.current);
                setButtonPressed(false);
            }, 300);
            if (pauseRes.didJustFinish) {
                setCurrentTime(0);
                clearInterval(intervalTimer.current);
            } else {
                setCurrentTime(pauseRes.positionMillis);
                clearInterval(intervalTimer.current);
            }
            setButtonPressed(false);
        }
    }

    const enlargeImage = () => {
        if (imageEnlarged) {
            setImageEnlarged(false);
        }
        else if (!imageEnlarged) {
            setImageEnlarged(true);
        } else {
            console.log('swing and a miss')
        }
    }

    const moveToPage = async () => {
        startMoveToPage.current = true;
        if (buttonPressed === true) {
            playSound()
        }
        if (status === 'APPROVED') {
            props.navigation.navigate('image-starts-with-letter')
        } else {
            try {
                if (letterStore.newResponseDetailsLength > 0) {
                    await letterStore.removeImage(letterStore.newResponseDetails[0].id)
                    const letter = letterStore.newResponseDetails[0].letter;
                    letterStore.setLetter(letter)
                    letterStore.shiftnewResponseDetails();
                    props.navigation.navigate('letter-picture')
                }
            } catch (err) {
                const sound = new Audio.Sound();
                await sound.loadAsync(require('../../assets/letterAudio/oops-problem.mp3'));
                const playRes = await sound.playAsync();
                setTimeout(() => {
                    sound && sound.unloadAsync();
                }, playRes.playableDurationMillis ? playRes.playableDurationMillis + 1000 : playRes.durationMillis + 1000);

                console.log('AddNewArchive catched: ', err);
                await openGenAlert({ text: 'אופס,סליחה יש שגיאה. נסו שנית מאוחר יותר', isPopup: false })
            }
        }
    }
    if (!letterStore.newResponseDetailsLength || !status) {
        return (
            <LoadingPage />
        )
    }
    return (
        <View style={styles.container}>
            {confetti && status === 'APPROVED' ?
                <View style={{ width: vw(100), height: vh(100), position: 'absolute', zIndex: 10, top: 0 }}>
                    <ConfettiPage />
                </View>
                :
                null}
            <Image source={Background} style={BACKGROUND}></Image>
            <>
                <TouchableOpacity style={imageEnlarged ? styles.enlargedImageContainer : { ...styles.portraitToop }} onPress={enlargeImage}>

                    <Animatable.Image onLoadEnd={e => {
                        setNotLoaded(false)
                        Animated.timing(
                            imageOpacity
                        ).stop();
                        imageOpacity.setValue(1)
                    }}
                        source={{ uri: `${variables.apiUrl}${letterStore.relativeDetails.relativeImagePath}` }} style={imageEnlarged ? styles.enlargedImage : { opacity: imageOpacity, ...styles.relativePortrait, }}></Animatable.Image>
                </TouchableOpacity>

            </>
            {status === 'APPROVED' ? <Animatable.Text animation={fadeIn} duration={2000} delay={1000} style={styles.text}>כל הכבוד!</Animatable.Text> :
                <Text allowFontScaling={false} style={styles.text2}>נסו שוב...</Text>}
            <Animatable.View animation={fadeIn} duration={1500} delay={400} style={styles.anim}>
                <View style={styles.recording}>
                    <Ionicons name={buttonPressed ? "ios-pause" : "ios-play"} size={vw(10)} style={styles.symbol} onPress={() => {
                        if (!confetti || status !== 'APPROVED') {
                            playSound()
                        }
                    }} />
                    <ProgressBar bgcolor={'#F7FDDC'} completed={progressBar} />
                </View>
                <TouchableOpacity disabled={skip ? false : (sound && !startMoveToPage.current ? false : true)} onPress={moveToPage} style={sound || skip ? styles.toop : { opacity: 0.7, ...styles.toop }}>
                    <SvgImage source={status ? Arrow : TryAgain} style={styles.buttons}></SvgImage>
                </TouchableOpacity>
            </Animatable.View>
            <View style={status ? styles.happyMonsterContainer : styles.sadMonsterContainer}>
                <Image source={status === 'APPROVED' ? require('../../assets/images/monster/אנימצציה-ידיים-קטן.gif') : MonsterWithoutMouth} style={styles.monster}></Image>
            </View>
        </View>
    );
}