import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';


export const styles = StyleSheet.create ({
    container: {
        // backgroundColor: "blue",
        height: vh(90),
        alignItems: "center",
        justifyContent: "space-between"
    },
    textAndArrowContainer: {
        backgroundColor: "#F7FDDC",
        borderRadius: 20,
        height: vh(28),
        width: vw(88),
        top: vh(12),
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    text1: {
        display: "flex",
        textAlign: "center",
        fontSize: 40,
        color: '#FF8000',
        fontFamily: 'MPLUS1pRegular'
    },
    text2: {
        display: "flex",
        textAlign: "center",
        fontSize: 26,
        color: '#FF8000',
        fontFamily: 'MPLUS1pRegular',
        top: vh(-1)
    },
    arrowContainer: {
        backgroundColor: "#FF8000",
        borderRadius: 100,
        width: vw(17),
        height: vw(17),
        justifyContent: "space-evenly",
        alignItems: "center",
        position: 'relative'
        // zIndex: 4
    },
    monster: {
        width: vw(75),
        height: vh(38),
    }
})