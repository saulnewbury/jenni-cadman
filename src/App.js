import './global.css'
import './typography.css'

import { BrowserRouter as Router } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import NavRoutes from './components/NavRoutes/NavRoutes'

import ScrollToTop from './components/ScrollToTop/ScrollToTop'

function App() {
  return (
    <Router>
      <Layout>
        <ScrollToTop>
          <NavRoutes />
          {/* Route: each set up a matcher between a location and the component to show where that component is at. They tell Routes which component to inject when a certain route is active */}

          {/* if not other routs match */}
        </ScrollToTop>
      </Layout>
    </Router>
  )
}

export default App
