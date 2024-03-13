import React from "react";
import { View } from "react-native";
// import './progressBar.style.scss'
import { vw, vh } from 'react-native-expo-viewport-units';

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;

    const fillerStyles = {
        height: '100%',
        width: `${completed >= 1 ? 100 : completed * 100}%`,
        backgroundColor: bgcolor,
        borderRadius: 50,
        textAlign: 'right'       //why?
    }

    //   margin: 20 style={containerStyles}  className="containerStyles" 
    return (
        <View style={{
            height: vh(1),
            width: '75%',
            backgroundColor: '#e0e0de',

            borderRadius: 50,
            zIndex: 10,
        }}
        >
            <View style={fillerStyles}></View>
        </View>
    );
};

export default ProgressBar;