import React, { useEffect, useState } from 'react'
import { Button, TextInput, View,Text,BackHandler,Alert,Image, TouchableOpacity,KeyboardAvoidingView  } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';



const SignIn = ({navigation}) => {
    const [email,setemail ] = useState('')
    const [password,setpassword ] = useState('')

    const [initializing, setInitializing] = useState(true);
const [user, setUser] = useState();



function onAuthStateChanged(user) {
  setUser(user);
  if (initializing) setInitializing(false);
}





useEffect(()=>{
 const userr = firebase.auth().currentUser;


//  console.log(auth().currentUser.email);

  // console.log('sssss',firebase.auth().currentUser?.email);
// const user = auths?.currentUser;
const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

// if (user !== null) {
//   user.providerData.forEach((profile) => {
//     console.log("Sign-in provider: " + profile.providerId);
//     console.log("  Provider-specific UID: " + profile.uid);
//     console.log("  Name: " + profile.displayName);
//     console.log("  Email: " + profile.email);
//     console.log("  Photo URL: " + profile.photoURL);
//   });
// }
// setTimeout(function(){
//   onAuthStateChanged(auth, (user) => {

//   if(user != null){
//     navigation.reset({
//       index:1,
//       routes :[{name :'Sreach'}]
//     })
//   }else{
//     navigation.reset({
//       index:0,
//       routes: [{name:'SignIn'}]
//     })
//   }});
// }, 1000);
return subscriber

},[navigation]) 

// if (initializing) return null;

//   if (!user) {
//     return (
//     navigation.push('Sreach')
//     // <View><Text>d</Text></View>
//     );
//   }else{
//     navigation.navigate("Sreach")
//   }


    function Signin(){
      if(email != '' && password !=''){
        auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      


  navigation.replace('Sreach')
  console.log(firebase.auth().currentUser.email);
  })
  .catch((error) => {  
    alert('sai cmnr')
    const errorCode = error.code;
    const errorMessage = error.message;
  });}
      
    }

  return (
    <View style={{width:"100%",height:'100%',backgroundColor:'#52d152'}}>
      <KeyboardAvoidingView style={{backgroundColor:'#52d152',flex:1}}>
      <View style={{flex:1.5,backgroundColor:'#52d152',alignItems:'center',justifyContent:'center'}}>
        <Image style={{width:200,height:200}} source={require('../image/screan.png')}/>
      </View>
      <View style={{flex:1}}>
        <TextInput textAlign='center' placeholder='email' onChangeText={(text) => setemail(text)}  style={{borderWidth:1,borderRadius:15,marginBottom:20,backgroundColor:'white',width:'80%',alignSelf:'center'}}/>
        <TextInput  secureTextEntry={true} textAlign='center' placeholder='password' onChangeText={(text )=> setpassword(text)} style={{borderWidth:1,borderRadius:15,marginBottom:20,backgroundColor:'white',width:'80%',alignSelf:'center' }}/>


<TouchableOpacity onPress={Signin}>
  <View style={{width:200,height:50,backgroundColor:'red',alignSelf:'center',justifyContent:'center',borderRadius:20}}>
    <Text style={{alignSelf:'center',fontWeight:'bold',fontSize:20}}>Sign In</Text>
  </View>
</TouchableOpacity>
<TouchableOpacity onPress={()=> navigation.replace('SignUp')}>
  <Text style={{alignSelf:'center',marginTop:10,fontSize:15}}>Register</Text>
</TouchableOpacity>
</View>
</KeyboardAvoidingView>
    </View>
  )
}

export default SignIn
