import React, { useEffect, useState } from 'react'
import { FlatList, Text, TextInput, TouchableOpacity,BackHandler,Alert ,View, Button,} from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import {useDispatch,useSelector } from 'react-redux';
import {updateEmail,updateImage,updateUid} from '../../reduxxx/update/update'

const Addfriend = ({navigation}) => {
    const dispatch = useDispatch()
    const [dataFromState,setDatas] = useState('')
    const [valu,setvalu] = useState([])
    const [text, setText] = useState('');
    
      
    function get_data(){
  
        database()
        .ref('users')
        .once('value')
        .then(snapshot =>{
        
          
            // console.log('all user data',snapshot.val());
            setvalu(Object.values(snapshot.val()))
        })
        }

        useEffect(()=>{
            get_data()
           
        },[])

        const sreachData = valu.filter((user)=>user.email.includes(dataFromState))
  return (
    <View >
        
    
    <View style={{ backgroundColor:'#52d152',width:'100%',height:100,borderBottomStartRadius:20,justifyContent:'center',alignItems:'center'}}>
     
    

      <Text>{auth().currentUser.email}</Text>
       
          <View style={{backgroundColor:'white',width:300,height:40,borderRadius:10,justifyContent:'center'}}>
            <TextInput style={{ marginLeft:20}} placeholder={'Sreach'}
            onChangeText={(val)=>{setDatas(val)}}></TextInput>
            </View>
        
        
    </View>
    
    <View style={{backgroundColor:'#e8ece5',width:"100%",height:'100%'}}>
    <FlatList
    data={sreachData}
    keyExtractor={(item,index )=> index.toString()}
    renderItem={({item,index})=>{
        const touch =()=>{
            dispatch(updateEmail(item.email))
            dispatch(updateUid(item.uid))
            dispatch(updateImage(item.Avatar))
            setTimeout(() => {
              navigation.push("Chat")
            }, 20);
        }
   
        console.log(item.uid);
       
        if( 
            dataFromState != '' && auth()?.currentUser.email != item.email
        ){ return(
                <TouchableOpacity  onPress={touch} >  
        <View 
        style={{ width:"100%",height:30,backgroundColor:'white',justifyContent:'center',alignItems:'center',margin:5}}>
                <Text style={{color:'red',fontSize:20}}>{item.email}</Text>
                
        </View>
        </TouchableOpacity >)}
         

          
            
           
   } }

    />
    
    </View>

   </View>
  )
}

export default Addfriend
