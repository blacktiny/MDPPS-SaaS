import React, { FunctionComponent } from 'react'
import { Loader, LoaderProps } from 'rsuite'
interface Props extends LoaderProps {
  showLoading: boolean
}

const ContainerLoader: FunctionComponent<Props> = props => {
  const { showLoading, ...restOfProps } = props
  if (showLoading) return <Loader {...restOfProps} center={true} />
  return <React.Fragment></React.Fragment>
}
export default ContainerLoader
