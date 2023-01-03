import React, { useLayoutEffect, useRef } from 'react'
import { collections } from '../../data/collections'
import './collection.scss'
import Picker from '../../components/Picker/Picker'

import { useParams, useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText)

const Collection = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { imagesData = {}, title = "doesn't exist" } = collections[id - 1]

  useDocumentTitle(`Jenni Cadman | ${id} ${title}`)

  const colTitle = useRef()
  const picker = useRef()

  useLayoutEffect(() => {
    gsap.set('.page-overlay', { scaleY: 0 })
    const tween = gsap.fromTo(
      colTitle.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
    )
    return () => tween.revert()
  }, [])

  function handleExit(path) {
    console.log(path)
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
        <div className="g-collection-title title indent uppercase">
          <h3 ref={colTitle} className="lg">
            {title}
          </h3>
        </div>
        <div ref={picker} className="collection-inner">
          <Picker
            imagesData={imagesData}
            collectionId={id}
            id={0}
            handleExit={handleExit}
          />
        </div>
      </div>
      <div className="copyright">Jenni Cadman &#169; 2022</div>
    </>
  )
}

export default Collection
