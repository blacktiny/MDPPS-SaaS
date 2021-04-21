import React from 'react'
import styled from '@emotion/styled'
import googlemap from '../../../assets/images/google-maps.svg'
import googleads from '../../../assets/images/google-ads.svg'
import googleanalytics from '../../../assets/images/google_analytics.svg'
import mailchimp from '../../../assets/images/mailchimp.svg'
import salesforce from '../../../assets/images/logo-salesforce.svg'
import magento from '../../../assets/images/logo-magento.svg'
import shoppify from '../../../assets/images/logo-shoppify.svg'
import wocommerce from '../../../assets/images/logo-woocommerce.svg'
import rightbullet from '../../../assets/images/right-bullet.svg'
import Popup from '../../../components/molecules/Popup'
import Button from '../../../components/atoms/Button'
import './style.scss'

interface Props {
  show: boolean
  handleClose?: (show: boolean) => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
`

const IntegrationTitle = styled.h1`
  color: #3469c7;
  font-size: 2.125rem !important;
  font-family: Roboto;
  font-weight: normal;
  line-height: 34px;
  padding-bottom: 1.5rem;
  @media (max-height: 820px) {
    font-size: 1.75rem !important;
    padding-bottom: 0.938rem;
  }
`

const BulletIcon = styled.img`
  width: 0.563rem;
  margin-right: 0.625rem;
`

const IntegrationList = styled.ul`
  padding-left: 0;
  list-style-type: none;
  li {
    color: #657786;
    font-size: 1.125rem;
    padding: 0.25rem 0;
    letter-spacing: 0.36px;
  }
`
const Logo1 = styled.div`
  padding: 1.25rem 4.75rem 2.063rem;
  display: flex;
  justify-content: space-between;
  @media (max-height: 820px) {
    padding: 1.25rem 4.75rem 1.563rem;
  }
  @media (max-height: 720px) {
    padding: 1rem 5rem 1rem;
  }
  @media (max-width: 1200px) {
    img {
      flex-basis: 10%;
    }
  }
  @media (max-width: 767px) {
    padding: 1.25rem 1rem 1.563rem;
    img {
    }
  }
  @media (max-width: 992px), (max-height: 690px) {
    img {
      height: 4.375rem;
    }
  }
`

const Logo2 = styled.div`
  padding: 1.938rem 5rem 3.125rem;
  display: flex;
  justify-content: space-between;
  @media (max-height: 840px) {
    padding: 1.25rem 5rem 1.563rem;
  }
  @media (max-height: 720px) {
    padding: 1rem 5rem 1rem;
  }
  @media (max-width: 1200px) {
    img {
      flex-basis: 10%;
      height: 4.375rem;
    }
  }
   @media (max-width: 992px), (max-height: 690px) {
    img {
      height: 2.375rem;

    }
`

const SubscribeContainer = styled.div`
  text-align: center;
  display: flex;
  flex-flow: column;
  align-items: center;
  Button {
    margin-bottom: 1.75rem;
  }
  a {
    cursor: pointer;
  }
  a:hover {
    text-decoration: none;
  }
`

const IntegrationURL = styled.a`
  color: #4284fc;
  letter-spacing: 0.25px;
  font-size: 0.875rem;
`

const IntegrationContent = styled.div`
  border-radius: 8px;
  font-size: 1rem;
  color: #2c4a7e;
  background-color: #fff;
  margin: 2rem 0 2.813rem;
  color: #657786;
  text-align: center;
  font-size: 1.125rem;
  @media (max-height: 890px) {
    margin: 1rem 0 1.813rem;
  }
  p {
    padding: 2.5rem 4.75rem 0.938rem;
    color: #2c4a7e;
    font-size: 1rem;
    letter-spacing: 0.12px;
    @media only screen and (max-width: 767px) {
      padding: 2.5rem 1rem 0.938rem;
    }
  }
`
const ContainerFluid = styled.div``
const Divgridrow = styled.div``
const DivFullGridCol = styled.div`
  padding: 0;
`

const IntegrationPopup: React.FC<Props> = ({ show, handleClose }) => {
  return (
    <Popup
      modalClass="integration-modal"
      showPopup={show}
      onShowPopupChange={handleClose}
      size="lg"
    >
      <ContainerFluid className="container-fluid">
        <Divgridrow className="row">
          <DivFullGridCol className="col-md-12">
            <Container>
              <IntegrationTitle>
                Business integrations for high performing brands
              </IntegrationTitle>
              <IntegrationList>
                <li>
                  <BulletIcon src={rightbullet} alt="right" />
                  Automatically sync your dealers and distributors with
                  Salesforce
                </li>
                <li>
                  <BulletIcon src={rightbullet} alt="right" />
                  Optimize your paid adverting campaigns by sharing business
                  operations and marketing
                </li>
                <li>
                  <BulletIcon src={rightbullet} alt="right" />
                  Attain operational efficiency by distributing data to those
                  within your organization
                </li>
              </IntegrationList>
              <IntegrationContent className="col-md-12">
                <p>
                  Our suite of business integrations improves data sharing
                  between team members and platforms. Giving your business a
                  competitive edge through intelligent insights, resulting in
                  increased operational efficiency and business revenue.
                </p>
                <div>
                  <Logo1>
                    <img src={googlemap} alt="google maps" />
                    <img src={googleads} alt="google ads" />
                    <img src={googleanalytics} alt="google analytics" />
                    <img src={mailchimp} alt="Mail Chimp" />
                    <img src={salesforce} alt="Mail Chimp" />
                  </Logo1>
                  <Logo2>
                    <img src={magento} alt="Magento" />
                    <img src={wocommerce} alt="Woo Commerce" />
                    <img src={shoppify} alt="Shopify" />
                  </Logo2>
                </div>
              </IntegrationContent>
              <SubscribeContainer className="col-md-12">
                <Button>Subscribe</Button>
                <IntegrationURL>
                  Learn more about our business integrations
                </IntegrationURL>
              </SubscribeContainer>
            </Container>
          </DivFullGridCol>
        </Divgridrow>
      </ContainerFluid>
    </Popup>
  )
}
export default IntegrationPopup
