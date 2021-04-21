import React, { FunctionComponent } from 'react'
import PhoneInput2 from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './style.scss'
import AnchorWithDisableToggle from '../AnchorWithDisableToggle'
interface Props {
  phoneNumber: string
  customClass?: string
  testId?: string
}
const PhoneNumberWithCodeLabel: FunctionComponent<Props> = props => {
  const { phoneNumber, customClass = '', testId } = props
  return (
    <div
      data-testid={testId}
      className={`${customClass} phonenumberwithcode-label ${
        phoneNumber ? '' : 'phonnumberempty'
      }`}
    >
      <AnchorWithDisableToggle
        disable={phoneNumber && phoneNumber !== '' ? false : true}
        href={`tel:${phoneNumber}`}
      >
        <PhoneInput2
          placeholder="(316) 123 456"
          disabled={true}
          value={phoneNumber || ''}
          onChange={null}
          countryCodeEditable={false}
          autoComplete="off"
        />
      </AnchorWithDisableToggle>
    </div>
  )
}
export default PhoneNumberWithCodeLabel
