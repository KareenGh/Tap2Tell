//react
import React from 'react';
import { useLogout } from "@hilma/auth-native";
import { useSocket } from "@hilma/socket.io-react";
import { View } from 'react-native-animatable';

const ResetAuthPage = (props) => {
    const hilmaLogOut = useLogout()
    const socket = useSocket();
    const authLogOut = async () => {
        await hilmaLogOut();
        socket.disconnect();
    }
    if (!props.active && props.active !== undefined) {
        authLogOut();
    }

    return <View></View>;
}
export default ResetAuthPage