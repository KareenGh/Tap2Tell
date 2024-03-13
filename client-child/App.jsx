//react
import React, { useState, useEffect, useRef } from 'react';
import { I18nManager, LogBox, Platform, Linking, AppState, Text, Image } from 'react-native';
import { vh } from 'react-native-expo-viewport-units';
import UserInactivity from 'react-native-user-inactivity';

//expo
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';

import { Asset } from 'expo-asset'

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { navigationRef } from './RootNavigation';

//hilma auth native
import { AuthProvider, createPrivateNavigator } from "@hilma/auth-native";
import { SocketProvider } from "@hilma/socket.io-react";

//mobx
import { LetterImageStoreProvider } from './src/stores/index.store';
import { GenAlertProvider } from './src/contexts/generalAlertContext';
import variables from './variables';
import { View } from 'react-native-animatable';

//components
import * as RootNavigation from './RootNavigation.js';


//pages
const EntrancePage = loadable(() => import('./src/pages/EntrancePage.jsx'))
const LettersPage = loadable(() => import('./src/pages/LettersPage.jsx'))
const GalleryPage = loadable(() => import('./src/pages/GalleryPage.jsx'))
const LetterGifPage = loadable(() => import('./src/pages/LetterGifPage.jsx'))
const CameraPage = loadable(() => import('./src/pages/CameraPage.jsx'))
// const CameraPage = loadable(() => import('./src/pages/CameraPageCopy.jsx'))

const ConfirmImagePage = loadable(() => import('./src/pages/ConfirmImagePage.jsx'))
const MessageSentPage = loadable(() => import('./src/pages/MessageSentPage.jsx'))
const MsgFromRelativePage = loadable(() => import('./src/pages/MsgFromRelativePage.jsx'))
const ResponsePage = loadable(() => import('./src/pages/ResponsePage.jsx'))
const ImageStartsWithLetterPage = loadable(() => import('./src/pages/ImageStartsWithLetterPage.jsx'))
const SignPage = loadable(() => import('./src/pages/SignPage.jsx'))
const ChangePassPage = loadable(() => import('./src/pages/ChangePassPage'))
const Instruction = loadable(() => import('./src/pages/Instruction'))
const RootStack = createPrivateNavigator();
// const RootStack = createStackNavigator();
const isRTL = I18nManager.isRTL;
import loadable from '@loadable/component';
import OfflineAndOnline from './src/pages/OfflineAndOnline';
import ResetAuthPage from './src/pages/ResetAuthPage';
import { assets } from './assets';

const getFont = async () => await Font.loadAsync({
  'MPLUS1pBlack': require('./src/font-family/MPLUS1p-Black.ttf'),
  'MPLUS1pBold': require('./src/font-family/MPLUS1p-Bold.ttf'),
  'MPLUS1pExtraBold': require('./src/font-family/MPLUS1p-ExtraBold.ttf'),
  'MPLUS1pLight': require('./src/font-family/MPLUS1p-Light.ttf'),
  'MPLUS1pMedium': require('./src/font-family/MPLUS1p-Medium.ttf'),
  'MPLUS1pRegular': require('./src/font-family/MPLUS1p-Regular.ttf'),
  'MPLUS1pThin': require('./src/font-family/MPLUS1p-Thin.ttf'),
});

async function cacheImages(images) {
  try {
    return images.map(async (image) => {
      if (typeof image === 'string') {
        return await Image.prefetch(image);
      } else {

        return await Asset.fromModule(image).downloadAsync();
      }
    });
  } catch (e) {
    console.log('e: ', e);

  }

}

LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['expo-google-sign-in']);

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
// To unsubscribe to these update, just use:
let isLoading = false;
const timer = 5 * 3600000;

