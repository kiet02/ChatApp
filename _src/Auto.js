import React, { useEffect, useState } from 'react'
import { Button, TextInput, View,Text,BackHandler,Alert  } from 'react-native'
// import auth from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
const Auto = ({navigation}) => {
    const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
setTimeout(()=>{  if (initializing) return null;

  if (user) {
    return (
      navigation.navigate('Sreach')
    );
  }
  else {
    navigation.navigate('SignIn')
  }
    },1000)

  return (
    <View>
        <Text>Welcome </Text>
    </View>
  )
}

export default Auto
