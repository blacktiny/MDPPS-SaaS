import React, { useEffect, useState } from 'react'
import { Container, Content, Footer, SelectPicker, Input, Icon } from 'rsuite'

export interface SocialAccountDataType {
  icon?: string
  isOpened?: boolean
  label?: string
  url?: string
  value?: string
}

function SocialMediaAccountItem(props) {
  const {
    select: { icon, url, value },
    options,
    onChanged,
    onRemoved,
    hasRemoveBtn,
    unOpenedSocials
  } = props

  const [newType, setNewType] = useState(value)
  const [accountURL, setAccountURL] = useState(url)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setNewType(value)
  }, [value])

  useEffect(() => {
    setAccountURL(url)
  }, [url])

  return (
    <Container className="Social-list-item">
      <Content className={'Social-list-item-content ' + (isFocused ? 'focused' : '')}>
        <SelectPicker
          cleanable={false}
          data={options}
          classPrefix="social"
          onChange={(newValue, _event) => {
            setNewType(newValue)
            if (value !== newValue) onChanged(value, newValue, accountURL)
          }}
          menuClassName="select-social-menu"
          renderMenuItem={(label, item: SocialAccountDataType) => {
            if (item.value === value || !unOpenedSocials.includes(item.value)) return <React.Fragment />
            return (
              <div className="Social-select-menu-item">
                <div className="Icon-container">
                  <span className={`icon-${item.icon}`} />
                </div>
                <div className="Social-select-menu-item-label">{label}</div>
              </div>
            )
          }}
          renderValue={(_value, item: SocialAccountDataType | SocialAccountDataType[], _selectedelement) => {
            if (Array.isArray(item)) {
              return (
                <div className="Social-selected-menu">
                  <div className="Icon-container">
                    <span className={`icon-${item[0].icon || icon}`} />
                  </div>
                </div>
              )
            }
            return (
              <div className="Social-selected-menu">
                <div className="Icon-container">
                  <span className={`icon-${item.icon || icon}`} />
                </div>
              </div>
            )
          }}
          searchable={false}
          value={newType}
        />
        <Input
          onChange={setAccountURL}
          onBlur={() => {
            onChanged(value, newType, accountURL)
            setIsFocused(false)
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={'Account URL'}
          value={accountURL}
        />
      </Content>

      <Footer>
        {hasRemoveBtn && (
          <div className="Social-list-item-remove-btn" onClick={() => onRemoved(value)}>
            <Icon icon="close" />
          </div>
        )}
      </Footer>
    </Container>
  )
}

export default SocialMediaAccountItem
