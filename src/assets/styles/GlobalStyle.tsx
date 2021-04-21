import React from 'react'
import { Global, css, SerializedStyles } from '@emotion/core'
import variables from './variables'
import 'rsuite/dist/styles/rsuite-default.min.css'
// import 'semantic-ui-css/semantic.min.css'

import rfs, {
  boxModel,
  convertLineHeightToCss,
  convertPxToAbs,
  hexToRgb,
  mq
} from '../../utils/style'
import SuccessSvg from '../images/success.svg'
import InfoSvg from '../images/info.svg'
import WarningSvg from '../images/warning.svg'
import ErrorSvg from '../images/error.svg'
import CloseSvg from '../images/close-svg.svg'

const { Fonts, Colors, DropShadow } = variables

export const GlobalStyle = (props?: SerializedStyles | {}) => (
  <Global
    {...props}
    styles={css`
      html {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        ${mq({
          fontSize: [
            `${Fonts.Size.BaseXXSmall}px`,
            `${Fonts.Size.BaseXSmall}px`,
            `${Fonts.Size.BaseSmall}px`,
            `${Fonts.Size.BaseMedium}px`,
            `${Fonts.Size.BaseLarge}px`,
            `${Fonts.Size.Base}px`
          ]
        })}
      }
      body {
        font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI',
          'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
          'Helvetica Neue', sans-serif;
      }
      button {
        a {
          color: inherit;
        }
      }
      .customer-service-link,
      .customer-service-link a{
        color: ${Colors.Blue[200]} !important;
        position: relative;
        top: -1px;
      }
      .gradient-bg {
        background: linear-gradient(
            -180deg,
            ${Colors.Blue[200]} 0%,
            ${Colors.Blue[400]} 100%
          );
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
      }
      .light-gradient-bg {
          background: linear-gradient(235deg, ${Colors.Gray[50]} 0%, ${Colors.Gray[100]} 100%) 0% 0% no-repeat;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
      }
.dropdown-select{
  &__container {
    position: relative;
    .loader {
      position: absolute;
      right: ${rfs('30px')};
      top: 50%;
      transform: translateY(-50%);
    }
  }
.flag{
  &::before {
    display: inline-block;
    content: '';
    background: url(/static/media/flags.9c74e172.png) no-repeat -108px -1976px;
    width: 16px;
    height: 11px
}

}
i.flag.ad:before,i.flag.andorra:before {
    background-position: 0 0
}

i.flag.ae:before,i.flag.uae:before,i.flag.united.arab.emirates:before {
    background-position: 0 -26px
}

i.flag.af:before,i.flag.afghanistan:before {
    background-position: 0 -52px
}

i.flag.ag:before,i.flag.antigua:before {
    background-position: 0 -78px
}

i.flag.ai:before,i.flag.anguilla:before {
    background-position: 0 -104px
}

i.flag.al:before,i.flag.albania:before {
    background-position: 0 -130px
}

i.flag.am:before,i.flag.armenia:before {
    background-position: 0 -156px
}

i.flag.an:before,i.flag.netherlands.antilles:before {
    background-position: 0 -182px
}

i.flag.angola:before,i.flag.ao:before {
    background-position: 0 -208px
}

i.flag.ar:before,i.flag.argentina:before {
    background-position: 0 -234px
}

i.flag.american.samoa:before,i.flag.as:before {
    background-position: 0 -260px
}

i.flag.at:before,i.flag.austria:before {
    background-position: 0 -286px
}

i.flag.au:before,i.flag.australia:before {
    background-position: 0 -312px
}

i.flag.aruba:before,i.flag.aw:before {
    background-position: 0 -338px
}

i.flag.aland.islands:before,i.flag.ax:before {
    background-position: 0 -364px
}

i.flag.az:before,i.flag.azerbaijan:before {
    background-position: 0 -390px
}

i.flag.ba:before,i.flag.bosnia:before {
    background-position: 0 -416px
}

i.flag.barbados:before,i.flag.bb:before {
    background-position: 0 -442px
}

i.flag.bangladesh:before,i.flag.bd:before {
    background-position: 0 -468px
}

i.flag.be:before,i.flag.belgium:before {
    background-position: 0 -494px
}

i.flag.bf:before,i.flag.burkina.faso:before {
    background-position: 0 -520px
}

i.flag.bg:before,i.flag.bulgaria:before {
    background-position: 0 -546px
}

i.flag.bahrain:before,i.flag.bh:before {
    background-position: 0 -572px
}

i.flag.bi:before,i.flag.burundi:before {
    background-position: 0 -598px
}

i.flag.benin:before,i.flag.bj:before {
    background-position: 0 -624px
}

i.flag.bermuda:before,i.flag.bm:before {
    background-position: 0 -650px
}

i.flag.bn:before,i.flag.brunei:before {
    background-position: 0 -676px
}

i.flag.bo:before,i.flag.bolivia:before {
    background-position: 0 -702px
}

i.flag.br:before,i.flag.brazil:before {
    background-position: 0 -728px
}

i.flag.bahamas:before,i.flag.bs:before {
    background-position: 0 -754px
}

i.flag.bhutan:before,i.flag.bt:before {
    background-position: 0 -780px
}

i.flag.bouvet.island:before,i.flag.bv:before {
    background-position: 0 -806px
}

i.flag.botswana:before,i.flag.bw:before {
    background-position: 0 -832px
}

i.flag.belarus:before,i.flag.by:before {
    background-position: 0 -858px
}

i.flag.belize:before,i.flag.bz:before {
    background-position: 0 -884px
}

i.flag.ca:before,i.flag.canada:before {
    background-position: 0 -910px
}

i.flag.cc:before,i.flag.cocos.islands:before {
    background-position: 0 -962px
}

i.flag.cd:before,i.flag.congo:before {
    background-position: 0 -988px
}

i.flag.central.african.republic:before,i.flag.cf:before {
    background-position: 0 -1014px
}

i.flag.cg:before,i.flag.congo.brazzaville:before {
    background-position: 0 -1040px
}

i.flag.ch:before,i.flag.switzerland:before {
    background-position: 0 -1066px
}

i.flag.ci:before,i.flag.cote.divoire:before {
    background-position: 0 -1092px
}

i.flag.ck:before,i.flag.cook.islands:before {
    background-position: 0 -1118px
}

i.flag.chile:before,i.flag.cl:before {
    background-position: 0 -1144px
}

i.flag.cameroon:before,i.flag.cm:before {
    background-position: 0 -1170px
}

i.flag.china:before,i.flag.cn:before {
    background-position: 0 -1196px
}

i.flag.co:before,i.flag.colombia:before {
    background-position: 0 -1222px
}

i.flag.costa.rica:before,i.flag.cr:before {
    background-position: 0 -1248px
}

i.flag.cs:before,i.flag.serbia:before {
    background-position: 0 -1274px
}

i.flag.cu:before,i.flag.cuba:before {
    background-position: 0 -1300px
}

i.flag.cape.verde:before,i.flag.cv:before {
    background-position: 0 -1326px
}

i.flag.christmas.island:before,i.flag.cx:before {
    background-position: 0 -1352px
}

i.flag.cy:before,i.flag.cyprus:before {
    background-position: 0 -1378px
}

i.flag.cz:before,i.flag.czech.republic:before {
    background-position: 0 -1404px
}

i.flag.de:before,i.flag.germany:before {
    background-position: 0 -1430px
}

i.flag.dj:before,i.flag.djibouti:before {
    background-position: 0 -1456px
}

i.flag.denmark:before,i.flag.dk:before {
    background-position: 0 -1482px
}

i.flag.dm:before,i.flag.dominica:before {
    background-position: 0 -1508px
}

i.flag.do:before,i.flag.dominican.republic:before {
    background-position: 0 -1534px
}

i.flag.algeria:before,i.flag.dz:before {
    background-position: 0 -1560px
}

i.flag.ec:before,i.flag.ecuador:before {
    background-position: 0 -1586px
}

i.flag.ee:before,i.flag.estonia:before {
    background-position: 0 -1612px
}

i.flag.eg:before,i.flag.egypt:before {
    background-position: 0 -1638px
}

i.flag.eh:before,i.flag.western.sahara:before {
    background-position: 0 -1664px
}

i.flag.england:before,i.flag.gb.eng:before {
    background-position: 0 -1690px
}

i.flag.er:before,i.flag.eritrea:before {
    background-position: 0 -1716px
}

i.flag.es:before,i.flag.spain:before {
    background-position: 0 -1742px
}

i.flag.et:before,i.flag.ethiopia:before {
    background-position: 0 -1768px
}

i.flag.eu:before,i.flag.european.union:before {
    background-position: 0 -1794px
}

i.flag.fi:before,i.flag.finland:before {
    background-position: 0 -1846px
}

i.flag.fiji:before,i.flag.fj:before {
    background-position: 0 -1872px
}

i.flag.falkland.islands:before,i.flag.fk:before {
    background-position: 0 -1898px
}

i.flag.fm:before,i.flag.micronesia:before {
    background-position: 0 -1924px
}

i.flag.faroe.islands:before,i.flag.fo:before {
    background-position: 0 -1950px
}

i.flag.fr:before,i.flag.france:before {
    background-position: 0 -1976px
}

i.flag.ga:before,i.flag.gabon:before {
    background-position: -36px 0
}

i.flag.gb:before,i.flag.uk:before,i.flag.united.kingdom:before {
    background-position: -36px -26px
}

i.flag.gd:before,i.flag.grenada:before {
    background-position: -36px -52px
}

i.flag.ge:before,i.flag.georgia:before {
    background-position: -36px -78px
}

i.flag.french.guiana:before,i.flag.gf:before {
    background-position: -36px -104px
}

i.flag.gh:before,i.flag.ghana:before {
    background-position: -36px -130px
}

i.flag.gi:before,i.flag.gibraltar:before {
    background-position: -36px -156px
}

i.flag.gl:before,i.flag.greenland:before {
    background-position: -36px -182px
}

i.flag.gambia:before,i.flag.gm:before {
    background-position: -36px -208px
}

i.flag.gn:before,i.flag.guinea:before {
    background-position: -36px -234px
}

i.flag.gp:before,i.flag.guadeloupe:before {
    background-position: -36px -260px
}

i.flag.equatorial.guinea:before,i.flag.gq:before {
    background-position: -36px -286px
}

i.flag.gr:before,i.flag.greece:before {
    background-position: -36px -312px
}

i.flag.gs:before,i.flag.sandwich.islands:before {
    background-position: -36px -338px
}

i.flag.gt:before,i.flag.guatemala:before {
    background-position: -36px -364px
}

i.flag.gu:before,i.flag.guam:before {
    background-position: -36px -390px
}

i.flag.guinea-bissau:before,i.flag.gw:before {
    background-position: -36px -416px
}

i.flag.guyana:before,i.flag.gy:before {
    background-position: -36px -442px
}

i.flag.hk:before,i.flag.hong.kong:before {
    background-position: -36px -468px
}

i.flag.heard.island:before,i.flag.hm:before {
    background-position: -36px -494px
}

i.flag.hn:before,i.flag.honduras:before {
    background-position: -36px -520px
}

i.flag.croatia:before,i.flag.hr:before {
    background-position: -36px -546px
}

i.flag.haiti:before,i.flag.ht:before {
    background-position: -36px -572px
}

i.flag.hu:before,i.flag.hungary:before {
    background-position: -36px -598px
}

i.flag.id:before,i.flag.indonesia:before {
    background-position: -36px -624px
}

i.flag.ie:before,i.flag.ireland:before {
    background-position: -36px -650px
}

i.flag.il:before,i.flag.israel:before {
    background-position: -36px -676px
}

i.flag.in:before,i.flag.india:before {
    background-position: -36px -702px
}

i.flag.indian.ocean.territory:before,i.flag.io:before {
    background-position: -36px -728px
}

i.flag.iq:before,i.flag.iraq:before {
    background-position: -36px -754px
}

i.flag.ir:before,i.flag.iran:before {
    background-position: -36px -780px
}

i.flag.iceland:before,i.flag.is:before {
    background-position: -36px -806px
}

i.flag.it:before,i.flag.italy:before {
    background-position: -36px -832px
}

i.flag.jamaica:before,i.flag.jm:before {
    background-position: -36px -858px
}

i.flag.jo:before,i.flag.jordan:before {
    background-position: -36px -884px
}

i.flag.japan:before,i.flag.jp:before {
    background-position: -36px -910px
}

.ui.dropdown {
  .menu {
    cursor: auto;
    position: absolute;
    display: none;
    outline: 0;
    top: 100%;
    // min-width: max-content;
    margin: 0;
    padding: 0 0;
    background: #fff;
    font-size: 1em;
    text-shadow: none;
    text-align: left;
    box-shadow: ${DropShadow.standard};
    border-radius: 4px;
    transition: opacity .1s ease;
    z-index: 99;
    will-change: transform,opacity
}
}



.ui.selection.dropdown {
  .menu{
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    max-height: 200px;
    border-radius: 4px;
    box-shadow: ${DropShadow.standard};
    transition: opacity .1s ease;
    padding: ${boxModel('10px 0')};
    margin-bottom: 30px;


  .item {
          padding: ${boxModel('10px 20px')};
        color: #7f7f7f;
        font-size: ${rfs(Fonts.Size.XSmall)};
        letter-spacing: 0.22px;
        cursor: pointer;
        transition: all 0.5s ease-in-out;

        .flag{
          margin-right: 7px;
        }
        &:hover{
          background-color: ${Colors.Blue[25]} !important;
          color: ${Colors.Blue[200]} !important;
        }
        &.selected{
          background-color: ${Colors.Blue[25]} !important;
          color: ${Colors.Blue[200]};
        }

}
}
}


.ui.dropdown .menu {
    left: 0
}

.ui.fluid.dropdown {
  display: block;
  width: 100%;
  position: relative;

  &:focus {
    outline: none;
    div.text {
      border: 1px solid ${Colors.Blue[200]} !important;
      background-color: #fff !important;
      transition: background 0.5s ease-in-out;
    }
  }

  &::after {
    content: "";
    border: solid #657786;
    border-width: 0 3px 3px 0;
    border-radius: 1px;
    display: inline-block;
    padding: 3.5px;
    transform: rotate(45deg) translateY(-50%);
    position: absolute;
    right: ${boxModel('20px')};
    top: calc(50% - 5px);
    cursor: pointer;
  }

  .message {
    padding: 0.375rem 1.25rem;
    font-size: 0.875rem;
  }
}
.ui.dropdown{
  .dropdown{
    .icon {
    font-family: Dropdown;
    line-height: 1;
    height: 1em;
    width: 1.23em;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    font-weight: 400;
    font-style: normal;
    text-align: center;
    &::before{
      content: '\f0d7';
    }
}
  }
 .filtered.text {
    visibility: hidden
}
}


.visible.transition {
    display: block!important;
    visibility: visible!important
}
.ui.fluid.selection.dropdown[role=listbox]
{
  div.text {
    display: flex;
    align-items: center;
    background: ${Colors.Gray[50]};
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: ${rfs('12px')};
    height: ${boxModel('50px')};
    min-height: 32px;
    padding: ${boxModel('18px 20px')};
    transition: background 0.5s ease-in-out;
    width: 100%;
    color: ${Colors.Gray[500]};
    &::placeholder {
      color: ${Colors.Gray[400]};
      &:first-letter {
        text-transform: capitalize;
      }
    }

    &:hover {
      background: ${Colors.Gray[100]};
      border-color: transparent;
    }
  }
}

.ui.search.dropdown {
  input {
    background: ${Colors.Gray[50]};
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: ${rfs('12px')};
    height: ${boxModel('50px')};
    min-height: 32px;
    padding: ${boxModel('18px 20px')};
    transition: background 0.5s ease-in-out;
    width: 100%;
    color: ${Colors.Gray[500]};
    z-index: 2;
    &::placeholder {
      color: ${Colors.Gray[400]};
      &:first-letter {
        text-transform: capitalize;
      }
    }

    &:hover {
      background: ${Colors.Gray[100]};
      border-color: transparent;
    }
    &:focus,
    &:active {
      border: 1px solid ${Colors.Blue[200]} !important;
      background: ${Colors.Gray[25]};
    }
  }

  &.active {
    div.text.default {
      color: ${Colors.Gray[200]};
    }
  }

  &.disabled {
      background-color: ${Colors.Gray[50]};
      div.text, .search {
        color: ${Colors.Gray[200]};
        cursor: not-allowed;
        &::placeholder {
          color: ${Colors.Gray[200]};
        }
        &:hover,
        &:focus {
          background-color: ${Colors.Gray[50]} !important;
          border-color: transparent;
        }
      }
  }
}

.ui.search.dropdown > .text {
  color: ${Colors.Gray[500]};
  cursor: text;
  position: absolute;
  left: ${boxModel('20px')};
  z-index: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.75rem;

  &.default {
    color: ${Colors.Gray[200]};
  }
}

}

.ui.search.dropdown input:focus{
outline: none !important;
}

      .rs-notification {
        ${mq({
          top: [`${boxModel('70px')} !important`, '', '', `${boxModel('50px')} !important`]
        })}

        ${mq({
          maxWidth: [`${boxModel('350px')}`, `${boxModel('500px')}`],
          width: [`${boxModel('350px')}`, `${boxModel('500px')}`]
        })}
        .rs-notification-item-wrapper {
          max-width: 100%;
          width: ${boxModel('500px')};
          .rs-notification-item {
            .rs-notification-item-content {
              background: ${Colors.Gray[25]};
              box-shadow: ${DropShadow.standard};
              border-radius: 10px;
              border-left: 10px solid ${Colors.Gray[100]};
              width: 100%;
              max-width: ${boxModel('500px')};
              padding: ${boxModel('25px 20px', true)};
              .rs-notification-title {
                font-size: ${rfs(Fonts.Size.Small)};
                color: ${Colors.Black[0]};
                letter-spacing: 0.45px;
                line-height: ${convertLineHeightToCss(30, convertPxToAbs(Fonts.Size.Small))};
                font-weight: ${Fonts.Weight.Medium};
                padding-left: ${boxModel('48px', true)};
                padding-right: ${boxModel('30px', true)};
                text-transform: capitalize;

                .rs-notification-title-with-icon {
                  text-overflow: initial;
                  white-space: normal;
                  .rs-icon {
                    width: ${boxModel('28px')};
                    height: ${boxModel('28px')};
                    color: ${Colors.Gray[100]};
                    /* margin-right: ${boxModel('28px')}; */
                    display: initial;
                    font-size: ${rfs('20px')};
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: ${boxModel('30px')};
                    &::before {
                      font-weight: 600;
                    }
                  }
                }
              }
            }
            &.rs-notification-success {
              .rs-notification-item-content {
                border-left-color: rgba(
                  ${hexToRgb(Colors.Green[200]).join()},
                  1
                );

                .rs-notification-title {
                  .rs-notification-title-with-icon {
                    .rs-icon {
                      color: ${Colors.Orange[150]};
                        background-image: url(${SuccessSvg});
                      &::before{
                        content: none;
                      }
                    }
                  }
                }
              }
            }
            &.rs-notification-info {
              .rs-notification-item-content {
                border-left-color: rgba(
                  ${hexToRgb(Colors.Blue[200]).join()},
                  1
                );
                .rs-notification-title {
                  .rs-notification-title-with-icon {
                    .rs-icon {
                      color: ${Colors.Orange[150]};
                        background-image: url(${InfoSvg});
                      &::before{
                        content: none;
                      }
                    }
                  }
                }
              }
            }
            &.rs-notification-warning {
              .rs-notification-item-content {
                border-left-color: rgba(
                  ${hexToRgb(Colors.Orange[150]).join()},
                  1
                );
                .rs-notification-title {
                  .rs-notification-title-with-icon {
                    .rs-icon {
                      color: ${Colors.Orange[150]};
                        background-image: url(${WarningSvg});
                      &::before{
                        content: none;
                      }
                    }
                  }
                }
              }
            }
            &.rs-notification-error {
              .rs-notification-item-content {
                border-left-color: rgba(
                  ${hexToRgb(Colors.Orange[300]).join()},
                  1
                );
                .rs-notification-title {
                  .rs-notification-title-with-icon {
                    .rs-icon {
                      color: ${Colors.Orange[150]};
                        background-image: url(${ErrorSvg});
                      &::before{
                        content: none;
                      }
                    }
                  }
                }
              }
            }
          }
          .rs-notification-description {
            margin-top: 0;
            font-weight: ${Fonts.Weight.Regular};
            font-size: ${rfs(Fonts.Size.XSmall)};
            color: ${Colors.Gray[400]};
            margin-left: ${boxModel('48px', true)} !important;
            padding-right: ${boxModel('30px', true)};
            letter-spacing: 0.28px;
            line-height: ${convertLineHeightToCss(22, convertPxToAbs(Fonts.Size.XSmall))};
            &::first-letter {
              text-transform: capitalize;
            }
          }
          .rs-notification-item-close {
            top: 50%;
            transform: translatey(-50%);
            right: ${boxModel('20px')};
            background: ${Colors.Gray[50]};
            width: ${boxModel('14px')};
            height: ${boxModel('14px')};
            line-height: ${boxModel('14px')};
            border-radius: 50%;
            /* font-weight: ${Fonts.Weight.Bold};
            color: ${Colors.Gray[400]}; */
            display: flex;
            align-items: center;
            justify-content: center;
            .rs-notification-item-close-x{
              background-image: url(${CloseSvg});
              background-size: contain;
              width: 10px;
              height: 10px;
              display: flex;
              align-items: center;
              background-repeat: no-repeat;
                &::before{
                  content: none;
                }
            }
          }
        }
      }

      .skip-link {
        font-weight: ${Fonts.Weight.Regular};
        padding-left: ${boxModel('7px')} !important;
      }
.rs-btn-disabled{
  cursot: disabled !important;
}
.rs-picker-menu{
  max-width: fit-content;
  ul {
    padding: ${boxModel('10px 0')} !important;
    li {
      a{
        padding: ${boxModel('15px 20px')};
        color: ${Colors.Gray[400]};
        font-size: ${rfs(Fonts.Size.XSmall)};
        letter-spacing: 0.22px;
        cursor: pointer;
        &:hover {
          background: ${Colors.Blue[25]};
          color: ${Colors.Blue[200]} !important;
        }
      }
      }
}
}
      .text-transform-none{
        text-transform: none;
        &::first-letter {
          text-transform: none !important;
        }
      }
      .align-items-center {
        align-items: center;
      }
      .font-weight-medium {
        font-weight: ${Fonts.Weight.Medium};
      }
      .justify-content-end{
        justify-content: flex-end;
      }
      .w-100 {
        width: 100%;
      }
      .text-center {
        text-align: center;
      }
      .mb-10 {
        margin-bottom: ${boxModel('10px')};
      }
      .mb-20 {
        margin-bottom: ${boxModel('20px')};
      }
      .mb-25 {
        margin-bottom: ${boxModel('25px')};
      }
      .mb-30 {
        margin-bottom: ${boxModel('30px', true)};
      }
      .mb-40 {
        margin-bottom: ${boxModel('40px', true)};
      }
      .mb-60 {
        margin-bottom: ${boxModel('60px', true)};
      }
      .mb-75 {
        margin-bottom: ${boxModel('75px', true)};
      }
      .mb--52 {
        margin-top: ${boxModel('-52px', true)};
      }
      .mt-20 {
        margin-top: ${boxModel('20px')};
      }
      .mt-10 {
        margin-top: ${boxModel('10px')};
      }
      .mt-7 {
        margin-top: ${boxModel('7px')};
      }
      .mt-30 {
        margin-top: ${boxModel('30px', true)};
      }
      .mt-40 {
        margin-top: ${boxModel('40px', true)};
      }
      .my-45 {
        margin-top: ${boxModel('45px', true)};
        margin-bottom: ${boxModel('45px', true)};
      }
      .mx-0 {
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .my-0{
        margin-top: 0 !important  ;
        margin-bottom: 0 !important ;
      }
      .mr-20 {
        margin-right: ${boxModel('20px', true)};
      }
      .ml-20 {
        margin-left: ${boxModel('20px', true)};
      }
      .ml-10 {
        margin-left: ${boxModel('10px')};
      }
      .ml--4 {
        margin-left: ${boxModel('4px')};
      }
      .pl-20 {
        padding-left: ${boxModel('20px', true)};
      }
      .pl-10 {
        padding-left: ${boxModel('10px')};
      }
      .pl-5 {
        padding-left: ${boxModel('5px')} !important;
      }
      .pr-10 {
        padding-right: ${boxModel('10px')};
      }
      .pr-40 {
        padding-right: ${boxModel('40px', true)};
      }
      .pt-30 {
        padding-top: ${boxModel('30px', true)};
      }
      .pt-0 {
        padding-top: 0 !important;
      }
      .error-wrapper {
          height: 17px;
          margin: ${boxModel('5px 0')};
      }
      .text-right{
      text-align: right;
      }
    `}
  />
)
