import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import dropzone from '../../assets/images/dropzone_dashed.svg'
import cloud from '../../assets/icons/upload_cloud.svg'

interface Props {
  drop: boolean
}
const DropZoneImage = styled.img`
  position: absolute;
  z-index: -1000;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`
const DropZoneContainer = styled.div``

const CloudContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  max-height: 100px;
  max-width: 100px;
  width: 9rem;
  height: 9rem;
  border-radius: 100%;
  left: 45%;
  top: 30%;
  background: #e1e8ed;
`

const Text = styled.p`
  position: absolute;
  margin: 0 auto;
  font-size: 14px;
  color: #333333;
  top: 110px;
  min-width: 272px;
  height: 17px;
  background-color: rgba(255, 255, 255, 0);
  box-sizing: border-box;
  font-family: 'Roboto Regular', 'Roboto', sans-serif;
  color: #333333;
  text-align: center;
  line-height: 14px;
  span {
    color: #4284fc;
    font-weight: 600;
  }
`
const DropZoneBackground: FunctionComponent<Props> = props => {
  const { drop } = props
  return (
    <DropZoneContainer>
      <CloudContainer>
        <img src={cloud} alt="Upload" />
        <Text>
          {drop ? (
            'Drop your files here'
          ) : (
            <>
              Drag your image here or <span>browse</span> to upload
            </>
          )}
        </Text>
      </CloudContainer>
      <DropZoneImage src={dropzone} alt="closeIcon" />
    </DropZoneContainer>
  )
}

export default DropZoneBackground
