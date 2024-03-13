import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';


export const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // opacity: 0.5,
        height: vh(100),
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    text: {
        // backgroundColor: "purple",
        color: "#FF8000",
        display: "flex",
        textAlign: "right",
        textAlignVertical: "center",
        fontSize: 65,
        fontFamily: 'MPLUS1pBold',
        position: "absolute",
        top: vh(12),
        right: vw(38),
    },
    letter: {
        // marginLeft: vw(2),
        width: vw(60),
        height: vh(45),
        borderRadius: 30,
        right: vw(-7)
    },
    illustration: {
        // position: "absolute",
        justifyContent: 'center',
        alignSelf: 'center',
        width: vh(53),
        height: vh(55),
        // top: vh(35),
        bottom: vh(7),
    },
    // illustration: {
    //     elevation: 5
    // },
    illustration1: {
        height: vh(45),
        width: vh(45),
        // backgroundColor: "purple",

    },
    toop: {
        position: "absolute",
        bottom: vh(5),
        right: vw(0),
    },
    button: {
        width: vw(27),
        height: vw(27),
        transform: [{ rotate: '180deg' }],
        // marginRight: -vw(5)
        // backgroundColor: 'red',
        right: vw(3),
        bottom: vh(1)
    },
    monsterAnimation: {
        // backgroundColor: "blue",
        position: "absolute",
        width: vh(50),
        height: vh(40),
        bottom: 0
    }
})