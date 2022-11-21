import React, { useEffect, useRef } from 'react'
import './bio.scss'
import { resumeEntries } from '../../data/resume'

import { bioInfo } from '../../data/bioInfo'

import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
gsap.registerPlugin(SplitText)
gsap.registerPlugin(CustomEase)

const Bio = () => {
  const image = useRef()
  const overlay = useRef()
  const creds = useRef()
  const info = useRef()

  //-------------------------------------------------------------------------
  // Enter animation
  //-------------------------------------------------------------------------
  useEffect(() => {
    //Image
    gsap.fromTo(
      image.current,
      { objectPosition: '50% 45%' },
      { objectPosition: '50% 50%' }
    )

    // Overlay
    gsap.fromTo(
      overlay.current,
      2,
      { scaleY: 1 },
      {
        scaleY: 0,
        ease: CustomEase.create(
          'custom',
          'M0,0,C0.05,0,0.149,0.279,0.19,0.374,0.36,0.772,0.528,0.988,1,1'
        ),
        delay: 0.5
      }
    )

    // Bio text
    const ps = info.current.children
    const childSplit = new SplitText(ps, {
      type: 'lines',
      linesClass: 'split-child'
    })

    gsap.from(childSplit.lines, {
      duration: 1.5,
      yPercent: 100,
      ease: 'power2.inOut',
      stagger: 0.05,
      delay: 1
    })
  }, [])

  return (
    <div className="bio">
      <div className="bio-inner">
        <section className="jenni-cadman indent">
          <div className="image">
            <div className="image-wrapper">
              <div ref={overlay} className="overlay"></div>
              <img
                ref={image}
                src="/images/other/jenni-cadman-textileartist-portrait.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="credentials">
            <div ref={creds} className="credentials-inner">
              <p>
                Jenni Cadman <br />
                Textile artist <br />
                <br />
                Dorset, <br />
                Milborne Port, <br />
                DT9, UK <br />
                <br />
                jennicadman@gmail.com
              </p>
            </div>
          </div>
          <div className="info">
            <div ref={info} className="info-inner">
              {bioInfo.map((para, idx) => (
                <p key={idx.toString()}>{para}</p>
              ))}
            </div>
          </div>
        </section>
        <section className="experience indent">
          {resumeEntries.map((obj, idx) => {
            return (
              <div
                key={idx.toString()}
                className={`category ${idx % 2 === 0 ? '' : 'fill'}`}
              >
                <div className="heading">
                  <h2 className="uppercase sm">{obj.title}</h2>
                </div>
                <ul>
                  {obj.entries.map((entry, idx) => {
                    return (
                      <li key={idx.toString()}>
                        <div className="date">
                          <span>{entry.date}</span>
                        </div>
                        <div className="details">
                          <span>{entry.info}</span> {entry.location}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </section>
      </div>
    </div>
  )
}

export default Bio
