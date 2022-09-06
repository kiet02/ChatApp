
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { View,Text,TextInput,Button, FlatList,Image, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';

import { launchCamera,launchImageLibrary }from'react-native-image-picker';
import {useDispatch,useSelector } from 'react-redux';

const HomeSccreen = ({navigation}) => {
  const [avatar,setavatar] = useState('')
  const [valu,setvalu] =useState('')
  const [msg,setmsg] = useState('')
  const [news,setnews] = useState([])
 
  const [messages,setMessages] = useState([])
    const info = useSelector((state) => state.personalInfo)
   const[image,setImage]= useState('')
   const [day,setday] = useState('')
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
  

  const source = { uri: `data:image/jpeg;base64,${response.assets[0].base64}` };
  setImage(`data:image/jpeg;base64,${response.assets[0].base64}`)
  
 }})}

 function get_data(){
  
  database()
  .ref('users')
  .once('value')
  .then(snapshot =>{
  
    
      // console.log('all user data',snapshot.val());
      setnews(Object.values(snapshot.val()))
  })
  }

  useEffect(()=>{
      get_data()
     
  },[])
   
    useLayoutEffect(()=>{ 
          const unsubscribe =  firestore()
          .collection(`${auth()?.currentUser?.email}:${info.email}`)
          // .collection('kiet1@gmail.com:kiet2@gmail.com')
          .orderBy('createdAt', 'desc')
          .onSnapshot(
            (snapshot) => setMessages(
              snapshot.docs.map(doc =>({
                _id: doc.data()._id,
                        createdAt: doc.data().createdAt.toDate(),
                        text: doc.data().text,
                        user: doc.data().user,
                        images : doc.data().images,
                       
              }
              ))
            ),
          )
          
          return () => {
              unsubscribe();
            };
          },[])
          function generateUUID(digits) {
            let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
            let uuid = [];
            for (let i = 0; i < digits; i++) {
                uuid.push(str[Math.floor(Math.random() * str.length)]);
            }
            return uuid.join('');
        }
      
  
     

    const onSend = () => {
        let _id =  generateUUID(44)
        let createdAt = new Date()
        let text = msg
        let user = {_id: auth()?.currentUser?.email}
        const images = image
        
    
        if(text != '' && text != ' ' || images != '' && images != ' ' ){
        database().ref(`/friend/${auth().currentUser.uid}/${info.uid}`).set({
          email: info.email,
          Avatar : info.image,
          time : `${createdAt.getDate()}/${createdAt.getMonth()+1}`,
          uid: info.uid
        })
        .then(() => console.log('Data set.'));
        firestore().collection(`${auth()?.currentUser?.email}:${info.email}`).add({_id, createdAt, text, user,images})
        firestore().collection(`${info.email}:${auth()?.currentUser?.email}`).add({_id, createdAt, text, user,images})
      }
        
        setmsg('')
      }
          
      console.log(info.uid);
  return (
    
  <View style={{backgroundColor:'#E7F5E6',width:'100%',height:'100%'}}>
    <View style={{width:'100%',height:90,backgroundColor:'#4ADE89',borderBottomEndRadius:5,borderBottomStartRadius:5,flexDirection:'row',alignItems:'center',}}>
      
     <TouchableOpacity onPress={()=>navigation.navigate("Sreach")}>
     <Image source={{uri:'https://img.icons8.com/pastel-glyph/64/000000/back.png'}}style={{width:50,height:50,}}/>
     </TouchableOpacity>
     
         <Image source={{uri: info.image}}style={{width:50,height:50,backgroundColor:"red",borderRadius:100}}/>
 <Text style ={{marginLeft:10,fontSize:20,fontWeight:'bold'}}>{info.email}</Text>
    </View>
    <FlatList
    inverted={true}
     data={messages}
     keyExtractor={(item,index )=> index.toString()}
      
     renderItem={({item})=>{
      const time = item.createdAt
      

  
    //anh lien text  
  {   if( item.text != '' && item.text != ' '  ){
      return(
        <View>
         
         
          {item.user._id == auth()?.currentUser?.email
          ?
        
         // tin nhan cua minh
         
  <View style ={{alignItems:'flex-end'}} >

          <Text style={{textAlign:'center'}}>{`${valu}`}</Text>

  <View style={{width:190,marginBottom:5,alignItems:'flex-end',}}>
  {item.images != ''?<Image source={{uri:item.images}} style={{width:150,height:150,marginRight:10,borderRadius:10}}/> :''}
  <Text style={{backgroundColor:'red',paddingHorizontal:10,marginRight:10, fontWeight:'500',fontSize:17,borderRadius:10,textAlign:'left'}}>
  {item.text}
  
  
  </Text>    
  <Text>{`${time.getHours()}:${time.getMinutes()}`}</Text>
  </View></View>
  :
  <View style ={{alignItems:'flex-start'}} >
         
         

  <View style={{width:190, marginBottom:5,alignItems:'flex-start',}}>
  {item.images != ''?<Image source={{uri:item.images}} style={{width:150,height:150,marginLeft:10,borderRadius:10}}/> :
  ''
  }
  <Text style={{backgroundColor:'red',paddingHorizontal:10,marginLeft:10, fontWeight:'500',fontSize:17,borderRadius:10,textAlign:'left'}}>
  {item.text}
  
 
 
  </Text>
  <Text style={{marginLeft:10}}>{`${time.getHours()}:${time.getMinutes()}`}</Text>
  </View></View>
       }
  </View>
  )}}

     // chi anh
  if( item.text == '' || item.text ==  ' ' ){
  return(<View>
  {item.user._id == auth()?.currentUser?.email ? 
  <View style ={{alignItems:'flex-start'}} >


  <View style={{width:170,marginBottom:10,alignItems:'flex-start'}}>
  {item.images != ''?<Image source={{uri:item.images}} style={{width:150,height:150,marginLeft:10,borderRadius:10}}/> :<Image source={{uri:item.images}} style={{width:150,height:150,borderRadius:10}}/>
 }
  <Text style={{marginLeft:10}}>{`${time.getHours()}:${time.getMinutes()}`}</Text> 
  </View></View>
        :
  <View style ={{alignItems:'flex-end'}} >
 <View style={{width:180,marginBottom:10,alignItems:'flex-end',}}>
 {item.images != ''?<Image source={{uri:item.images}} style={{width:150,height:150,marginRight:10,borderRadius:10}}/> :
 <Image source={{uri:item.images}} style={{width:150,height:150,borderRadius:10}}/>
 }
  <Text style={{marginRight:10}}>{`${time.getHours()}:${time.getMinutes()}`}</Text>

 </View></View> }
</View>)
     }
     }} />
     

     <View  style={{}} >   
    { image != '' && image != ' ' ?
      <View style={{width:100,height:100,flexDirection:'row'}}>
<Image source={{uri : image}} style={{width:90,height:90,marginLeft:20,borderRadius:10}}/>
<TouchableOpacity onPress={ ()=>{setImage('')}}><Image source={require('../../image/xmark.png')} style={{width:20,height:20 ,marginLeft:-10,}}/></TouchableOpacity>

      </View>:''}

<View style={{flexDirection:'row',width:'100%',backgroundColor:'#4ADE89',height:60,alignItems:'center',justifyContent:'flex-end',borderRadius:15}}><TouchableOpacity onPress={()=>{selectImage()}}><Image source={require('../../image/add-image.png')} style={{width:25,height:25 ,marginLeft:5}} /></TouchableOpacity>

     <TextInput  style={{width:'84%',height:40,backgroundColor:'white',borderRadius:10}} placeholder={'nhap tin nhan'} value={msg } onChangeText={(text)=>setmsg(text)}/> 
    
     
     <TouchableOpacity onPress={()=>{onSend(),setImage('')}}><Image source={require('../../image/send.png')} style={{width:25,height:25,marginLeft:5,marginRight:5}} />
</TouchableOpacity></View>
     
     

          </View>
     </View> 

    
     
   
  )
}

export default HomeSccreen
