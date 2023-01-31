import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Main from '../screens/Main'
import MusicList from '../screens/MusicList'

const Stack = createStackNavigator()

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="MusicList" component={MusicList} />
    </Stack.Navigator>
  )
}

export default StackNavigation
