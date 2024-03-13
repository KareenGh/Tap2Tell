import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    animation: {
        width: vw(55),
        height: vh(25),
        zIndex: 2,
        position: 'absolute',
        alignSelf: 'center',
        top: vh(35),
        // backgroundColor: "pink"
    },
    flexLetter: {
        flex: 6,
        alignSelf: "center",
        justifyContent: 'center',
        top: vh(7),
        width: vw(87),
        height: vh(100)
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
    letterContainer: {
        flex: 1,
        width: vw(100),
        height: vh(100),
        position: "absolute",
        flexDirection: "column",
    },
    pressToCamera: {
        flex: 1,
        position: "relative",
        width: vw(30),
        height: vh(17),
        alignSelf: "center",
        // backgroundColor: "red",
    },
    monster: {
        flex: 1,
        position: "relative",
        width: vw(100),
        height: vh(20),
        // transform: [{ rotate: '30deg' }],
        // right: vw(40.7),
        alignSelf: "flex-start"
    }

})