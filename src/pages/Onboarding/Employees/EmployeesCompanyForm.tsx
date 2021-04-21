import React, { FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { navigate, RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import QuestionsButtonsGroup from '../../../components/organisms/onboarding/QuestionsButtonsGroup'
import { ReactComponent as MapPin } from '../../../assets/icons/mapPin.svg'
import { ReactComponent as NavPhove } from '../../../assets/icons/nav-phone.svg'
import { ButtonsWrapper, FormContainer, FormWrapper, Title } from 'pages/Onboarding/Brands/StyledComponents'
import { RootState } from 'store/types'
import { User } from 'shared/models/User'
import axios from 'utils/http/client'

interface Props extends RouteComponentProps {}

const Typography = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #98a0ac;
  text-align: left;
  line-height: 20px;
  margin-bottom: 50px;
`

const Inline = styled.div`
  display: flex;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > div:first-of-type {
    margin-right: 1.5rem;
  }

  @media (max-width: 1440px) {
    & > div:first-of-type {
      margin-right: 1.5rem;
    }
    & > div:last-of-type {
      width: 210px;
    }
  }

  @media (max-width: 1200px) {
    flex-direction: column;

    & > div {
      margin: 1.5rem 0 0;
    }
  }
`

const Heading = styled.span`
  font-family: 'Roboto Regular', 'Roboto', sans-serif;
  color: #14171a;
  text-align: left;
  line-height: 34px;
  font-size: 20px;
`

const Info = styled.div`
  width: 100%;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Block = styled.div`
  display: flex;
  width: 50%;

  svg {
    margin-right: 20px;
    width: 19px;
    min-width: 19px;
    height: 19px;
    min-height: 19px;

    path {
      fill: #4284fc;
    }
  }
`

const Key = styled.p`
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  color: #98a0ac;
  text-align: left;
  line-height: 16px;
`
const Value = styled.p`
  font-size: 16px;
  font-family: 'Roboto Regular', 'Roboto', sans-serif;
  color: ${props => (props.color ? props.color : '#333333')};
  text-align: left;
  line-height: 24px;

  &.overflow {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    max-width: 240px;
    height: 1.2em;
    white-space: nowrap;
  }
`

const KeyValuePair = styled.div`
  margin-bottom: 5px;
`

const Preview = styled.div`
  height: 7.5625rem;
  min-width: 7.5625rem;
  border-radius: 20px;
  width: 7.5625rem;
  border: 0.25rem solid white;
  box-shadow: 0px 3px 6px #00000029;
  background: #f5f8fa;
  cursor: pointer;
  margin-right: 1.5rem;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 20px;
  }
`

const EmployeesCompanyForm: React.FC<Props> = () => {
  const user = useSelector<RootState>(({ auth }) => auth?.user) as User

  const initialCompanyData = {
    name: '',
    logo: '',
    corporateOffice: null,
    officePhoneNumber: ''
  }

  const [companyId, setCompanyId] = useState(0)
  const [company, setCompany] = useState(initialCompanyData)

  useEffect(() => {
    axios({
      url: `users/me/invitations/`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        const { data, status } = response
        if (status === 200 && data && data.length > 0) {
          const tmpObject =
            user.is_invited || data[0].origin_object.includes('api/companies')
              ? data[0].origin_object.split('/')
              : data[0].destination_object.split('/')
          if (tmpObject.length > 0) {
            if (tmpObject[tmpObject.length - 1] !== '' && !isNaN(tmpObject[tmpObject.length - 1])) {
              setCompanyId(tmpObject[tmpObject.length - 1])
            } else if (tmpObject[tmpObject.length - 2] !== '' && !isNaN(tmpObject[tmpObject.length - 2])) {
              setCompanyId(tmpObject[tmpObject.length - 2])
            }
          }
        }
      })
      .catch(error => {
        console.log('[API GET /users/me/invitations/] error = ', error)
        console.log('error.response = ', error.response)
      })
  }, [user])

  useEffect(() => {
    if (companyId > 0) {
      axios({
        url: `companies/${companyId}/`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          const { data, status } = response
          if (status === 200 && data && data.id) {
            setCompany({
              name: data.business_name || '',
              logo: data.logo.file_cropped || '',
              corporateOffice: data.main_address || null,
              officePhoneNumber: data.main_address?.phone_number || ''
            })
          }
        })
        .catch(error => {
          console.log('[API POST /companies/{companyId}] error = ', error)
          console.log('error.response = ', error.response)
        })
    }
  }, [companyId])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate('finish')
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FormContainer>
        <Title>Company Information</Title>
        <Typography>
          {user.is_invited
            ? `You have been invited to join the account of ${company.name}. Customize your profile after you log in.`
            : `You have requested access to ${company.name}. Once approved by the administrator of ${company.name} you will be able to customize your profile and experience the platform.`}
        </Typography>
        <Inline>
          <Preview>{company.logo && <img src={company.logo} alt={'Company Logo'} />}</Preview>
          <Info>
            <Heading>{company.name}</Heading>
            <Content>
              <Block>
                <MapPin />
                <KeyValuePair>
                  <Key>Corporate Office</Key>
                  <Value className="overflow">
                    {company.corporateOffice
                      ? `${company.corporateOffice.address1}, ${company.corporateOffice.city}, ${company.corporateOffice.state}`
                      : ''}
                  </Value>
                </KeyValuePair>
              </Block>
              <Block>
                <NavPhove />
                <KeyValuePair>
                  <Key>Office Phone Number</Key>
                  <Value color={'#4284fc'}>
                    {company.officePhoneNumber ? formatPhoneNumberIntl(company.officePhoneNumber) : ''}
                  </Value>
                </KeyValuePair>
              </Block>
            </Content>
          </Info>
        </Inline>
      </FormContainer>

      <ButtonsWrapper>
        <QuestionsButtonsGroup firstStep={false} backPath="personal" type="twoCol" />
      </ButtonsWrapper>
    </FormWrapper>
  )
}

export default EmployeesCompanyForm
