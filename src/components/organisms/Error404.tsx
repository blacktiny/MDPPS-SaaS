import React from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import Image404 from '../../assets/images/404.svg'
import Button from '../atoms/Button'
import styled from '@emotion/styled'

interface Props extends RouteComponentProps {}

const ErrorContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  height: calc(100vh - 60px);
  overflow-y: auto;
  padding: 0.938rem 0;
  h1 {
    font-size: 2.25rem;
    color: #38393e;
    font-weight: normal;
    font-family: Roboto-Medium;
    padding-top: 3.125rem;
    text-align: center;
  }
  img {
    width: calc(36rem - 2vw);
    @media only screen and (min-width: 1600px) {
      width: 33.5rem;
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
    padding: 1.563rem 1.25rem;
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
  @media only screen and (max-width: 1024px) {
    height: 100%;
  }
`
const ContainerFluid = styled.div``
const Divgridrow = styled.div``
const DivFullGridCol = styled.div`
  padding: 0;
`

const Error404: React.FC<Props> = () => {
  const goBack = () => {
    navigate('/dashboard')
    // window.history.go(-1)
    return false
  }
  return (
    <ContainerFluid className="container-fluid">
      <Divgridrow className="row">
        <DivFullGridCol className="col-md-12">
          <ErrorContainer>
            <img src={Image404} alt="" />
            <h1>Oops! We can’t find the page you are looking for.</h1>
            <Button onClick={goBack}>Take Me Back</Button>
          </ErrorContainer>
        </DivFullGridCol>
      </Divgridrow>
    </ContainerFluid>
  )
}

export default Error404
