import React from 'react'
import styled from '@emotion/styled'
import rfs, { boxModel } from 'utils/style/rfs'
import variables from 'assets/styles/variables'

const { Colors, Fonts } = variables

const ErrorMsg = styled.div`
  display: block;
  color: ${Colors.Red[3]};
  font-size: ${rfs('12px')};
  font-weight: ${Fonts.Weight.Regular};
  margin-top: ${boxModel('5px')};
  text-align: left;

  &::first-letter {
    text-transform: capitalize;
  }
`

const FormErrorMsg = ({ children }) => <ErrorMsg>{children}</ErrorMsg>

export default FormErrorMsg
