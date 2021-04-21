import { useState, useEffect } from 'react'
import React from 'react'

interface Props {
  canCount: boolean
  to: number
  from?: number
  steps?: number
  reverse?: boolean
  onCountOver?: (
    from?: number,
    to?: number,
    scale?: number,
    steps?: number
  ) => void
}
function formatTime(msTime: number): string {
  const sec = msTime / 1000
  return `${sec < 0 ? '-' : ''}${
    Math.abs(sec / 60) >= 10
      ? Math.floor(sec / 60)
      : sec / 60 > 1
      ? `0${Math.floor(sec / 60)}`
      : '00'
  }:${
    Math.round(Math.abs(sec % 60)) < 10
      ? `0${Math.round(Math.abs(sec % 60))}`
      : Math.round(Math.abs(sec % 60))
  }`
}

function Counter({
  canCount,
  to,
  from = 0,
  steps = 1,
  reverse = false,
  onCountOver
}: Props) {
  const [count, setCount] = useState<number>(from)
  const [startDate, setStartDate] = useState<number>()
  useEffect(() => {
    if (canCount) {
      setStartDate(Date.now())
    }
  }, [canCount])
  useEffect(() => {
    if ((from > to && steps > 0) || (from < to && steps < 0)) {
      throw Error('invalid direction, set from, steps and to correctly')
    }
  }, [to, steps, from])
  useEffect(() => {
    setTimeout(() => {
      if (canCount && !((0 > to && count <= to) || (0 < to && count >= to))) {
        setCount((Date.now() - startDate) / 1000)
      }
    }, 1000 * steps)
    return () => clearTimeout(1000)
  }, [canCount, count, to, from, steps, onCountOver, startDate])

  useEffect(() => {
    if ((0 > to && count <= to) || (0 < to && count >= to)) {
      onCountOver(from, to, 1000, steps)
      setCount(from)
      setStartDate(undefined)
    }
  }, [count, from, onCountOver, steps, to])

  return (
    <span>
      {reverse ? formatTime((to - count) * 1000) : formatTime(count * 1000)}
    </span>
  )
}

export default Counter
