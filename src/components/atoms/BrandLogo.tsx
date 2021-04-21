import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import menu from '../../../assets/images/menu.svg'
interface BrandLogo {
  logo: string
}

const BranImage = styled.img`
  width: 2rem;
  padding-bottom: 0.625rem;
`
const MenuLogo = styled.img`
  max-width: 15px;
  max-height: 12px;
  width: 100%;
  height: 100%
  padding-bottom: 0.625rem;
  filter: invert(100%) brightness(200%);
  position:absolute;
  left: 0px;
  top: calc(1.25rem + 6px);
`
const marketingSitLink = process.env.REACT_APP_MDPPS_MARKETING_SITE

const BrandLogo: FunctionComponent<BrandLogo> = props => {
  const { logo } = props
  return (
    <a href={marketingSitLink}>
      <MenuLogo src={menu} alt="menu" />
      <BranImage src={logo} alt="Sidebarlogo" />
    </a>
  )
}

export default BrandLogo
