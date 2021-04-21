import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import variables from '../../../assets/styles/variables'
import rfs, {
  boxModel,
  convertLineHeightToCss,
  convertPxToAbs,
  convertLetterSpacingToCssPx
} from '../../../utils/style'
import { UISubheader01 } from '../../../assets/styles/typography'

const { Fonts, Colors } = variables

const Title = styled.h1`
  color: ${Colors.Gray[500]};
  font-weight: ${Fonts.Weight.Regular};
  font-size: ${rfs(Fonts.Size.Medium)};
  letter-spacing: 0.24px;
  line-height: ${convertLineHeightToCss(41, convertPxToAbs(Fonts.Size.Medium))};
  margin-bottom: ${boxModel('10px')};
  text-align: center;
`
const SubTitle = styled.p`
  ${UISubheader01}
  max-width: ${boxModel('610px')};
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  letter-spacing: ${convertLetterSpacingToCssPx(17.5)};
  i {
    color: ${Colors.Black[0]}
  }
`
interface Props {
  title: string
  description?: Array<JSX.Element | string> | string
  classUsed?: string
}

const OnboardingTitle: React.FC<Props> = ({
  title,
  description,
  classUsed
}) => {
  return (
    <Fragment>
      <section className={classUsed}>
        <Title>{title}</Title>
        {description && <SubTitle>{description}</SubTitle>}
      </section>
    </Fragment>
  )
}

export default OnboardingTitle
