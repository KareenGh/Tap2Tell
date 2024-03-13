import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';


export const styles = StyleSheet.create({
    container: {
        top: vh(5),
        width: vw(100),
        height: vh(42),
        // justifyContent: "space-around"
    },
    text: {
        textAlign: "center",
        fontSize: 42,
        color: '#FF8000',
        fontFamily: 'MPLUS1pRegular'
    },
    monsterOnEnvelope: {
        height: vh(27),
        width: vw(63),
        alignSelf: "center",
        marginTop: vh(8),
    },
    childImage:{
        resizeMode: 'cover',
        height: vh(27),
        width: vw(43),
        marginTop: vh(2),
        // backgroundColor:'red',
        alignSelf: "center",
        borderRadius: 20,
        zIndex: 20


    }
})
