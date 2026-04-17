import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'

// Lazy Load Pages for performance (Code Splitting)
const Hero = lazy(() => import('./pages/Hero'))
const About = lazy(() => import('./pages/About'))
const Work = lazy(() => import('./pages/Work'))
const Skills = lazy(() => import('./pages/Skills'))
const Experience = lazy(() => import('./pages/Experience'))
const Contact = lazy(() => import('./pages/Contact'))

// Fallback loader while lazy loading
const Loader = () => (
  <div className="w-full h-screen flex items-center justify-center bg-white text-ink font-mono text-sm">
    Loading...
  </div>
)

function App() {
  return (
    <BrowserRouter>
      {/* Global UI Components */}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      {/* Route Views */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/work" element={<Work />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
