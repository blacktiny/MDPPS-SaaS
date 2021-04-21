import React, { FunctionComponent } from 'react'
import TextArea, { Props as TextAreaProps } from '../atoms/TextArea'
import BoldTopic from '../atoms/BoldTopic'

interface Props extends TextAreaProps {
  optionHeader: string
}

const LabeledTextArea: FunctionComponent<Props> = props => {
  const { optionHeader = '', ...textAreaProps } = props
  return (
    <React.Fragment>
      <BoldTopic>{optionHeader}</BoldTopic>
      <TextArea {...textAreaProps} />
    </React.Fragment>
  )
}
export default LabeledTextArea
