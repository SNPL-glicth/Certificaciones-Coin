import React, { useEffect, useState, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { CartProvider } from './contexts/CartContext'
import './styles.css'

// Lazy loading de páginas para code splitting
const Home = lazy(() => import('./pages/Home'))
const Catalog = lazy(() => import('./pages/Catalog'))
const CartPage = lazy(() => import('./pages/CartPage'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Campus = lazy(() => import('./pages/Campus'))
const Becas = lazy(() => import('./pages/Becas'))
const Contact = lazy(() => import('./pages/Contact'))
const Dashboard = lazy(() => import('./components/Dashboard'))

// Componente de loading con estilo OffSec
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    background: 'transparent'
  }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    }}>
      {/* Spinner OffSec */}
      <div style={{
        width: '50px',
        height: '50px',
        border: '3px solid rgba(249, 115, 22, 0.3)',
        borderTop: '3px solid #f97316',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{
        color: '#cbd5e1',
        fontSize: '16px',
        margin: 0
      }}>Cargando...</p>
    </div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

function Shell(){
  const [dark, setDark] = useState(false)
  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])
  const nav = useNavigate()
  return (
    <MainLayout onToggleTheme={() => setDark(d => !d)}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home navigateToCatalog={() => nav('/catalogo')} />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/campus" element={<Campus />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/becas" element={<Becas />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </Suspense>
    </MainLayout>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Shell />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
)


