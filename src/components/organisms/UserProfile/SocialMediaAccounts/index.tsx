import React, { useCallback, useMemo } from 'react'
import { Container, Content, Footer } from 'rsuite'
import SocialMediaAccountItem from './SocialMediaAccountItem'
// import AddSocialBtnImgURL from '../../../assets/images/add_social_btn.png'

import './styles.scss'

export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  onChanged: (accounts: []) => void
}

const SocialMediaAccounts: React.FC<Props> = props => {
  const { data, onChanged } = props

  const openedSocials = useMemo(() => {
    return data.filter(item => item.isOpened === true)
  }, [data])

  const unOpenedSocials = useMemo(() => {
    return data.filter(item => item.isOpened === false)
  }, [data])

  // handler for social accounts info update event
  const handlerSocialAccountChange = useCallback(
    (oldType, newType, url, isRemoved = false) => {
      if (isRemoved) {
        // remove social account
        const indexOfOldSocial = data.findIndex(social => social.value === oldType)
        data[indexOfOldSocial].isOpened = false
        const indexOfFirstUnOpenedSocial =
          unOpenedSocials.length > 0 ? data.findIndex(social => social.value === unOpenedSocials[0].value) : data.length
        data.splice(indexOfFirstUnOpenedSocial, 0, data[indexOfOldSocial])
        data.splice(indexOfOldSocial, 1)
      } else if (oldType === newType) {
        // update accountURL
        const indexOfOldSocial = data.findIndex(social => social.value === newType)
        data[indexOfOldSocial].url = url
      } else {
        // switch other social type
        // new
        const indexOfNewSocial = data.findIndex(social => social.value === newType)
        data[indexOfNewSocial].isOpened = true
        // old
        const indexOfOldSocial = data.findIndex(social => social.value === oldType)
        data[indexOfOldSocial].isOpened = false
        // replace
        const tmpSocial = data[indexOfNewSocial]
        data[indexOfNewSocial] = data[indexOfOldSocial]
        data[indexOfOldSocial] = tmpSocial
      }
      onChanged(JSON.parse(JSON.stringify(data)))
    },
    [data, onChanged, unOpenedSocials]
  )

  // handler for add new social event
  const handlerAddNewSocial = useCallback(() => {
    const indexOfNewSocial = data.findIndex(social => social.value === unOpenedSocials[0].value)
    data[indexOfNewSocial].isOpened = true
    onChanged(JSON.parse(JSON.stringify(data)))
  }, [data, onChanged, unOpenedSocials])

  return (
    <Container className="Social-list">
      <p className="Input-item-title">Social Media Accounts</p>

      <Content>
        {openedSocials.map((social, index) => {
          return (
            <SocialMediaAccountItem
              key={index}
              options={data}
              select={social}
              unOpenedSocials={unOpenedSocials.length > 0 ? unOpenedSocials.map(social => social.value) : []}
              onChanged={handlerSocialAccountChange}
              onRemoved={oldType => handlerSocialAccountChange(oldType, null, null, true)}
              hasRemoveBtn={openedSocials.length > 1}
            />
          )
        })}
      </Content>

      <Footer>
        {Boolean(unOpenedSocials.length) && (
          <div className="Social-list-add-btn" onClick={handlerAddNewSocial}>
            <span className="icon-add" />
          </div>
        )}
      </Footer>
    </Container>
  )
}

export default SocialMediaAccounts
