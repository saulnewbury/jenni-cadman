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
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<Work />} />
      <Route path="/bio" element={<Bio />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/:id" element={<Collection />} />
      <Route path="/:id/:slug" element={<ArtPiece />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default PageRoutes
