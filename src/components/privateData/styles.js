import { MyTheme } from '@utils';
import { StyleSheet, Dimensions, Platform } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    backgroundColor: MyTheme.primary,
    shadowColor: MyTheme.primary,
    paddingTop: Platform.OS === 'ios' ? '3%' : null,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topBarBody: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  leftView: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center"
  },
  appIconImage: {
    width: 50,
    height: 50,
    paddingHorizontal: 5,
  },
  iconTextView: {
    color: MyTheme.white,
    marginLeft: 5,
    justifyContent: "center"
  },
  iconText1: {
    color: MyTheme.secondary,
    fontSize: 20,
    fontWeight: 'bold'
  },
  iconText2: {
    fontSize: 12,

    color: MyTheme.white,
  },
  rightView: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: 'center',
    // backgroundColor:'red',
    alignItems: 'center'
  },
  btnPress: {
    marginHorizontal: 5,
    // marginRight:10
  },
});
