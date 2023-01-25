import {useRecoilState, useRecoilValue} from 'recoil'
import React, {useEffect, useState} from 'react'
import PlayIcon from '../assets/svgs/play-svgrepo-com.svg'
import PauseIcon from '../assets/svgs/pause-svgrepo-com.svg'
import SkipForwardIcon from '../assets/svgs/skip-forward-svgrepo-com.svg'
import SkipPrevIcon from '../assets/svgs/skip-previous-svgrepo-com.svg'
import Slider from '@react-native-community/slider'
import styled from 'styled-components/native'
import TrackPlayer, {State, useProgress} from 'react-native-track-player'
import {
  currentTrackIndexState,
  playlistState,
} from '../atoms/audio-player-states'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {trackPlayerInitState} from '../atoms/track-player-status'
import MusicImage from './MusicImage'
import {timeToString} from '../utils/time'

const Container = styled.View`
  padding: 0 10px;
`

const AudioPlayerContainer = styled.View`
  width: 100%;
  height: 71px;
  //   background: #828282;
  //   border-radius: 8px;
  //   flex-direction: row;
  align-items: center;
`

const AudioPlayerSliderContainer = styled.View`
  width: 100%;
  height: 40px;
  justify-content: center;
`

const AudioPlayerButtonsContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`

const AudioPlayerTimerContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  padding: 0 18px;
`

const AudioPlayerTimerText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;

  color: #000000;
`

export default function AudioPlayer() {
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const [trackIndex, setTrackIndex] = useRecoilState(currentTrackIndexState)
  const [isPlaying, setPlaying] = useState<boolean>(false)

  const trackPlayerInit = useRecoilValue(trackPlayerInitState)

  const progress = useProgress(200)

  const onPlayPausePress = async () => {
    const state = await TrackPlayer.getState()

    if (state === State.Playing) {
      TrackPlayer.pause()
      setPlaying(false)
    }

    if (state === State.Paused || state === State.Ready) {
      TrackPlayer.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    const addTrack = async () => {
      const track = {
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        title: 'Avaritia',
        artist: 'deadmau5',
        album: 'while(1<2)',
        genre: 'Progressive House, Electro House',
        date: '2014-05-20T07:00:00+00:00',
        artwork: 'http://example.com/cover.png',
      }

      await TrackPlayer.reset()
      const currentTrack = await TrackPlayer.getTrack(0)
      if (!currentTrack) await TrackPlayer.add(track)
    }
    if (trackPlayerInit) addTrack()
  }, [playlist, trackIndex, trackPlayerInit])

  const handleSeekTo = async (value: number) => {
    await TrackPlayer.seekTo(value)
  }

  return (
    <Container>
      <MusicImage uri="https://images.unsplash.com/photo-1618614944895-fc409a83ad80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80" />

      <AudioPlayerTimerContainer>
        <AudioPlayerTimerText>
          {timeToString(progress.position)}
        </AudioPlayerTimerText>
        <AudioPlayerTimerText>
          {timeToString(progress.duration)}
        </AudioPlayerTimerText>
      </AudioPlayerTimerContainer>

      <AudioPlayerContainer>
        <AudioPlayerSliderContainer>
          <Slider
            minimumValue={0}
            maximumValue={progress.duration || 0}
            minimumTrackTintColor="#52527a"
            maximumTrackTintColor="#52527a"
            thumbTintColor="#52527a"
            value={progress.position || 0}
            onSlidingComplete={handleSeekTo}
          />
        </AudioPlayerSliderContainer>
        <AudioPlayerButtonsContainer>
          <SkipPrevIcon />
          <TouchableOpacity onPress={onPlayPausePress}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </TouchableOpacity>

          {/* <PauseIcon /> */}
          <SkipForwardIcon />
        </AudioPlayerButtonsContainer>
      </AudioPlayerContainer>
    </Container>
  )
}
