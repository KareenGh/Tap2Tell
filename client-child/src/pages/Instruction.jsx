//react
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { usePreventGoBack } from '../hooks/usePreventGoBack.jsx';
import { Video } from 'expo-av';
import { vw, vh } from 'react-native-expo-viewport-units';

//components

export default function Instrunction(props) {
    const video = useRef(null);
    let playedVideo = useRef(false)
    //prevent going back
    usePreventGoBack(props.navigation)
    if (props && props.route && props.route.params && props.route.params.start === 'start-again' && video && video.current) {
        video.current.replayAsync();
        props.route.params.start = false;
    }
    return (
        <View style={styles.mainView}>
            <View style={styles.topBackground}></View>
            <View style={styles.bottomBackground}></View>
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/entrance/entranceAudio.mp4')}
                resizeMode="contain"
                shouldPlay={true}
                replayAsync={props && props.route && props.route.params && props.route.params.start === 'start-again' ? true : null}
                onPlaybackStatusUpdate={status => {
                    if (status.isPlaying) {
                        playedVideo.current = true
                    }
                    if (!status.isPlaying && playedVideo.current) {
                        playedVideo.current = false;
                        props.navigation.navigate('letters-page')
                    }
                }}

            />
        </View>
    )

}

const styles = StyleSheet.create({
    mainView: {
        position: 'absolute',
        flex: 1,
        height: vh(100),
        width: vw(100),
    },
    video: {
        position: 'absolute',
        height: vh(100),
        width: vw(100),
    },
    topBackground: {
        flex: 3 / 4,
        backgroundColor: '#DEFAFB'
    },
    bottomBackground: {
        flex: 1 / 4,
        backgroundColor: '#92d600'
    }

})
