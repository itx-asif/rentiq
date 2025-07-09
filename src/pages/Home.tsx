import FeaturedProperties from '@/components/home/FeaturedSection'
import Hero from '@/components/home/Hero'
import PropertyTypes from '@/components/home/PropertyTypes'
import ServicesSection from '@/components/home/ServicesSection'
import StatsSection from '@/components/home/StatsSection'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  return (<>
    <Hero />
    <StatsSection />
    <PropertyTypes />
    <FeaturedProperties />
    <ServicesSection />
    <ToastContainer />
  </>
  )
}

export default Home