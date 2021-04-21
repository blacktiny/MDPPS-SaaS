import React, { ReactElement, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import './style.scss'

interface props {
  accountsList: ReactElement
  accountName: string
  onChangeAccountName: (event: ChangeEvent<HTMLInputElement>) => void
}

const AccountsList = styled.div`
  max-height: 120px;
  overflow-y: auto;
  ul {
    padding-left: 0;
    li {
      padding: 0.5rem 1.25rem;
      font-size: 1rem;
      color: #565456;
      height: 3.75rem;
      display: flex;
      align-items: center;
      clear: both;
      font-weight: 400;
      line-height: 1.42857143;
      color: #575757;
      white-space: nowrap;
      cursor: pointer;
      -webkit-transition: color 0.3s linear, background-color 0.3s linear;
      transition: color 0.3s linear, background-color 0.3s linear;
      .switchuser {
        font-size: 1.563rem;
        color: #98a0ac;
        padding-right: 1.563rem !important;
      }
      &:hover {
        color: #4284fc !important;
        background-color: #f2faff;
        span {
          color: #4284fc;
        }
      }
    }
  }
`

const SwitchAccountMenu: React.FunctionComponent<props> = props => {
  const { accountsList, accountName, onChangeAccountName } = props
  return (
    <>
      <div className="search-box">
        <span>
          <span className="icon-search" />
        </span>
        <input
          type="text"
          placeholder="Search your accounts"
          value={accountName}
          onChange={onChangeAccountName}
        />
      </div>
      <AccountsList>{accountsList}</AccountsList>
    </>
  )
}
export default SwitchAccountMenu
