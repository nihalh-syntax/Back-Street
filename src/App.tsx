import { Outlet, Route, Routes } from "react-router-dom"

import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:source/:id" element={<ProductPage />} />
      </Route>
    </Routes>
  )
}

export default App
