import React, { FunctionComponent, useCallback } from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import styled from '@emotion/styled'
import CompanyProfileOptions from './CompanyProfileOptions'

interface Props extends RouteComponentProps {}

const CustomContainer = styled.div`
  max-width: 1920px;
  @media only screen and (min-width: 1920px) {
    margin: auto;
  }
`

const ProfileOptionsWrap = styled.div`
  display: flex;
  align-items: flex-start;
  @media only screen and (max-width: 990px) {
    padding: 2.125rem 0.625rem;
  }
  @media only screen and (max-width: 767px) {
    flex-flow: column;
  }
`

const EmptyGridSpacer = styled.div`
  @media only screen and (max-width: 990px) {
    flex: 0 0 5%;
    max-width: 5%;
  }
`

const ProfileCardRightWrap = styled.div`
  @media only screen and (max-width: 1919px) and (min-width: 1440px) {
    &.profile-content {
      width: 52.5rem;
      max-width: 52.5rem;
      flex: 0 0 52.5rem;
    }
  }
  @media only screen and (max-width: 1439px) {
    &.profile-content {
      width: 60%;
      flex: 0 0 60%;
      max-width: 60%;
    }
  }
  @media only screen and (max-width: 1140px) {
    &.profile-content {
      width: 70%;
      flex: 0 0 70%;
      max-width: 70%;
      padding: 0;
    }
  }
  @media only screen and (max-width: 767px) {
    &.profile-content {
      width: 100%;
      flex: 0 0 100%;
      max-width: 100%;
      padding: 0;
    }
  }
`

const getComponentCodeByLocation = () => {
  // const pathName = window?.location?.pathname
  return 1
}

const navigateToComponentByCode = (code: string | number) => {
  switch (code) {
    case 1:
      navigate('/dashboard/home/company-profile')
      break
    default:
      break
  }
}

const CompanyProfile: FunctionComponent<Props> = () => {
  const selectedOption = getComponentCodeByLocation()

  const onOptionChange = useCallback((option: string | number) => {
    navigateToComponentByCode(option)
  }, [])

  const renderTheSelectedComponent = () => {
    switch (selectedOption) {
      case 1:
        return <div>in progress</div>
      default:
        return
    }
  }

  return (
    <React.Fragment>
      <CustomContainer>
        <ProfileOptionsWrap>
          <CompanyProfileOptions
            selectedOption={selectedOption}
            onOptionChange={onOptionChange}
            options={[
              {
                key: 1,
                optionHeader: 'Account Settings',
                optionIconClassName: 'option-icon icon-user-female',
                testId: 'Account-Settings'
              }
            ]}
          />
          <EmptyGridSpacer className="col-md-1" />
          <ProfileCardRightWrap
            className="col-md-6 profile-content"
            data-testid="UserProfile-RightSideContainer"
          >
            {renderTheSelectedComponent()}
          </ProfileCardRightWrap>
        </ProfileOptionsWrap>
      </CustomContainer>
    </React.Fragment>
  )
}
export default CompanyProfile
