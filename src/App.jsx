import React from 'react'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import CustomCursor from './components/CustomCursor'
import AboutSection from './components/AboutSection'
import ProjectSection from './components/ProjectSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import ProgressBar from './components/ProgressBar'

function App() {

  useEffect(() => {
    // Register scrolltrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Refresh scroll trigger when the page is fully loaded
    ScrollTrigger.refresh()

    // Cleanup ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
    <Header/>
    <HeroSection/>
    <CustomCursor/>
    <AboutSection/>
    <ProjectSection/>
    <ContactSection/>
    <Footer/>
    <ProgressBar/>
    </>
  )
}

export default App
