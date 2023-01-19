import React from 'react'
import {View, Text, Button} from 'react-native'

export default function History({navigation}: any) {
  return (
    <View>
      <Text>I am a screen A</Text>
      <Button
        title="Go to ScreenB"
        onPress={() => navigation.navigate('History')}
      />
    </View>
  )
}
