import { useState } from 'react'
import './global.css'
import './typography.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Work from './pages/Work/Work'
import Collection from './pages/Collection/Collection'
import ArtPiece from './pages/ArtPiece/ArtPiece'
import Bio from './pages/Bio/Bio'
import Contact from './pages/Contact/Contact'
import NotFound from './pages/NotFound/NotFound'
import Layout from './components/Layout/Layout'
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/:id" element={<Collection />} />
          <Route path="/:id/:slug" element={<ArtPiece />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
