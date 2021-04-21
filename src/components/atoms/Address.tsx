import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface Props {
  address: string
  address2?: string
  city: string
  zipCode: string
  state: string
  country: string
}

const AddressContainer = styled.div``
const AddressPlaceHolderContainer = styled.div`
  color: #aaa;
`

const Address: FunctionComponent<Props> = props => {
  const { address, address2, city, zipCode, state, country } = props
  const isAllAttributeIsEmpty =
    !address.trim() &&
    !address2.trim() &&
    !city.trim() &&
    !zipCode.trim() &&
    !state.trim() &&
    !country.trim()

  if (isAllAttributeIsEmpty)
    return (
      <AddressPlaceHolderContainer>
        <p>344 Clinton Street, Apartment 3D, Metropolis, 66012, Kansas</p>
      </AddressPlaceHolderContainer>
    )
  return (
    <AddressContainer>
      <p>
        {address}
        {address2 && (
          <React.Fragment>
            <br />
            {address2}
          </React.Fragment>
        )}
        <br />
        {city} {state} {zipCode}
        <br />
        {country}
      </p>
    </AddressContainer>
  )
}
export default Address
