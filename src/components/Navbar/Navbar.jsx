import React, { useState, useEffect, useRef } from 'react'
import './navbar.scss'

import { useLocation } from 'react-router-dom'

import { Link } from 'react-router-dom'

const NavBar = () => {
  const [navIsOpen, setNaveIsOpen] = useState(false)
  const isNumber = useRef(false)
  const [isCurrentRoute, setIsCurrentRoute] = useState('/')

  const location = useLocation()

  useEffect(() => {
    setIsCurrentRoute(location.pathname)
  }, [navIsOpen, location.pathname])

  function handleClick() {
    setNaveIsOpen(!navIsOpen)
  }

  function handleScroll() {
    window.scrollTo({
      top: 10000,
      left: 0,
      behavior: 'smooth'
    })
  }

  isNumber.current = parseInt(isCurrentRoute.replace(/\D/g, ''))

  return (
    <div className="navbar uppercase gutter">
      <div className="logo">
        <Link
          to="/"
          className={/\d/.test(location.pathname) ? 'visibility' : ''}
        >
          Jenni Cadman
        </Link>
      </div>
      <nav className={navIsOpen ? 'open' : ''}>
        <div className="links">
          <Link
            to="/work"
            className={`link item ${
              isCurrentRoute === '/work' ? 'current-path' : ''
            }`}
            onClick={handleClick}
          >
            Work
          </Link>
          <Link
            to="/bio"
            className={`link item ${
              isCurrentRoute === '/bio' ? 'current-path' : ''
            }`}
            onClick={handleClick}
          >
            Bio
          </Link>
          <Link
            to="#"
            className={`link item ${
              isCurrentRoute === '/contact' ? 'current-path' : ''
            }`}
            onClick={() => {
              handleClick()
              handleScroll()
            }}
          >
            Contact
          </Link>
          {/* if path name contains numbers show element with corrosponding numbers */}
          {/* /\d/.test(isCurrentRoute) */}
          <span className="item num">
            {isNumber.current ? `0${isNumber.current}` : null}
          </span>
        </div>
        <div className={`cross`} onClick={handleClick}>
          <span></span>
          <span></span>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
