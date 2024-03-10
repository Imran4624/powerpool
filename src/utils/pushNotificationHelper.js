import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import { PostToken } from '../api/apiCall';
import { Alert } from 'react-native';
import {PermissionsAndroid} from 'react-native';


export async function requestUserPermission() {

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
}

async function GetFCMToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('Old FCM token : ', fcmToken);
  if (!fcmToken) {
    
    try {
    let fcmToken = await messaging().getToken();
      if (fcmToken) {
        AsyncStorage.setItem('fcmToken', fcmToken);
        const data = {
          deviceID: fcmToken
        }
        console.log('FCM token : ', fcmToken);
      }
    } catch (error) {
      console.log('error in FCM Token :', error);
    }
  }
}

export const NotificationListener = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('notification on forGround state : ', remoteMessage);

    Alert.alert(remoteMessage?.notification?.title,remoteMessage?.notification?.body)
  });
};
