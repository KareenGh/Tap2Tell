//react
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

//components
import Sign from '../components/sign/Sign.jsx';
import { BACKGROUND } from '../consts/constStyles'
import Logo from '../../assets/images/logo/Logo1.svg';
import SVGImage from '../components/generic-components/SVGImage.jsx';
import { useLetterImageStoreContext } from '../stores/index.store';
import { usePreventGoBack } from '../hooks/usePreventGoBack.jsx';


export default function SignPage(props) {
    const letterStore = useLetterImageStoreContext();
    letterStore.setStopAnimation(false);
    const [newAction, setNewAction] = useState(null);
    const [signType, setSignType] = useState('signIn');
    const [childToken, setChildToken] = useState();
    let actionRef = useRef(null);
    if(props && props.route && props.route.params && props.route.params.action !== actionRef.current){
        actionRef.current = props.route.params.action;
    }
    // var actionRef = (props && props.route && props.route.params && props.route.params.actionRef) ? props.route.params.actionRef : null;
    let token = (props && props.route && props.route.params && props.route.params.token) ? props.route.params.token : null;

    if (newAction !== actionRef.current) {
        if (token) {
            setChildToken(token);
        };
        setNewAction(actionRef.current);
        if (actionRef.current === 'email-verify') {
            setSignType('signIn');
        } else if (actionRef.current === 'change-pass') {
            setSignType('changePass');
        };
    };
    usePreventGoBack(props.navigation)

    return (
        <View style={{ flex: 1, height: vh(100) }}>
            <Image source={require('../../assets/images/NewBackground.png')} style={BACKGROUND} />
            <SVGImage source={Logo} style={styles.logo}></SVGImage>
            <Sign navigation={props.navigation} token={childToken} actionRef={newAction} actionToChange={actionRef.current} signType={signType} setSignType={setSignType} />
        </View>
    )
}

const styles = StyleSheet.create({

    logo: {
        position: 'absolute',
        width: vw(27),
        height: vh(11),
        marginLeft: vw(3),
        // backgroundColor: 'red'
    },

})
