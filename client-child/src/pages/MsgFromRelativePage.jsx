//react
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { usePreventGoBack } from '../hooks/usePreventGoBack.jsx';

//components
import TopBarAndBackground from '../components/generic-components/TopBarAndBackground.jsx';
import MsgFromRelative from '../components/msg-from-relative/MsgFromRelative.jsx';
import { useLetterImageStoreContext } from '../stores/index.store';

export default function MsgFromRelativePage(props) {

    usePreventGoBack(props.navigation)
    
    return (
        <View>
            <TopBarAndBackground navigation={props.navigation} />
            <MsgFromRelative navigation={props.navigation} />
        </View>
    )
}

