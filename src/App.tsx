/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler'
import React from 'react'
import StackNavigation from './navigations/Stack'
import {NavigationContainer} from '@react-navigation/native'
import {RecoilRoot} from 'recoil'

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </RecoilRoot>
  )
}

export default App
