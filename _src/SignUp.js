import React, { useEffect, useState } from 'react'
import { Button, TextInput, View,Alert,Text, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
    const [email,setemail ] = useState('')
    const [password,setpassword ] = useState('')

function Signup(){
  if(email != '' && password != ''){ auth()
  .createUserWithEmailAndPassword(email,password)
  .then(() => {
    console.log('User account created & signed in!');
    navigation.navigate('Up')
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Địa chỉ email đó đã được sử dụng !');
      Alert.alert('Thông báo','Địa chỉ email đó đã được sử dụng!')
    }

    if (error.code === 'auth/invalid-email') {
      console.log('Địa chỉ email đó không hợp lệ !');
      Alert.alert('Thông báo','Địa chỉ email đó không hợp lệ !')
    }

    console.error(error);}
 );
  }
}
      
   
  return (
    
      <KeyboardAvoidingView style={{flex:1,backgroundColor:'#52d152'}}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold'}} >Welcome </Text>
      <Text style={{fontStyle:'italic'}}>Chào mừng bạn tham gia ứng dụng</Text>
        </View>
        <View style={{flex:2,alignItems:'center'}}>
        <TextInput style={{borderWidth:1,borderRadius:15,width:'80%',marginBottom:10,backgroundColor:'white'}} textAlign='center' placeholder='email' onChangeText={(text) => setemail(text)}/>
        <TextInput style={{borderWidth:1,borderRadius:15,width:'80%',marginBottom:10,backgroundColor:'white',}} textAlign='center' placeholder='password' onChangeText={(text )=> setpassword(text)}/>
{/* <Button title='Sign Up' onPress={Signup}/> */}
<TouchableOpacity onPress={Signup}>
  {/* <View style={{width:200,height:50,backgroundColor:'red'}}></View> */}
  <Text style ={{ width:200,height:50,backgroundColor:'red',textAlignVertical:'center',textAlign:'center',borderWidth:1,borderRadius:20,fontWeight:'bold',fontSize:15}}>Sign Up</Text>
</TouchableOpacity>

</View>
        
</KeyboardAvoidingView>
   
  )
}

export default SignUp
