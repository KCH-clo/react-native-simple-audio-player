import React, {useEffect} from 'react'
import {View, Text, Button} from 'react-native'
import AudioPlayer from '../components/AudioPlayer'
import TrackPlayer, {Capability} from 'react-native-track-player'
import {trackPlayerInitState} from '../atoms/track-player-status'
import {useRecoilState} from 'recoil'
import PlayList from '../components/PlayList'

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
  }, [])

  return (
    <View>
      {/* <PlayList /> */}
      <AudioPlayer />
    </View>
  )
}
