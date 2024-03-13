//react
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { vh } from 'react-native-expo-viewport-units';
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

//images
import CheckSign from '../../../assets/images/gallery/NewCheck.svg';
import Pending from '../../../assets/images/gallery/Pending.svg';

//components
import SvgImage from '../generic-components/SVGImage.jsx';
import { styles } from './LetterGallery.style.js';
import variables from '../../../variables';

export default function ImageStatus(props) {
    const [LoadDisplay, setLoadDisplay] = useState('flex')

    return (
        <View>
            <View style={{ opacity: LoadDisplay === 'flex' ? 1 : 0, display: LoadDisplay }}>
                <Placeholder Animation={Fade} style={styles.exampleSquare}>
                    <PlaceholderLine height={vh(15)} />
                </Placeholder>
            </View>
            <View style={(LoadDisplay === 'flex') ? { opacity: 0, width: 0, height: 0 } : styles.exampleContainer} key={props.id}>
                <Image
                    onLoadEnd={e => { setLoadDisplay('none') }}
                    source={{ uri: `${variables.apiUrl}${props.path}` }}
                    style={{ ...styles.exampleSquare }}
                />
                <SvgImage source={(props.status === "APPROVED") && props.newResponse === 0 ? CheckSign : Pending} style={styles.status} />
            </View>
        </View>
    )
}