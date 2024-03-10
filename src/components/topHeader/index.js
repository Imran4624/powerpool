import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";

import { useNavigation } from "@react-navigation/native";
import { MyTheme } from "../../utils";

export const TopHeader = ({settingPress}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.topContainer}>
      <View style={styles.topBarBody}>
        <Pressable>
          <View style={styles.leftView}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={[styles.appIconImage, { tintColor: MyTheme.secondary }]}
            />
            <View style={styles.iconTextView}>
              <Text style={styles.iconText1}>PowerPool Monitor</Text>
              {/* <Text style={styles.iconText2}>POOL MONITOR</Text> */}
            </View>
          </View>
        </Pressable>
        <View style={styles.rightView}>
          {settingPress && <Pressable
            style={[styles.btnPress, { marginRight: 15 }]}
            onPress={() => settingPress()}
          >
            <AntDesign name="setting" size={30} color={MyTheme.secondary} />
          </Pressable>}

          {/* <Pressable style={styles.btnPress}>
            <FontAwesome name="refresh" size={30} color="#FFF" />
          </Pressable> */}
        </View>
      </View>
    </View>
  );
};
