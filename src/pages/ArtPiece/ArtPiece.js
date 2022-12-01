import React, { useEffect, useLayoutEffect, useRef } from 'react'
import './artpiece.scss'

import { useParams, useNavigate, useLocation } from 'react-router-dom'

import { collections } from '../../data/collections'
import Picker from '../../components/Picker/Picker'

import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(CustomEase, SplitText, ScrollTrigger, ScrollSmoother)

const ArtPiece = () => {
  const { slug, id } = useParams()

  const artpiece = useRef()
  const q = gsap.utils.selector(artpiece)

  const smoother = useRef(null)

  const navigate = useNavigate()
  const location = useLocation()

  console.log(location)

  //-------------------------------------------------------------------------
  // Enter animations
  //-------------------------------------------------------------------------

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(q('.detail'), { opacity: 0 }, { opacity: 1, duration: 0.1 })

      // Main Image Overlay
      gsap.fromTo(
        q('.main-image .overlay'),
        { scaleY: 1 },
        {
          scaleY: 0,
          delay: 0.5,
          duration: 1.5,
          ease: CustomEase.create(
            'custom',
            'M0,0,C0.05,0,0.149,0.279,0.19,0.374,0.36,0.772,0.528,0.988,1,1'
          )
        }
      )

      // Detail Image Overlay
      gsap.fromTo(
        q('.detail-image-inner h4'),
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: q('.detail'),
            start: 'top 60%',
            toggleActions: 'play none none none'
          }
        }
      )
      gsap.fromTo(
        q('.detail-image .overlay'),
        {
          scaleY: 1
        },
        {
          scaleY: 0,
          duration: 1.5,
          ease: CustomEase.create(
            'custom',
            'M0,0,C0.05,0,0.149,0.279,0.19,0.374,0.36,0.772,0.528,0.988,1,1'
          ),
          scrollTrigger: {
            id: 'detailReveal',
            trigger: q('.detail .overlay'),
            start: '10% 80%'
            // toggleActions: 'restart none none revert'
          }
        }
      )
      const childSplit = new SplitText(q('.info h1'), {
        type: 'chars'
      })

      gsap.from(childSplit.chars, {
        duration: 1.2,
        yPercent: 100,
        ease: 'power2.inOut',
        delay: 1.4
      })

      // Details
      const childSplitDetails = new SplitText(q('.info p'), {
        type: 'chars'
      })

      gsap.from(childSplitDetails.chars, {
        duration: 1,
        yPercent: 100,
        ease: 'power2.inOut',
        delay: 1.5
      })
    })

    return () => {
      ctx.revert()
    }
  }, [location.key])

  //-------------------------------------------------------------------------
  // ScrollSmoother
  //-------------------------------------------------------------------------

  useEffect(() => {
    smoother.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper-artpiece',
      content: '#smooth-content-artpiece',
      smooth: 1
      // smoothTouch: 0.1
      // normalizeScroll: true
    })

    return () => {
      smoother.current.revert()
    }
  }, [])

  //-------------------------------------------------------------------------
  // Get data
  //-------------------------------------------------------------------------

  // get collection which includes a title that is the same as slug.
  const cln = collections.filter(cln => {
    return cln.imagesData?.images.some(
      obj => obj.title.toLowerCase() === slug.replace(/-/g, ' ')
    )
  })

  const obj = cln[0].imagesData?.images.filter(
    obj => obj.title.toLowerCase() === slug.replace(/-/g, ' ')
  )

  const { subFolder, imagesData } = cln[0]
  const { id: artpieceId, title, image, detail, altText, desc } = obj[0]

  //-------------------------------------------------------------------------
  // Exit animation
  //-------------------------------------------------------------------------

  function handleExit(path) {
    gsap.to(q('.detail'), {
      opacity: 0,
      duration: 1,
      delay: 0.8,
      onComplete: () => navigate(path)
    })
  }

  return (
    <div id="smooth-wrapper-artpiece">
      <div id="smooth-content-artpiece" className="gutter">
        <div
          key={location.pathname}
          ref={artpiece}
          className="art-piece indent"
        >
          <div className="main-image">
            <div className="main-image-inner">
              <div className="image">
                <div className="overlay"></div>
                <img
                  src={`../images/${subFolder}/${image}.webp`}
                  alt={altText}
                />
              </div>
              <div className="info">
                <div className="info-inner">
                  <div className="title-container">
                    <h1 className="title uppercase sm">{title}</h1>
                  </div>
                  <div className="p-container">
                    <p className="collection-date">{desc.year}</p>
                  </div>
                  <div className="p-container">
                    <p className="medium">{desc.medium}</p>
                  </div>
                  <div className="p-container">
                    <p className="size">{desc.size}</p>
                  </div>

                  {desc.mount && (
                    <div className="p-container">
                      <p className="mount">{desc.mount}</p>
                    </div>
                  )}
                  <div className="p-container">
                    <p className="price">{desc.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="detail">
            <div className="detail-inner">
              <div className="spacer"></div>
              <div className="detail-content">
                <div className="detail-image">
                  <div className="detail-image-inner">
                    <h4>(Detail)</h4>
                    <div className="image">
                      <div className="overlay"></div>
                      <img
                        src={`../images/${subFolder}/${image}-${detail}.webp`}
                        alt={altText}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Picker
            imagesData={imagesData}
            collectionId={id}
            handleExit={handleExit}
          />
        </div>
      </div>
    </div>
  )
}

export default ArtPiece
