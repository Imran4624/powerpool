import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { RouterComponents } from "@navigation";
import { Provider } from "react-redux";
import store from "@redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import firebase from '@react-native-firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  projectName:"PowerPool",
  apiKey:"AIzaSyCKpZX9X-g5TMJg3q2_zjIUct0uGgNKGdE",
  databaseURL:"https://powerpool-1c64e-default-rtdb.firebaseio.com/",
  projectId: "powerpool-1c64e",
  storageBucket: "powerpool-1c64e.appspot.com",
  messagingSenderId: "923081928438",
  appId: "1:923081928438:android:3ce6d692b39220222186d7",
};

const alreadyCreatedApps = firebase.apps;
const defaultApp = alreadyCreatedApps.find(app => app.name === '[DEFAULT]');

if (!defaultApp) {
  try {
   const appInit = firebase.initializeApp(firebaseConfig);
   console.log("app initialization",appInit);
  } catch (error) { 
    console.log("app initialization error",error);
  }
}

  


let persistor = persistStore(store);
const App = () => {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterComponents />
      </PersistGate>
    </Provider>
  );
};

export default App;
