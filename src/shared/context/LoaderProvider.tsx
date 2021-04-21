import React, { FunctionComponent, useState, createContext } from 'react'

import { Loader } from '../../components/atoms/Loader'

interface Props {}

export const LoaderContext = createContext(null)

const LoaderProvider: FunctionComponent<Props> = props => {
  const [showLoader, setShowLoader] = useState(false)
  return (
    <LoaderContext.Provider value={{ setShowLoader }}>
      {props.children}
      {showLoader && <Loader style={{ zIndex: 53 }} />}
    </LoaderContext.Provider>
  )
}
export default LoaderProvider
