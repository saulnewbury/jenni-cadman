import { useEffect, useRef } from 'react'
import './loading-counter.scss'

import { collections } from '../../data/collections'

import gsap from 'gsap'

const LoadingCounter = ({ isLoading }) => {
  const imgs = getImageUrls()

  const counter = useRef(null)
  const value = useRef(100 / imgs.length)
  console.log(imgs.length)
  console.log(value)
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
            duration: 5,
            onComplete: () => {
              if (sum.current === 100) {
                isLoading()
              }
            }
          })
          resolve()
        }
        img.onerror = reject()
      })
    })
    await Promise.all(promises)
    console.log(promises)
  }

  return (
    <div className="loading-counter">
      <div>
        <span ref={counter}>00</span>%
      </div>
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
