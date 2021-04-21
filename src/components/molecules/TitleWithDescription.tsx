import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import BoldTopic from '../atoms/BoldTopic'
import DimmedSubTopic from '../atoms/DimmedSubTopic'
export interface Props {
  topic: string
}

const TitleWithDescriptionContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
`

const TitleWithDescription: FunctionComponent<Props> = props => {
  const { topic } = props
  return (
    <TitleWithDescriptionContainer>
      <BoldTopic>{topic}</BoldTopic>
      <DimmedSubTopic>{props.children}</DimmedSubTopic>
    </TitleWithDescriptionContainer>
  )
}
export default TitleWithDescription
