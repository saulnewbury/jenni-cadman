import React from 'react'
import './layout.scss'

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer.jsx/Footer'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="pages gutter z-2">{children}</div>
      <div className="footer-spacer footer-height"></div>
      <Footer />
    </div>
  )
}

export default Layout
