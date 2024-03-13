//react
import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native';

//images
import monster from '../../../assets/images/monster/Monster.svg';
import pressToCamera from '../../../assets/images/camera/pressToCamera.svg';
import { ANIMATIONS_GIFS } from '../consts/AnimationsGifs.js';

//components
import SvgImage from '../generic-components/SVGImage';
import { styles } from './LetterGif.style.js';
import { useLetterImageStoreContext } from '../../stores/index.store'
import { Text } from 'react-native-animatable';
import { observer } from 'mobx-react-lite';


function LetterGif(props) {
    const goToCamera = () => {
        props.navigation.navigate('camera')
    }
    if (letterStore.selectedLetter) {
        return (
            <View style={styles.container}>
                <View style={styles.flexLetter}>
                    <Image source={ANIMATIONS_GIFS[letterStore.selectedLetter.letter]} style={styles.flexLetter}></Image>
                </View>
                <TouchableOpacity style={styles.pressToCamera} onPress={goToCamera}>
                    <SvgImage source={pressToCamera} style={styles.pressToCamera} />
                </TouchableOpacity>
                <SvgImage source={monster} style={styles.monster} />
            </View>
        )
    } 
}
export default observer(LetterGif)
