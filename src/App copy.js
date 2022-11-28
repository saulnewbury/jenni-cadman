// import './global.css'
// import './typography.css'

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation
// } from 'react-router-dom'

// import Layout from './components/Layout/Layout'
// import Home from './pages/Home/Home'
// import Work from './pages/Work/Work'
// import Collection from './pages/Collection/Collection'
// import ArtPiece from './pages/ArtPiece/ArtPiece'
// import Bio from './pages/Bio/Bio'
// import NotFound from './pages/NotFound/NotFound'

// import ScrollToTop from './components/ScrollToTop/ScrollToTop'
// import Contact from './pages/Contact/Contact'

// function App() {
//   return (
//     <Router>
//       <Layout>
//         {/* <ScrollToTop> */}
//         <Routes>
//           {/* Route: each set up a matcher between a location and the component to show where that component is at. They tell Routes which component to inject when a certain route is active */}

//           <Route path="/" element={<Home />} />
//           <Route path="/work" element={<Work />} />
//           <Route path="/bio" element={<Bio />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/:id" element={<Collection />} />
//           <Route
//             key={useLocation().key}
//             path="/:id/:slug"
//             element={<ArtPiece />}
//           />
//           <Route path="*" element={<NotFound />} />
//           {/* if not other routs match */}
//         </Routes>
//         {/* </ScrollToTop> */}
//       </Layout>
//     </Router>
//   )
// }

// export default App
