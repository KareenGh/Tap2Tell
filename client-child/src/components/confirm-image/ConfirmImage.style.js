import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';


export default function Styles() {
    return StyleSheet.create({
        container: {
            height: vh(100),
            top: vh(-10)
        },
        text: {
            top: vh(10),
            display: "flex",
            textAlign: "center",
            fontSize: 55,
            color: '#FF8000',
            fontFamily: 'MPLUS1pBold'
        },
        monsterContainer: {
            width: vw(60),
            height: vh(52),
            top: vh(12),
            alignSelf: "center"
        },
        littleMonster: {
            height: '20%',
            width: '40%',
            top: vh(2),
            position: "absolute",
            alignSelf: "center",
        },
        exampleLetterImage: {
            height: vh(41),
            width: vw(60),
            top: vh(10.5),
            borderRadius: 10,
            backgroundColor: '#f0f0f0',
            resizeMode: 'cover',

        },
        galleryImageContainer: {
            height: vh(41),
            width: vw(60),
        },
        iconsContainer: {
            top: vh(17),
            width: vw(60),
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between"
        },
        sendImage: {
            height: vh(12),
            width: vh(12),
            // justifyContent: "flex-start",
            // borderRadius: 100,
            // shadowColor: '#000',
            // shadowOffset: {
            //     width: 0,
            //     height: 3,
            // },
            // shadowOpacity: 0.16,
            // shadowRadius: 6,
            // elevation: 6
        },
        tryAgain: {
            height: vh(12),
            width: vh(12),
            // justifyContent: "flex-end",
            // borderRadius: 100,
            // shadowColor: '#000',
            // shadowOffset: {
            //     width: 0,
            //     height: 3,
            // },
            // shadowOpacity: 0.16,
            // shadowRadius: 6,
            // elevation: 6
        },
        animation: {
            width: vw(55),
            height: vh(25),
            zIndex: 2,
            position: 'absolute',
            alignSelf: 'center',
            top: vh(35),
        },
        confettiContainer: {
            // backgroundColor: "pink",

            // top: 200,
            width: vw(100),
            height: vh(100),
            position: 'absolute',
            zIndex: 10
        },
        confetti: {
            width: vw(100),
            height: vh(200),
            // flex:1,
            // backgroundColor:'red',
            position: 'absolute',
            zIndex: 10
        }
    }
    )
}