import React from 'react'
import RLoader, { LoaderProps } from 'rsuite/lib/Loader'
import styled from '@emotion/styled'

export interface Props extends LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const BaseLoader = styled(RLoader)`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease;
  top: 0;
  left: 0;
`

export const Loader: React.FC<Props> = props => (
  <BaseLoader inverse={true} size="md" {...props} />
)
