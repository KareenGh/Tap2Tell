import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';


export const styles = StyleSheet.create({
    galleryContainer: {
        backgroundColor: '#F7FDDC',
        height: vh(57),
        width: vw(86),
        borderRadius: 32,
        top: vh(13),
        marginRight: vw(7),
        marginLeft: vw(7),
        alignItems: "center"
    },
    galleryHeader: {
        display: "flex",
        flexDirection: "row",
        width: "90%",
        top: vh(5),
        justifyContent: "center",
    },
    galleryIcon: {
        height: vh(7),
        width: vw(16),
        borderRadius: 8,
        right: 0,
        left: vw(3),
    },
    text: {
        height: vh(6),
        fontSize: 30,
        color: '#4CCBF9',
        textAlign: "center",
        fontFamily: 'MPLUS1pExtraBold',
    },
    images: {
        height: vh(40),
        width: vw(80),
        top: vh(8)
    },
    scrollView: {
        width: vw(80)
    },
    addImageDesign: {
        height: vh(15),
        width: vw(33)
    },
    touchableOpacity: {
        width: vw(33),
    },
    addImage: {
        backgroundColor: '#FF8000',
        height: vh(15),
        width: vw(33),
        borderRadius: 11,
        color: "#FF8000"
    },
    plusSign: {
        position: "absolute",
        height: "50%",
        width: "50%",
        top: vh(2.5),
        left: vw(8)
    },
    exampleContainer: {
        width: vw(33),
        height: vh(15),
        marginBottom: vh(5)
    },
    exampleSquare: {
        height: vh(15),
        width: vw(33),
        borderRadius: 11,
        marginBottom: vh(3),
        
    },
    image: {
        height: vh(15),
        width: vw(33),
        borderRadius: 11,
    },
    status: {
        width: vw(10),
        height: vw(10),
        right: vw(-2.5),
        bottom: vh(-2),
        position: "absolute",
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.16,
        shadowRadius: 6,
        elevation: 6
    },
    nothing: {
        backgroundColor: "red"
    }
})