import React, { useEffect } from 'react'
import GoogleFontLoader from 'react-google-font-loader'
import checkRequests from './components/HOC/CheckRequests'
import { GlobalStyle } from './assets/styles/GlobalStyle'
import Routes from './routes'
import { persistor } from './store/configureStore'
import { disableConsole } from './utils/console/consoleUtils'

import 'rsuite/lib/styles/index.less'
import 'rsuite/dist/styles/rsuite-default.css'

import './App.scss'
import './assets/styles/index.scss'

const App: React.FC = () => {
  useEffect(() => {
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault()
      const isRemembered = localStorage.getItem('rememberDevice')

      if (!isRemembered) {
        const loginTime = new Date(localStorage.getItem('loginTime'))
        const maxDuration = 3
        const msInHour = 3600000
        const timeElapsed = (+new Date() - +loginTime) / msInHour
        if (timeElapsed > maxDuration) {
          persistor.purge()
        }
      }
    })
  }, [])

  if (process.env.NODE_ENV === 'production') {
    disableConsole()
  }

  return (
    <>
      <GlobalStyle />
      <GoogleFontLoader
        fonts={[
          {
            font: 'Roboto',
            weights: [300, 400, 500, 700]
          }
        ]}
        subsets={['cyrillic-ext', 'greek']}
      />
      <div className="App">
        <Routes />
      </div>
    </>
  )
}

export default checkRequests(App)
