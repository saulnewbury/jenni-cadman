import React, { useEffect, useRef } from 'react'

import gsap from 'gsap'

import './home.scss'

const Home = () => {
  const intro = useRef()
  const heading = useRef()
  const image = useRef()
  const overlay = useRef()

  useEffect(() => {
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
  }, [])

  return (
    <div className="home">
      <div className="home-inner">
        <div className="text">
          <div className="intro-text">
            <p ref={intro}>
              Textile artist... drawing with the needle Jenni builds layers of
              threads in broad painterly strokes and bold flowing lines.
            </p>
          </div>
          <div className="banner-text">
            <h1 ref={heading} className="uppercase">
              Jenni Cadman
            </h1>
          </div>
        </div>
        <div className="banner-image">
          <div ref={overlay} className="overlay"></div>
          <img ref={image} src="/images/veronica/veronica-2.webp" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home
