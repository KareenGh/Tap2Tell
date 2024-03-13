//react
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import { Audio, Video } from 'expo-av';

//components
import TopBarAndBackground from '../components/generic-components/TopBarAndBackground.jsx';
import MessageSent from '../components/message-sent/MessageSent.jsx';
import { useLetterImageStoreContext } from '../stores/index.store';
import { usePreventGoBack } from '../hooks/usePreventGoBack.jsx';
import { playAudio } from '../utils/playAudio.js';


const sound = new Audio.Sound();
export default function MessageSentPage(props) {
    const letterStore = useLetterImageStoreContext()
    const [imageLoaded, setImageLoaded] = useState(false)
    useEffect(() => {
        letterStore.setLetter(null);
    }, []);

    //prevent going back
    usePreventGoBack(props.navigation);

    if (imageLoaded && !sound._loading) {
        playAudio(sound, require('../../assets/letterAudio/messageSent.mp3'))
    }
    return (
        <View>
            <TopBarAndBackground sound={sound} navigation={props.navigation} />
            <MessageSent imageLoaded={imageLoaded} setImageLoaded={setImageLoaded} navigation={props.navigation} />
        </View>
    )
}

export const styles = StyleSheet.create({
    background: {
        height: vh(100),
        width: vw(100),
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
})