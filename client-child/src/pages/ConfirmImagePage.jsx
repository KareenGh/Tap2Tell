//react
import React, { useMemo, useEffect, useRef, useState } from 'react';
import { View, Dimensions } from 'react-native';

//expo
import { Audio } from 'expo-av';

//components
import ConfirmImage from '../components/confirm-image/ConfirmImage.jsx';
import { usePreventGoBack } from '../hooks/usePreventGoBack.jsx';
import TopBarAndBackground from '../components/generic-components/TopBarAndBackground.jsx';
import { useLetterImageStoreContext } from '../stores/index.store';
import { playAudio } from '../utils/playAudio.js';

// let locked = false
const sound = new Audio.Sound();
export default function ConfirmImagePage(props) {
    const [refreshing, setRefreshing] = useState(false);
    const letterStore = useLetterImageStoreContext()
    let homeButton = useRef(true)
    const { width, height } = Dimensions.get('window');
    let locked = useRef(false)
    //show page if orientation fixed
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    useEffect(() => {
        console.log('turn to false');
        letterStore.setAtCameraPage(false);
        locked = false
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, [])

    const takeUriImage = async () => {
        if (letterStore.urlFromCamera) {
            if (homeButton.current) {
                await playAudio(sound, require('../../assets/letterAudio/well-done2.mp3'))
                letterStore.setTimer()
            }
        }
    }

    useMemo(() => takeUriImage(), [locked.current]) // todo: ?


    if (height > width && !locked) {
        locked.current = true;
    }

    usePreventGoBack(props.navigation)

    return (
        <View style={{ opacity: height > width ? 1 : 0 }}>
            <TopBarAndBackground homeButton={homeButton} confetti={true} sound={sound} navigation={props.navigation} />
            <ConfirmImage url={letterStore.urlFromCamera} navigation={props.navigation} />
        </View>
    )

}