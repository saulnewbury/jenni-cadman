import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import './layout.scss'

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="page-overlay"></div>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="pages gutter z-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
