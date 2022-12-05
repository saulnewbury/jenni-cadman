import React, { useEffect, useRef } from 'react'
import './layout.scss'

import Navbar from '../Navbar/Navbar'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import useScrollSmoother from '../../hooks/useScrollSmoother'

const Layout = ({ children }) => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
  const { smoother } = useScrollSmoother({})

  // const smoother = useRef(null)

  // useEffect(() => {
  //   smoother.current = ScrollSmoother.create({
  //     wrapper: '#smooth-wrapper',
  //     content: '#smooth-content',
  //     smooth: 1
  //     // smoothTouch: 0.1
  //     // normalizeScroll: true
  //   })
  //   // smoother.current.paused(false)
  //   return () => {
  //     smoother.current.kill()
  //   }
  // }, [])

  return (
    <div className="layout">
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="pages gutter z-2">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
