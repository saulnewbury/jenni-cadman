import React, { useLayoutEffect, useRef } from 'react'
import { collections } from '../../data/collections'
import './collection.scss'
import Picker from '../../components/Picker/Picker'

import { useParams, useNavigate } from 'react-router-dom'

import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import gsapCore from 'gsap/gsap-core'
gsap.registerPlugin(SplitText)

const Collection = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const colTitle = useRef()
  const picker = useRef()

  useLayoutEffect(() => {
    gsap.fromTo('.page-overlay', { scaleY: 1 }, { scaleY: 0 })
    const tween = gsap.fromTo(
      colTitle.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
    )
    return () => tween.revert()
  }, [])

  const { imagesData, title } = collections[id - 1]

  function handleExit(path) {
    gsap.to([colTitle.current, picker.current], {
      opacity: 0,
      stagger: 0.2,
      delay: 0.5,
      onComplete: () => {
        navigate(path)
      }
    })
  }

  return (
    <>
      <div className="collection">
        <div className="collection-title title indent uppercase">
          <h3 ref={colTitle} className="lg">
            {title}
          </h3>
        </div>
        <div ref={picker} className="collection-inner">
          <Picker
            imagesData={imagesData}
            collectionId={id}
            handleExit={handleExit}
          />
        </div>
      </div>
    </>
  )
}

export default Collection
