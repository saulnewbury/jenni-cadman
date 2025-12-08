import React, { useState, useEffect, useRef } from 'react'
import './navbar.scss'

import { useLocation } from 'react-router-dom'

import { Link } from 'react-router-dom'

import gsap from 'gsap'

const NavBar = () => {
  const [autoOpenNav, setAutoOpenNav] = useState(true)
  const [navIsOpen, setNavIsOpen] = useState(false)
  const isNumber = useRef(false)
  const [isCurrentRoute, setIsCurrentRoute] = useState('/')

  const logoRef = useRef(null)
  const crossRef = useRef(null)
  const hasAnimated = useRef(false)

  const location = useLocation()

  // Fade in animation on mount
  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const tl = gsap.timeline()

    tl.to(logoRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    }).to(
      crossRef.current,
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      },
      '-=0.3'
    )
  }, [])

  useEffect(() => {
    if (location.pathname === '/' && autoOpenNav) {
      window.setTimeout(() => {
        setNavIsOpen(true)
        setAutoOpenNav(false)
      }, 3000)
    }
    setIsCurrentRoute(location.pathname)
  }, [navIsOpen, location.pathname, autoOpenNav])

  function handleClick() {
    setNavIsOpen(!navIsOpen)
  }

  isNumber.current = parseInt(isCurrentRoute.replace(/\D/g, ''))

  return (
    <div className='navbar uppercase gutter'>
      <div className='logo' ref={logoRef}>
        <Link
          to='/'
          className={`logo-link ${
            /\d/.test(location.pathname) ? 'visibility' : ''
          }`}
        >
          Jenni Cadman
        </Link>
      </div>
      <nav className={navIsOpen ? 'open' : ''}>
        <div className='links'>
          <Link
            to='/work'
            className={`link item nav-item ${
              isCurrentRoute === '/work' ? 'current-path' : ''
            }`}
            onClick={handleClick}
          >
            Work
          </Link>
          <Link
            to='/bio'
            className={`link item nav-item ${
              isCurrentRoute === '/bio' ? 'current-path' : ''
            }`}
            onClick={handleClick}
          >
            Bio
          </Link>
          <Link
            to='/contact'
            className={`link item nav-item ${
              isCurrentRoute === '/contact' ? 'current-path' : ''
            }`}
            onClick={() => {
              handleClick()
            }}
          >
            Contact
          </Link>
          <span className='nav-item num'>
            {isNumber.current ? `0${isNumber.current}` : null}
          </span>
        </div>
        <div className='cross' ref={crossRef} onClick={handleClick}>
          <span></span>
          <span></span>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
