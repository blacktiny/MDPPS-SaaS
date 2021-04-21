import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import Image500 from '../../assets/images/500.svg'
import styled from '@emotion/styled'
import Button from '../atoms/Button'

interface Props extends RouteComponentProps {}

const ErrorContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 3.75rem);
  overflow-y: auto;
  padding: 0.938rem 1.875rem;
  overflow: inherit;
  img {
    width: calc(36rem - 2vw);
    @media only screen and (min-width: 1600px) {
      width: 37.375rem;
    }
  }
  h1 {
    font-size: 2.25rem;
    color: #38393e;
    font-weight: normal;
    font-family: Roboto-Medium;
    padding-top: 3.125rem;
    text-align: center;
  }
  p {
    max-width: 750px;
    text-align: center;
    color: #657786;
    font-size: 1.125rem;
    a {
      color: #4284fc;
      &:hover {
        text-decoration: none;
      }
    }
  }
  Button {
    margin-top: 1.25rem;
  }
  @media only screen and (max-width: 1366px) {
    justify-content: flex-start;
    padding: 0 1.25rem;
    img {
      width: calc(28rem - 2vw);
    }
    h1 {
      font-size: 1.875rem;
      padding-top: 1.25rem;
    }
    Button {
      margin-top: 1.25rem;
    }
  }
`
const ContainerFluid = styled.div``
const Divgridrow = styled.div``
const DivFullGridCol = styled.div`
  padding: 0;
`

const goBack = () => {
  navigate('/dashboard')
  return false
}
const Error: React.FC<Props> = () => {
  return (
    <ContainerFluid className="container-fluid">
      <Divgridrow className="row">
        <DivFullGridCol className="col-md-12">
          <ErrorContainer>
            <img src={Image500} alt="" />
            <h1>Oops! We can’t find the page you are looking for.</h1>
            <p>
              The server encountered an interval error or misconfiguration and
              was unable to complete your request. Please{' '}
              <a href="contactSupport">contact support</a> with the time this
              error occurred and description leading to the error.
            </p>
            <Button onClick={goBack}>Go to Home Page</Button>
          </ErrorContainer>
        </DivFullGridCol>
      </Divgridrow>
    </ContainerFluid>
  )
}

export default Error
