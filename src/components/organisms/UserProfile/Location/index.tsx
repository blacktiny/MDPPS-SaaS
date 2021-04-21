/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { FunctionComponent, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { AxiosError } from 'axios'
import { css } from '@emotion/core'
import { FieldErrors, FieldValues } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import SearchableSelect from '../../../atoms/SearchableSelect'
import { extractErrorMsgFromArray } from '../../../../utils/data'
import { convertJsonForSearchableLocationSelect } from '../../../../utils/ConvertJsonForSelect'
import { setLocation } from '../../../../store/options/location'
import axios from 'utils/http/client'
import './style.scss'

const LocationSearchableSelectWrapper = css`
  .menu {
    .item {
      padding: 0 !important;

      .option-item {
        padding: 0.625rem 1.25rem !important;
        color: #7f7f7f;
        font-size: 0.875rem;
        letter-spacing: 0.22px;
        cursor: pointer;
        transition: all 0.5s ease-in-out;
        box-sizing: border-box;

        &:hover,
        &:active {
          background-color: #f7faff !important;
          color: #4284fc !important;
        }
      }

      .group-item {
        color: #0f203c;
        font-size: 0.875rem;
        font-weight: 700;
        letter-spacing: 0.22px;
        padding: 0.625rem 1.25rem !important;
        box-sizing: border-box;
      }
    }

    & > div:nth-of-type(1) {
      pointer-events: none !important;
    }
  }
`

interface Props {
  companyId: number
  error: AxiosError
  defaultValue?: string
  errors?: FieldErrors<FieldValues>
  onChange: (name: string, val: string, phoneNumber?: string) => void
  showErrorWrapper?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locationError?: any
}

const Location: FunctionComponent<Props> = props => {
  const { defaultValue, error, errors, onChange, showErrorWrapper, companyId } = props

  const [locations, setLocations] = useState([])
  const [addresses, setAddresses] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    axios({
      url: `/companies/${companyId}/locations/`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      if (response.status === 200) {
        setLocations(response.data)
      }
    })

    axios({
      url: `/companies/${companyId}/addresses/`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      if (response.status === 200) {
        setAddresses(response.data)
      }
    })
  }, [companyId])

  const dispatch = useDispatch()

  const { combinedOptions, groupLabelNumber } = useMemo(() => {
    let tmpCombinedOptions = []

    const locationOptions = convertJsonForSearchableLocationSelect(locations)
    if (locationOptions && locationOptions.length > 0) {
      const tmpOptions = JSON.parse(JSON.stringify(locationOptions))
      const tmpCustomOptions = tmpOptions.map(option => {
        return {
          ...option,
          content: <div className="option-item">{option.text}</div>
        }
      })
      tmpCustomOptions.unshift({
        text: 'Locations',
        value: 'group-locations',
        key: 'group-locations',
        content: <div className="group-item">{'Locations'}</div>
      })
      tmpCombinedOptions = tmpCombinedOptions.concat(tmpCustomOptions)
    }

    const addressOptions = convertJsonForSearchableLocationSelect(addresses)
    if (addressOptions && addressOptions.length > 0) {
      const tmpOptions = JSON.parse(JSON.stringify(addressOptions))
      const tmpCustomOptions = tmpOptions.map(option => {
        return {
          ...option,
          content: <div className="option-item">{option.text}</div>
        }
      })
      tmpCustomOptions.unshift({
        text: 'Addresses',
        value: 'group-addresses',
        key: 'group-addresses',
        content: <div className="group-item">{'Addresses'}</div>
      })
      tmpCombinedOptions = tmpCombinedOptions.concat(tmpCustomOptions)
    }

    return {
      combinedOptions: tmpCombinedOptions,
      groupLabelNumber: locationOptions.length > 0 ? locationOptions.length + 2 : 0
    }
  }, [addresses, locations])

  useEffect(() => {
    if (addresses) {
      dispatch(setLocation(convertJsonForSearchableLocationSelect(addresses)))
    }
  }, [addresses, dispatch])

  const handleChange = useCallback(
    (name, val) => {
      const locationOption = locations.find(option => option.url === val)
      if (locationOption !== null && locationOption !== undefined) {
        onChange(name, val, locationOption?.phone_number || '')
        return
      }

      const addressOption = addresses.find(option => option.url === val)
      if (addressOption !== null && addressOption !== undefined) {
        onChange(name, val, addressOption?.phone_number || '')
      }
    },
    [addresses, locations, onChange]
  )

  return (
    <React.Fragment>
      <div
        css={css`
          ${LocationSearchableSelectWrapper}

          .menu > div:nth-of-type(${groupLabelNumber}) {
            pointer-events: none !important;
          }

          ${
            searchQuery.length > 0
              ? `
            .group-item {
              display: none;
            }
          `
              : ``
          }
        `}
      >
        <SearchableSelect
          className="icon"
          // customIconClass={'icon-search searchicon'}
          options={combinedOptions}
          label="Location"
          placeholder="Select a location"
          name="location"
          searchable={true}
          showErrorWrapper={showErrorWrapper}
          invalid={errors?.location ? true : false}
          errormsg={errors?.location?.type === 'required' && 'Please select your location'}
          defaultValue={defaultValue}
          onChange={handleChange}
          handleSearchChange={setSearchQuery}
        />
      </div>
      {extractErrorMsgFromArray(error, 'active_address')}
    </React.Fragment>
  )
}

export default memo(Location)
