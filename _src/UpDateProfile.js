import React, { useEffect, useState } from 'react'
import { Button, Image, TextInput, TouchableOpacity, View,Text } from 'react-native'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { launchCamera,launchImageLibrary }from'react-native-image-picker';

const UpDateProfile = ({navigation}) => {
  
    const [Name,setName ] = useState('')
    const [PhotoURL,setPhotoURL ] = useState('')
   const [email,setemail] = useState('')
   const [valu,setvalu] = useState('https://thumbs.dreamstime.com/b/default-avatar-pro…profile-vector-user-profile-profile-179376714.jpg')
   const setvalus = 'https://thumbs.dreamstime.com/b/default-avatar-pro…profile-vector-user-profile-profile-179376714.jpg'
  const selectImage = () => {
    const options = {
      maxWidth: 1000,
      maxHeight: 1000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      includeBase64: true
    };
  launchImageLibrary(options, (response) => { 
  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    
  // console.log(response.assets[0]);
    // You can also display the image using data:
    const source = { uri: `data:image/jpeg;base64,${response.assets[0].base64}` };
    setvalu(`data:image/jpeg;base64,${response.assets[0].base64}`)
    // console.log(image);
   }})}
 
   
   
   console.log(email);
    function generateUUID(digits) {
      let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
      let uuid = [];
      for (let i = 0; i < digits; i++) {
          uuid.push(str[Math.floor(Math.random() * str.length)]);
      }
      return uuid.join('');
  }
  const newuid = generateUUID(28)

  console.log(auth().currentUser.email);
 
 function Up(){
  if(Name != '' && Name != ' ' ){database()
 .ref(`/friend/${auth().currentUser.uid}`)
 .set('' )
 .then(() => console.log('Data set.'));
 if( Name != '' && Name != ' ' ){
 database().ref(`/users/${auth().currentUser.uid}`).set({
  email:auth().currentUser.email,
  uid: auth().currentUser.uid,
  Name: Name,
  Avatar : valu
 })}

 navigation.navigate('SignIn')

}
 
}
 
 console.log(Name);

 

     
 
    
// console.log(users.uid);

  return (
    <View style={{flex:1,backgroundColor:'#e8ece5'}}>
    <View style={{alignItems:'center',backgroundColor:'#e8ece5'}}>
        <View style={{ backgroundColor:'#52d152',width:'100%',height:230,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>selectImage()} >
            <Image style={{width:200,height:200 ,borderRadius:100}} source={{uri: valu}}/>
          </TouchableOpacity>
          
     </View>
        <TextInput  style={{borderWidth:1,width:'80%',borderRadius:10,marginBottom:10}} placeholder='Name' onChangeText={(text) => setName(text)} textAlign='center' textContentType='countryName'/>
        <TouchableOpacity onPress={()=>{Up()}}><View style={{width:100,height:50,backgroundColor:'red',justifyContent:'center',alignItems:'center',borderRadius:30}}>
        <Text > finish</Text>
        
      </View></TouchableOpacity>
      

{/* <Button title='Up' onPress={Up()} /> */}

    </View></View>
  )
}

export default UpDateProfile
