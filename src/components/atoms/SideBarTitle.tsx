import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
const SideBarTitleComponent = styled.div`
  display: flex;
  align-items: center;
  height: 3.75rem;
  color: #abb8cb;
  margin-right: 1rem;
  border-bottom: 1px solid #566e98;
`

const SideBarTitle: FunctionComponent = props => {
  return <SideBarTitleComponent>{props.children}</SideBarTitleComponent>
}

export default SideBarTitle
