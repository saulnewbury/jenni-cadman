import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import ScrollSmoother from 'gsap/dist/ScrollSmoother'

export default function useScrollSmoother() {
  gsap.registerPlugin(ScrollSmoother)

  const smoother = useRef(null)

  useEffect(() => {
    smoother.current = ScrollSmoother.create({
      smooth: 1.2,
      effects: true
    })
  }, [])

  return { smoother }
}
