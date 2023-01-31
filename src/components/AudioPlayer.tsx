import {useRecoilState, useRecoilValue} from 'recoil'
import React, {useCallback, useEffect, useState} from 'react'
import PlayIcon from '../assets/svgs/play-svgrepo-com.svg'
import PauseIcon from '../assets/svgs/pause-svgrepo-com.svg'
import SkipForwardIcon from '../assets/svgs/skip-forward-svgrepo-com.svg'
import SkipPrevIcon from '../assets/svgs/skip-previous-svgrepo-com.svg'
import ShuffleIcon from '../assets/images/shuffle.png'
import ExchangeIcon from '../assets/images/exchange.png'
import Slider from '@react-native-community/slider'
import styled from 'styled-components/native'
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player'
import {
  currentTrackIndexState,
  playlistState,
} from '../atoms/audio-player-states'
import MusicImage from './MusicImage'
import {timeToString} from '../utils/time'
import {Image, Text, TouchableOpacity} from 'react-native'
import {getRandomInt} from '../utils/random'

const Container = styled.View`
  padding: 0 10px;
  align-items: center;
`

const AudioPlayerContainer = styled.View`
  width: 100%;
  height: 71px;
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
  width: 100%;
  padding: 0 18px;
`

const AudioPlayerTimerText = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;

  color: #000000;
`

const Title = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;

  color: #ff00ff;
`

export default function AudioPlayer() {
  const playlist = useRecoilValue(playlistState)
  const [trackIndex, setTrackIndex] = useRecoilState(currentTrackIndexState)
  const [isPlaying, setPlaying] = useState<boolean>(false)
  const [isShuffle, setShuffle] = useState<boolean>(false)

  const progress = useProgress(200)
  const playState = usePlaybackState()

  const onPlayPausePress = async () => {
    if (!playlist.length) return

    const state = await TrackPlayer.getState()

    if (state === State.Playing) {
      TrackPlayer.pause()
      setPlaying(false)
    }

    if (state === State.Paused || state === State.Ready) {
      TrackPlayer.play()
      setPlaying(true)
    }

    if (state === State.None) {
      await play(trackIndex)
      TrackPlayer.play()
      setPlaying(true)
    }
  }

  const toggleShuffle = async () => {
    setShuffle(Boolean(!isShuffle))
  }

  const play = useCallback(
    async (index: number) => {
      if (!playlist.length || index < 0 || index >= playlist.length) return

      const track = {
        url: playlist[index].url,
        title: 'music',
        artist: 'artist',
      }

      await TrackPlayer.reset()
      await TrackPlayer.add(track)
    },
    [playlist],
  )

  const playNext = useCallback(async () => {
    if (!playlist.length) return

    const nextIndex = (trackIndex + 1) % playlist.length
    setTrackIndex(nextIndex)
    await play(nextIndex)
  }, [play, playlist, trackIndex, setTrackIndex])

  const playPrev = useCallback(async () => {
    if (!playlist.length) return

    const prevIndex = Math.max(0, trackIndex - 1)
    setTrackIndex(prevIndex)
    await play(prevIndex)
  }, [play, playlist, trackIndex, setTrackIndex])

  const handleSeekTo = async (value: number) => {
    await TrackPlayer.seekTo(value)
  }

  const handleNext = useCallback(async () => {
    await playNext()
    if (isPlaying) await TrackPlayer.play()
  }, [isPlaying, playNext])

  const handlePrev = async () => {
    await playPrev()
    if (isPlaying) await TrackPlayer.play()
  }

  const playRandomly = async () => {
    if (!playlist.length) return

    const randInt = getRandomInt(0, playlist.length)
    setTrackIndex(randInt)
    await play(randInt)
    if (isPlaying) await TrackPlayer.play()
  }

  useEffect(() => {
    const keepPlaying = async () => {
      await TrackPlayer.pause()
      if (isShuffle) playRandomly()
      else handleNext()
    }

    if (
      playState === State.Stopped &&
      progress.position + 0.5 > progress.duration
    ) {
      keepPlaying()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playState])

  return (
    <Container>
      <Text>
        {playlist.length
          ? `${trackIndex + 1}/${playlist.length}`
          : 'Add music files'}
      </Text>
      <MusicImage uri={playlist[trackIndex]?.imageUrl || ''} />

      <Title numberOfLines={1}>{playlist[trackIndex]?.name || 'music'}</Title>

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
          <TouchableOpacity onPress={toggleShuffle}>
            <Image
              source={isShuffle ? ShuffleIcon : ExchangeIcon}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePrev}>
            <SkipPrevIcon />
          </TouchableOpacity>

          <TouchableOpacity onPress={onPlayPausePress}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext}>
            <SkipForwardIcon />
          </TouchableOpacity>
        </AudioPlayerButtonsContainer>
      </AudioPlayerContainer>
    </Container>
  )
}
