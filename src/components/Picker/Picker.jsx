import React, { useLayoutEffect, useRef, useState } from 'react'
import './picker.scss'

import Counter from '../Counter/Counter'

import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

const Picker = ({ imagesData, collectionId, id, handleExit }) => {
  gsap.registerPlugin(SplitText, ScrollTrigger)
  const { subFolder, images } = imagesData

  const [numOfItems, setNumOfItems] = useState(1)
  const [current, setCurrent] = useState(0)
  const [leftMost, setLeftMost] = useState(0)
  const [menuWidth, setMenuWidth] = useState('100vw')
  // menuWidth is set (in conjunction with numOfItems) by the various
  // media queries. The units (vw or px) communicates the switch between
  // 'fixed' and 'scaled' sizing for image items, and the numeric value
  // gives the required outer container width in those units.

  const pickerViewport = useRef()
  const container = useRef()

  const lastCurrent = useRef(current)
  const lastLeft = useRef(leftMost)
  const reveal = useRef()
  const hide = useRef()

  const location = useLocation()

  const calcValues = setUp(numOfItems)

  useLayoutEffect(mediaQueries, [])

  //-------------------------------------------------------------------------
  // Picker Enter Animation
  //-------------------------------------------------------------------------

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.image-item',
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.image-menu',
            start: 'top 80%'
            // markers: true
          }
        }
      )

      // Counter
      gsap.fromTo(
        '.counter, h2, .back',
        { opacity: 0 },
        {
          delay: 0.5,
          opacity: 1,
          stagger: 0.5,
          duration: 1,
          scrollTrigger: {
            trigger: '.image-menu',
            start: 'top 80%'
          }
        }
      )
    }, pickerViewport)

    return () => {
      ctx.revert()
    }
  }, [location.key, numOfItems])

  // Run animations on change of 'current'. Do this as a 'layout' effect so that
  // users don't see a flash of the target state (set by React render).
  useLayoutEffect(() => {
    if (current !== lastCurrent.current) {
      const prevTarget = container.current.children[lastCurrent.current]
      const newTarget = container.current.children[current]
      const c = gsap.utils.selector(newTarget)
      const p = gsap.utils.selector(prevTarget)

      gsap.fromTo(
        prevTarget,
        { width: `${calcValues.wide}` },
        { width: `${calcValues.narrow}` }
      )
      gsap.fromTo(p('img'), { opacity: 1.0 }, { opacity: 0.7 })
      gsap.fromTo(
        newTarget,
        { width: `${calcValues.narrow}` },
        { width: `${calcValues.wide}` }
      )
      gsap.fromTo(c('img'), { opacity: 0.7 }, { opacity: 1.0 })
      reveal.current?.pause().kill()
      reveal.current = gsap.fromTo(
        c('.view'),
        { opacity: 0, translate: '0px 2%' },
        { opacity: 1.0, translate: '0px 0px', delay: 0.5, duration: 0.5 }
      )
      hide.current = gsap.fromTo(
        p('.view'),
        { translate: '0px 0px' },
        { translate: '0px 2%', delay: 0.3, duration: 0.01 }
      )

      gsap.fromTo(p('.view'), { opacity: 1.0 }, { opacity: 0, duration: 0.2 })
      lastCurrent.current = current
    }
  })

  //-------------------------------------------------------------------------
  // Animate the change in container position when the leftmost item changes.
  //-------------------------------------------------------------------------
  useLayoutEffect(() => {
    if (leftMost !== lastLeft.current) {
      const value = calcValues.narrow.slice(0, -2) //  assuming units are two characters
      const units = calcValues.narrow.slice(-2)
      gsap.fromTo(
        container.current,
        { left: `-${lastLeft.current * value}${units}` },
        { left: `-${leftMost * value}${units}` }
      )
      lastLeft.current = leftMost
    }
  })
  //-------------------------------------------------------------------------
  // mediaQueries
  //    This function is run as a 'componentDidMount' effect - i.e. after the
  // first render. It adds a number of GSAP media query handlers to achieve
  // the following effect by screen/device width:
  //
  //    up to 399 px        3 items visible; menu fills width (100vw)
  //    400 - 741 px        4 - 9 items visible, increasing at 57px steps;
  //                            viewport fills width (100vw)
  //    742 - 1399 px       9 items visible; menu width fixed at 742px
  //   1400 - 1779 px       9 items visible; menu width scales at 53vw
  //   1780 - 2320 px       9 items visible; menu fixed at 943px
  //   2321 & above         9 items visible; menu scales at 44.46vw
  //
  // Those menu widths are calculated to give a 'smooth' transition from
  // the previous sizing:
  //    742px = 100vw at a screen width of 742 px
  //    53vw = 742px at a screen width of 1400 px
  //    943px = 53vw at a screen width of 1780 px and
  //    44.46vw = 943px at a screen width of 2321 px.
  //-------------------------------------------------------------------------

  function mediaQueries() {
    let mm = gsap.matchMedia()

    mm.add(`(min-width: 1780px)`, () => {
      setNumOfItems(9) //19s
      setLeftMost(0)
      setMenuWidth('943px')
    })

    mm.add(`(min-width: 1400px) and (max-width: 1779px)`, () => {
      setNumOfItems(9) //19
      setLeftMost(0)
      setMenuWidth('53vw')
    })

    mm.add(`(min-width: 742px) and (max-width: 1399px)`, () => {
      setNumOfItems(9)
      setLeftMost(0)
      setMenuWidth('682px') // was 742 - gutter = 680
    })

    for (let index = 7; index <= 12; index++) {
      let min = Math.floor((index * 200) / 3.5), // 400px ... 685px
        max = Math.floor(((index + 1) * 200) / 3.5) - 1 // 456px ... 741px

      mm.add(`(min-width: ${min}px) and (max-width: ${max}px)`, () => {
        setNumOfItems(index - 3)
        setLeftMost(0)
        setMenuWidth('92vw')
      })
    }

    mm.add(`(max-width: 399px)`, () => {
      setNumOfItems(3) // 6 narrow widths
      setLeftMost(0)
      setMenuWidth('92vw')
    })

    return () => {
      mm.kill()
    }
  }

  useEffect(() => {
    if (numOfItems > 1) {
      setCurrent(id || 0)
    }
    const isInverse = current > id
    containerPosition(id, isInverse)
  }, [numOfItems])

  //-------------------------------------------------------------------------
  // setup
  //    Called on each render, to calculate the (possibly new) widths and
  // heights of the menu containers and items. The latter can be either
  // 'narrow' or 'wide' with the proportions given below (4.4 or 20 x 32).
  //-------------------------------------------------------------------------

  function setUp(numOfItems) {
    const result = {}

    // These numbers are arbitrary: it is the proportional ratio between them
    // that defines the menu appearance. Let's call them 'logical scale units'
    const narrow = 4.4
    const wide = 20
    const height = 32

    const units = menuWidth.slice(-2).toLowerCase()
    const basis = parseFloat(menuWidth.slice(0, -2))

    // Calculate the width of the menu in 'logical scale units' - one 'wide'
    // and the rest 'narrow'.
    const total = (numOfItems - 1) * narrow + 1 * wide

    // Set 'x' to a scaling factor that represents 1 'logical scale unit' in
    // the current real width units.
    const x = basis / total

    // Now we can compute the real sizes of menu items and containers:
    result.narrow = `${x * narrow}${units}`
    result.wide = `${x * wide}${units}`
    result.height = `${x * height}${units}`

    // We also want to know the real width of all visible items combined. This
    // number may be less than the _allowed_ number.
    const numVisible = Math.min(numOfItems, images.length - leftMost)
    const visibleWidth = (numVisible - 1) * narrow + wide

    result.linkContainerWidth = `${x * visibleWidth}${units}`

    // Ditto the left offset of the inner container, relative to the outer,
    // which should be (negative) 'leftMost' times the narrow width.

    result.left = `-${leftMost * x * narrow}${units}`

    // Finally, add some padding to every menu item to separate them ever so
    // slightly.

    result.padding = '1px'

    return result
  }

  //-------------------------------------------------------------------------
  // handleClick
  //    Attached to each menu item as a 'click' event handler. Makes the
  // selected item the new 'current', which will trigger (via GSAP animation)
  // width and opacity changes.
  //
  // Also:
  //    page exit animation (handleExit)
  //    picker exit animation (exitAnimPicker)
  //-------------------------------------------------------------------------

  function handleClick(e) {
    e.stopPropagation()
    const target = e.currentTarget
    const targetId = +target.dataset.id

    // exit function if clicking on item already selected
    if (targetId === current) {
      // Exit animation on parent
      console.log(`/collections/${collectionId}/${images[current].image}`)

      handleExit(`/collections/${collectionId}/${images[current].image}`)
      // exit animation on picker
      exitAnimPicker()
      return
    }

    setCurrent(targetId)

    // Create flag to determine regular or inverse calculation.
    const isInverse = current > targetId
    containerPosition(targetId, isInverse)
  }

  //-------------------------------------------------------------------------
  // Exit animation for picker
  // Called from within handleClick function
  //-------------------------------------------------------------------------

  function exitAnimPicker() {
    const ctx = gsap.context(() => {
      gsap.to('.counter, h2, .back', {
        opacity: 0,
        duration: 0.5,
        delay: 0.2
      })
      gsap.to('.image-item', {
        opacity: 0,
        stagger: 0.05,
        delay: 0.2
      })
    }, pickerViewport)

    return () => {
      ctx.revert()
    }
  }

  //-------------------------------------------------------------------------
  // containerPosition
  //    Called after changing the 'current' item, to try to scroll it into
  // either the 2nd position [moving forwards from previous current] or the
  // penultimate position [moving backwards] - or as close as we can achieve,
  // given the number of items available, versus the number that can fit in
  // the current scroll-port (outer container).
  //-------------------------------------------------------------------------

  function containerPosition(targetId, isInverse) {
    let newLeft = leftMost
    // FORWARD
    if (!isInverse) {
      // get position 2 (offset)
      const pos2 = leftMost + 1

      // Work out items not in view
      const itemsTotal = images.length
      const idLastInView = Math.min(leftMost + numOfItems, itemsTotal) - 1
      const itemsOutside = itemsTotal - (idLastInView + 1)

      // get difference to travel
      const diff = Math.min(Math.max(targetId - pos2, 0), itemsOutside)
      newLeft = leftMost + diff
    } else {
      // INVERSE
      const last = leftMost + numOfItems - 1
      const pen = last - 1
      const itemsOutside = leftMost

      const diff = Math.min(Math.max(pen - targetId, 0), itemsOutside)
      newLeft = leftMost - diff
    }
    // move container to new position
    setLeftMost(newLeft)
  }

  //-------------------------------------------------------------------------
  //  Render [JSX]
  //-------------------------------------------------------------------------

  return (
    <div className="picker indent">
      <div
        ref={pickerViewport}
        className="picker-viewport"
        style={{ height: calcValues.height, width: menuWidth }}
      >
        <div className="back-link-container">
          <Link className="back link" to="/work">
            BACK
          </Link>
        </div>

        <div className="artpiece-title">
          <div className="artpiece-title-container">
            <h2 className="uppercase title sm">{images[current].title}</h2>
          </div>
        </div>
        <div
          className="counter indent"
          style={{ width: calcValues.linkContainerWidth }}
        >
          <Counter id={current} length={images.length} />
        </div>
        <div
          ref={container}
          className="image-menu"
          style={{
            left: calcValues.left,
            height: calcValues.height
          }}
        >
          {images.map((image, idx) => (
            <span
              className="image-item"
              style={{
                paddingLeft: calcValues.padding,
                paddingRight: calcValues.padding,
                height: calcValues.height,
                width: `${
                  idx === current ? calcValues.wide : calcValues.narrow
                }`
              }}
              data-title={image.title}
              data-size={idx === current ? 'wide' : 'narrow'}
              data-id={idx}
              onClick={e => {
                handleClick(e)
              }}
              key={idx}
            >
              <img
                src={`/images/${subFolder}/thumbs/${image.image}-thumb.webp`}
                alt={image.alt}
                style={{
                  opacity: idx === current ? 1.0 : 0.8
                }}
              />
              <span
                className="view btn"
                style={{
                  opacity: idx === current ? 1.0 : 0,
                  pointerEvents: idx === current ? 'auto' : 'none',
                  translate: idx === current ? '0px 0px' : '0px 2%'
                }}
              >
                View
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Picker
