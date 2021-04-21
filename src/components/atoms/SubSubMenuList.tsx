import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
const SubSubMenuListComponent = styled.li`
  font-size: 0.938rem;
  letter-spacing: 0.26px;
  color: #b6d0fd;
  cursor: default;
  padding: 0.406rem 0;
  &:first-child {
    padding: 0.938rem 0 0.313rem;
  }
`

const SubSubMenuList: FunctionComponent = props => {
  return <SubSubMenuListComponent>{props.children}</SubSubMenuListComponent>
}

export default SubSubMenuList
