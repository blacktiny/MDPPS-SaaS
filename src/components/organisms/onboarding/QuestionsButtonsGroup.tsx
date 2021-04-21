/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import styled from '@emotion/styled'
import { UISubheader01 } from '../../../assets/styles/typography'
import Button from '../../atoms/Button'
import { SmallButtonWrapper, FlexBetween, boxModel } from '../../../utils/style'
import { navigate } from '@reach/router'

const ActionButton = styled.div`
  ${SmallButtonWrapper}
  justify-content: flex-end;
  button:not(:first-of-type) {
    width: 190px;
    padding: 0.7rem 0.5rem;
  }

  & > button:not(:last-child) {
    margin-right: calc(1.3125rem + 0.46875vw);
  }

  .rs-btn-link:hover {
    text-decoration: auto;
  }

  .back {
    color: #657786;
    font-weight: 700;
    border: 1px solid #dde3e9;
  }

  .next {
    color: #f3f3f4;
    font-weight: 700;
  }
`

const QuestionsButtonsGroupWrapper = styled('div')<{ maxWidth: string }>`
  ${FlexBetween}
  margin-left: auto;
  max-width: ${({ maxWidth }) => maxWidth};
`

interface Props {
  firstStep?: boolean
  lastStep?: boolean
  skipPath?: string
  backPath: string
  skipText?: string
  type?: 'oneCol' | 'twoCol' | 'threeCol'
  disable?: boolean
  withNewSkip?: boolean
  handleNextAction?: () => void
}

const widthOptions = {
  oneCol: boxModel('514px'),
  twoCol: boxModel('1068px'),
  threeCol: ''
}

const QuestionsButtonsGroup: React.FC<Props> = ({
  firstStep,
  lastStep,
  skipPath,
  backPath,
  withNewSkip,
  skipText,
  type,
  disable
}) => {
  const gotoOtherStep = path => navigate(path)

  return (
    <QuestionsButtonsGroupWrapper maxWidth={widthOptions[type]}>
      <div>
        {!withNewSkip && skipPath && (
          <p className="d-flex " css={UISubheader01}>
            {skipText}
            <Button link className="skip-link" onClick={() => gotoOtherStep(skipPath)}>
              Skip
            </Button>
          </p>
        )}
      </div>
      <ActionButton>
        {withNewSkip && (
          <Button link className="skip-link" onClick={() => gotoOtherStep(skipPath)}>
            {skipText}
          </Button>
        )}
        <Button className="back" secondary pairs onClick={() => gotoOtherStep(backPath)}>
          Back
        </Button>
        {!firstStep && (
          <Button className="next" pairs type="submit" disabled={disable}>
            {lastStep ? 'Finish' : 'Next'}
          </Button>
        )}
      </ActionButton>
    </QuestionsButtonsGroupWrapper>
  )
}

export default QuestionsButtonsGroup
