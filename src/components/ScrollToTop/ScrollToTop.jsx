import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ children }) => {
  const { key } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [key])

  return <>{children}</>
}

export default ScrollToTop
