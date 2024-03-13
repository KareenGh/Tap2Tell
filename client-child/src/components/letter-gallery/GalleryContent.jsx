//react
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';

//images
import GalleryIcon from '../../../assets/images/gallery/Gallery.svg';
import PlusSign from '../../../assets/images/gallery/Plus.svg';

//components
import ImageStatus from './ImageStatus';
import SvgImage from '../generic-components/SVGImage.jsx';
import { styles } from './LetterGallery.style.js';
import { useLetterImageStoreContext } from '../../stores/index.store';

function GalleryContent(props) {
    // contains the off-white rectangle with all the gallery header and images, statuses
    const letterStore = useLetterImageStoreContext()
    //If there are 5 stars, the display of plus sign will be none to block the option for the child to add images. Also if there are 10 images, will block the option.
    const dispaly = letterStore.enoughScoreOrImages

    const goToCamera = () => {
        props.navigation.navigate('camera')
    }

    return (
        <View style={styles.galleryContainer}>
            <View style={styles.galleryHeader} >
                <Text allowFontScaling={false} style={styles.text}>גלריה</Text>
                <SvgImage source={GalleryIcon} style={styles.galleryIcon} />
            </View>
            <View style={styles.images}>
                <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }} style={styles.scrollView}>
                    {/* sends the child to a screen that shows the letter they want to do */}
                    <TouchableOpacity onPress={goToCamera}>
                        <View style={{ ...styles.addImage, display: dispaly ? 'none' : 'flex' }}></View>
                        <SvgImage source={PlusSign} style={{ ...styles.plusSign }} />
                    </TouchableOpacity>
                    {/* maps through the array of statuses in the DB and gives each image the right status symbol */}
                    {letterStore.galleryImageDetails.map((imageStatus, index) => {
                        return (
                            <View key={index}>
                                <ImageStatus path={imageStatus.imagePath} status={imageStatus.imageStatus} id={imageStatus.id} newResponse={imageStatus.isNewResponse} />
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    );
}

export default GalleryContent;