import React, { useEffect, useRef } from 'react'
import './home.scss'

import { useNavigate } from 'react-router-dom'

import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
gsap.registerPlugin(CustomEase)

const Home = () => {
  const navigate = useNavigate()

  const intro = useRef()
  const heading = useRef()
  const image = useRef()
  const overlay = useRef()
  const pageOverlay = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        intro.current,
        2,
        { opacity: 0 },
        { opacity: 1, ease: 'power4.inOut', delay: 0.2 }
      )
      gsap.fromTo(
        heading.current,
        2,
        { opacity: 0 },
        { opacity: 1, ease: 'power1.inOut', delay: 1.1 }
      )
      gsap.fromTo(
        overlay.current,
        4,
        { scaleY: 1 },
        { scaleY: 0, ease: 'power4.inOut', delay: 0.3 }
      )

      gsap.fromTo(
        image.current,
        2.5,
        { opacity: 0 },
        { opacity: 1, delay: 1, ease: 'power4.inOut' }
      )

      gsap.fromTo(
        image.current,
        20,
        { objectPosition: '50% 30%' },
        { objectPosition: '50% 35%', delay: 1.3, ease: 'none' }
      )
    })
    return () => {
      ctx.revert()
    }
  }, [])

  function exitAnim(path) {
    gsap.to(pageOverlay.current, {
      scaleY: 1,
      duration: 1,
      ease: CustomEase.create(
        'custom',
        'M0,0,C0.05,0,0.149,0.279,0.19,0.374,0.36,0.772,0.528,0.988,1,1'
      ),
      onComplete: () => {
        navigate(path)
      }
    })
  }

  return (
    <div className="home">
      <div ref={pageOverlay} className="page-overlay"></div>
      <div className="home-inner">
        <div className="text">
          <div className="intro-text">
            <p ref={intro}>
              Jenni Cadman is a textile artist based in the UK. She draws and
              paints with threads to create artworks infused with colour,
              texture and bold graphic lines.
            </p>
          </div>
          <div className="banner-text">
            <h1 ref={heading} className="uppercase">
              Jenni Cadman
            </h1>
          </div>
        </div>
        <div
          onClick={() => {
            exitAnim('/work')
          }}
          className="banner-image"
        >
          <div ref={overlay} className="overlay"></div>
          <img ref={image} src="/images/veronica/veronica-ii.webp" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home
