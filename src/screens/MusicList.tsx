import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import PlayList from '../components/PlayList'

export default function MusicList({navigation}: any) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Text>Back</Text>
      </TouchableOpacity>
      <PlayList />
    </View>
  )
}
