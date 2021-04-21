import React, { useCallback, useState, FunctionComponent, Fragment, useEffect } from 'react'
import styled from '@emotion/styled'
import { useDropzone } from 'react-dropzone'
import Cropper from 'react-easy-crop'
import rfs from 'utils/style'
import variables from 'assets/styles/variables'
import { getCroppedImg } from 'utils/cropper/cropImage'
import { capitalize } from 'utils/helpers'

// Components
import DropZoneBackground from '../../atoms/DropZoneBackground'
import Button from '../../atoms/Button'

const { Fonts, Colors } = variables

export interface File {
  preview: string
}

interface Props {
  type?: 'cover' | 'logo' | 'photo'
  classes?: string
  handleOnSuccess?: () => void
  files: File[]
  aspect?: number
  cropImage?: (file: File, image: string, isDeleted?: boolean) => void
  closeModal: () => void
  updateCroppedAreaPixels?: (data: unknown) => void
  cropShape?: 'rect' | 'round'
}

const DropZoneContainer = styled.div`
  position: relative;
  margin: 58px auto;
  min-width: 730px;
  max-width: 840px;
  min-height: 415px;
`

const CropZoneContainer = styled.div`
  position: relative;
  margin: 58px auto;
  min-width: 730px;
  max-width: 840px;
  min-height: 320px;

  &.crop-cover {
    max-width: 1130px;
    min-height: 350px;

    .crop-container {
      height: 350px;

      .reactEasyCrop_Image,
      .reactEasyCrop_Video {
        max-height: unset;
      }
    }
  }
`

const ActionButton = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    width: 185px;
    margin-left: 35px;
    height: 50px;
    padding-top: 0.9rem;
    min-height: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`

const ButtonRow = styled.div`
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  margin-top: ${rfs('95px')};
`

const CropContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 320px;
  background: #d7d7d7;
`

const DeletePhoto = styled.p`
  color: ${Colors.Blue[200]};
  font-size: ${Fonts.Size.XSmall};
  text-align: left;
  line-height: 20px;
  font-family: 'Roboto Regular', 'Roboto', sans-serif;
  cursor: pointer;
`

const ProfileImageDropzone: FunctionComponent<Props> = props => {
  const {
    type = 'photo',
    classes = '',
    files,
    aspect = 1,
    cropImage,
    closeModal,
    updateCroppedAreaPixels,
    cropShape
  } = props

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [localFiles, setLocalFiles] = useState<File[]>([])

  useEffect(() => {
    setLocalFiles(files)
  }, [files])

  const onDrop = useCallback(
    acceptedFiles => {
      if (acceptedFiles.length > 0) {
        const img = new Image()
        img.onload = () => {
          const imgHeight = img.naturalHeight || img.height
          const imgWidth = img.naturalWidth || img.width

          if (type === 'cover') {
            if (imgHeight >= 512 && imgWidth >= 1920) {
              // if size of image is bigger than 9MB
              if (acceptedFiles[0].size < 9 * 1024 * 1024) {
                setLocalFiles(
                  acceptedFiles.map((file: unknown) =>
                    Object.assign(file, {
                      preview: URL.createObjectURL(file)
                    })
                  )
                )
              } else {
                alert('A maximum size of image is 9MB.')
              }
            } else {
              alert('The image size should be minimum 1920 x 512.')
            }
          } else {
            if (imgHeight >= 512 && imgWidth >= 512) {
              // if size of image is bigger than 9MB
              if (acceptedFiles[0].size < 9 * 1024 * 1024) {
                setLocalFiles(
                  acceptedFiles.map((file: unknown) =>
                    Object.assign(file, {
                      preview: URL.createObjectURL(file)
                    })
                  )
                )
              } else {
                alert('A maximum size of image is 9MB.')
              }
            } else {
              alert('The image size should be minimum 512 x 512.')
            }
          }
        }
        img.src = URL.createObjectURL(acceptedFiles[0])
      }
    },
    [setLocalFiles, type]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false, accept: 'image/*' })

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [cropZoom, setCropZoom] = useState(1)

  const onCropChange = useCallback(crop => {
    setCrop(crop)
  }, [])

  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      if (croppedAreaPixels.width && croppedAreaPixels.height) {
        setCroppedAreaPixels(JSON.parse(JSON.stringify(croppedAreaPixels)))
        updateCroppedAreaPixels(JSON.parse(JSON.stringify(croppedAreaPixels)))
      }
    },
    [updateCroppedAreaPixels]
  )

  const onZoomChange = useCallback(zoom => {
    setCropZoom(zoom)
  }, [])

  return (
    <Fragment>
      {localFiles.length === 0 ? (
        <DropZoneContainer {...getRootProps()}>
          <DropZoneBackground drop={isDragActive} />
          <input {...getInputProps()} />
        </DropZoneContainer>
      ) : (
        <>
          <CropZoneContainer className={classes}>
            <CropContainer className="crop-container">
              {localFiles.length > 0 && (
                <Cropper
                  image={localFiles[0].preview}
                  crop={crop}
                  zoom={cropZoom}
                  aspect={aspect}
                  cropShape={cropShape}
                  showGrid={false}
                  onCropChange={onCropChange}
                  onCropComplete={onCropComplete}
                  onZoomChange={onZoomChange}
                />
              )}
            </CropContainer>

            <ButtonRow>
              <DeletePhoto
                onClick={() => {
                  cropImage(null, '', true)
                }}
              >
                Delete Current {capitalize(type)}
              </DeletePhoto>
              <ActionButton>
                <Button
                  secondary
                  pairs
                  onClick={() => {
                    closeModal()
                  }}
                >
                  Cancel
                </Button>
                <Button
                  pairs
                  onClick={async () => {
                    const croppedImage = await getCroppedImg(localFiles[0].preview, croppedAreaPixels)
                    cropImage(localFiles[0], croppedImage)
                    closeModal()
                  }}
                  className="ml-20"
                >
                  Set {capitalize(type)}
                </Button>
              </ActionButton>
            </ButtonRow>
          </CropZoneContainer>
        </>
      )}
    </Fragment>
  )
}
export default ProfileImageDropzone
