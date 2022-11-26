import React from 'react'
import './layout.scss'

import Navbar from '../Navbar/Navbar'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="pages gutter z-2">{children}</div>
    </div>
  )
}

export default Layout
