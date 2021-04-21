import React, { FunctionComponent, ReactElement } from 'react'
import styled from '@emotion/styled'

interface HeaderProps {
  [key: string]: string | number
}

interface CellClassNameProps {
  [key: string]: string
}

interface DataProps {
  [key: string]: ReactElement | string | number
}

interface Props {
  columHeaders: HeaderProps
  rowData: DataProps[]
  customCellClass?: CellClassNameProps
}

const getObjectKeys = (obj: object) => {
  return Object.keys(obj)
}

const TabularViewContainer = styled.div``
const TitleRowContainer = styled.div`
  display: flex;
  padding-bottom: 1.125rem;
`
const TitleCell = styled.div`
  font-family: roboto-medium;
  font-size: 0.875rem;
  padding: 0;
  padding: 0 0 0.313rem;
  border-bottom: 1px solid #dde3e9;
  color: #14171a;
`
const DataCell = styled.div`
  padding: 0;
`
const RowCell = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2.375rem;
  width: 100%;
`
const RowContainer = styled.div`
  display: flex;
  &:last-of-type {
    & > div {
      margin-bottom: 1.125rem;
    }
  }
`

const TabularView: FunctionComponent<Props> = props => {
  const { columHeaders, rowData: data, customCellClass } = props
  return (
    <TabularViewContainer>
      <TitleRowContainer>
        {getObjectKeys(columHeaders).map((objectKey, index) => (
          <TitleCell
            className={customCellClass && customCellClass[objectKey]}
            key={index}
          >
            {columHeaders[objectKey]}
          </TitleCell>
        ))}
      </TitleRowContainer>
      {data.map((rowData, rowIndex) => {
        let row: ReactElement[] = []
        getObjectKeys(columHeaders).forEach((objectKey, index) => {
          if (objectKey && rowData[objectKey]) {
            row.push(
              <DataCell
                className={customCellClass && customCellClass[objectKey]}
                key={index}
              >
                {rowData[objectKey]}
              </DataCell>
            )
          }
        })
        return (
          <RowContainer key={rowIndex}>
            <RowCell>{row}</RowCell>
          </RowContainer>
        )
      })}
    </TabularViewContainer>
  )
}
export default TabularView
