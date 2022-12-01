import React, { useEffect, useRef } from 'react'
import './bio.scss'
import { resumeEntries } from '../../data/resume'

import { bioInfo } from '../../data/bioInfo'

import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(SplitText, CustomEase, ScrollTrigger)

const Bio = () => {
  const image = useRef()
  const overlay = useRef()
  const info = useRef()
  const creds = useRef()
  const experience = useRef([])
  const q = gsap.utils.selector(info)
  const qC = gsap.utils.selector(creds)
  const qE = gsap.utils.selector(experience)

  //-------------------------------------------------------------------------
  // Enter animation
  //-------------------------------------------------------------------------

  useEffect(() => {
    const ctx = gsap.context(() => {
      //Image
      gsap.fromTo(
        image.current,
        { objectPosition: '50% 45%', y: 10 },
        { objectPosition: '50% 50%', y: 0 }
      )

      // Overlay
      gsap.fromTo(
        overlay.current,
        1.7,
        { scaleY: 1 },
        {
          scaleY: 0,
          ease: CustomEase.create(
            'custom',
            'M0,0,C0.05,0,0.149,0.279,0.19,0.374,0.36,0.772,0.528,0.988,1,1'
          ),
          delay: 0.3
        }
      )

      // Bio text
      gsap.fromTo(
        q('p'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3, stagger: 0.15 }
      )

      // Credentials
      gsap.fromTo(
        qC('p'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1, stagger: 0.1 }
      )

      const titles = gsap.utils.toArray(qE('h2'))
      titles.forEach(title => {
        gsap.fromTo(
          title,
          { y: 20, opacity: 0 },
          {
            scrollTrigger: {
              trigger: title,
              start: 'top 95%'
            },
            y: 0,
            opacity: 1,
            duration: 0.5
          }
        )
      })
      const dates = gsap.utils.toArray(qE('.date'))
      dates.forEach(date => {
        gsap.fromTo(
          date,
          { y: 20, opacity: 0 },
          {
            scrollTrigger: {
              trigger: date,
              start: 'top 95%'
            },
            y: 0,
            opacity: 1,
            duration: 0.5
          }
        )
      })

      const details = gsap.utils.toArray(qE('.details'))
      details.forEach(details => {
        gsap.fromTo(
          details,
          { y: 20, opacity: 0 },
          {
            scrollTrigger: {
              trigger: details,
              start: 'top 95%'
            },
            y: 0,
            opacity: 1,
            duration: 0.5
          }
        )
      })
    })

    return () => {
      ctx.revert()
    }
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
                src="/images/other/jenni-cadman-textileartist-portrait.webp"
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
        <section ref={experience} className="experience indent">
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
