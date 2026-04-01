import NavBar from "./components/NavBar"
import Hero from "./components/pages/Hero"
import BrowseSection from "./components/BrowseSection"
import NewArrivalsSection from "./components/NewArrivalsSection"
import TopSellingSection from "./components/TopSellingSection"
function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <NewArrivalsSection />
      <TopSellingSection />
      <BrowseSection />
    </>
  )
}

export default App
