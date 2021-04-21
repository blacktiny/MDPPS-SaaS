import React, { FunctionComponent } from 'react'
import MultipleChoiceOptions, {
  Props as MultipleChoiceOptionsProps
} from '../molecules/MultipleChoiceOptions'
import TitleWithDescription from '../molecules/TitleWithDescription'

interface Props extends MultipleChoiceOptionsProps {
  optionHeader: string
  optionDescription: string
}

const LabeledAndDescribedMultipleChoiceOptions: FunctionComponent<Props> = props => {
  const {
    optionDescription,
    optionHeader,
    ...multipleChoiceOptionsProps
  } = props
  return (
    <React.Fragment>
      <TitleWithDescription topic={optionHeader}>
        {optionDescription}
      </TitleWithDescription>
      <MultipleChoiceOptions {...multipleChoiceOptionsProps} />
    </React.Fragment>
  )
}
export default LabeledAndDescribedMultipleChoiceOptions
