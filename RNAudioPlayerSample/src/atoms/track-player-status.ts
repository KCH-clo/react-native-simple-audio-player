import {atom} from 'recoil'

export const trackPlayerInitState = atom<boolean>({
  key: 'track-player-init',
  default: false,
})
