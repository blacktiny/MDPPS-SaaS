/** @jsx jsx */
import { jsx } from '@emotion/core'
import { boxModel, mq } from '../../../utils/style'
import styled from '@emotion/styled'

// Components
import UserMenu from '../../../pages/HomeComponent/Header/UserMenu'

import Logo from '../../../assets/images/logo_blue_black.svg'

interface Props {
  showEdit?: boolean
}

const Header = styled.div`
  display: flex;
  flex-direction: space-between;
  padding: ${boxModel('50px', true)} 0;
  ${mq({
    justifyContent: [`center`, '', '', `start`]
  })}
`

const MenuWrapper = styled.div`
  padding-left: 1.25rem;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  @media only screen and (max-width: 992px) {
    padding-left: 0.625rem;
  }
  button {
    justify-self: start;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border-radius: 3.438rem;
    overflow: hidden;
    .rs-avatar-circle {
      height: 2.85rem;
      max-height: 40px;
      width: 2.85rem;
      max-width: 40px;

      img {
        height: 2.85rem;
        border-radius: 3.438rem;
        object-fit: cover;
      }
    }
  }
`

const HeaderLogo = styled.img`
  max-width: ${boxModel('220px')};
`

type OnboardingHeaderProps = {
  isOnboarding?: boolean
}

const OnboardingHeader = ({ isOnboarding }: OnboardingHeaderProps) => {
  return (
    <Header>
      <HeaderLogo src={Logo} alt="" />
      <MenuWrapper>
        <UserMenu isOnboarding={isOnboarding} />
      </MenuWrapper>
    </Header>
  )
}

export default OnboardingHeader
