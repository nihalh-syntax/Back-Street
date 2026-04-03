import Hero from "@/components/pages/Hero"
import BrowseSection from "@/components/BrowseSection"
import NewArrivalsSection from "@/components/NewArrivalsSection"
import TopSellingSection from "@/components/TopSellingSection"

const HomePage = () => {
  return (
    <>
      <Hero />
      <NewArrivalsSection />
      <TopSellingSection />
      <BrowseSection />
    </>
  )
}

export default HomePage
