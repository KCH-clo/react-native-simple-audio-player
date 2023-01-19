import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Main from '../screens/Main'
import History from '../screens/History'

const Stack = createStackNavigator()

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  )
}

export default StackNavigation
