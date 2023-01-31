import React, {useEffect} from 'react'
import {View, TouchableOpacity} from 'react-native'
import AudioPlayer from '../components/AudioPlayer'
import TrackPlayer, {Capability} from 'react-native-track-player'
import {trackPlayerInitState} from '../atoms/track-player-status'
import {useRecoilState} from 'recoil'
import styled from 'styled-components/native'

const PlayListText = styled.Text`
  font-size: 20px;
  color: blue;
`

export default function Main({navigation}: any) {
  const [trackPlayerInit, setTrackPlayerInit] =
    useRecoilState(trackPlayerInitState)

  useEffect(() => {
    const setupTrackPlayer = async () => {
      await TrackPlayer.setupPlayer()

      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.SeekTo,
        ],
      })
      setTrackPlayerInit(true)
    }

    if (!trackPlayerInit) setupTrackPlayer()
  }, [setTrackPlayerInit, trackPlayerInit])

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('MusicList')}>
        <PlayListText>PlayList</PlayListText>
      </TouchableOpacity>
      <AudioPlayer />
    </View>
  )
}
