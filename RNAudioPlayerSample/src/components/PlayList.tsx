import {View, Text} from 'react-native'
import React from 'react'
import {useRecoilState} from 'recoil'
import {playlistState} from '../atoms/audio-player-states'

export default function PlayList() {
  const [playList, setPlaylist] = useRecoilState(playlistState)

  return (
    <View>
      <Text>PlayList</Text>
    </View>
  )
}
