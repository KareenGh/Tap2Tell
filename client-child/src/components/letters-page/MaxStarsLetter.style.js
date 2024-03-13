import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';



export const styles = StyleSheet.create({
  container: {
    width: vw(100),
    height: vh(90),
  },

  borderLetter: {
    height: "100%",
    width: "100%",
    position: "absolute",
    borderRadius: 100,
    borderColor: "#FFCE09",
    borderWidth: vw(2),
    // elevation: 2,
  },
  createCircleContainer: {
    position: 'relative',
    height: vh(15),
    width: vh(16),
    marginBottom: vw(15),
  },
  animationGif: {
    position: 'relative',
    width: vh(20),
    height: vh(20),
    marginBottom: vw(10),
    // backgroundColor: 'red',
     marginTop: vh(10)
  },
  borderAndTwinkles: {
    // flex: 1,
    position: 'absolute',
    // height: vh(16),
    // width: vh(16),
    height: "100%",
    width: "100%",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // position: 'absolute'
    // justifyContent: 'center',
    // alignSelf: 'center'
    // backgroundColor: 'blue',
    // opacity: 0.5
  },
  textInCircle: {
    display: 'flex',
    fontSize: vh(11),
    height: '50%',
    lineHeight: vh(10.3),
    alignSelf: 'center',
    top: 0,
    color: "#FFCE09",
    fontFamily: 'MPLUS1pBold',
  },
  twinklesContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: vh(8),
    right: vh(1.5),
    zIndex: 4
    // backgroundColor: "purple",
    // opacity: 0.5,
  },
  bigTwinkle: {
    zIndex: 3,
    width: vw(16),
    height: vw(16),
    // backgroundColor: "red",
    // opacity: 0.5,
  },
  littleTwinkle: {
    width: vw(12),
    height: vw(12),
    top: vh(2.5),
    right: vw(9)
    // backgroundColor: "blue",
    // opacity: 0.5,
  },

})