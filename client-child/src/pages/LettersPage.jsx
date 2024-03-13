//react
import React, { useEffect, useRef, useState } from 'react';
import { View, AppState, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import * as Animatable from 'react-native-animatable';

//expo
import { vw, vh } from 'react-native-expo-viewport-units';
import { Audio } from 'expo-av';

//components
import TopMain from '../components/letters-page/TopMain';
import LettersScroll from '../components/letters-page/LettersScroll';
import { styles } from '../components/letters-page/Letters.style';
import { useLetterImageStoreContext } from '../stores/index.store';
import { Text } from 'react-native-animatable';
import EnvelopeAnimation from '../components/letters-page/EnvelopeAnimation';

import { LoadingPage } from '../components/generic-components/LoadingPage'

// hooks
import { useGenAlert } from '../contexts/generalAlertContext'
import { usePreventGoBack } from '../hooks/usePreventGoBack';

//hilma
import { useOn, useSocket } from "@hilma/socket.io-react";
import { useLogout } from '@hilma/auth-native';

import GoToResponseAnimation from '../components/letters-page/GoToResponseAnimation';
import { playAudio } from '../utils/playAudio';

let background = false
function LettersPage(props) {
  const isAuthenticated = props && props.route && props.route.params && props.route.params.isAuthenticated
  const [firstLetter, setFirstLetter] = useState('');
  const letterStore = useLetterImageStoreContext()
  let { openGenAlert } = useGenAlert();
  const socket = useSocket();
  const [loadInformation, setLoadInformation] = useState(false)
  const [logOut, setLogOut] = useState('')
  const [scrollLoaded, setScrollLoaded] = useState(false);
  const [containerOpened, setContainerOpened] = useState(false)
  const hilmaLogOut = useLogout()
  const AnimatableView = Animatable.createAnimatableComponent(View);
  
  const unmounted = useRef(true)

  //prevent going back
  usePreventGoBack(props.navigation)


  const googleLogin = (letterStore && letterStore.userDetails) && letterStore.userDetails.googleLogin



  useEffect(() => {
    unmounted.current = false
    getDetails()
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      unmounted.current = true
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [])



  //Happens when the screen changes- when the child left or back to app
  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      background = true
    } else if (nextAppState === 'active' && background && !letterStore.atCameraPage) {
      background = false
      getDetails()
    }
  };

  //new message, change exclamation mark and envelope
  useOn('new-message', async (imageDetails) => {
    const sound = new Audio.Sound()
    playAudio(sound, require('../../assets/letterAudio/MessageReceived.mp3')); // 'ting'
    newMessage(imageDetails);
  })


  const newMessage = (imageDetails) => {
    const newItem = {
      ...imageDetails,
      id: imageDetails.imageId
    }

    //add new response
    letterStore.pushNewResponseDetails(newItem)

    //check if need envelope animation
    if (letterStore.newResponseDetailsLength === 1) {
      letterStore.setStopAnimation(false)
    }
  }

  const getDetails = async () => {
    socket.connect()
    socket.emit('join-child', letterStore.userDetails && letterStore.userDetails.id)
    try {
      let res = await letterStore.letterPageDetails(isAuthenticated);
      if (!res) {
        props.navigation.navigate('entrance');
        return;
      };
      setFirstLetter(res.firstLetter)
      if (!unmounted.current) setLoadInformation(true)
    } catch (err) {
      playAudio(new Audio.Sound(), require('../../assets/letterAudio/oops-problem.mp3'))
      console.log('letterDetails err: ', err);
      await openGenAlert({ text: 'אופס,סליחה יש שגיאה. נסו שנית מאוחר יותר', isPopup: false })
    }
  }

  const logOutPressed = async () => {
    await hilmaLogOut();
    socket.disconnect();
    props.navigation.navigate('entrance');
  }

  const changePass = async () => {
    props.navigation.navigate('change-pass-page')
  }

  if (!loadInformation && !letterStore.userDetails.fullNmae) {
    if (loadInformation && !letterStore.userDetails) {
      props.navigation.navigate('entrance');
    }
    return <LoadingPage />
  }
  else {
    return (
      <View style={styles.container}>
        {scrollLoaded ? null : <LoadingPage />}

        <View style={styles.upMain}>
          {scrollLoaded ? <TopMain logOut={logOut} setContainerOpened={setContainerOpened} setLogOut={setLogOut} navigation={props.navigation} /> : null}
        </View>
        {scrollLoaded && !letterStore.stopAnimation && letterStore.newResponseDetailsLength > 0 ?
          <View style={{ zIndex: 10 }}><EnvelopeAnimation /></View>
          : null}
        {logOut === true ?
          <AnimatableView animation={'fadeInDown'} duration={400} style={styles.fadeInDown}>
            <View style={{ ...styles.logOut, height: !googleLogin ? vh(25) : vh(18) }}>

              {!googleLogin ?
                <>
                  <TouchableOpacity style={{ ...styles.logOutCon, flex: 0.3 }} onPress={changePass} >
                    <Text allowFontScaling={false} style={{ ...styles.logOutText, }}>שינוי סיסמה</Text>
                  </TouchableOpacity>
                  <View style={styles.borderTop}></View>
                </> : null
              }

              <TouchableOpacity style={{ ...styles.logOutCon, flex: !googleLogin ? 0.3 : 0.5 }} onPress={() => props.navigation.navigate('instruction', { start: 'start-again' })} >
                <Text allowFontScaling={false} style={styles.logOutText}>מדריך משחק</Text>
              </TouchableOpacity>
              <View style={styles.borderTop}></View>
              <TouchableOpacity style={{ ...styles.logOutCon, flex: !googleLogin ? 0.3 : 0.5 }} onPress={logOutPressed} >
                <Text allowFontScaling={false} style={styles.logOutText}>התנתק</Text>
              </TouchableOpacity>
            </View>
          </AnimatableView> : null}

        {!letterStore.goToResponseAnimation && !letterStore.buttonPressed && logOut === false && containerOpened ?
          <AnimatableView animation={'fadeOutUp'} duration={400} style={styles.fadeOutUp}>
            <TouchableOpacity onPress={logOutPressed} style={{ ...styles.logOut, }}><Text allowFontScaling={false} style={styles.logOutText}>התנתק</Text></TouchableOpacity>
          </AnimatableView> : null}

        <View style={styles.circle}>
          <LettersScroll firstLetter={firstLetter} scrollLoaded={scrollLoaded} setScrollLoaded={setScrollLoaded} navigation={props.navigation} />
        </View>
        {letterStore.goToResponseAnimation ? <View style={styles.responseAnimation}><GoToResponseAnimation navigation={props.navigation} /></View> : null}
      </View>

    );
  }
}

export default observer(LettersPage)