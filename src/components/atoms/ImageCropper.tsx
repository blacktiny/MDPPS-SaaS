/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import ReactCrop from 'react-image-crop'
import { Loader as LoaderR } from 'rsuite'
import 'react-image-crop/dist/ReactCrop.css'

interface Props {
  avatarImage: string
  crop: Crop
  maxHeight?: number
  maxWidth?: number
  setCropData: (data: Crop) => void
  setScale: (data: Scale) => void
  setLoadedData: (data: HTMLImageElement) => void
  isCircle?: boolean
}

export interface Crop {
  aspect?: number
  x?: number
  y?: number
  width?: number
  height?: number
  unit?: 'px' | '%'
}

export interface Scale {
  scaleX: number
  scaleY: number
}

export interface AvatarCropperImageFunction {
  getImageDetails(): {
    imageURL: string
    crop: { x: number; y: number }
    canvas: HTMLCanvasElement
  }
}

const AvatarCropperContainer = styled.div`
  overflow: hidden;
  width: calc(600px + 27.604vw);
  height: calc(250px + 5.208vw);
  background-color: #d7d7d7;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 992px) {
    width: 100%;
  }
`

const ImageCropLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: calc(600px + 27.604vw);
  height: calc(250px + 5.208vw);

  @media (max-width: 992px) {
    width: 100%;
  }
`

const Loader = styled(LoaderR)`
  .rs-loader-spin {
    min-width: 1.125rem;
  }
`

export const useMediaQuery = (query: string) => {
  const mediaMatch = window.matchMedia(query)
  const [matches, setMatches] = useState(mediaMatch.matches)

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mediaMatch.addListener(handler)
    return () => mediaMatch.removeListener(handler)
  })

  return matches
}

const ImageCropper = (props: Props) => {
  const {
    avatarImage,
    crop,
    isCircle = true,
    maxHeight = 320,
    maxWidth = 840,
    setCropData,
    setLoadedData,
    setScale
  } = props
  const [imageLoaded, setImageLoaded] = useState(true)

  const isMobileView = useMediaQuery('(max-width: 768px)')
  const isSmallDesktop = useMediaQuery('(max-width: 992px)')

  const cropImageStyles = useMemo(() => {
    let customStyles = {
      maxHeight: maxHeight >= 250 ? `calc(250px + ${((maxHeight - 250) / 1920) * 100}vw)` : '250px',
      overflow: 'hidden',
      maxWidth: maxWidth >= 840 ? `calc(600px + ${((maxWidth - 600) / 1920) * 100}vw)` : '840px'
    }

    if (isSmallDesktop) {
      customStyles = {
        maxHeight: maxHeight >= 250 ? `calc(250px + ${((maxHeight - 250) / 1920) * 100}vw)` : '250px',
        overflow: 'hidden',
        maxWidth: '100%'
      }
    }

    if (isMobileView) {
      customStyles = {
        maxHeight: maxHeight >= 200 ? `calc(200px + ${((maxHeight - 250) / 1920) * 100}vw)` : '200px',
        overflow: 'hidden',
        maxWidth: '100%'
      }
    }

    return customStyles
  }, [isMobileView, isSmallDesktop, maxHeight, maxWidth])

  const onImageLoaded = (image: HTMLImageElement) => {
    setImageLoaded(false)
    setLoadedData(image)
    const aspect = isCircle ? 1 : Math.abs(image.naturalWidth / image.naturalHeight)

    let SquareCropSide = image.width

    if (image.width > image.height) {
      SquareCropSide = image.height
    }

    const SquareCropCenter = SquareCropSide / 2
    const imageXCenter = image.width / 2
    const imageYCenter = image.height / 2
    const y = imageYCenter - SquareCropCenter
    const x = imageXCenter - SquareCropCenter

    const cropData = {
      x,
      y,
      aspect
    }
    if (image.width > image.height) {
      setCropData({ ...cropData, unit: 'px', width: SquareCropSide })
    } else {
      setCropData({ ...cropData, unit: 'px', height: SquareCropSide })
    }
    setScale({
      scaleX: image.naturalWidth / image.width,
      scaleY: image.naturalHeight / image.height
    })
    return false
  }

  const onCropComplete = (cropData: Crop) => {
    setCropData(cropData)
  }

  const onCropChange = (cropData: Crop) => {
    setCropData(cropData)
  }

  return (
    <AvatarCropperContainer style={{ height: cropImageStyles.maxHeight, width: cropImageStyles.maxWidth }}>
      <ImageCropLoading style={{ height: cropImageStyles.maxHeight, width: cropImageStyles.maxWidth }}>
        {imageLoaded && <Loader center content="loading" />}
        <ReactCrop
          minWidth={30}
          minHeight={30}
          circularCrop={isCircle}
          keepSelection={true}
          ruleOfThirds={isCircle}
          crossorigin={'anonymous'}
          // style={{ maxHeight: '350px' }}
          imageStyle={cropImageStyles}
          src={avatarImage}
          crop={crop}
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
      </ImageCropLoading>
    </AvatarCropperContainer>
  )
}

export default ImageCropper