async function loadResourcesAndDataAsync() {
  try {
    await SplashScreen.preventAutoHideAsync().catch(() => null);

    if (I18nManager.isRTL) {
      isLoading = true;
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      setTimeout(async () => {
        await Updates.reloadAsync();
      }, 200);
    }
  } catch (e) {
    console.warn(e);
  } finally {
    isLoading = false;
    await SplashScreen.hideAsync();
  }
}

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [active, setActive] = useState(true);
  const [reloadLoadede, setReloadLoaded] = useState(true);
  let onBackground = useRef(false);
  loadResourcesAndDataAsync()

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      isMounted = false
      AppState.removeEventListener('change', handleAppStateChange);
    }; // use effect cleanup to set flag false, if unmounted
  }, [])

  const _loadAssetsAsync = async () => {
    try {
      const imageAssets = await cacheImages(assets);
      await Promise.all([...imageAssets]);
    } catch (e) {
      console.log('_loadAssetsAsync e: ', e);

    }

  }


  if (isLoading !== reloadLoadede) {
    setReloadLoaded(isLoading)
  };

  //Happens when the screen changes- when the child left or back to app
  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') onBackground.current = true
    else if (nextAppState === 'active' && onBackground) {
      onBackground.current = false
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL()
    }
    Linking.addEventListener('url', handleOpenURL);
    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    }
  })

  const handleOpenURL = async (event) => { navigate(event.url); }

  const navigate = async (url) => {
    if (!url) return;
    const urlArr = url.split("?")
    for (let i = 0; i < urlArr.length; i++) {
      if (/^data=FromUrl$/.test(urlArr[i])) {
        const token = urlArr[1].split("token=")
        RootNavigation.navigate('sign-page', { action: 'change-pass', token: token[1] });
      } else if (/^data=email-verify$/.test(urlArr[i])) {
        RootNavigation.navigate('sign-page', { action: 'email-verify' });
      }
    }
  }

  const handleOnAction = (isActive) => {
    if (!onBackground) setActive(isActive);
  }

  const handleStartAsync = async () => {
    await getFont();
    // await Asset.loadAsync([require('./assets/images/monster/monsterHold.svg')])
    await _loadAssetsAsync();
    setFontLoaded(true)
  }

  const loadingPage = () => {
    return (<Image style={{ width: '50%', height: '100%', resizeMode: 'contain', alignSelf:'center' }} source={require('./assets/splash1.png')} />);
  }
  if (reloadLoadede) {
    return loadingPage()
  }


  if (!fontLoaded) {
    handleStartAsync()
    return loadingPage()
  }

  return (
    <UserInactivity isActive={active} timeForInactivity={timer} onAction={handleOnAction} style={{ flex: 1 }}>
      <SocketProvider uri={variables.socketUri} options={{ transports: ['websocket'], autoConnect: false }}>
        <GenAlertProvider>
          <AuthProvider accessTokenCookie='kkl' logoutOnUnauthorized={true}>
            <LetterImageStoreProvider>
              <NavigationContainer ref={navigationRef}>
                <View style={{ marginBottom: Constants.statusBarHeight }}>
                  <StatusBar style='dark' />
                </View>
                <RootStack.Navigator screenOptions={{ gestureEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false }} initialRouteName="entrance">
                  <RootStack.PrivateScreen componentName='entrance' redirectComponent={EntrancePage} name="entrance" component={EntrancePage} options={{ title: 'entrance', cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid, }} />
                  <RootStack.PrivateScreen redirectComponent={Instruction} name="instruction" component={Instruction} />
                  <RootStack.PrivateScreen redirectComponent={ChangePassPage} component={ChangePassPage} name="change-pass-page" />
                  <RootStack.Screen redirectComponent={EntrancePage} name="sign-page" component={SignPage} />
                  <RootStack.PrivateScreen redirectComponent={EntrancePage} componentName="letters-page" name="letters-page" component={LettersPage} />
                  <RootStack.PrivateScreen redirectComponent={EntrancePage} componentName='letter-gallery' name="letter-gallery" component={GalleryPage} />
                  <RootStack.PrivateScreen redirectName='sign-page' componentName='letter-picture' name="letter-picture" component={LetterGifPage} />
                  <RootStack.PrivateScreen redirectComponent={EntrancePage} componentName='camera' name="camera" component={CameraPage} />
                  <RootStack.PrivateScreen redirectComponent={EntrancePage} componentName='confirm-image' name="confirm-image" component={ConfirmImagePage} />
                  <RootStack.PrivateScreen redirectComponent={EntrancePage} componentName='message-sent' name="message-sent" component={MessageSentPage} />
                  <RootStack.PrivateScreen redirectComponent={EntrancePage} componentName='msg-from-relative' name="msg-from-relative" component={MsgFromRelativePage} options={{ title: 'msg-from-relative', cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid, }} />
                  <RootStack.PrivateScreen redirectComponent={EntrancePage} componentName='response' name="response" component={ResponsePage} />
                  <RootStack.PrivateScreen redirectComponent={EntrancePage} componentName='image-starts-with-letter' name="image-starts-with-letter" component={ImageStartsWithLetterPage} />
                </RootStack.Navigator>
              </NavigationContainer >
            </LetterImageStoreProvider>
            <ResetAuthPage active={active} />
          </AuthProvider>
        </GenAlertProvider>
        <OfflineAndOnline height={vh(5)} />
      </SocketProvider>
    </UserInactivity >
  )
}
export default App;

// const stylesContent = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   logo: {
//     position: 'absolute',
//     width: vw(27),
//     height: vh(11),
//     marginLeft: vw(3),
//     // backgroundColor: 'red'
//   },
//   text: {
//     textAlign: 'center',
//     top: vh(30),
//     color: '#FF8000',
//     fontFamily: 'MPLUS1pBold',
//     fontSize: vw(8)
//   },
//   monster: {
//     top: vh(40),
//     height: vh(35),
//     width: vw(60),
//     alignSelf: 'center'
//   }
// });