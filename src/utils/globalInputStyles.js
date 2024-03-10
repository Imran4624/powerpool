import { StyleSheet, Dimensions, Platform } from 'react-native';
import { MyTheme } from '@utils';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export const globalInputsStyles = StyleSheet.create({
  globalInputs: {
    width: width - 40,
    height: 85,
  },
  globalLabel: {
    // fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
    color: MyTheme.labelBlack,
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    marginTop: 9,
    // fontSize: 12,
    color: MyTheme.labelBlack,
    width: '100%',
    backgroundColor: MyTheme.grey,
    borderRadius: 8,
    paddingHorizontal: 15,
    padding: Platform.OS === 'ios' ? 15 : null,
    shadowColor: '#000',
    color: MyTheme.primary,
    fontWeight: 'bold',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  resend: {
    // fontFamily: MyTheme.fontFamily,
    fontStyle: 'normal',
    marginTop: 9,
    fontSize: 12,
    color: MyTheme.labelBlack,
  },

});
