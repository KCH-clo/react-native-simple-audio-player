import React from 'react'
import {View, Text, Button} from 'react-native'

export default function History({navigation}: any) {
  return (
    <View>
      <Text>I am a screen B</Text>
      <Button
        title="Go to ScreenA"
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  )
}
