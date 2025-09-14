import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import StatsCounter from '../components/StatsCounter'

const Home = () => {
  return (
    <div>
      <Header />
      <HowItWorks/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner></Banner>
      <StatsCounter/>
      <Testimonials/>
    </div>
  )
}

export default Home
