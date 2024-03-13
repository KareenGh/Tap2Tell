//react
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import * as Animatable from 'react-native-animatable';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

//images
import BorderAndTwinkles from '../../../assets/images/circle/borderAndTwinkles.svg';
//components
import { styles } from './MaxStarsLetter.style.js';
import { useLetterImageStoreContext } from '../../stores/index.store';
import SVGImage from '../generic-components/SVGImage.jsx';
import { useGenAlert } from '../../contexts/generalAlertContext'

function MaxStarsLetter(props) {
    // makes letters with 3 stars look differently 
    const letterStore = useLetterImageStoreContext()
    const { openGenAlert } = useGenAlert();
    const [animation, setAnimation] = useState(false)
    const [left, setLeft] = useState(Math.floor(Math.random() * 60) + 5)
    const [canPress, setCanPress] = useState(true);


    useFocusEffect(
        React.useCallback(() => {
            setCanPress(true)
            return () => setCanPress(false);
        }, []));

    const goToLetterGallery = async () => {
        letterStore.setLetter(props.letter)

        try {
            await letterStore.getImageDetails();
        } catch (err) {
            const sound = new Audio.Sound();
            await sound.loadAsync(require('../../../assets/letterAudio/oops-problem.mp3'));
            const playRes = await sound.playAsync();
            setTimeout(() => {
                sound && sound.unloadAsync();
            }, playRes.playableDurationMillis ? playRes.playableDurationMillis + 1000 : playRes.durationMillis + 1000);
            letterStore.setLetter(null);

            await openGenAlert({ text: 'אופס,סליחה יש שגיאה. נסו שנית מאוחר יותר', isPopup: false })
        }
        props.navigation.navigate('letter-gallery')
    }
    if (animation) {
        setTimeout(() => {
            if (letterStore.newFiveStars) {
                letterStore.setNewFiveStars(false)
                setAnimation(false)
            }
        }, 2000);
    }

    const fadeIn = {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
    };

    return (
        <View
            onLayout={(event) => {
                const { y } = event.nativeEvent.layout;
                if (letterStore.newFiveStars === props.letter) {
                    setAnimation(props.newFiveStars(y, left))
                    setLeft(25)
                }
            }}
            key={props.letter}
        >
            {letterStore.newFiveStars === props.letter && animation && animation.show ?
                <View style={{ ...styles.createCircleContainer, left: vw(24), bottom: vh(13) }}>
                    {animation.gif}
                </View>
                :
                < TouchableWithoutFeedback disabled={letterStore.letterPressed} onPress={goToLetterGallery}>
                    <Animatable.View style={{ ...styles.createCircleContainer, left: vw(left) }} animation={fadeIn} duration={2000}>
                        <SVGImage style={styles.borderAndTwinkles} source={BorderAndTwinkles}></SVGImage>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text allowFontScaling={false} style={styles.textInCircle}>
                                {props.letter}
                            </Text>
                        </View>

                    </Animatable.View>
                </TouchableWithoutFeedback>
            }
        </View >
    )
}

export default MaxStarsLetter