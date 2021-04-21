import React, { FunctionComponent, AnchorHTMLAttributes } from 'react'
import styled from '@emotion/styled'
interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  disable: boolean
  href: string
}
const AnchorWithDisableToggleContainer = styled.a<{ disable: boolean }>`
  pointer-events: ${({ disable }) => (disable ? 'none' : 'auto')};
`
const AnchorWithDisableToggle: FunctionComponent<Props> = props => {
  const { disable, ...anchorProps } = props
  if (disable) delete anchorProps.href
  return <AnchorWithDisableToggleContainer {...anchorProps} disable={disable} />
}
export default AnchorWithDisableToggle
