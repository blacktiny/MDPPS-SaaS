import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import variables from 'assets/styles/variables'

// Components
import UploadPictureLayout from 'components/molecules/Onboarding/UploadPictureLayout'
import ProfileImageDropzone from 'components/molecules/Onboarding/ProfileImageDropzone'
import { File } from 'components/molecules/Onboarding/ProfileImageDropzone'

import 'components/organisms/onboarding-questions/style.scss'

const { Colors } = variables

const UploadImageContainer = styled.div`
  margin: 9% auto;
  width: 80%;
  min-height: 500px;
  max-width: 1130px;
  max-height: 700px;
`

const UploadTitle = styled.p`
  font-size: 34px;
  font-family: 'Roboto Regular', 'Roboto', sans-serif;
  color: ${Colors.Blue[300]};
  text-align: center;
  line-height: 34px;
  margin-top: 50px;
  margin-bottom: 26px;
`

const InstrucionText = styled.div`
  p {
    font-size: 14px;
    font-family: 'Roboto Regular', 'Roboto', sans-serif;
    color: #657786;
    text-align: center;
    line-height: 22px;
  }
`

interface Props {
  show: boolean
  imgSrc?: string
  handleClose: (show: boolean) => void
  cropImage?: (file: File, image: string, isDeleted?: boolean) => void
  updateCroppedAreaPixels?: (data: unknown, isCover: boolean) => void
  cover?: boolean
}

const UserUploadImageModal: FunctionComponent<Props> = props => {
  const { show, imgSrc, handleClose, cropImage, updateCroppedAreaPixels, cover = false } = props

  const [files, setFiles] = useState(imgSrc ? [{ preview: imgSrc }] : [])

  useEffect(() => {
    setFiles(imgSrc ? [{ preview: imgSrc }] : [])
  }, [imgSrc])

  const handleCloseModal = () => {
    handleClose(false)
  }

  const instruction = useMemo(() => {
    if (cover) {
      if (files.length > 0) {
        return (
          <React.Fragment>
            <p>To crop the image, drag it to fit the fixed region and then click “Set Cover”.</p>
            <p>
              Your photo should be a PNG, JPG, or SVG file with minimum dimensions of 2560px by 512px and a maximum size
              of 9MB.
            </p>
          </React.Fragment>
        )
      } else {
        return (
          <p>
            Your photo should be a PNG, JPG, or SVG file with minimum dimensions of 1920px by 512px and a maximum size
            of 9MB.
          </p>
        )
      }
    } else {
      if (files.length > 0) {
        return <p>To crop your profile image, drag it to fit the fixed region and then click on “Set Photo”.</p>
      } else {
        return (
          <p>
            Your photo should be a PNG, JPG, or SVG file with minimum dimensions of 512px by 512px and a maximum size of
            9MB.
          </p>
        )
      }
    }
  }, [cover, files])

  return (
    <UploadPictureLayout show={show} size={'md'} handleOnHide={handleCloseModal}>
      <UploadImageContainer>
        <UploadTitle>
          {files.length === 0 ? 'Upload' : 'Edit'} {cover ? 'Cover Image' : 'Your Profile Image'}
        </UploadTitle>

        <InstrucionText>{instruction}</InstrucionText>

        <ProfileImageDropzone
          classes={cover ? 'crop-cover' : ''}
          handleOnSuccess={() => {}}
          files={files}
          aspect={cover ? 5 / 1 : 1}
          updateCroppedAreaPixels={data => updateCroppedAreaPixels(data, cover)}
          cropImage={(file, image, isDeleted = false) => {
            setFiles(file ? [file] : [])
            cropImage(file, image, isDeleted)
          }}
          closeModal={handleCloseModal}
          type={cover ? 'cover' : 'photo'}
          cropShape={cover ? 'rect' : 'round'}
        />
      </UploadImageContainer>
    </UploadPictureLayout>
  )
}

export default UserUploadImageModal
