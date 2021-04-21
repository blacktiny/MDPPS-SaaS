import variables from './variables'

import styled from '@emotion/styled'
import { css } from '@emotion/core'
import rfs from '../../utils/style/rfs'
import {
  convertLetterSpacingToCssPx,
  convertLineHeightToCss,
  convertPxToAbs
} from '../../utils/style/styleUtils'

const { Fonts, Colors } = variables

export const H1 = styled.h1`
  font-weight: ${Fonts.Weight.Light};
  font-size: ${rfs(Fonts.Size.XXLarge)};
  line-height: ${convertLineHeightToCss(
    115,
    convertPxToAbs(Fonts.Size.XXLarge)
  )};
`

export const H2 = styled.h2`
  font-weight: ${Fonts.Weight.Light};
  font-size: ${rfs(Fonts.Size.XLarge)};
  line-height: ${convertLineHeightToCss(58, convertPxToAbs(Fonts.Size.XLarge))};
`

export const H3 = styled.h3`
  font-weight: ${Fonts.Weight.Regular};
  font-size: ${rfs(Fonts.Size.Large)};
  line-height: ${convertLineHeightToCss(58, convertPxToAbs(Fonts.Size.Large))};
`

export const H4 = styled.h4`
  font-weight: ${Fonts.Weight.Regular};
  font-size: ${rfs(Fonts.Size.Medium)};
  line-height: ${convertLineHeightToCss(41, convertPxToAbs(Fonts.Size.Medium))};
`

export const UIHeader01 = css`
  font-weight: ${Fonts.Weight.Medium};
  font-size: ${rfs(Fonts.Size.Small)};
  letter-spacing: ${convertLetterSpacingToCssPx(25)};
  line-height: ${convertLineHeightToCss(22, convertPxToAbs(Fonts.Size.Small))};
  color: ${Colors.Black[0]};
`

export const UISubheader01 = css`
  font-weight: ${Fonts.Weight.Regular};
  font-size: ${rfs(Fonts.Size.XSmall)};
  letter-spacing: ${convertLetterSpacingToCssPx(36)};
  line-height: ${convertLineHeightToCss(22, convertPxToAbs(Fonts.Size.XSmall))};
  color: ${Colors.Gray[400]};
`

export const UISubheader02 = css`
  font-weight: ${Fonts.Weight.Bold};
  font-size: ${rfs(Fonts.Size.Small)};
  line-height: ${convertLineHeightToCss(22, convertPxToAbs(Fonts.Size.XSmall))};
  letter-spacing: ${convertLetterSpacingToCssPx(17.5)};
  color: ${Colors.Gray[400]};
`

export const UIBody01 = css`
  font-weight: ${Fonts.Weight.Regular};
  font-size: ${rfs(Fonts.Size.XSmall)};
  letter-spacing: ${convertLetterSpacingToCssPx(20)};
  line-height: ${convertLineHeightToCss(22, convertPxToAbs(Fonts.Size.XSmall))};
  color: ${Colors.Gray[500]};
`

export const UIBody01Italic = css`
  ${UIBody01};
  font-style: italic;
`

export const UIBody01Link = css`
  ${UIBody01};
  font-weight: ${Fonts.Weight.Medium};
`

export const UIBody01LinkBlue = css`
  ${UIBody01Link};
  color: ${Colors.Blue[400]};
`

export const UIBody01LinkDarkFuscia = css`
  ${UIBody01Link};
  color: ${Colors.Fuscia[400]};
`

export const UISmall = css`
  font-weight: ${Fonts.Weight.Regular};
  font-size: ${rfs(Fonts.Size.XSmall)};
  letter-spacing: ${convertLetterSpacingToCssPx(20)};
  line-height: ${convertLineHeightToCss(22, convertPxToAbs(Fonts.Size.XSmall))};
  color: ${Colors.Gray[500]};
`

export const UISmallLink = css`
  ${UISmall};
  font-weight: ${Fonts.Weight.Medium};
  color: ${Colors.Black[0]};
`
