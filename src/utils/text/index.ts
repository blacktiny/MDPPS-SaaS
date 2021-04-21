export function hidePartOfTheText(visibleLength: number) {
  return (text: string): string =>
    text.length > visibleLength
      ? text
          .slice(0, visibleLength - 4)
          .trim()
          .concat('...')
      : text
}
