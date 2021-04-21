import variables from '../../assets/styles/variables'
import rfs, { boxModel } from './rfs'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import facepaint from 'facepaint'

const { Fonts, DropShadow, Colors, Breakpoints } = variables

export const mq = facepaint(Object.values(Breakpoints).map(bp => `@media (min-width: ${bp}px)`))

export const convertLetterSpacingToCssPx = (value: number) => {
  return `${(value * Fonts.Size.Base) / 1000}px`
}

export const convertLetterSpacingToCssRem = (value: number) => {
  return rfs(convertLetterSpacingToCssPx(value))
}

export const convertLineHeightToCss = (value: number, fs: number) => {
  return (value / fs).toFixed(1)
}
export const convertPxToAbs = (val: string) => {
  return +val.replace('px', '')
}

export const hexToRgb = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b
  })

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null
}
export const RelativePosition = css`
  position: relative;
`
export const FormBox = css`
  background: ${Colors.Gray[25]};
  box-shadow: ${DropShadow.standard};
  border-radius: 5px;
  max-width: 576px;
  min-width: 300px;
  position: relative;
  width: ${boxModel('576px')};
  display: flex;
  flex-direction: column;
  ${mq({
    padding: [`${boxModel('30px 40px', true)}`, ``, ``, ``, `${boxModel('40px', false)}`],
    maxWidth: [`300px`, `576px`]
  })}
`
export const ButtonWrapper = css`
  display: flex;
  align-items: center;
  height: 3.125rem;
`
export const SmallButtonWrapper = css`
  display: flex;
  align-items: center;
  // height: 2.5rem;
`
export const FlexStart = css`
  display: flex;
  align-items: center;
  justify-content: start;
`
export const FlexBetween = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`
export const FlexEnd = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: 11px;
`
export const ErrorMsg = styled.div`
  color: #d9001b;
  font-size: ${rfs('12px')};
  font-weight: ${Fonts.Weight.Regular};
  margin-top: ${boxModel('5px')};
  margin-bottom: ${boxModel('5px')};
  &::first-letter {
    text-transform: capitalize;
  }
`

export const CenteredPageContent = css`
  padding: ${boxModel('40px', true)};
  height: 100%;
  min-height: calc(100vh - 240px);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const MbRevert = css`
  margin-bottom: ${boxModel('-20px')};
`
export const QuestionMB = css`
  margin-bottom: ${boxModel('8px')};
`
