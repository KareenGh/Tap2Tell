//react
import React, { useEffect, useState, useRef } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import { Audio } from 'expo-av';
import * as Animatable from 'react-native-animatable';

//components
import TopBarAndBackground from '../components/generic-components/TopBarAndBackground.jsx'
import { useLetterImageStoreContext } from '../stores/index.store';
import { ANIMATIONS_GIFS, GIF_AUDIO } from '../consts/AnimationsGifs';
import pressToCamera from '../../assets/images/camera/pressToCamera.svg';
import monster from '../../assets/images/monster/Monster.svg';
import SvgImage from '../components/generic-components/SVGImage';
import { styles } from '../components/letter-gif/LetterGif.style'
import { observer } from 'mobx-react-lite';
import { usePreventGoBack } from '../hooks/usePreventGoBack.jsx';

function LetterGifPage(props) {
  const letterStore = useLetterImageStoreContext()
  const [value, setValue] = useState(1);
  const [sound, setSound] = useState();
  let moveToPage = useRef(false)

  const left = useRef(new Animated.Value(0)).current;
  const top = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  let soundStarted = useRef(false)

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      soundStarted.current = false;
      gifAudio()
    });
  }, [])
  const marginLeft = left.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [vw(-38), vw(-50), vw(38), vw(50)]
  })

  const marginTop = top.interpolate({
    inputRange: [0, 1],
    outputRange: [vh(0), vh(20)]
  })

  const goToCamera = () => {
    soundStarted.current = true;
    if (sound) {
      sound.setStatusAsync({ isLooping: false })
      sound.unloadAsync()
    }
    props.navigation.navigate('camera')
  }

  useEffect(() => {
    if (sound && soundStarted.current) {
      sound.setStatusAsync({ isLooping: false })
      sound.unloadAsync()
    }
  }, [sound]);

  useEffect(() => {
    Animated.timing(
      left,
      {
        delay: 15000,
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      }
    ).start(() => {
      left.setValue(3)
      setValue(2)
      Animated.timing(
        left,
        {
          toValue: 2,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start()
    });

  }, [left])


  useEffect(() => {
    Animated.timing(
      top,
      {
        delay: 15000,
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      }
    ).start(() => {
      Animated.timing(
        top,
        {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
    });

  }, [top])

  usePreventGoBack(props.navigation)

  const gifAudio = async () => {
    if (!soundStarted.current && !moveToPage.current) {
      const sound = new Audio.Sound();
      await sound.loadAsync(GIF_AUDIO[letterStore.selectedLetter.letter]);
      const playRes = await sound.playAsync();
      sound.setStatusAsync({ isLooping: true });
      setSound(sound);
    }
  };

  useEffect(() => {
    if (!sound && !moveToPage.current) {
      gifAudio();
    }
    return () => {
      moveToPage.current = true;
      if (sound) {
      }
    }
  }, []);
  if (letterStore.selectedLetter && sound) {
    return (
      <View style={styles.container}>
        <TopBarAndBackground navigation={props.navigation} sound={sound} />
        <View style={styles.letterContainer}>
          <View style={styles.flexLetter}>
            <Image source={ANIMATIONS_GIFS[letterStore.selectedLetter.letter]} style={styles.flexLetter} />
          </View>
          <TouchableOpacity style={styles.pressToCamera} onPress={goToCamera}>
            <SvgImage source={pressToCamera} style={styles.pressToCamera} />
          </TouchableOpacity>
          <Animatable.View style={{ top: marginTop, marginLeft: marginLeft }}>
            <SvgImage source={monster} style={{ ...styles.monster, transform: [{ rotate: (value === 1) ? '30deg' : '-30deg' }] }} />
          </Animatable.View>
        </View>
      </View>
    );
  } else {
    // const playLoading = async () => {
    //   const sound = new Audio.Sound();
    //   await sound.loadAsync(require('../../assets/letterAudio/shortBeep.mp3'));
    //   const playRes = await sound.playAsync();
    //   sound.setStatusAsync({ isLooping: true })
    //   setSoundPlayer(sound)
    // }
    // if (!soundPlayer) {
    //   playLoading()
    // }
    return (
      <View style={styles.container}>
        <TopBarAndBackground navigation={props.navigation} sound={sound} />
        <Image source={require('../../assets/gif/animation.gif')} style={styles.animation} />
      </View>
    )
  }
}
export default observer(LetterGifPage)
