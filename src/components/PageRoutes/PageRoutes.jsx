import React from 'react'

import { useLocation, Routes, Route } from 'react-router-dom'

import Home from '../../pages/Home/Home'
import Work from '../../pages/Work/Work'
import Collection from '../../pages/Collection/Collection'
import ArtPiece from '../../pages/ArtPiece/ArtPiece'
import Bio from '../../pages/Bio/Bio'
import Contact from '../../pages/Contact/Contact'
import NotFound from '../../pages/NotFound/NotFound'

const PageRoutes = () => {
  const { key } = useLocation()

  return (
    <Routes key={key}>
      <Route path="/" element={<Home />} gestureEnabled={false} />
      <Route path="/work" element={<Work />} gestureEnabled={false} />
      <Route path="/bio" element={<Bio />} gestureEnabled={false} />
      <Route path="/contact" element={<Contact gestureEnabled={false} />} />
      <Route path="/:id" element={<Collection />} gestureEnabled={false} />
      <Route path="/:id/:slug" element={<ArtPiece />} gestureEnabled={false} />
      <Route path="*" element={<NotFound />} gestureEnabled={false} />
    </Routes>
  )
}

export default PageRoutes
