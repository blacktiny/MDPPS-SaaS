/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { QuestionMB, MbRevert, mq } from '../../../utils/style'
import styled from '@emotion/styled'

const ColPaddingRight = styled.div`
  ${mq({
    paddingRight: [`15px`, ``, ``, ``, `27px`],
    paddingLeft: [`15px`, ``, ``, ``, `20px`]
  })}
`
const ColPaddingLeft = styled.div`
  ${mq({
    paddingLeft: [`15px`, ``, ``, ``, `27px`],
    paddingRight: [`15px`, ``, ``, ``, `20px`]
  })}
`
const ColPaddingCenter = styled.div`
  ${mq({
    paddingLeft: [`15px`, ``, ``, ``, `23.5px`],
    paddingRight: [`15px`, ``, ``, ``, `23.5px`]
  })}
`

interface Props {
  title?: string
  description?: Array<JSX.Element | string> | string
  firstQuestion: JSX.Element
  secondQuestion: JSX.Element
  thirdQuestion: JSX.Element
  firstStep?: boolean
  lastStep?: boolean
  isNotRevert?: boolean
}

const OnboardingQuestionsThreeColumn: React.FC<Props> = ({
  firstQuestion,
  secondQuestion,
  thirdQuestion,
  isNotRevert
}) => {
  return (
    <div className="row" css={!isNotRevert ? MbRevert : ''}>
      <ColPaddingRight className="col-md-4">
        <div css={QuestionMB}>{firstQuestion}</div>
      </ColPaddingRight>
      <ColPaddingCenter className="col-md-4">
        <div css={QuestionMB}>{secondQuestion}</div>
      </ColPaddingCenter>
      <ColPaddingLeft className="col-md-4">
        <div css={QuestionMB}>{thirdQuestion}</div>
      </ColPaddingLeft>
    </div>
  )
}

export default OnboardingQuestionsThreeColumn
