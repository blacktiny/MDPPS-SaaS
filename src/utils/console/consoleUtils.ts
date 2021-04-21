/* eslint-disable no-console */
export const disableConsole = () => {
  const warningTitleCSS = 'color:red; font-size:60px; font-weight: bold; -webkit-text-stroke: 1px black;'
  const warningDescCSS = 'font-size: 18px;'
  console.log('%cStop!', warningTitleCSS)
  console.log('%cThis is a browser feature intended for developers. ', warningDescCSS)
  console.log = () => {
    return 'this feature is disabled due to security reasons '
  }
  console.warn = () => {
    return 'this feature is disabled due to security reasons '
  }
  console.table = () => {
    return 'this feature is disabled due to security reasons '
  }
  console.trace = () => {
    return 'this feature is disabled due to security reasons '
  }
  console.error = () => {
    return 'this feature is disabled due to security reasons '
  }
  console.assert = () => {
    return 'this feature is disabled due to security reasons '
  }
  console.group = () => {
    return 'this feature is disabled due to security reasons '
  }
  console.exception = () => {
    return 'this feature is disabled due to security reasons '
  }
  console.info = () => {
    return 'this feature is disabled due to security reasons '
  }
}
