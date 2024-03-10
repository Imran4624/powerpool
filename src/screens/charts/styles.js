import { MyTheme } from "@utils";
import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export const styles = StyleSheet.create({
  chartsContainer: {
    flex: 1,
    backgroundColor: MyTheme.secondary,
  },



  //public Data
  dataContainer:{
    flex:1,
    // padding:'4%'
  }
});
