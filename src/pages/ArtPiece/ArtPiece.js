import React, { useLayoutEffect, useRef } from 'react'
import './artpiece.scss'

import { useParams, useNavigate, useLocation } from 'react-router-dom'

import { collections } from '../../data/collections'
import Picker from '../../components/Picker/Picker'

import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsapCore from 'gsap/gsap-core'

gsap.registerPlugin(CustomEase)
gsap.registerPlugin(SplitText)
gsap.registerPlugin(ScrollTrigger)

const ArtPiece = () => {
  const { slug, id } = useParams()

  const artpiece = useRef()
  const q = gsap.utils.selector(artpiece)

  const navigate = useNavigate()
  const location = useLocation()

  //-------------------------------------------------------------------------
  // Enter animations
  //-------------------------------------------------------------------------

  useLayoutEffect(() => {
    gsap.fromTo(artpiece.current, { opacity: 0 }, { opacity: 1 })

    // Main Image Overlay
    gsap.fromTo(
      q('.main-image .overlay'),
      { scaleY: 1 },
      {
        scaleY: 0,
        delay: 0.5,
        duration: 2,
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
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        delay: 0.5
      }
    )
    gsap.to(q('.detail-image .overlay'), {
      scaleY: 0,
      delay: 0.5,
      duration: 2,
      ease: CustomEase.create(
        'custom',
        'M0,0,C0.05,0,0.149,0.279,0.19,0.374,0.36,0.772,0.528,0.988,1,1'
      ),
      scrollTrigger: {
        trigger: q('.detail'),
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })

    // Title
    const childSplit = new SplitText(q('.info h1'), {
      type: 'chars'
    })

    gsap.from(childSplit.chars, {
      duration: 1,
      yPercent: 100,
      ease: 'power2.inOut',
      // ease: 'none',
      // stagger: 0.01,
      delay: 1.1
    })

    // Details
    const childSplitDetails = new SplitText(q('.info p'), {
      type: 'chars'
    })

    gsap.from(childSplitDetails.chars, {
      duration: 1,
      yPercent: 100,
      ease: 'power2.inOut',
      // ease: 'none',
      // stagger: 0.01,
      delay: 1.3
    })
  }, [location.key])

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
    gsap.to([artpiece.current, q('.detail')], {
      opacity: 0,
      duration: 1,
      delay: 0.8,
      onComplete: () => navigate(path)
    })
  }

  return (
    <div key={location.pathname} ref={artpiece} className="art-piece indent">
      <div className="main-image">
        <div className="main-image-inner">
          <div className="image">
            <div className="overlay"></div>
            <img src={`../images/${subFolder}/${image}.jpg`} alt={altText} />
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
                    src={`../images/${subFolder}/${image}-${detail}.jpg`}
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
  )
}

export default ArtPiece
