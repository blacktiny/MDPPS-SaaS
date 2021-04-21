import React from 'react'
import styled from '@emotion/styled'
import variables from '../../assets/styles/variables'
import rfs, { boxModel } from '../../utils/style'

const { Fonts, Colors } = variables

interface Props {
  dark?: boolean
}

const FooterContainer = styled('div')<Props>`
  color: ${({ dark }) => (dark ? Colors.Gray[500] : '#fff')};
  text-align: center;
  font-size: ${rfs(Fonts.Size.XXSmall)};
  line-height: 1.6;
  p {
    margin-bottom: ${boxModel('0.625rem')};
  }
  a {
    color: inherit;
    font-weight: ${Fonts.Weight.Regular};
    & + a {
      margin-left: ${boxModel('1.625rem')};
    }
  }
`

export const Footer: React.FC<Props> = ({ dark }) => (
  <FooterContainer dark={dark}>
    <p>© {new Date().getFullYear()} MDPPS, All Rights Reserved</p>
    <a href="https://mdpps.com/privacy-policy/" target="_blank" rel="noopener noreferrer">
      Privacy Policy
    </a>
    <a href="https://mdpps.com/terms-service/" target="_blank" rel="noopener noreferrer">
      Terms of Use
    </a>
  </FooterContainer>
)
