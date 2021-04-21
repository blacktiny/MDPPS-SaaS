import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import variables from 'assets/styles/variables'

// Components
import UploadPictureLayout from '../../molecules/Onboarding/UploadPictureLayout'
import ProfileImageDropzone from '../../molecules/Onboarding/ProfileImageDropzone'

import { File } from 'components/molecules/Onboarding/ProfileImageDropzone'

import './style.scss'

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

const InstrucionText = styled.p`
  font-size: 12px;
  font-family: 'Roboto Regular', 'Roboto', sans-serif;
  color: #657786;
  text-align: center;
  line-height: 22px;
`

interface Props {
  show: boolean
  imgSrc?: string
  handleClose: (show: boolean) => void
  cropImage?: (file: File, image: string) => void
  updateCroppedAreaPixels?: (data: unknown) => void
  logo?: boolean
}

const UploadProfileImageModal: FunctionComponent<Props> = props => {
  const { show, imgSrc, handleClose, cropImage, updateCroppedAreaPixels, logo = false } = props
  const [files, setFiles] = useState(imgSrc ? [{ preview: imgSrc }] : [])
  const handleCloseModal = () => {
    handleClose(false)
  }

  return (
    <UploadPictureLayout show={show} size={'md'} handleOnHide={handleCloseModal}>
      <UploadImageContainer>
        <UploadTitle>
          {files.length === 0 ? 'Upload' : 'Edit'} {logo ? 'Logo Image' : 'Profile Image'}
        </UploadTitle>

        <InstrucionText>
          {files.length === 0
            ? 'Your photo should be a PNG, JPG, or SVG file. For the best quality rendering, we recommend a minimum image size of 215px by 215px.'
            : `To crop the image, drag your ${logo ? 'logo' : 'photo'} to fit the fixed region and then click “Set ${
                logo ? 'Logo' : 'Photo'
              }”`}
        </InstrucionText>

        <ProfileImageDropzone
          handleOnSuccess={() => {}}
          files={files}
          updateCroppedAreaPixels={updateCroppedAreaPixels}
          cropImage={(file, image) => {
            setFiles(file ? [file] : [])
            cropImage(file, image)
          }}
          closeModal={handleCloseModal}
          cropShape={logo ? 'rect' : 'round'}
          type={logo ? 'logo' : 'photo'}
        />
      </UploadImageContainer>
    </UploadPictureLayout>
  )
}
export default UploadProfileImageModal
