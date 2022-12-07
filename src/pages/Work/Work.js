import React, { useEffect, useLayoutEffect, useRef } from 'react'
import './work.scss'

import { collections } from '../../data/collections'

import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import SplitText from 'gsap/SplitText'
import useScrollSmoother from '../../hooks/useScrollSmoother'

const Work = () => {
  gsap.registerPlugin(CustomEase, SplitText)
  const navigate = useNavigate()

  const work = useRef()
  const q = gsap.utils.selector(work)

  const t1 = useRef()
  const t2 = useRef()
  const t3 = useRef()
  const t4 = useRef()

  const c1 = useRef()
  const c2 = useRef()
  const c3 = useRef()
  const c4 = useRef()

  const gallery = useRef()

  const tRefs = [t1, t2, t3, t4]
  const cRefs = [c1, c2, c3, c4]

  const { smoother } = useScrollSmoother({})

  useEffect(() => {
    smoother.current?.scrollTop(0)
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
    return () => {
      ctx.revert()
    }
  }, [])

  function handleClick(e) {
    const id = e.currentTarget.id

    gsap.to(smoother.current, {
      scrollTop: smoother.current.offset(cRefs[id].current, 'center center'),
      duration: 1.5,
      ease: 'power3.out'
    })
  }

  function exitAnim(path) {
    console.log('scale')
    gsap.to('.page-overlay', {
      scaleY: 1,
      duration: 1,
      ease: CustomEase.create(
        'custom',
        'M0,0,C0.05,0,0.149,0.279,0.19,0.374,0.36,0.772,0.528,0.988,1,1'
      ),
      onComplete: () => {
        smoother.current.scrollTop(0)
        navigate(path)
      }
    })
  }

  // function handleMouseEnter(e) {
  // console.log(e.target.className.slice(0, 7))
  // const mySplitText = new SplitText(
  //   `.${e.target.className.slice(0, 7)} .collection-number`,
  //   {
  //     type: 'chars'
  //   }
  // )

  // const chars = mySplitText.chars

  // gsap.fromTo(chars, { yPercent: 0 }, { yPercent: -130, duration: 0.15 })
  // gsap.fromTo(
  //   chars,
  //   { yPercent: 130 },
  //   { yPercent: 0, delay: 0.15, duration: 0.2 }
  // )
  // }

  function handleMouseEnter(e) {
    // Title Link animations
    console.log(e.currentTarget.className.slice(0, 7))
    const mySplitText = new SplitText(
      `.${e.currentTarget.className.slice(0, 7)} .entry-title`,
      {
        type: 'words',
        charsClass: 'words'
      }
    )
    const words = mySplitText.words
    gsap.fromTo(words, { yPercent: 0 }, { yPercent: -130, duration: 0.15 })
    const bTween = gsap.fromTo(
      words,
      { yPercent: 130 },
      {
        yPercent: 0,
        delay: 0.15,
        duration: 0.2,
        onComplete: () => {
          bTween.revert()
        }
      }
    )

    // Collection number animations
    const mySplitNum = new SplitText(
      `.${e.currentTarget.className.slice(0, 7)} .collection-number`,
      {
        type: 'chars'
      }
    )

    const nums = mySplitNum.chars

    gsap.fromTo(nums, { yPercent: 0 }, { yPercent: -130, duration: 0.3 })
    gsap.fromTo(
      nums,
      { yPercent: 130 },
      { yPercent: 0, delay: 0.15, duration: 0.4 }
    )
  }

  return (
    <div ref={work} className="work">
      <div className="work-inner">
        <div className="collections-menu title lg uppercase indent">
          <div className="collections-menu-inner">
            {collections.map((entry, idx) => (
              <div key={entry.id} ref={tRefs[idx]} className="link-wrapper">
                <div
                  className={`c-link${idx} c-link`}
                  onMouseEnter={handleMouseEnter}
                  onClick={handleClick}
                  id={idx}
                >
                  <h1 className="entry-title title lg">{entry.title}</h1>
                  <span className="collection-number-container">
                    <div className="collection-number-inner">
                      <span className="collection-number">{`0${entry.id}`}</span>
                    </div>
                  </span>
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
                    src={`/images/${entry.subFolder}/${entry.featuredImage.name}.webp`}
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

                  <div
                    className="btn see-collection-link"
                    onClick={() => {
                      exitAnim(`/0${entry.id}/`)
                    }}
                  >
                    See Collection
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Work
