import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import variables from '../../assets/styles/variables'
import rfs, { convertLetterSpacingToCssRem, boxModel, mq } from '../../utils/style'
import RButton, { ButtonProps as BaseButtonProps } from 'rsuite/lib/Button'

const { Fonts, Colors, DropShadow } = variables

const BaseStyle = css`
  border-radius: 4px;
  border: 3px solid transparent;
  font-weight: ${Fonts.Weight.Bold};
  line-height: ${rfs('22px')};
  transition: all 0.2s ease;
`

const PrimaryStyle = css`
  background-color: ${Colors.Blue[200]};
  box-shadow: ${DropShadow.standard};
  color: ${Colors.Gray[25]};
  font-size: ${rfs('16px')};
  letter-spacing: ${convertLetterSpacingToCssRem(22)};
  padding: ${boxModel('14px 40px')};

  &:hover {
    background-color: ${Colors.Blue[300]} !important;
  }
  &:focus {
    border-color: ${Colors.Blue[100]};
    background-color: ${Colors.Blue[200]} !important;
    outline: 0;
    border-radius: 7px;
  }
  &:focus&:active {
    box-shadow: none;
    background-color: ${Colors.Blue[400]} !important;
    border-radius: 5px;
  }
`

const SecondaryStyle = css`
  background-color: ${Colors.Gray[25]};
  border-color ${Colors.Gray[100]};
  color: ${Colors.Gray[400]};
  font-size: ${rfs('18px')};
  padding: ${boxModel('13.5px 40px')};

  ${mq({
    borderWidth: [`1px`, ``, ``, ``, `0.5px`]
  })}

  &:hover {
    background-color: ${Colors.Gray[50]};
  }
  &:focus {
    border-color: ${Colors.Blue[100]};
    background-color: ${Colors.Gray[25]} !important;
    outline: 0;
  }
  &:active {
    background-color: ${Colors.Gray[200]} !important;
    border: solid ${Colors.Gray[100]};
    color: ${Colors.Gray[25]} !important;
    padding: inherit;
  }
`

const StartStyle = css`
  align-self: flex-start;
`

const EndStyle = css`
  align-self: flex-end;
`

const SmallStyle = css`
  padding: ${boxModel('0.563rem 1.625rem')};
  &:focus {
    padding: ${boxModel('0.375rem 1.438rem')};
  }
  &:focus&:active {
    padding: ${boxModel('0.563rem 1.625rem')};
  }
`

const PairsStyle = css`
  padding-left: ${boxModel('26px')};
  padding-right: ${boxModel('26px')};
  font-size: ${rfs('16px')};
  &:focus {
    padding-left: ${boxModel('23px')};
    padding-right: ${boxModel('23px')};
  }
  &:focus&:active {
    padding-left: ${boxModel('26px')};
    padding-right: ${boxModel('26px')};
  }
`
const DisabledStyle = css`
  box-shadow: none;
  background-color: ${Colors.Gray[100]} !important;
  color: ${Colors.Gray[200]} !important;
  opacity: 1 !important;
  border: none;

  &:hover,
  &:focus {
    background-color: ${Colors.Gray[100]} !important;
  }
`

export const LinkButton = styled(RButton)`
  font-size: ${rfs('0.875rem')};
  font-size: ${rfs(Fonts.Size.XSmall)};
  line-height: 1.4;
  transition: all 0.5s ease-in-out;
  letter-spacing: 0.28px;
  padding: 0;
  align-self: flex-end;
  ${({ start }) => (start ? StartStyle : null)}
  ${({ end }) => (end ? EndStyle : null)}
  color: ${Colors.Blue[200]};
  a {
    color: ${Colors.Blue[200]};
  }
  &::first-letter {
    text-transform: capitalize;
  }
  ${({ small }) => (small ? SmallStyle : null)};
`

const BaseButton = styled(RButton)`
  ${BaseStyle};
  ${({ secondary }) => (secondary ? SecondaryStyle : PrimaryStyle)};
  ${({ small }) => (small ? SmallStyle : null)};
  ${({ pairs }) => (pairs ? PairsStyle : null)};

  ${({ disabled }) => (disabled ? DisabledStyle : null)}
  ${({ start }) => (start ? StartStyle : null)}
  ${({ end }) => (end ? EndStyle : null)}
`

export interface ButtonProps extends BaseButtonProps {
  link?: boolean
  primary?: boolean
  secondary?: boolean
  small?: boolean
  pairs?: boolean
  start?: boolean
  end?: boolean
  className?: string
}

const Button: React.FC<ButtonProps> = ({ link, children, secondary, pairs, end, start, ...props }) =>
  link ? (
    <LinkButton {...props} appearance="link" end={end ? end.toString() : null} start={start ? start.toString() : null}>
      {children}
    </LinkButton>
  ) : (
    <BaseButton
      {...props}
      secondary={secondary?.toString()}
      pairs={pairs?.toString()}
      end={end ? end.toString() : null}
      start={start ? start.toString() : null}
      appearance={secondary ? 'default' : 'primary'}
    >
      {children}
    </BaseButton>
  )

export default Button
