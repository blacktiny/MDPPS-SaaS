/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React, { FunctionComponent, useEffect, useState, memo } from 'react'
import styled from '@emotion/styled'
import { Avatar } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'
import ContainerLoader from './ContainerLoader'
const userSilhouette = require('../../assets/images/default-user-pic.svg')

interface Props {
  image?: string
  alt?: string
  length?: string
  onClick?: () => void
  disableCameraIcon?: boolean
}

const RoundAvatarContainer = styled.div`
  position: relative;
  display: inline-block;
`
const CameraIcon = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 2.25rem;
  height: 2.25rem;
  background-color: #fff;
  border-radius: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 5px #00000033;
  .icon-nav-digital-asset-manager {
    font-size: 1.063rem;
    cursor: pointer;
  }
`
const RoundAvatar: FunctionComponent<Props> = props => {
  const [imageLoading, setImageLoading] = useState(false)
  const { image, alt = '', onClick, disableCameraIcon } = props
  const handelOnClick = () => {
    onClick && onClick()
  }

  useEffect(() => {
    if (image) {
      handelOnImageChange()
    }
  }, [image])

  const handelOnImageLoad = () => {
    setImageLoading(false)
  }

  const handelOnImageChange = () => {
    setImageLoading(true)
  }

  return (
    <React.Fragment>
      <RoundAvatarContainer onClick={handelOnClick}>
        <Avatar
          css={css`
            width: 7.8125rem;
            height: 7.8125rem;
            border: 0.25rem solid #fff;
            box-shadow: 0px 3px 6px #00000029;
            border: 4px solid #f9f9fa;
            background: #f5f8fa;
            cursor: pointer;
          `}
          circle
        >
          <ContainerLoader size="md" showLoading={imageLoading} />
          <img
            onLoad={handelOnImageLoad}
            src={image || userSilhouette}
            alt={alt}
            css={css`
              object-fit: cover;
              width: 100%;
              height: 100%;
            `}
          />
        </Avatar>
        {!disableCameraIcon && (
          <CameraIcon className="uplodicon">
            <span className={'icon-nav-digital-asset-manager'} />
          </CameraIcon>
        )}
      </RoundAvatarContainer>
    </React.Fragment>
  )
}
export default memo(RoundAvatar)
