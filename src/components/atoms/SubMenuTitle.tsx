import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const SubMenuTitleComponent = styled.span`
  cursor: pointer;
  &:hover {
    .submenu-name {
      color: #3be051;
      transition: 0.3s;
      transition-delay: 0.3s;
    }
  }
`

const SubMenuTitle: FunctionComponent = props => {
  return <SubMenuTitleComponent>{props.children}</SubMenuTitleComponent>
}

export default SubMenuTitle
