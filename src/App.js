import { useState } from 'react'

import './global.css'
import './typography.css'

import { BrowserRouter as Router } from 'react-router-dom'

import PageRoutes from './components/PageRoutes/PageRoutes'
import Layout from './components/Layout/Layout'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import LoadingCounter from './components/LoadingCounter/LoadingCounter'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  function handleLoadingAnimation() {
    setIsLoading(false)
  }

  // Fudgery to disable the left and right swipe animations in safari desktop.
  document.body.addEventListener(
    'mousewheel',
    function (e) {
      e.stopPropagation()
      var max = this.scrollWidth - this.offsetWidth // this might change if you have dynamic content, perhaps some mutation observer will be useful here

      if (this.scrollLeft + e.deltaX < 0 || this.scrollLeft + e.deltaX > max) {
        e.preventDefault()
        this.scrollLeft = Math.max(0, Math.min(max, this.scrollLeft + e.deltaX))
      }
    },
    { passive: false }
  )

  return isLoading ? (
    <LoadingCounter isLoading={handleLoadingAnimation} />
  ) : (
    <Router>
      <Layout>
        <ScrollToTop>
          <PageRoutes />
        </ScrollToTop>
      </Layout>
    </Router>
  )
}

export default App
