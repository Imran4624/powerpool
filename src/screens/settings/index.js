import { View, Text, TextInput, Pressable, Modal, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { MyText, TopHeader } from "../../components";
import { globalInputsStyles, MyTheme } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { updateApiKey } from "../../redux/apiKeySlice";
import { apiKey } from "../../redux/apiKeySlice";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import {
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { GetToken } from "../../api/apiCall";


export const Settings = ({ navigation }) => {
  const [apiKeyState, setApiKeyState] = useState("");
  const apiKeyRedux = useSelector(apiKey)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const updateToken = async (apiKeyIs) => {
    setLoading(true)
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      console.log("FCM Token not exist");
    } else {
      
      try {
        GetToken(fcmToken,`${apiKeyIs}`).then(res => {
          if (res.status) {
            console.log("with token response :",res)
            // console.log(res.data)
          } else {
            Alert.alert('Api Error')
          }
          setLoading(false)
        }).catch(err => {
          setLoading(false)
        })
      } catch (error) {
        console.log(error);
      }
      
    }
    
  }

  useEffect(()=>{
    setApiKeyState(apiKeyRedux.apiKey)
  },[apiKeyRedux])
  const onPressHandler = () => {
    // console.log('submit press')
    if(apiKeyState===''){
      Alert.alert('Error!', 'Please enter api key or scan QR code')
      return
    }
    dispatch(updateApiKey(apiKeyState));
    updateToken(apiKeyState)
    navigation.navigate('Charts')
    // setApiKeyState("");
  }

  return (
    <View style={styles.settingsContainer}>
      <TopHeader />
      <View style={{ flex: 1, padding: '4%', marginTop: '4%' }}>
        <View style={globalInputsStyles.globalInputs}>
          <MyText style={globalInputsStyles.globalLabel}>Api Key* </MyText>
          <TextInput
            style={globalInputsStyles.input}
            onChangeText={setApiKeyState}
            value={apiKeyState}
            placeholder="Enter your api key"
            placeholderTextColor={MyTheme.primary}
          />
        </View>
        <View style={styles.submitBtnView}>
          <ScanScreen setApiKeyState={setApiKeyState} />
          <Pressable style={styles.submitPress} onPress={() => onPressHandler()}>
            <MyText style={styles.submitText}>Submit</MyText>
          </Pressable>
        </View>
        <Pressable style={[styles.submitPress, { alignSelf: 'center' }]} onPress={() => navigation.goBack()}>
          <MyText style={styles.submitText}>Cancel</MyText>
        </Pressable>

      </View>


    </View>
  );
};





const ScanScreen = ({ setApiKeyState }) => {
  const [modalVisible, setModalVisible] = useState(false);

  onSuccess = e => {
    setApiKeyState(e.data)
    setModalVisible(false)
  };


  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{ flex: 1, backgroundColor: MyTheme.secondary }}>

          <QRCodeScanner
            onRead={this.onSuccess}
            flashMode={RNCamera.Constants.FlashMode.off}
            topContent={<></>}
            bottomContent={<></>}
          />
          <Pressable style={[styles.submitPress, { position: 'absolute', bottom: 30, alignSelf: 'center' }]} onPress={() => setModalVisible(false)}>
            <Text style={[styles.submitText, { alignSelf: 'center' }]}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>


      <Pressable style={[styles.submitPress, { alignSelf: 'center' }]} onPress={() => setModalVisible(true)}>
        <Text style={styles.submitText}>Scan QR Code</Text>
      </Pressable>
    </>
  );
}
