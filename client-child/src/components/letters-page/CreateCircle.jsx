
//react
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

//components
import { styles } from './LetterCircleStar.style'
import AddStars from './AddStars';
import SVGImage from '../generic-components/SVGImage';

//circle
import blue from '../../../assets/images/circle/Blue.svg';
import yellow from '../../../assets/images/circle/Yellow.svg';
import green from '../../../assets/images/circle/Green.svg';
import orange from '../../../assets/images/circle/Orange.svg';

import { useLetterImageStoreContext } from '../../stores/index.store';
import { useGenAlert } from '../../contexts/generalAlertContext';

import { AnalyticsEvent } from '../../consts/consts';

const BUBBLES_COLOR = [blue, green, orange, yellow];
function CreateCircle(props) {
    const { openGenAlert } = useGenAlert();
    const letterStore = useLetterImageStoreContext()
    const left = Math.floor(Math.random() * 60) + 5;
    const [canPress, setCanPress] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            setCanPress(true)
            return () => setCanPress(false);
        }, []));

    const navigate = async () => {
        if (canPress) {
            letterStore.setLetter(props.letter)
            try {
                await letterStore.getImageDetails();
                const countImagePath = letterStore.countImagePathMap();
                AnalyticsEvent(props.letter, 'start_level', 'letter');

                if (Number(countImagePath) !== 0) {
                    props.navigation.navigate('letter-gallery');
                    return;
                } else {
                    props.navigation.navigate('letter-picture');
                    return;
                }
            } catch (err) {
                setCanPress(true);
                console.log('err: ', err);
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
        <View onLayout={(event) => {
            const { y } = event.nativeEvent.layout;
            if (props.minStars && !letterStore.newFiveStars) {
                props.getHeightOfCircle(y, props.letter)
            }
        }}
            key={props.letter}>
            <View style={[{ left: vw(left) }, styles.createCircleContainer]}>
                <TouchableWithoutFeedback disabled={!canPress} onPress={navigate}>
                    <View style={styles.shadow}>
                        <SVGImage style={{ ...styles.SVGcircle, overflow: "hidden" }} source={BUBBLES_COLOR[props.index % (BUBBLES_COLOR.length)]} />
                        <View style={styles.textContainer}>
                            <Text allowFontScaling={false} style={styles.textInCircle}>{props.letter}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.star}>
                    <AddStars score={props.score} />
                </View>
            </View >
        </View>)
}

export default CreateCircle