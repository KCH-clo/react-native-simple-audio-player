import {useWindowDimensions} from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import MusicIcon from '../assets/images/noun_project_928.png'

const Container = styled.View<ImageContainerProps>`
  width: 100%;
  padding: 10px;
  height: ${(props: ImageContainerProps) => props.height || '50px'};
  justify-content: center;
  align-items: center;
`

interface ImageContainerProps {
  width?: string
  height?: string
}

const ImageContainer = styled.Image`
  width: 100%;
  height: 100%;
`

const DefaultImageContainer = styled.Image`
  width: 100px;
  height: 100px;
`

interface MusicImageProps {
  uri: string
}

export default function MusicImage({uri}: MusicImageProps) {
  const {width} = useWindowDimensions()

  return (
    <Container height={`${width}px`}>
      {uri ? (
        <ImageContainer source={{uri}} />
      ) : (
        <DefaultImageContainer source={MusicIcon} />
      )}
    </Container>
  )
}
