//react
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import * as Animatable from 'react-native-animatable';
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";
import { vh } from 'react-native-expo-viewport-units';

//image
import MonsterOnEnvelope from '../../../assets/images/message-sent/MonsterOnEnvelope.svg';

//components
import SvgImage from '../generic-components/SVGImage.jsx';
import { styles } from './MessageSent.style.js';
import { useLetterImageStoreContext } from '../../stores/index.store';

export default function MessageSent(props) {
  const letterStore = useLetterImageStoreContext();
  const [url, setUrl] = useState();

  const slideLeft = {
    0: {
      left: vw(100)
    },
    1: {
      left: vw(-100)
    }
  }
  useEffect(() => { //todo change varible of url
    setUrl(letterStore && letterStore.urlFromCamera)
  }, [])

  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.text}>ההודעה נשלחה!</Text>
      <Placeholder Animation={Fade} style={props.imageLoaded ? { display: 'none' } : { ...styles.childImage }}>
        <PlaceholderLine height={vh(27)} />
      </Placeholder>
      <Image onLoadEnd={() => { console.log('yes'); props.setImageLoaded(true) }} style={{ ...styles.childImage, position: props.imageLoaded ? 'relative' : 'absolute', opacity: props.imageLoaded ? 1 : 0 }} source={{ uri: `${url}` }} />
      {props.imageLoaded ? <Animatable.View animation={slideLeft} duration={4000} delay={700}>
        <SvgImage source={MonsterOnEnvelope} style={styles.monsterOnEnvelope}></SvgImage>
      </Animatable.View> : null}
    </View>
  )
}
