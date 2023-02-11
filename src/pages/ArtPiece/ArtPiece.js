import React, { useLayoutEffect, useRef, useState } from 'react'
import './artpiece.scss'

import { useParams, useNavigate, useLocation } from 'react-router-dom'

import { collections } from '../../data/collections'
import Picker from '../../components/Picker/Picker'
import ImageModal from '../../components/ImageModal/ImageModal'

import useScrollSmoother from '../../hooks/useScrollSmoother'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(CustomEase, SplitText, ScrollTrigger)

// Artpiece component
const ArtPiece = () => {
  const { slug, id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [isOpen, setIsOpen] = useState(false)
  const [collectionTitleHidden, setCollectionTitleHidden] = useState()

  const artpiece = useRef()
  const colTitle = useRef()

  const { smoother } = useScrollSmoother({})

  useDocumentTitle(`Jenni Cadman | ${slug}`)

  useLayoutEffect(mediaQueries, [])

  //-------------------------------------------------------------------------
  // Media Queries
  //-------------------------------------------------------------------------

  function mediaQueries() {
    let mm = gsap.matchMedia()

    mm.add(`(max-width: 649px)`, () => {
      setCollectionTitleHidden(true)
    })

    mm.add(`(min-width: 650px)`, () => {
      setCollectionTitleHidden(false)
    })

    return () => {
      mm.kill()
    }
  }

  //-------------------------------------------------------------------------
  // Show and hide collection title
  //-------------------------------------------------------------------------

  useLayoutEffect(() => {
    if (collectionTitleHidden) {
      gsap.to(colTitle.current, { opacity: 0 })
    } else {
      gsap.to(colTitle.current, { opacity: 1 })
    }
  }, [collectionTitleHidden])

  //-------------------------------------------------------------------------
  // Enter animations
  //-------------------------------------------------------------------------

  useLayoutEffect(() => {
    gsap.set('body', {
      overflowY: 'auto'
    })
    const page = gsap.fromTo(
      artpiece.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.1 }
    )
    const ctx = gsap.context(() => {
      // Main Image Overlay
      gsap.fromTo(
        '.main-image .overlay',
        { scaleY: 1 },
        {
          scaleY: 0,
          delay: 0.5,
          duration: 1.5,
          ease: CustomEase.create(
            'custom',
            'M0,0,C0.05,0,0.149,0.279,0.19,0.374,0.36,0.772,0.528,0.988,1,1'
          ),
          onStart: () => {
            ScrollTrigger.refresh(true)
          }
        }
      )

      // Detail Image h4
      gsap.fromTo(
        '.detail-image-inner h4',
        { opacity: 0 },
        {
          delay: 0.8,
          opacity: 1,
          scrollTrigger: {
            trigger: '.detail',
            start: 'top 80%'
          }
        }
      )

      // Detail image overlay
      gsap.fromTo(
        '.detail-image .overlay',
        {
          scaleY: 1
        },
        {
          delay: 0.3,
          scrollTrigger: {
            id: 'detailReveal',
            trigger: '.detail .overlay',
            start: 'top 80%'
          },
          scaleY: 0,
          duration: 1.5,
          ease: CustomEase.create(
            'custom',
            'M0,0,C0.05,0,0.149,0.279,0.19,0.374,0.36,0.772,0.528,0.988,1,1'
          )
        }
      )

      // Title
      const childSplit = new SplitText('.info h1', {
        type: 'chars'
      })

      gsap.from(childSplit.chars, {
        duration: 1.2,
        opacity: 0,
        yPercent: 100,
        ease: 'power2.inOut',
        delay: 1.4
      })

      // Info
      const childSplitInfo = new SplitText('.info p', {
        type: 'chars'
      })

      gsap.fromTo(
        '.p-container',
        {
          opacity: 0
        },
        { opacity: 1, delay: 1.8 }
      )

      gsap.from(childSplitInfo.chars, {
        duration: 1,
        yPercent: 100,
        ease: 'power2.inOut',
        delay: 1.5
      })

      // Collection title
      gsap.fromTo(
        '.g-collection-title',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: '.g-collection-title',
            start: 'top 5%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, artpiece)

    return () => {
      page.kill()
      ctx.revert()
    }
  }, [location])

  //-------------------------------------------------------------------------
  // Get data
  //-------------------------------------------------------------------------

  // get collection which includes a title that is the same as slug.
  const cln = collections.filter(cln => {
    return cln.imagesData?.images.some(obj => obj.image === slug)
  })
  // get specific image from collection
  const obj = cln[0].imagesData?.images.filter(obj => obj.image === slug)

  const { subFolder, imagesData, title: collectionTitle } = cln[0]
  const { id: artpieceId, title, image, detail, altText, desc } = obj[0]

  //-------------------------------------------------------------------------
  // Exit animation
  //-------------------------------------------------------------------------

  function handleExit(path) {
    gsap.set('body', { overflowY: 'hidden' })
    gsap.to(artpiece.current, {
      opacity: 0,
      duration: 1,
      delay: 0.8,
      onComplete: () => {
        smoother.current.scrollTop(0)
        navigate(path)
      }
    })
  }

  return (
    <>
      <div key={location.pathname} ref={artpiece} className="art-piece indent">
        <div className="main-image">
          <div className="main-image-inner">
            <div className="image">
              <div className="overlay"></div>
              <img src={`../images/${subFolder}/${image}.webp`} alt={altText} />
              <ImageModal
                src={`../images/${subFolder}/${image}.webp`}
                onClose={() => {
                  smoother.current.paused(false)
                  setIsOpen(!isOpen)
                }}
                open={isOpen}
              />
              <div
                className="btn open-modal-btn"
                onClick={() => {
                  smoother.current.paused(true)
                  setIsOpen(!isOpen)
                }}
              >
                Enlarge
              </div>
            </div>
            <div className="info">
              <div className="info-inner">
                <div className="title-container">
                  <h1 className="title uppercase sm">{title}</h1>
                </div>
                <div className="p-container" style={{ opacity: 0 }}>
                  <p className="collection-date">{desc.year}</p>
                </div>
                <div className="p-container" style={{ opacity: 0 }}>
                  <p className="medium">{desc.medium}</p>
                </div>
                <div className="p-container" style={{ opacity: 0 }}>
                  <p className="size">{desc.size}</p>
                </div>

                {desc.mount && (
                  <div className="p-container" style={{ opacity: 0 }}>
                    <p className="mount">{desc.mount}</p>
                  </div>
                )}
                <div className="p-container" style={{ opacity: 0 }}>
                  <p className="price">{desc.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {detail && (
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
                        src={`../images/${subFolder}/${image}-detail.webp`}
                        alt={altText}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="copyright">Jenni Cadman &#169; 2022</div>
        <div className="art-piece-picker">
          <div className="g-collection-title title uppercase">
            <h3 ref={colTitle} className="lg">
              {collectionTitle}
            </h3>
          </div>
          <Picker
            imagesData={imagesData}
            collectionId={id}
            id={artpieceId - 1}
            handleExit={handleExit}
          />
        </div>
      </div>
    </>
  )
}

export default ArtPiece
