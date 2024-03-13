//react
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { usePreventGoBack } from '../hooks/usePreventGoBack.jsx';

//components
import TopBarAndBackground from '../components/generic-components/TopBarAndBackground.jsx'
import GalleryContent from '../components/letter-gallery/GalleryContent.jsx'
import { useLetterImageStoreContext } from '../stores/index.store';

export default function GalleryPage(props) {

    //prevent going back
    usePreventGoBack(props.navigation)

    return (
        <View style={styles.mainView}>
            <View style={styles.topGallery}>
                <TopBarAndBackground navigation={props.navigation} />
            </View>
            <View style={styles.galleryImage}>
                <GalleryContent navigation={props.navigation} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    topGallery: {
        flex: 1,
    },
    galleryImage: {
        flex: 9,
    }
})  
