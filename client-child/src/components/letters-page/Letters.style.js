import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  upMain: {
    flex: 0.1,
    zIndex: 3,
    // backgroundColor: 'pink',
  },
  circle: {
    flex: 0.9,
    zIndex: 1
  },
  logOut: {
    backgroundColor: "#F7FDDC",

    // top: vh(0.4),
    // top: vh(10),

    width: vw(40),
    // justifyContent: 'center',
    // backgroundColor: 'red',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopColor: '#FF8000',
    borderTopWidth: vw(0.5),
    alignItems: 'center',
    // left: vw(63),
    position: 'relative',

    // position: 'absolute',
    zIndex: 2
  },
  logOutCon: {
    // backgroundColor: 'red',
    zIndex: 5,

    justifyContent: 'center',
    alignItems: 'center'
  },
  logOutText: {
    color: "#FF8000",
    fontSize: vh(3),
    // marginTop: vh(1.5),
    // fontFamily: 'MPLUS1pLight',
    fontFamily: 'MPLUS1pBold'

  },
  borderTop: {
    height: vh(0.15),
    width: vw(30),
    marginTop: vh(2),
    backgroundColor: "#FF8000",
    opacity: 0.6,
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

  fadeInDown: {
    zIndex: 12,
    position: 'absolute',
    height: vh(25),
    top: vh(9.5),
    left: vw(50)
  },
  fadeOutUp: {
    zIndex: 2,
    position: 'absolute',
    height: vh(10),
    top: vh(10.5),
    left: vw(50)
  },
  responseAnimation: {
    zIndex: 10,
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  sendToAnotherRelative: {
    zIndex: 10,
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
});