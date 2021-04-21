import React, { FunctionComponent, ReactElement } from 'react'
import BrandLogo from '../../atoms/BrandLogo'
import SideBarTitle from '../../atoms/SideBarTitle'
import classNames from 'classnames'
import { SideBar as MenuProps } from '../../../constants/menuConfig'
import styled from '@emotion/styled'
import './style.scss'

interface SidebarLayout {
  logo?: string
  logoRequired: boolean | string
  selectedMenu: MenuProps
  toggleSideBarMenu: () => void
  subMenus: ReactElement
  testDataId: string
  CollapsibleSidebarClass: string
  subSideBarMenuClass: string
  onSideBarClose: () => void
}

const PrimaryMenu = styled.div`
  background-color: #1e3e75;
  padding: 1.25rem 0 0;
  position: relative;
  z-index: 5;
  width: 100%;
`
const SidebarMenu = styled.ul`
  padding: 0.625rem 0;
  margin: 0;
`
const CloseSidebar = styled.span`
  position: absolute;
  left: 7px;
  top: 7px;
  color: #ffffffc7;
  background-color: #173363;
  width: 20px;
  height: 20px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 100;
  opacity: 0;
  visibility: hidden;
  @media only screen and (max-height: 590px), (max-width: 768px) {
    opacity: 1;
    visibility: visible;
  }
`

const SideBarSubMenu = styled.ul`
  padding-left: 0;
  list-style-type: none;
  height: calc(100% - 3.75rem);
  margin: 0;
  overflow-y: auto;
  width: calc(100% - 2px);

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: #1f3e73;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4c70af;
    border-radius: 16px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

const SidebarLayout: FunctionComponent<SidebarLayout> = props => {
  const {
    logo,
    logoRequired,
    selectedMenu,
    toggleSideBarMenu,
    subMenus,
    testDataId,
    CollapsibleSidebarClass,
    subSideBarMenuClass,
    onSideBarClose
  } = props

  const getIsHidden = () => {
    if (selectedMenu && selectedMenu.subMenu && selectedMenu.subMenu.length)
      return true
    return false
  }

  let colapseClassName = classNames({
    'collapsein-btn': true,
    hide: !getIsHidden()
  })

  return (
    <>
      <PrimaryMenu data-testid={testDataId}>
        <CloseSidebar onClick={onSideBarClose} className="icon-close-light" />
        {logoRequired && logo && <BrandLogo logo={logo} />}
        <SidebarMenu>{props.children}</SidebarMenu>
      </PrimaryMenu>
      <div className={CollapsibleSidebarClass}>
        <SideBarTitle>{selectedMenu ? selectedMenu.name : ''}</SideBarTitle>
        <SideBarSubMenu className={subSideBarMenuClass}>
          {subMenus}
        </SideBarSubMenu>
      </div>
      <div
        role="button"
        className={colapseClassName}
        onClick={toggleSideBarMenu}
        tabIndex={0}
        onKeyDown={() => false}
      >
        <span className="icon-caret" />
      </div>
    </>
  )
}

export default SidebarLayout
