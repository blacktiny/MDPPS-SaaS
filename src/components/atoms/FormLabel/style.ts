import styled from '@emotion/styled'
import rfs from 'utils/style/rfs'
import { HelpBlock as RHelpBlock, ControlLabel as RControlLabel } from 'rsuite'
import variables from 'assets/styles/variables'
import { css } from '@emotion/core'

const { Colors, Fonts } = variables

export const FormLabelHeader = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${rfs('5px')};
`

export const HelpBlock = styled(RHelpBlock)`
  font-size: ${rfs('12px')};
  line-height: 1.5;
  color: ${Colors.Gray[400]};
  min-height: auto;
`

const ControlLabelInvalid = css`
  color: ${Colors.Red[3]};
`

export const ControlLabel = styled(RControlLabel)<{ invalid?: boolean }>`
  display: block;
  color: ${Colors.Gray[500]};
  font-size: ${rfs('14px')};
  font-weight: ${Fonts.Weight.Medium};
  line-height: 1.4;
  text-align: left;

  &::first-letter {
    text-transform: capitalize;
  }

  ${({ invalid }) => (invalid ? ControlLabelInvalid : null)}
`

export const RequiredStar = styled('span')`
  margin-left: 3px;
  color: ${Colors.Red[3]};
`
