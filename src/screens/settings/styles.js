import { MyTheme } from "@utils";
import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    backgroundColor: MyTheme.secondary,
  },
  submitBtnView: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection:'row'
  },
  submitPress: {
    width: "40%",
    height: 50,
    backgroundColor: MyTheme.primary,
    marginTop: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontSize: 16,
  },
});
