import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const DimmedSubTopicComponent = styled.h5`
  font-size: 0.75rem;
  color: #0f203c;
  font-family: roboto;
  font-weight: normal;
`
const DimmedSubTopic: FunctionComponent = props => {
  return <DimmedSubTopicComponent>{props.children}</DimmedSubTopicComponent>
}
export default DimmedSubTopic
