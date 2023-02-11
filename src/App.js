import { useState } from 'react'
import './global.css'
import './typography.css'

import { collections } from './data/collections'

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  redirect
} from 'react-router-dom'

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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="bio" element={<Bio />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="collections/:id"
          element={<Collection />}
          loader={async ({ params }) => {
            const exists = collections.some(obj => {
              return obj.id === +params.id.slice(1)
            })
            if (!exists) return redirect('/404')
          }}
        />
        <Route
          path="collections/:id/:slug"
          element={<ArtPiece />}
          loader={async ({ params }) => {
            const collection = collections.find(
              obj => obj.id === +params.id.slice(1)
            )

            const exists = collection.imagesData.images.some(img => {
              return img.image === params.slug
            })

            if (!exists) return redirect('/404')
          }}
        />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return isLoading ? (
    <LoadingCounter isLoading={handleLoadingAnimation} />
  ) : (
    <RouterProvider router={router} />
  )
}

export default App
