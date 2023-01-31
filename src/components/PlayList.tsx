import {
  ScrollView,
  Text,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useRecoilState} from 'recoil'
import {playlistState} from '../atoms/audio-player-states'
import RNMusicFileFinder, {MusicInfo} from 'react-native-music-file-finder'

export default function PlayList() {
  const [musicInfos, setMusicInfos] = useState<MusicInfo[]>([])
  const [playList, setPlaylist] = useRecoilState(playlistState)

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ])
      if (
        result['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
        result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
      ) {
        console.log('granted')
      }
    }
  }

  useEffect(() => {
    const func = async () => {
      await requestPermission()
      setMusicInfos(await RNMusicFileFinder.getAllMusics(false))
    }
    func()
  }, [])
  return (
    <ScrollView>
      <Text>{`\nPlay List\n`}</Text>
      {playList.map((track, idx) => (
        <Text key={idx}>{`${idx + 1}.${track.name}`}</Text>
      ))}

      <Text>{`\nAll Music Files In This Device\n`}</Text>
      {musicInfos.map((musicInfo, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setPlaylist(prev => [
                ...prev,
                {
                  url: musicInfo.path,
                  name: musicInfo.title,
                  imageUrl: '',
                },
              ])
            }}>
            <Text>{`+ ${musicInfo.title}`}</Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}