import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Ticker from './components/Ticker'
import HowItWorks from './components/HowItWorks'
import FeaturesSection from './components/FeaturesSection'
import StatsSection from './components/StatsSection'
import TestimonialsSection from './components/TestimonialsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Dashboard from './pages/Dashboard'
import './index.css'
import './App.css'
function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Ticker />
      <HowItWorks />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
