import { useEffect, useRef, useState } from 'react'
import './loading-counter.scss'

import { collections } from '../../data/collections'

import gsap from 'gsap'

const LoadingCounter = ({ isLoading }) => {
  const container = useRef(null)
  const overlay = useRef(null)
  const progressBar = useRef(null)
  const counterRef = useRef(null)

  const [currentThumb, setCurrentThumb] = useState(null)

  const loaderStarted = useRef(false)
  const loadedCount = useRef(0)
  const displayedCount = useRef(0)
  const thumbQueue = useRef([])
  const isDisplaying = useRef(false)

  useEffect(() => {
    if (loaderStarted.current) return
    loaderStarted.current = true

    const sets = getImageSets()
    const totalSets = sets.length

    if (counterRef.current) {
      counterRef.current.textContent = `0/${totalSets}`
    }

    sets.forEach((set) => {
      loadImageSet(set).then(() => {
        loadedCount.current++

        // Add thumb to queue
        thumbQueue.current.push(set.thumb)

        // Start displaying if not already
        if (!isDisplaying.current) {
          displayNextThumb(totalSets)
        }
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const displayNextThumb = async (totalSets) => {
    if (thumbQueue.current.length === 0) {
      isDisplaying.current = false
      return
    }

    isDisplaying.current = true

    const thumb = thumbQueue.current.shift()
    displayedCount.current++

    // Update counter
    if (counterRef.current) {
      counterRef.current.textContent = `${displayedCount.current}/${totalSets}`
    }

    // Update progress bar
    const progress = (displayedCount.current / totalSets) * 100
    gsap.to(progressBar.current, {
      width: `${progress}%`,
      duration: 0.15,
      ease: 'none'
    })

    // Show the thumbnail
    setCurrentThumb(thumb)

    // Check if we're done
    if (displayedCount.current >= totalSets) {
      exitAnim()
      return
    }

    // Small delay before next thumbnail
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Continue displaying
    displayNextThumb(totalSets)
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
    gsap.set(container.current, {
      opacity: 0,
      delay: 2.5
    })

    gsap.to(overlay.current, {
      height: '75vh',
      duration: 2.5,
      ease: 'power1.inOut'
    })

    gsap.set(overlay.current, {
      y: '-100vh',
      delay: 2.5,
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
        <div ref={counterRef} className='counter'></div>
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
