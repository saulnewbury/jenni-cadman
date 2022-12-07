import { useEffect, useRef } from 'react'
import './loading-counter.scss'

import { collections } from '../../data/collections'

import gsap from 'gsap'

const LoadingCounter = ({ isLoading }) => {
  const imgs = getImageUrls()

  const container = useRef(null)
  const counter = useRef(null)
  const underlay = useRef(null)
  const overlay = useRef(null)

  const value = useRef(100 / imgs.length)
  const sum = useRef(0)

  const loaderStarted = useRef(false)

  useEffect(() => {
    if (loaderStarted.current) return
    loaderStarted.current = true
    cacheImages(imgs)
  }, [])

  const cacheImages = async srcArray => {
    const promises = await srcArray.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          sum.current += value.current
          if (sum.current >= imgs.length - 1) {
            sum.current = 100
          }

          gsap.to(counter.current, {
            innerText: sum.current,
            snap: 'innerText',
            duration: 0.1,
            onComplete: () => {
              if (sum.current === 100) {
                exitAnim()
              } else {
                return
              }
            }
          })

          gsap.to(underlay.current, {
            duration: 0.1,
            width: `${sum.current}%`
            // snap: 'width'
          })

          resolve()
        }
        img.onerror = reject()
      })
    })
    await Promise.all(promises)
  }

  function exitAnim() {
    gsap.to(overlay.current, {
      height: '100vh',
      duration: 0.4,
      ease: 'power1.inOut'
    })

    gsap.set([container.current, underlay.current], {
      opacity: 0,
      delay: 0.45
    })
    gsap.to(overlay.current, {
      y: '-100vh',
      delay: 0.5,
      duration: 0.4,
      ease: 'power1.inOut',
      onComplete: () => {
        isLoading()
      }
    })
  }

  return (
    <div className="loading-counter">
      <div ref={underlay} className="underlay"></div>
      <div ref={container} className="container">
        <div className="inner-container">
          <div className="counter">
            <span ref={counter}>0</span>%
          </div>
        </div>
      </div>
      <div ref={overlay} className="overlay"></div>
    </div>
  )
}

export default LoadingCounter

function getImageUrls() {
  const imgs = []
  collections.forEach(entry => {
    imgs.push(`/images/${entry.subFolder}/${entry.featuredImage.name}.webp`)
    entry.imagesData.images.forEach(img => {
      imgs.push(`/images/${entry.imagesData.subFolder}/${img.image}.webp`)
      imgs.push(
        `/images/${entry.imagesData.subFolder}/${img.image}-detail.webp`
      )
      imgs.push(
        `/images/${entry.imagesData.subFolder}/thumbs/${img.image}-thumb.webp`
      )
    })
  })
  return imgs
}
