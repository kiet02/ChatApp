// In App.js in a new project

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import{store} from './reduxxx/store'
import SignIn from './_src/SignIn'
import SignUp from './_src/SignUp'
import UpDateProfile from './_src/UpDateProfile'
import HomeSccreen from './_src/Home/HomeSccreen'
import Addfriend from './_src/Home/Addfriend'
import Sreach from './_src/Home/Sreach'




const Stack = createNativeStackNavigator();


function App() {

 


  const [user,setuser] = React.useState('')
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn' screenOptions={{headerShown:false}} >
<Stack.Screen name='SignIn' component={SignIn}  />
<Stack.Screen name='SignUp' component={SignUp}/>
<Stack.Screen name='Up' component={UpDateProfile}/>
<Stack.Screen name='Chat' component={HomeSccreen}/> 
<Stack.Screen name='Add' component={Addfriend}/>
<Stack.Screen name='Sreach' component={Sreach} options={{headerLeft: (props) => null }}/>


      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;