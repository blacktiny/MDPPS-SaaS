import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { Col, Input, InputGroup, Row } from 'rsuite'
// import paperIcon from '../../../assets/icons/paper.svg'
import searchIcon from '../../../assets/icons/search.svg'
// import headerCaretIcon from '../../../assets/icons/header-caret.svg'
// import Button from '../../../components/atoms/Button'
import MessageNotificationMenu from './MessagesNotification'
import Notification from './Notification'
import './style.scss'
import UserMenu from './UserMenu'

const MenuToggle = styled.div``
const MenuIcon = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 60px;
  background-color: #1e3e75;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b6d0fd;
`

const SectionCol = styled(Col)`
  height: 40px;
  margin: 0 10px;
`

interface Props extends RouteComponentProps {
  OnSideBarToggle: () => void
  customMenuToggleClassName?: string
}

const StyledImg = styled.img`
  color: #4284fc;
  height: 20px;
  width: 20px;
  filter: invert(40%) sepia(100%) saturate(1197%) hue-rotate(202deg) brightness(98%) contrast(102%);
`
// const PaperImg = styled.img`
//   height: 1.5625rem;
//   width: 1.5625rem;
//   filter: invert(79%) sepia(18%) saturate(815%) hue-rotate(189deg) brightness(129%) contrast(98%);
// `

// const CaretImg = styled.img`
//   width: 0.25rem;
//   height: 0.375rem;
//   margin-left: 0.3125rem;
// `

const SearchInput = styled(Input)`
  background-color: transparent;
`
// const ContinueLink = styled.a`
//   font-size: 0.75rem;
//   color: #4284fc;
//   line-height: 0.75rem;
//   font-weight: 400;
// `
const Header: React.FC<Props> = props => {
  const { OnSideBarToggle, customMenuToggleClassName = '' } = props
  // const [applicationName] = useState('Draft Application')
  // const user = useSelector<RootState>(({ auth }) => auth?.user) as User
  // console.log(user)
  return (
    <Row className="header-wrap">
      <div className="mobile-menu-toggle">
        <MenuToggle className={customMenuToggleClassName} onClick={OnSideBarToggle}>
          <MenuIcon>
            <span className="icon-menu" />
          </MenuIcon>
        </MenuToggle>
      </div>
      <SectionCol xs={8} className="header-content-search">
        <InputGroup>
          <StyledImg src={searchIcon} />
          <SearchInput
            name="search"
            className="header-search-input"
            placeholder="Search for brands, manufacturers, distributors, or dealers"
          />
        </InputGroup>
      </SectionCol>

      <SectionCol xs={4} className="header-content-location">
        {/* <span className="icon icon-map-pin" />
        <Button link>Denver, CO</Button> */}
      </SectionCol>

      <SectionCol xs={12} className="header-content-right">
        <div className="header-content">
          <div className="header-application-info">
            {/* <PaperImg src={paperIcon} />
            <div className="header-application-info-text">
              <span className="text">{applicationName}</span>
              <ContinueLink>
                Continue
                <CaretImg src={headerCaretIcon} />
              </ContinueLink>
            </div> */}
          </div>
          <div className="header-right-options">
            <span className="headericon notification">
              <MessageNotificationMenu />
            </span>
            <span className="headericon notification">
              <Notification />
            </span>
            <span className="headericon user">
              <UserMenu />
            </span>
          </div>
        </div>
      </SectionCol>
    </Row>
  )
}
export default Header
