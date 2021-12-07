import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './Context/UserContext';
import MainNavigator from './Routes/MainNavigator';
import SplashScreen from './Screens/SplashScreen';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD1GVfQPOIR5mzIrcro4QwGR1NDhELC4lc",
  authDomain: "mybookstore-2be17.firebaseapp.com",
  projectId: "mybookstore-2be17",
  storageBucket: "mybookstore-2be17.appspot.com",
  messagingSenderId: "449230961539",
  appId: "1:449230961539:web:3c02da401b7fa24416d4b6"
};

// Initialize Firebase
if (firebase.apps.length == 0){
  firebase.initializeApp(firebaseConfig);
}
export default function App() {
  const [exibeSplash, setExibeSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setExibeSplash(false);
    }, 5000);
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        {exibeSplash ? <SplashScreen /> : <MainNavigator />}
      </NavigationContainer>
    </UserProvider>
  );
}
