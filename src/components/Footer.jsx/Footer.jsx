import React from 'react'

import { BsArrowRight } from 'react-icons/bs'

import './footer.scss'

const Footer = () => {
  return (
    <footer className="footer z-1 gutter footer-height">
      <div className="footer-inner indent">
        <div className="contact">
          <form action="" id="subscription">
            <label htmlFor="email">
              Stay informed about upcoming events and exhibitions:
            </label>
            <input type="email" name="email" placeholder="Your Email" />
            <button type="submit">
              <span>Subscribe</span>
              <BsArrowRight />
            </button>
          </form>

          <div className="enquiries">
            <a className="mailto" href="mailto:jennicadman@gmail.com">
              All Enquiries:
            </a>
            &nbsp;<span>jennicadman@gmail.com</span>
          </div>

          <div className="socials">
            <div className="socials-inner">
              <span>
                <a href="https://www.axisweb.org/p/jennicadman/">Axis</a>
              </span>
              <span>
                <a href="https://www.flickr.com/photos/jencad/">Flicker</a>
              </span>
              <span>
                <a href="https://www.instagram.com/jennicadmanartist/">
                  Instagram
                </a>
              </span>
              <span>
                <a href="https://www.pinterest.co.uk/jennicadman/">Pinterest</a>
              </span>
              <span>
                <a href="https://www.linkedin.com/in/jenni-cadman-74a5269b/">
                  LinkedIn
                </a>
              </span>
            </div>
          </div>
          <div className="copyright">Jenni Cadman &#169; 2022</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
