import {ScrollView, Text, Platform, PermissionsAndroid} from 'react-native'
import React from 'react'
import DocumentPicker from 'react-native-document-picker'
import {useRecoilState} from 'recoil'
import {playlistState} from '../atoms/audio-player-states'
import {TouchableOpacity} from 'react-native-gesture-handler'

export default function PlayList() {
  const [playList, setPlaylist] = useRecoilState(playlistState)

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]).then(result => {
        if (
          result['android.permission.WRITE_EXTERNAL_STORAGE'] &&
          result['android.permission.READ_EXTERNAL_STORAGE'] === 'granted'
        ) {
          console.log('모든 권한 획득')
        } else {
          console.log('권한거절')
        }
      })
    }
  }
  const filePicker = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      })

      if (res.type === 'audio/mpeg') {
        setPlaylist(prev => [
          ...prev,
          {url: res.uri, imageUrl: '', name: res.name || ''},
        ])
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        console.log('Unknown Error: ' + JSON.stringify(err))
        throw err
      }
    }
  }
  const func = async () => {
    await requestPermission()
    await filePicker()
  }
  return (
    <ScrollView>
      {playList.map((track, idx) => (
        <Text key={idx}>{`${idx + 1}.${track.name}`}</Text>
      ))}

      <TouchableOpacity onPress={func}>
        <Text>Add a music file</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
