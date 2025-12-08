import { useEffect, useRef, useState } from 'react'
import './loading-counter.scss'

import { collections } from '../../data/collections'

import gsap from 'gsap'

const LoadingCounter = ({ isLoading }) => {
  const imageSets = getImageSets()

  const container = useRef(null)
  const overlay = useRef(null)
  const progressBar = useRef(null)
  const counterRef = useRef(null)

  const [currentThumb, setCurrentThumb] = useState(null)

  const loaderStarted = useRef(false)
  const loadedCount = useRef(0)

  useEffect(() => {
    if (loaderStarted.current) return
    loaderStarted.current = true
    loadImageSets(imageSets)
  }, [])

  const loadImageSets = async (sets) => {
    for (let i = 0; i < sets.length; i++) {
      const set = sets[i]
      await loadImageSet(set)

      // Update counter
      loadedCount.current = i + 1
      if (counterRef.current) {
        counterRef.current.textContent = `${loadedCount.current}/${sets.length}`
      }

      // Update progress bar
      const progress = ((i + 1) / sets.length) * 100
      gsap.to(progressBar.current, {
        width: `${progress}%`,
        duration: 0.15,
        ease: 'none'
      })

      // Show the thumbnail
      setCurrentThumb(set.thumb)

      // Minimum display time so images don't flicker
      await new Promise((resolve) => setTimeout(resolve, 150))
    }

    // All done - run exit animation
    exitAnim()
  }

  const loadImageSet = (set) => {
    return new Promise((resolve) => {
      const images = [set.normal, set.thumb]
      if (set.detail) images.push(set.detail)

      let loaded = 0
      const total = images.length

      images.forEach((src) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          loaded++
          if (loaded === total) resolve()
        }
        img.onerror = () => {
          loaded++
          if (loaded === total) resolve()
        }
      })
    })
  }

  function exitAnim() {
    // Fade out the thumbnail
    gsap.to(container.current, {
      opacity: 0,
      duration: 0.3
    })

    gsap.to(overlay.current, {
      height: '100vh',
      duration: 0.6,
      delay: 0.4,
      ease: 'power1.inOut'
    })

    gsap.to(overlay.current, {
      y: '-100vh',
      delay: 1.1,
      duration: 0.6,
      ease: 'power1.inOut',
      onComplete: () => {
        isLoading()
      }
    })
  }

  return (
    <div className='loading-counter'>
      <div ref={container} className='container'>
        <div className='thumb-wrapper'>
          {currentThumb && (
            <img src={currentThumb} alt='' className='thumb-image' />
          )}
        </div>
        <div className='progress-container'>
          <div ref={progressBar} className='progress-bar'></div>
        </div>
        <div ref={counterRef} className='counter'>
          0/{imageSets.length}
        </div>
      </div>
      <div ref={overlay} className='overlay'></div>
    </div>
  )
}

export default LoadingCounter

function getImageSets() {
  const sets = []

  collections.forEach((entry) => {
    entry.imagesData.images.forEach((img) => {
      const basePath = `/images/${entry.imagesData.subFolder}`

      sets.push({
        normal: `${basePath}/${img.image}.webp`,
        detail: img.detail ? `${basePath}/${img.image}-detail.webp` : null,
        thumb: `${basePath}/thumbs/${img.image}-thumb.webp`
      })
    })
  })

  return sets
}
