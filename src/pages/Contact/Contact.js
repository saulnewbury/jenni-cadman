import React, { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import './contact.scss'

import { useDocumentTitle } from '../../hooks/useDocumentTitle'

import gsap from 'gsap'

const Contact = () => {
  const [token, setToken] = useState({})
  const [message, setMessage] = useState()
  const [success, setSuccess] = useState()

  useEffect(() => {
    async function getToken() {
      const res = await fetch('/php-mailer/token.php')
      if (res.ok) {
        const data = await res.json()
        setToken({ ...data })
      } else {
        setMessage('Server not responding')
        setSuccess(false)
      }
    }
    getToken()
  }, [])

  const contact = useRef(null)
  const q = gsap.utils.selector(contact)

  useDocumentTitle('Jenni Cadman | Contact')

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

  function handleSubmit(e) {
    console.log('called')
    e.preventDefault()
    const form = e.currentTarget

    async function postForm() {
      try {
        const res = await fetch('php-mailer/mailit.php', {
          method: 'POST',
          body: new FormData(form)
        })

        console.log(res)
        if (res.ok) {
          const text = await res.text()
          setMessage(text)
          setSuccess(true)
        } else {
          setMessage('Error in server response')
          setSuccess(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    postForm()
  }

  return (
    <>
      <div ref={contact} className="contact">
        <div className="contact-inner indent">
          <form id="registrationForm" onSubmit={handleSubmit}>
            <input type="hidden" name="session" value={token.session} />
            <input type="hidden" name="nonce" value={token.nonce} />
            <label htmlFor="email">
              Stay informed about upcoming events and exhibitions:
            </label>
            <input type="email" name="email" placeholder="Your Email" />
            <button type="submit" disabled={!token.session}>
              <span>Subscribe</span>
              <BsArrowRight />
            </button>
            <p className={success ? 'success' : 'error'}>{message}</p>
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
                <a
                  href="https://www.axisweb.org/p/jennicadman/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Axis
                </a>
              </span>
              <span>
                <a
                  href="https://www.flickr.com/photos/jencad/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Flickr
                </a>
              </span>
              <span>
                <a
                  href="https://www.instagram.com/jennicadmanartist/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </span>
              <span>
                <a
                  href="https://www.pinterest.co.uk/jennicadman/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pinterest
                </a>
              </span>
              <span>
                <a
                  href="https://www.linkedin.com/in/jenni-cadman-74a5269b/"
                  target="_blank"
                  rel="noreferrer"
                >
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
