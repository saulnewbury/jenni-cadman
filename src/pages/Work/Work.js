import React, { useEffect, useLayoutEffect, useRef } from 'react'
import './work.scss'

import { collections } from '../../data/collections'

import { Link } from 'react-router-dom'
import gsap from 'gsap'
import ScrollSmoother from 'gsap/ScrollSmoother'
import ScrollTrigger from 'gsap/ScrollTrigger'
import CustomEase from 'gsap/CustomEase'
gsap.registerPlugin(ScrollSmoother, ScrollTrigger, CustomEase)

const Work = () => {
  const t1 = useRef()
  const t2 = useRef()
  const t3 = useRef()
  const t4 = useRef()

  const c1 = useRef()
  const c2 = useRef()
  const c3 = useRef()
  const c4 = useRef()

  const gallery = useRef()
  const q = gsap.utils.selector(gallery)

  const tRefs = [t1, t2, t3, t4]
  const cRefs = [c1, c2, c3, c4]

  const smoother = useRef(null)

  useLayoutEffect(() => {
    smoother.current = ScrollSmoother.create({
      // wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1,
      smoothTouch: 0.1
    })
    smoother.current.effects(q('.info'), {
      speed: 1.05
    })

    return () => {
      smoother.current.revert()
    }
  }, [])

  useEffect(() => {
    gsap.fromTo(
      [t1.current, t2.current, t3.current, t4.current],
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.5
      }
    )
    gsap.fromTo(
      gallery.current,
      1,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, delay: 1 }
    )
  })

  function handleClick(e) {
    const id = e.currentTarget.id
    // cRefs[id].current.scrollIntoView({ block: 'center', behavior: 'smooth' })

    // smoother.scrollTo(cRefs[id].current, true, 'center center')
    gsap.to(smoother.current, {
      scrollTop: smoother.current.offset(cRefs[id].current, 'center center'),
      duration: 1.5,
      ease: 'power3.out'
    })
  }

  return (
    <section id="smooth-wrapper" className="work">
      <div id="smooth-content" className="work-inner">
        <div className="collections-menu title lg uppercase indent">
          <div className="collections-menu-inner">
            {collections.map((entry, idx) => (
              <div key={entry.id} ref={tRefs[idx]} className="link-wrapper">
                <div className="c-link" onClick={handleClick} id={idx}>
                  {entry.title}
                  <span className="collection-number">{`0${entry.id}`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div ref={gallery} className="collections-gallery">
          {collections.map((entry, idx) => (
            <div
              key={entry.id}
              ref={cRefs[idx]}
              className={`collection c${idx + 1}`}
            >
              <div className="image">
                <div className="image-wrapper">
                  <img
                    src={`/images/${entry.subFolder}/${entry.featuredImage.name}.jpg`}
                    alt=""
                  />
                </div>
              </div>
              <div className="info">
                <div className="info-inner">
                  <h2 className="title sm uppercase">{entry.title}</h2>
                  {entry.desc.map((p, idx) => (
                    <p key={idx.toString()}>{p}</p>
                  ))}

                  <Link
                    to={`/0${entry.id}/`}
                    className="btn see-collection-link"
                  >
                    See Collection
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
