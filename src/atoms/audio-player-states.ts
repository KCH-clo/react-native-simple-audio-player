import {atom} from 'recoil'

export interface Track {
  url: string
  imageUrl: string
  name: string
}

interface PlayerStatus {
  isPlaying: boolean
  totalTime: number
  currentTime: number
  url: string
  imageUrl: string
}

export const playlistState = atom<Track[]>({
  key: 'play-list',
  default: [],
})

export const shuffledPlaylistState = atom<Track[]>({
  key: 'shuffled-playlist',
  default: [],
})

export const currentTrackIndexState = atom<number>({
  key: 'current-track-index',
  default: 0,
})

export const currentShuffledTrackIndexState = atom<number>({
  key: 'current-shuffled-track-index',
  default: 0,
})

export const currentTrackState = atom<Track>({
  key: 'current-track',
  default: {url: '', imageUrl: '', name: ''},
})

export const playerStatusState = atom<PlayerStatus>({
  key: 'player-status',
  default: {
    isPlaying: false,
    totalTime: 0,
    currentTime: 0,
    url: '',
    imageUrl: '',
  },
})
