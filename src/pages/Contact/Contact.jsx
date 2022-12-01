import React, { useLayoutEffect, useRef } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import './contact.scss'

import gsap from 'gsap'

const Contact = () => {
  const contact = useRef(null)
  const q = gsap.utils.selector(contact)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contact.current,
        { backgroundColor: '#ffffff' },
        { backgroundColor: '#eaeaea' }
      )

      gsap.fromTo(
        [q('form label'), q('form input'), q('form button')],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 1, stagger: 0.1 }
      )

      gsap.fromTo(
        q('.enquiries'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 1, delay: 0.3 }
      )

      gsap.fromTo(
        q('.socials span'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 1, delay: 0.4, stagger: 0.1 }
      )
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <>
      <div ref={contact} className="contact">
        <div className="contact-inner indent">
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
            <div className="socials-inner uppercase">
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
        </div>
      </div>
      <div className="copyright">Jenni Cadman &#169; 2022</div>
    </>
  )
}

export default Contact
