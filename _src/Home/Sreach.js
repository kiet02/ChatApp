
import React, { useEffect, useState } from 'react'
import { FlatList, Text, TextInput, TouchableOpacity,BackHandler,Alert,RefreshControl ,View, Button,ScrollView, Image} from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import {useDispatch,useSelector } from 'react-redux';
import {updateEmail,updateImage,updateUid} from '../../reduxxx/update/update'


const Sreach = ({navigation},props) => {
  
    const dispatch = useDispatch()
    const [dataFromState,setDatas] = useState('')
    const [valu,setvalu] = useState([])
    const [text, setText] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [avatar,setavatar]=useState('')
    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait (1500).then(() => setRefreshing(false));
      friend()
    }, []);
    
  
    useEffect(() => {
      function handleBackButton() {
        navigation.goBack();
          return true
          
       
      }
    
    
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
      return () => backHandler.remove();
    }, [navigation]);

  

function friend(){
  
  database()
  .ref(`/friend/${auth().currentUser.uid}`)
  .once('value')
  .then(snapshot =>{
      // console.log('all user datass',snapshot.val());
      setvalu(Object.values(snapshot.val()))
  })

  database()
  .ref(`/users/${auth().currentUser.uid}`)
  .once('value')
  .then(snapshot =>{
      // console.log('all user datass',snapshot.val());
      setText(Object.values(snapshot.val()))
      
  })
  }

useEffect(()=>{
    // get_data()
    friend()
},[])

  
   

   const out = ()=>{
      auth()
  .signOut()
  .then(() => {navigation.replace('SignIn')})
  .catch(error=> alert(error))
    }
  
   

  return (
   
   <View >
        
    
    <View style={{ backgroundColor:'#52d152',width:'100%',height:100,borderBottomStartRadius:20,alignItems:'center',flexDirection:'row'}}>
      
    
      <Image source={{uri : text[3]}} style={{width:50,height:50,marginHorizontal:10}}/>
      
        <TouchableOpacity style={{width:300,justifyContent:'center', }} onPress={()=>{navigation.navigate('Add')}}>
          <View style={{backgroundColor:'white',width:300,height:40,borderRadius:10,justifyContent:'center'}}>
            <Text style={{ marginLeft:20}}>Sreach</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>out()}>
          <Text style={{marginHorizontal:10,fontWeight:'bold'}}>Out</Text>
        </TouchableOpacity>
    </View>
    
    <View style={{backgroundColor:'#e8ece5',width:"100%",height:'100%'}}>
    <FlatList
    data={valu}
    refreshControl={<RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />}
  
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
          dataFromState != ' ' && auth()?.currentUser.email != item.email && item != ''
      ){ 
             
            return(
      
      <ScrollView>
                <TouchableOpacity  onPress={touch} >  
        <View 
        style={{ width:"100%",height:70,backgroundColor:'white',justifyContent:'center',alignItems:'center',margin:5,flexDirection:'row'}}>
          <Image source={{uri : item.Avatar}} style={{width:60,height:60,marginRight:20,borderRadius:100}}/>
                <Text style={{color:'red',fontSize:20}}>{item.email}</Text>
                <Text style={{marginLeft:100,alignSelf:'center'}}>{item.time}</Text>
        </View>
        </TouchableOpacity >
         </ScrollView>
         
        )}
         
   } }

    />
    
    </View>

   </View>
    // </ScrollView>
  )
}
// AppRegistry.registerComponent(()=>()=><HomeSccreen email={'sdwadas'}/>)
export default Sreach
