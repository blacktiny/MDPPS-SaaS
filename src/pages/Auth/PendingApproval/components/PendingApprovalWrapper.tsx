/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import rfs, {
  boxModel,
  convertLineHeightToCss,
  convertPxToAbs,
  ButtonWrapper
} from '../../../../utils/style'
import styled from '@emotion/styled'
import variables from '../../../../assets/styles/variables'
import Button from '../../../../components/atoms/Button'
import { UISubheader02 } from '../../../../assets/styles/typography'

const { Fonts, Colors } = variables

const Title = styled.h1`
  color: ${Colors.Blue[200]};
  font-weight: ${Fonts.Weight.Regular};
  font-size: ${rfs(Fonts.Size.Medium)};
  font-style: normal;
  letter-spacing: 0.25px;
  line-height: ${convertLineHeightToCss(41, convertPxToAbs(Fonts.Size.Medium))};
  margin-bottom: ${boxModel('27px')};
  text-align: center;
`
const SubTitle = styled.p`
  ${UISubheader02}
  max-width: ${boxModel('838px')};
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`
const VectorImage = styled.img`
  width: ${boxModel('400px', true)};
  margin-top: ${boxModel('15px', true)};
  margin-bottom: ${boxModel('76px', true)};
`
const Message = styled.div`
  color: ${Colors.Gray[400]};
  font-weight: ${Fonts.Weight.Regular};
  font-size: ${rfs(Fonts.Size.Small)};
  padding-bottom: ${boxModel('35px', true)};
  letter-spacing: 0.28px;
  line-height: ${convertLineHeightToCss(22, convertPxToAbs(Fonts.Size.XSmall))};
`
const ButtonDescription = styled.p`
  color: ${Colors.Blue[200]};
  font-weight: ${Fonts.Weight.Regular};
  font-size: ${rfs('24px')};
  font-style: normal;
  letter-spacing: 0.25px;
  line-height: ${convertLineHeightToCss(41, convertPxToAbs(Fonts.Size.Medium))};
  margin-bottom: ${boxModel('30px')};
  text-align: center;
`

interface Props {
  title: string
  subTitle: string
  message: string | Array<string | JSX.Element>
  image: string
  buttonTitle: string
  buttonDescription: string
  onClick?: () => void
  isStart?: boolean
}

const PendingApprovalWrapper: React.FC<Props> = ({
  message,
  title,
  subTitle,
  image,
  buttonTitle,
  buttonDescription,
  onClick
}) => {
  return (
    <section style={{ maxWidth: boxModel('838px') }}>
      <VectorImage src={image} alt="" />
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
      <Message>{message}</Message>
      <ButtonDescription>{buttonDescription}</ButtonDescription>
      <div css={ButtonWrapper} className="mt-30">
        <Button className="mx-auto" onClick={onClick}>
          {buttonTitle}
        </Button>
      </div>
    </section>
  )
}

export default PendingApprovalWrapper
