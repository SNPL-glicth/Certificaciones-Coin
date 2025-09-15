import React, { useState } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function Navbar({ onToggleTheme }){
  const cart = useCart()
  const nav = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Ir al inicio (si ya estoy en "/", solo hace scroll arriba)
  function goHome(e){
    e.preventDefault()
    if (location.pathname !== '/') {
      nav('/')
      // Espera a que monte Home y luego sube
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // Limpia cualquier hash (por si venías de #quienes-somos)
    history.replaceState(null, '', '/')
  }

  // Ir a la sección "Quiénes somos" dentro del Home sin dejar hash
  function goQuienes(e){
    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById('quienes-somos')?.scrollIntoView({ behavior: 'smooth' })
      history.replaceState(null, '', '/')
    } else {
      // Navega a Home y luego hace scroll a la sección
      nav('/')
      setTimeout(() => {
        document.getElementById('quienes-somos')?.scrollIntoView({ behavior: 'smooth' })
        history.replaceState(null, '', '/')
      }, 0)
    }
  }

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'rgba(15, 15, 35, 0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(249, 115, 22, 0.2)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px'
      }}>
        {/* Logo empresarial */}
        <a 
          href="/" 
          onClick={goHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #f97316, #ea580c)',
            boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '20px',
              height: '20px',
              background: 'white',
              borderRadius: '50%'
            }}></div>
          </div>
          <span style={{
            fontSize: '20px',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #ffffff 0%, #f97316 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>COIN Certificaciones</span>
        </a>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {[
            { href: '/', label: 'Inicio', onClick: goHome },
            { href: '/#quienes-somos', label: 'Quiénes somos', onClick: goQuienes },
            { to: '/catalogo', label: 'Catálogo' },
            { to: '/becas', label: 'Becas' },
            { to: '/campus', label: 'Campus' },
            { to: '/contacto', label: 'Contacto' }
          ].map((item, index) => 
            item.to ? (
              <NavLink 
                key={index}
                to={item.to}
                style={({ isActive }) => ({
                  color: isActive ? '#f97316' : '#cbd5e1',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  background: isActive ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(249, 115, 22, 0.3)' : '1px solid transparent'
                })}
                onMouseOver={(e) => {
                  if (!e.currentTarget.style.background.includes('rgba(249, 115, 22, 0.1)')) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseOut={(e) => {
                  if (!e.currentTarget.style.background.includes('rgba(249, 115, 22, 0.1)')) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#cbd5e1';
                  }
                }}
              >
                {item.label}
              </NavLink>
            ) : (
              <a 
                key={index}
                href={item.href} 
                onClick={item.onClick}
                style={{
                  color: '#cbd5e1',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#cbd5e1';
                }}
              >
                {item.label}
              </a>
            )
          )}
          
          {/* Carrito especial */}
          <NavLink 
            to="/carrito" 
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: isActive ? '#f97316' : '#cbd5e1',
              textDecoration: 'none',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              background: isActive ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
              border: isActive ? '1px solid rgba(249, 115, 22, 0.3)' : '1px solid transparent'
            })}
            onMouseOver={(e) => {
              if (!e.currentTarget.style.background.includes('rgba(249, 115, 22, 0.1)')) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
            onMouseOut={(e) => {
              if (!e.currentTarget.style.background.includes('rgba(249, 115, 22, 0.1)')) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#cbd5e1';
              }
            }}
          >
            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Carrito
            {cart.count > 0 && (
              <span style={{
                background: 'linear-gradient(45deg, #f97316, #ea580c)',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '4px 8px',
                borderRadius: '50%',
                minWidth: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(249, 115, 22, 0.3)'
              }}>
                {cart.count}
              </span>
            )}
          </NavLink>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-menu-button"
          aria-label="Toggle menu"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav px-6">
            <a 
              href="/" 
              onClick={(e) => { goHome(e); setIsMenuOpen(false); }}
              className="mobile-nav-link"
            >
              Inicio
            </a>
            <a 
              href="/#quienes-somos" 
              onClick={(e) => { goQuienes(e); setIsMenuOpen(false); }}
              className="mobile-nav-link"
            >
              Quiénes somos
            </a>
            <NavLink 
              to="/catalogo"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => 
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
            >
              Catálogo
            </NavLink>
            <NavLink 
              to="/becas"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => 
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
            >
              Becas
            </NavLink>
            <NavLink 
              to="/campus"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => 
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
            >
              Campus
            </NavLink>
            <NavLink 
              to="/contacto"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => 
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
            >
              Contacto
            </NavLink>
            <NavLink 
              to="/carrito" 
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => 
                `mobile-nav-link ${isActive ? 'active' : ''} flex items-center gap-2`
              }
            >
              Carrito 
              <span className="cart-count">
                {cart.count}
              </span>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}
