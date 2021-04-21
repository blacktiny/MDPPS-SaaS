import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const SideBarSubMenuComponent = styled.ul`
  max-height: 0;
  transition: 200ms;
  overflow: hidden;
  transition-timing-function: linear;
  padding-left: 0.75rem;
  list-style-type: none;
  padding-right: 0.625rem;
`
interface SideBarSubMenuLayout {
  customClass?: string
}

const SideBarSubMenuLayout: FunctionComponent<SideBarSubMenuLayout> = props => {
  const { customClass } = props
  return (
    <SideBarSubMenuComponent className={customClass || ''}>
      {props.children}
    </SideBarSubMenuComponent>
  )
}

export default SideBarSubMenuLayout
