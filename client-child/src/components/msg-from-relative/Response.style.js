import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';


export const styles = StyleSheet.create({

    container: {
        height: vh(100),
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    emptyRelativePortrait: {
        borderRadius: 100,
        borderWidth: 6,
        borderColor: "#FF8000",
        width: vw(28),
        height: vw(28),
        alignSelf: "flex-end",
        top: vh(2),
        right: vw(6),
        // right: vw(9),
        // backgroundColor: 'gray'
    },
    relativePortrait: {
        backgroundColor: '#f0f0f0',
        borderRadius: 100,
        borderWidth: 6,
        borderColor: "#FF8000",
        width: vw(28),
        height: vw(28),
        alignSelf: "flex-end",
        right: -vw(7.5), 
        top: -vh(3),
        transform: [{ scale: 1 }]
    },
    enlargedImageContainer: {
        backgroundColor: "rgba(0,0,0,0.5)",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: "absolute",
        zIndex: 20,
        
    },
    enlargedImage: {
        borderRadius: 15,
        top: vh(12.5),
        alignSelf: "center",
        opacity: 1,
        width: vw(28),
        height: vw(28),
        top: vh(40),
        zIndex: 14,
        transform: [{ scale: 5 }],
        resizeMode: "contain",


        zIndex: 2
    },
    portraitToop: {
        borderRadius: 100,
        top: vh(3),
        left: vw(20)
    },
    text: {
        color: "#FF8000",
        display: "flex",
        textAlign: "center",
        fontSize: 70,
        fontFamily: 'MPLUS1pMedium'
    },
    text2: {
        color: "#FF0000",
        display: "flex",
        textAlign: "center",
        fontSize: 65,
        fontFamily: 'MPLUS1pMedium'
    },
    anim: {
        alignItems: "center"
    },
    recording: {
        width: vw(68),
        height: vh(8),
        borderRadius: 15,
        backgroundColor: "#FF8000",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    symbol: {
        left: vw(-2),
        paddingRight: vw(1),
        paddingLeft: vw(3),
        color: "#F7FDDC"
    },
    recordingBar: {
        position: "absolute",
        backgroundColor: "#F7FDDC",
        width: vw(45),
        height: vh(1),
        borderRadius: 15
    },
    toop: {
        // backgroundColor: "yellow",
        top: vh(3.5),
        borderRadius: 50
    },
    buttons: {
        width: vh(12),
        height: vh(12),
        transform: [{ rotate: '180deg' }]
    },
    sadMonsterContainer: {
        // backgroundColor: "purple",
        width: vw(68),
        height: vh(40),
        bottom: vh(-3),
        justifyContent: "center",
        alignItems: "center"
    },
    happyMonsterContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: "purple",
        width: vw(60),
        height: vh(30),
        // bottom: vh(5),
        justifyContent: "center",
        alignItems: "center"
    },
    monster: {
        width: '100%',
        height: '100%',
        position: "absolute",
        bottom: 0,
        right: vw(0),
        // backgroundColor: "blue",
    },
    monsterMouth: {
        resizeMode: "stretch",
        width: vw(37.5),
        height: vh(9),
        top: vh(4),
        // backgroundColor: "red"
    },
    loadingImage: {
        borderRadius: 100,
        width: vw(28),
        height: vw(128),
        top: vh(30),
        left: vw(23),
        borderRadius: 100,
        borderWidth: 6,
        borderColor: "#FF8000",
        backgroundColor: 'red'

    },
    animation: {
        width: vw(55),
        height: vh(25),
        zIndex: 2,
        position: 'absolute',
        alignSelf: 'center',
        top: vh(35),
        // backgroundColor: "pink"
    }

})