import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

export default function Styles(imageOrientation) {
    return StyleSheet.create(
        {
            preview: {
                flex: 1,
                height: vh(100),
                width: vw(100),
                position: 'absolute'
            },
            captureBtn: {
                width: imageOrientation === 1 ? vw(20): vh(20),
                height: imageOrientation === 1 ? vw(20): vh(20),
                borderWidth: 2,
                borderRadius: 50,
                borderColor: "#FFFFFF",
                backgroundColor: "#FFFFFF",
                position: "absolute",
                top: imageOrientation === 1 ? vh(80): vw(20) ,
                left: imageOrientation === 1 ? vw(40): vw(85)
            },
            animation: {
                width:  imageOrientation === 1 ? vw(45): vh(45),
                height:imageOrientation === 1 ? vh(25): vw(25) ,
                zIndex: 2,
                position: 'absolute',
                alignSelf: 'center',
                // top: vh(35)
            },
            littleMonster: {
                height: vh(50),
                width:  vh(50),
                top: vh(30),
                position: "absolute",
                alignSelf: "center",
            },
        }
    )
};