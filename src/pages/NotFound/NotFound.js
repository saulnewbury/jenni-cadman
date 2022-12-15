import React from 'react'
import './not-found.scss'

import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="not-found ">
      <div className="indent not-found-inner">
        <div className="info">
          <h1 className="lg warning">404</h1>
          <p>
            Oops! We've searched high and low, but alas,
            <br /> the page entered could not be found.
            <br />
            <br />
            Follow the link back to Jenni's work:
          </p>

          <div>
            <Link to="/work" className="btn back-to-work">
              Jenni's Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
