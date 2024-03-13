//react
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { vw, vh } from 'react-native-expo-viewport-units';
import ProgressLoader from 'rn-progress-loader';
import { Audio } from 'expo-av';
import Axios from 'axios';

//images
import Monster from '../../assets/images/monster/Monster.svg';
import Arrow from '../../assets/images/message-sent/Arrow.svg';
import Background from '../../assets/images/LotsOfGreenBackground.png';
import { PathsArray } from '../consts/WordsImages';

//components
import SvgImage from '../components/generic-components/SVGImage.jsx';
import { styles } from '../components/msg-from-relative/ImageStartsWithLetter.style';
import { BACKGROUND } from '../consts/constStyles';
import { useLetterImageStoreContext } from '../stores/index.store';
import variables from '../../variables'
import { usePreventGoBack } from '../hooks/usePreventGoBack';
import { playAudio } from '../utils/playAudio';

export default function ImageStartsWithLetterPage(props) {

    const letterStore = useLetterImageStoreContext();
    const [illustrationName, setIllustrationName] = useState('');
    const [text, setText] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [audio, setAudio] = useState()
    const [soundPlayer, setSound] = useState()
    if (letterStore.newResponseDetailsLength > 0) {
        var letter = letterStore.newResponseDetails[0].letter;
    }
    const letterArr = Object.keys(PathsArray)
    const valuesArr = Object.values(PathsArray)

    let score = 0;
    usePreventGoBack(props.navigation)

    useEffect(() => {
        if (letterStore.letterScoreArr) {
            for (let i = 0; i < letterStore.letterScoreArr.length; i++) {
                if (letter === Object.values(letterStore.letterScoreArr[i])[0]) {
                    score = Object.values(letterStore.letterScoreArr[i])[1];
                    break;
                }
            }
            for (let i = 0; i < letterArr.length; i++) {
                if (letterArr[i] === letter) {
                    const index = Number(score) % 3
                    setIllustrationName(valuesArr[i][(index)].address)
                    setText(valuesArr[i][(index)].word)
                    setAudio(valuesArr[i][(index)].audio)
                }
            }
        }
    }, [])


    useEffect(() => {
        if (audio) {
            playLetterAudio()
        }
    }, [audio])

    const playLetterAudio = async () => {
        // const { sound } = await Audio.Sound.createAsync(
        //     audio
        // );
        const sound = new Audio.Sound();
        playAudio(sound, audio);

        // await sound.loadAsync(audio);
        // const playRes = await sound.playAsync();
        // setTimeout(() => {
        //     sound.unloadAsync();
        //     setSound()
        // }, playRes.playableDurationMillis ? playRes.playableDurationMillis + 1000 : playRes.durationMillis + 1000);

        setSound(sound)


    }

    const zoomOut = {
        0: {
            transform: [{ translateY: vh(0) }, { translateX: vw(0) }],
            scale: 1
        },
        1: {
            transform: [{ translateY: vh(17) }, { translateX: vw(-70) }],
            scale: 0.5
        }
    };
    const zoomOut2 = {
        0: {
            transform: [{ translateY: vh(23) }, { translateX: vw(0) }],
            scale: 1
        },
        1: {
            transform: [{ translateY: vh(-8) }, { translateX: vw(50) }],
            scale: 0.4
        }
    };
    const fadeIn = {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
    };
    const goHome = async () => {
        soundPlayer && soundPlayer.unloadAsync()
        if (letterStore.letterScoreArr && letterStore.newResponseDetailsLength > 0) {
            if (letterStore.letterScoreArr && letterStore.letterScoreArr.length > 0) {
                for (let i = 0; i < letterStore.letterScoreArr.length; i++) {
                    if (JSON.stringify(letterStore.newResponseDetails[0].letter) === JSON.stringify(letterStore.letterScoreArr[i].letter)) {
                        if (letterStore.letterScoreArr[i].score >= 4) {
                            //for five stars animation
                            letterStore.setNewFiveStars(letterStore.letterScoreArr[i].letter);
                            const res = await Axios.post(`/api/fact/add-fact`, { factType: 'success', grainId: letterStore.newResponseDetails[0].id })
                        }

                        letterStore.addScoreToLetterArr(i)
                        break;
                    } else if (i === letterStore.letterScoreArr.length - 1) {
                        //case it is new letter - score equal to 1
                        letterStore.pushNewLetter(letterStore.newResponseDetails[0].letter)
                        break;
                    }
                }
            } else {
                //case the arr empty
                letterStore.pushNewLetter(letterStore.newResponseDetails[0].letter)
            }
        }
        await letterStore.changeIsNewResponse(letterStore.newResponseDetails[0].id)
        letterStore.shiftnewResponseDetails();
        letterStore.setLetter(null);
        props.navigation.navigate('letters-page');
    }
    const returnImage = () => {
        if (letterStore.newResponseDetailsLength > 0) {
            return (
                <Image source={{ uri: `${variables.apiUrl}${letterStore.newResponseDetails[0].imagePath}` }}
                    style={styles.letter}
                    onLoadEnd={e => {
                        setIsVisible(false)
                    }} />
            )
        }
    }

    const returnAnimation = () => {
        if (letterStore.newResponseDetailsLength > 0) {
            if (illustrationName !== '') {
                return (
                    <>
                        <Animatable.Image
                            // source={RealPhoto}
                            source={{ uri: `${variables.apiUrl}${letterStore.newResponseDetails[0].imagePath}` }}
                            style={styles.letter}
                            animation={zoomOut2}
                            duration={1500}
                            delay={1000}>
                        </Animatable.Image>
                        <Animatable.Text style={styles.text} animation={fadeIn} duration={1500} delay={2500}>
                            {text}
                        </Animatable.Text>
                        <Animatable.View
                            style={styles.illustration}
                            animation={fadeIn}
                            duration={1500}
                            delay={2500}>
                            <Image style={styles.illustration} source={illustrationName} />
                        </Animatable.View>
                        <Animatable.View
                            style={styles.monsterAnimation}
                            animation={zoomOut}
                            duration={2000}
                            delay={200}>
                            <SvgImage
                                source={Monster}
                                style={styles.monster}>
                            </SvgImage>
                        </Animatable.View>
                        <TouchableOpacity onPress={goHome} style={styles.toop}>
                            <Animatable.View
                                animation={fadeIn}
                                duration={1500}
                                delay={2500}>
                                <SvgImage source={Arrow} style={styles.button}></SvgImage>
                            </Animatable.View>
                        </TouchableOpacity>
                    </>
                )
            }
        }
    }
    return (
        <View style={styles.container}>
            <Image source={Background} style={BACKGROUND} />

            {isVisible ? returnImage() : returnAnimation()}
        </View>
    );
}