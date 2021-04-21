import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface Props {
  image: string
  imgAltMsg?: string
  isGeoPattern?: boolean
  onEditPhotoClicked?: () => void
  reload?: () => void
}

const CoverImageContainer = styled.div`
  position: relative;
`

const CoverImage = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 14.125rem;
  background-repeat: repeat;
  background-size: cover;
  background-position: center;

  &.geo-pattern {
    background-repeat: repeat;
    background-size: auto;
    background-position: inherit;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 5.5rem;
    background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  }
`

const ReloadButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 4.5rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 5px #00000033;

  .icon-nav-rma {
    color: #282828;
    font-size: 1.25rem;
    cursor: pointer;
  }
`

const CameraButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 5px #00000033;

  .icon-nav-digital-asset-manager {
    color: #282828;
    font-size: 1.25rem;
    cursor: pointer;
  }
`

const CoverImageHeaderDesc: FunctionComponent<Props> = props => {
  const { image = '', isGeoPattern = true, onEditPhotoClicked, reload } = props

  return (
    <CoverImageContainer>
      <CoverImage
        className={isGeoPattern ? 'geo-pattern' : ''}
        style={{ backgroundImage: `url(${image})`, backgroundColor: 'white' }}
      />
      {isGeoPattern && (
        <ReloadButton onClick={reload}>
          <span className={'icon-nav-rma'} />
        </ReloadButton>
      )}
      <CameraButton onClick={onEditPhotoClicked}>
        <span className={'icon-nav-digital-asset-manager'} />
      </CameraButton>
    </CoverImageContainer>
  )
}

export default CoverImageHeaderDesc
