/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import React, { HTMLAttributes, ReactNode } from 'react'

type Props = {
  headerContent: ReactNode
  headerProp?: HTMLAttributes<HTMLDivElement>
  centerContent: ReactNode
  contentProp?: HTMLAttributes<HTMLDivElement>
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const ContainerHeader = styled.div`
  width: 100%;
  max-height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4.375rem;
  margin-top: 3.125rem;
  padding: 0px 4.1875rem;
`
const CenterContent = styled.div`
  display: flex;
  align-self: center;
  justify-self: center;
  flex-direction: column;
  align-items: center !important;
  max-width: 52.5rem;
  img {
    width: calc(28em - 2vw);
  }
`

const DashboardBlockedTemplate: React.FC<Props> = ({
  headerContent,
  headerProp,
  centerContent,
  contentProp,
  children
}) => {
  return (
    <Container>
      <ContainerHeader {...headerProp}>{headerContent}</ContainerHeader>
      <CenterContent {...contentProp}>{centerContent}</CenterContent>
      {children}
    </Container>
  )
}
export default DashboardBlockedTemplate
