import { StyleSheet } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7FDDC',
    flexDirection: 'row',
    zIndex: 5,
  },
  logo: {
    flex: 0.2,
    width: vw(26),
    height: vh(10),
    justifyContent: 'flex-start',
    marginLeft: vw(4),
    position: "absolute",
    // backgroundColor: "red"
  },
  text: {
    flex: 0.3,
    fontFamily: 'MPLUS1pLight',
    top: vh(3),
    right: vw(15),
    color: '#FF8000',
    position: "absolute",
    textAlign: "right",
    fontSize: vh(3),
    paddingRight: vw(2)
  },
  iconsContainer: {
    // flex: 0.3,
    // backgroundColor: "purple",
    display: "flex",
    flexDirection: "row",
    height: vw(12),
    width: vw(30),
    left: vw(36),
    // top: vh(4),
    position: "absolute",
    justifyContent: "space-evenly"
  },
  toop: {
    // backgroundColor: "yellow",
    // position: 'absolute',
    width: vw(12)
  },
  man: {
    flex: 0.2,
    right: 0,
    width: vw(12),
    top: vh(0),
    marginLeft: vw(2),
    marginRight: vw(3),
    height: vh(10),
    justifyContent: 'flex-end',
    position: "absolute",

  },
  component: {
    zIndex: 5
  },
  logOut: {
    top: vh(10),
    height: vh(10),
    width: vw(28),
    justifyContent: 'center',
    backgroundColor: "#F7FDDC",
    // backgroundColor: 'red',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopColor: '#FF8000',
    borderTopWidth: vw(0.5),
    alignItems: 'center',
    left: vw(63),
    // zIndex: -1
  },
  logOutText:{
    // zIndex: 0,

    color: "#FF8000",
    fontSize: vh(3),
    // fontFamily: 'MPLUS1pLight',
    fontFamily: 'MPLUS1pBold'

  }
});