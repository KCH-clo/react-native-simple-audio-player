import {atom} from 'recoil'

interface Track {
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

export const currentTrackIndexState = atom<number>({
  key: 'current-track-index',
  default: 0,
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
