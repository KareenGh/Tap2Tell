import { StyleSheet } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

export const styles = StyleSheet.create({

    darkBackground: {
        // backgroundColor: "#000000a3",
        width: vw(100),
        height: vh(100),
        position: "absolute",
        top: 0,
        right: 0,
    },
    mainContainer: {
        // backgroundColor: "#F7FDDC",
        height: vh(50),
        width: vw(66),
        top: vh(15),
        borderRadius: 15,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    toop1: {
        // backgroundColor: "blue",
        // top: vh(-4),
        left: vw(25)
    },
    close: {
        color: "#FF8000",
        fontSize: vh(4)
    },
    letterImage: {
        resizeMode: "contain",
        transform: [{ scale: 1.2 }],
        height: vh(20),
        width: vw(30),
        borderRadius: 15,
        top: vh(-2)
    },
    enlargedImage: {
        top: '50%',
        borderRadius: 15,
        alignSelf: "center",
        height: vh(20),
        width: vw(30),
        // zIndex: 14,
        resizeMode: "contain",
        transform: [{ scale: 4 }]

    },
    text: {
        display: "flex",
        textAlign: "center",
        fontSize: 23,
        color: '#FF8000',
        fontFamily: 'MPLUS1pLight'
    },
    toop2: {
        // backgroundColor: "blue",
        top: vh(2)
    },
    envelopeIcon: {
        height: vh(10),
        width: vh(10)
    },
    enlargedImageContainer: {
        backgroundColor: "rgba(0,0,0,0.5)",
        width: vw(100),
        height: vh(120),
        // top: vh(-15),
        // right: 0,
        // bottom: vh(10),
        // left: 0,
        position: "absolute",
        zIndex: 20,
    },
    // enlargedImageContainer: {
    //     // backgroundColor: "red",
    //     width: vw(100),
    //     height: vh(120),
    //     backgroundColor: "rgba(0,0,0,0.5)",
    //     // top: 10,
    //     // right: 0,
    //     // bottom: 0,
    //     // left: 0,
    //     position: "absolute",
    //     zIndex: 20,

    // },
})