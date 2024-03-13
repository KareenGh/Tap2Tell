import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
let shadowObj;
if (Platform.OS === 'ios') {
  shadowObj = {
    shadowOffset: { width: vw(1), height: vh(1) },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 30,
  }
} else {
  shadowObj = {
    borderRadius: 100,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 100,
    elevation: 34,
    zIndex:-7
  }
}
export const styles = StyleSheet.create({
  createCircleContainer: {
    position: 'relative',
    width: vw(35),
    height: vh(20),
    marginBottom: vw(15),

  },
  container: {
    width: vw(100),
    height: vh(90),
  },
  mainBackground: {
    position: "absolute",
  },
  scroll: {
    width: vw(100),
    height: vh(100),
    flex: 1
  },
  letterCircle: {
    position: 'relative',
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  shadow: {
    ...shadowObj
  },
  monsterContainer: {
    position: 'relative',
    width: vw(65),
    height: vw(65),
  },
  lastBubble: {
    position: 'absolute',
  },
  blueone: {
    marginLeft: vw(65),
  },
  bluetwo: {
    marginLeft: vw(50)
  },
  star: {
    flexDirection: 'row',
    marginTop: '15%',
    position: 'relative',
    alignSelf: "center",
    justifyContent: "center"
  },
 
  SVGcircle: {
    height: "95%",
    width: "95%",
  },
  textInCircle: {
    display: 'flex',
    fontSize: vh(11),
    height: '50%',
    lineHeight: vh(10),
    alignSelf: 'center',
    top: 0,
    color: "white",
    fontFamily: 'MPLUS1pBold',
    },
  textContainer: {
    height: '95%',
    width: '95%',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 30
  },
  animationGif: {
    position: 'relative',
    width: vh(20),
    height: vh(20),
    marginBottom: vw(10),
    marginTop: vh(10)
  },
});
