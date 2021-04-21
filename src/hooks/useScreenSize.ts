import { useState, useEffect } from 'react'

export function useScreenSize(): { width: number; height: number } {
  const [width, setWidth] = useState<number>(window.innerWidth)
  const [height, setHeight] = useState<number>(window.innerHeight)
  useEffect(() => {
    const resizeHandler = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    resizeHandler()
    window.addEventListener('resize', resizeHandler)
    return window.removeEventListener('resize', resizeHandler)
  }, [])
  return { width, height }
}
