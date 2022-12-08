import React, { useLayoutEffect, useRef } from 'react'
import ReactDom from 'react-dom'
import './image-modal.scss'

import gsap from 'gsap'

const ImageModal = ({ src, open, onClose }) => {
  const modal = useRef()

  useLayoutEffect(() => {
    if (!open) return
    const tween = gsap.fromTo(modal.current, { opacity: 0 }, { opacity: 1 })

    return () => {
      tween.kill()
    }
  }, [open])

  function handleCloseModal() {
    const tween = gsap.to(modal.current, {
      opacity: 0,
      onComplete: () => {
        onClose()
        tween.kill()
      }
    })
  }

  if (!open) return null
  return ReactDom.createPortal(
    <div ref={modal} className="modal">
      <div className="modal-overlay"></div>
      <div className="modal gutter">
        <div className="image">
          <img src={src} alt="" />
        </div>
      </div>
      <div
        className="btn close-modal-btn gutter"
        onClick={() => {
          handleCloseModal()
        }}
      >
        <span>CLOSE</span>
      </div>
    </div>,
    document.getElementById('portal')
  )
}

export default ImageModal
