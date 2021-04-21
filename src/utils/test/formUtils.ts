import {
  Matcher,
  MatcherOptions,
  SelectorMatcherOptions
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export const selectValue = async (
  getByTestId: (
    text: Matcher,
    options?: MatcherOptions,
    waitForElementOptions?: unknown
  ) => HTMLElement,
  getByText: (
    text: Matcher,
    options?: SelectorMatcherOptions,
    waitForElementOptions?: unknown
  ) => HTMLElement,
  selectName: string,
  option: string
) => {
  await userEvent.click(getByTestId(`select-${selectName}`))
  await userEvent.click(getByText(option))
}
