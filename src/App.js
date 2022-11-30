import { useState } from 'react'

import './global.css'
import './typography.css'

import { BrowserRouter as Router } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import NavRoutes from './components/NavRoutes/NavRoutes'
import LoadingCounter from './components/LoadingCounter/LoadingCounter'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  function handleLoadingAnimation() {
    setIsLoading(false)
  }

  return isLoading ? (
    <LoadingCounter isLoading={handleLoadingAnimation} />
  ) : (
    <Router>
      <Layout>
        <ScrollToTop>
          <NavRoutes />
        </ScrollToTop>
      </Layout>
    </Router>
  )
}

export default App
