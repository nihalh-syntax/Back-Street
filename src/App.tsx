import { Outlet, Route, Routes } from "react-router-dom"

import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import CartPage from "./pages/CartPage"
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="/product/:source/:id" element={<ProductPage />} />
      </Route>
    </Routes>
  )
}

export default App
