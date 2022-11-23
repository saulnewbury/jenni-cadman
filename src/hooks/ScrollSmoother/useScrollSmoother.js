import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollSmoother from 'gsap/ScrollSmoother'

const useScrollSmoother = () => {
  gsap.registerPlugin(ScrollSmoother)

  var smoother = useRef(null)

  useEffect(() => {
    smoother.current = ScrollSmoother.create({
      smooth: 4,
      effects: true
    })
  }, [])

  return { smoother }
}

export default useScrollSmoother
