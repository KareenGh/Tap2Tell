import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

export const styles = StyleSheet.create({
    logContainer: {
        height: vh(100),
        flex: 1,
    },
    toopArrow: {
        height: vw(15),
        width: vw(15),
        top: vh(2),
        alignSelf: 'flex-end',
        marginRight: vw(4),
        
    },
    arrow: {
        transform: [
            { rotateZ: "180deg" }
        ]
    },
    signUpText: {
        textAlign: "center",
        color: '#FF8000',
        fontFamily: 'MPLUS1pBold',
        zIndex: 10,
    },
    signWithEmail: {
        marginTop: vh(2),
        display: "flex",
        flexDirection: "row",
        width: vw(90),
        height: vh(6),
        justifyContent: "space-evenly"
    },
    line: {
        height: vh(0.15),
        width: vw(12),
        marginTop: vh(2),
        backgroundColor: "#FF8000",
        opacity: 0.6,
    },
    signWithEmailText: {
        fontSize: vh(2.5),
        color: '#FF8000',
        fontFamily: 'MPLUS1pBold'
    },
    input: {
        backgroundColor: "#F7FDDC",
        opacity: 0.75,
        borderRadius: 21,
        borderColor: "#FF8000",
        borderWidth: 1,
        height: vh(5.5),
        width: vw(75),
        color: "#FF8000",
        marginTop: vh(4),
        fontFamily: 'MPLUS1pRegular',
        paddingRight: vw(3),
        fontSize: vh(2)
    },
    googleConnect: {
        flexDirection: 'row',
        backgroundColor: "#F7FDDC",
        borderRadius: 21,
        height: vh(5.5),
        width: vw(75),
        marginTop: vh(3),
        paddingRight: vw(3),
        justifyContent: 'space-around',
        opacity: 0.75,
    },
    textGoogle: {
        opacity: 1,
        alignSelf: 'center',
        color: "#FF8000",
        fontFamily: 'MPLUS1pRegular',
        fontSize: vh(2.3),
        justifyContent: 'flex-end',
        

    },
    signUpButton: {
        backgroundColor: "#FF8000",
        borderRadius: 21,
        height: vh(5.5),
        width: vw(75),
        alignSelf: "center",
        // bottom: vh(1),
        textAlign: "center"
    },
    signUpButtonText: {
        textAlign: "center",
        fontSize: vh(3),
        color: 'white',
        fontFamily: 'MPLUS1pBold'
    },
    linkContainer: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: 'center',
        height: vh(6),
        width: vw(100),
        position: "absolute",
        top: vh(80),
        
    },
    linkText1: {
        fontSize: vh(3),
        fontFamily: 'MPLUS1pBold',
        color: "#62820A"
    },
    linkText2: {
        fontSize: vh(3),
        fontFamily: 'MPLUS1pBold',
        color: "#FF8000"
    },
    hidePass: {
        paddingLeft: vw(2),
    },
    hidePassContainer: {
        position: 'absolute',
        top: vh(5),
        justifyContent: 'center',

    },
    animation: {
        width: vw(55),
        height: vh(25),
        zIndex: 2,
        position: 'absolute',
        alignSelf: 'center',
        top: vh(20),
    },
    loadingText: {
        position: 'absolute',
        color: "#FF8000",
        fontSize: vw(10),
        fontFamily: 'MPLUS1pBold',
    },
    changePass:{
        fontSize: vw(4.5),
        fontFamily: 'MPLUS1pRegular',
        color: "#FF8000",
        alignSelf:'center',
        marginTop: vh(2),
        borderBottomColor: "#FF8000",
        borderBottomWidth: vw(0.15)
    }
})