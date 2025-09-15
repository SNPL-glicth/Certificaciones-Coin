import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import { listProducts } from '../services/api'
import beneficiosLocal from '../assets/banners/beneficios_certificaciones.png' // local (si existe)

// URLs públicas por si tu imagen local no carga
const BENEFICIOS_FALLBACK = 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80'

// Ya no necesitamos importar logos externos - usamos SVGs personalizados

export default function Home({ navigateToCatalog }){
  const [list, setList] = useState([])
  const { hash } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  // Cargar productos
  useEffect(() => {
    listProducts().then(data => {
      setList(data.slice(0, 8))
    })
  }, [])

  // Scroll suave a #quienes-somos (solo 1 vez si viene con hash)
  useEffect(() => {
    if (!scrolled && hash === '#quienes-somos') {
      document.getElementById('quienes-somos')?.scrollIntoView({ behavior: 'smooth' })
      setScrolled(true)
    }
  }, [hash, scrolled])

  return (
    <main style={{ background: '#0f0f23' }}>
      <Hero onCta={navigateToCatalog} />

      {/* Certificaciones destacadas - Estilo OffSec */}
      <section style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        color: 'white',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }} aria-labelledby="destacadas-title">
        {/* Efectos de fondo */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.02) 50%, transparent 100%)
          `
        }}></div>
        
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <header style={{ textAlign: 'center', marginBottom: '64px' }}>
            {/* Badge superior */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 20px',
              background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.2), rgba(234, 88, 12, 0.2))',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#fb923c',
              marginBottom: '24px',
              backdropFilter: 'blur(10px)'
            }}>
              <svg style={{ width: '16px', height: '16px', marginRight: '8px' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              Certificaciones de Élite
            </div>
            
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: '900',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.1'
            }}>
              Certifícate con los
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Mejores del Mundo</span>
            </h2>
            
            <p style={{
              color: '#cbd5e1',
              fontSize: '20px',
              maxWidth: '600px',
              margin: '0 auto 40px',
              lineHeight: '1.6'
            }}>
              Domina las tecnologías que definen el futuro. Certificaciones respaldadas por los gigantes tecnológicos.
            </p>
            
            <button 
              style={{
                background: 'linear-gradient(45deg, #f97316, #ea580c)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 10px 40px rgba(249, 115, 22, 0.3)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px'
              }}
              onClick={navigateToCatalog}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 20px 60px rgba(249, 115, 22, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 40px rgba(249, 115, 22, 0.3)';
              }}
            >
              <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Explorar Certificaciones
            </button>
          </header>

          {/* Grid de certificaciones con estilo profesional */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {list.map((p, index) => (
              <div 
                key={p.id} 
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '24px',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Número de certificación */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(45deg, #f97316, #ea580c)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Contenido de la certificación */}
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{
                    color: '#ffffff',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                    lineHeight: '1.3'
                  }}>
                    {p.title}
                  </h3>
                  
                  {/* Tags de categoría */}
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{
                      padding: '4px 12px',
                      background: 'rgba(249, 115, 22, 0.2)',
                      color: '#fbbf24',
                      fontSize: '12px',
                      fontWeight: '500',
                      borderRadius: '15px',
                      border: '1px solid rgba(249, 115, 22, 0.3)'
                    }}>
                      Certificación Internacional
                    </span>
                  </div>
                  
                  <p style={{
                    color: '#cbd5e1',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    marginBottom: '20px'
                  }}>
                    Certifícate con estándares internacionales y potencia tu carrera profesional con las competencias más demandadas.
                  </p>
                  
                  {/* Precio */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                  }}>
                    <div>
                      <span style={{
                        color: '#f97316',
                        fontSize: '24px',
                        fontWeight: 'bold'
                      }}>
                        ${p.price?.toLocaleString() || 'Consultar'}
                      </span>
                      <span style={{
                        color: '#64748b',
                        fontSize: '14px',
                        marginLeft: '8px'
                      }}>
                        COP
                      </span>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {[1,2,3,4,5].map(star => (
                        <svg key={star} style={{ width: '16px', height: '16px', color: '#fbbf24' }} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                      <span style={{ color: '#64748b', fontSize: '12px', marginLeft: '4px' }}>5.0</span>
                    </div>
                  </div>
                  
                  {/* Botón de acción */}
                  <button style={{
                    width: '100%',
                    background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                    color: 'white',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'linear-gradient(45deg, #f97316, #ea580c)';
                    e.target.style.borderColor = '#f97316';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Certificarme Ahora
                  </button>
                </div>
                
                {/* Efecto de brillo en hover */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
                  transform: 'translateX(-100%) translateY(-100%) rotate(45deg)',
                  transition: 'transform 0.6s ease',
                  pointerEvents: 'none'
                }} className="shine-effect"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiénes somos - Estilo OffSec */}
      <section id="quienes-somos" style={{
        background: 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 100%)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden'
      }} aria-labelledby="qs-title">
        {/* Efectos de fondo */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 30% 30%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
          `
        }}></div>
        
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.2), rgba(234, 88, 12, 0.15))',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#fbbf24',
              marginBottom: '24px',
              backdropFilter: 'blur(20px)'
            }}>
              <svg style={{ width: '16px', height: '16px', marginRight: '8px' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Nuestra Misión
            </div>
            
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: '900',
              marginBottom: '24px',
              lineHeight: '1.1'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #cbd5e1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Forjando</span>
              {' '}
              <span style={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Profesionales de Élite</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '80px',
            alignItems: 'center'
          }}>
            {/* Contenido principal */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '48px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Efecto de brillo */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                animation: 'shimmer 3s ease-in-out infinite'
              }}></div>
              
              <h3 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                Corporación Internacional Nexus COIN
              </h3>
              
              <div style={{ marginBottom: '32px' }}>
                <p style={{
                  color: '#cbd5e1',
                  fontSize: '18px',
                  lineHeight: '1.7',
                  marginBottom: '24px'
                }}>
                  Somos tu <span style={{ color: '#f97316', fontWeight: '600' }}>aliado estratégico</span> para alcanzar la excelencia profesional y empresarial. 
                  Nos especializamos en consultoría, interventoría y la obtención de <span style={{ color: '#fbbf24', fontWeight: '600' }}>certificaciones internacionales</span>, 
                  impulsando el crecimiento de profesionales y organizaciones en todo el mundo.
                </p>
                
                <p style={{
                  color: '#cbd5e1',
                  fontSize: '18px',
                  lineHeight: '1.7',
                  marginBottom: '32px'
                }}>
                  Nuestro compromiso es <span style={{ color: '#f97316', fontWeight: '600' }}>potenciar tus habilidades y conocimientos</span>, 
                  facilitando el acceso a un amplio portafolio de certificaciones de prestigio global. 
                  Te aseguramos que tanto tú como tu equipo cumplan con los más altos estándares del mercado.
                </p>
              </div>
              
              {/* Features destacadas */}
              <div style={{ marginBottom: '32px' }}>
                {[
                  { 
                    icon: <svg style={{ width: '24px', height: '24px', color: '#f97316' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>, 
                    title: 'Excelencia Comprobada', 
                    desc: 'Más de 1000 profesionales certificados exitosamente'
                  },
                  { 
                    icon: <svg style={{ width: '24px', height: '24px', color: '#f97316' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                    </svg>, 
                    title: 'Alcance Global', 
                    desc: 'Certificaciones reconocidas en más de 150 países'
                  },
                  { 
                    icon: <svg style={{ width: '24px', height: '24px', color: '#f97316' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>, 
                    title: 'Partners Elite', 
                    desc: 'Alianzas con Cisco, Microsoft, Oracle y líderes tech'
                  }
                ].map((feature, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    padding: '16px',
                    background: 'rgba(249, 115, 22, 0.1)',
                    border: '1px solid rgba(249, 115, 22, 0.2)',
                    borderRadius: '16px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.2), rgba(234, 88, 12, 0.2))',
                      border: '1px solid rgba(249, 115, 22, 0.3)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '16px',
                      flexShrink: 0
                    }}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 style={{ color: '#ffffff', fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>
                        {feature.title}
                      </h4>
                      <p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0 }}>
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Garantía */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                background: 'linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '20px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(45deg, #22c55e, #10b981)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '20px',
                  flexShrink: 0
                }}>
                  <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 style={{ color: '#22c55e', fontWeight: '700', fontSize: '18px', marginBottom: '4px' }}>
                    Certificación Garantizada
                  </h4>
                  <p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0 }}>
                    Estándares internacionales de la más alta calidad
                  </p>
                </div>
              </div>
            </div>
            
            {/* Visual lateral */}
            <div style={{ position: 'relative' }}>
              {/* Imagen principal */}
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '20px'
              }}>
                <img
                  src={beneficiosLocal}
                  alt="Beneficios de certificaciones"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '16px',
                    filter: 'brightness(1.1) contrast(1.1)'
                  }}
                  onError={(e)=>{ e.currentTarget.src = BENEFICIOS_FALLBACK }}
                />
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  bottom: '20px',
                  background: 'linear-gradient(to top, rgba(249, 115, 22, 0.3), transparent)',
                  borderRadius: '16px',
                  pointerEvents: 'none'
                }}></div>
              </div>
              
              {/* Stats flotantes */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                background: 'rgba(249, 115, 22, 0.9)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '16px 20px',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: '900', color: 'white' }}>1000+</div>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.9)' }}>Profesionales</div>
              </div>
              
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                background: 'rgba(59, 130, 246, 0.9)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '16px 20px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: '900', color: 'white' }}>50+</div>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.9)' }}>Certificaciones</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners - Estilo OffSec */}
      <section id="partners" style={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f23 100%)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }} aria-labelledby="partners-title">
        {/* Efectos de fondo */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)
          `
        }}></div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          {/* Header con estilo OffSec */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.2), rgba(234, 88, 12, 0.15))',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#fbbf24',
              marginBottom: '24px',
              backdropFilter: 'blur(20px)'
            }}>
              <svg style={{ width: '16px', height: '16px', marginRight: '8px' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Partners Tecnológicos Elite
            </div>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '900',
              marginBottom: '16px',
              lineHeight: '1.1'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #cbd5e1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Respaldados por los</span>
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Líderes Mundiales</span>
            </h2>
          </div>

          {/* Grid horizontal de partners optimizado */}
          <div className="partners-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            alignItems: 'center',
            marginBottom: '48px'
          }}>
            {/* Cisco */}
            <a 
              href="https://www.cisco.com/" 
              target="_blank" 
              rel="noreferrer" 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '32px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <div style={{
                width: '120px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                {/* Logo SVG de Cisco personalizado */}
                <svg width="100" height="40" viewBox="0 0 200 80" style={{ filter: 'drop-shadow(0 2px 8px rgba(59, 130, 246, 0.3))' }}>
                  {/* Barras características de Cisco */}
                  <g fill="#3b82f6">
                    <rect x="10" y="20" width="8" height="40" rx="2">
                      <animate attributeName="height" values="40;50;40" dur="2s" repeatCount="indefinite" />
                    </rect>
                    <rect x="22" y="15" width="8" height="50" rx="2">
                      <animate attributeName="height" values="50;40;50" dur="2.5s" repeatCount="indefinite" />
                    </rect>
                    <rect x="34" y="10" width="8" height="60" rx="2">
                      <animate attributeName="height" values="60;50;60" dur="3s" repeatCount="indefinite" />
                    </rect>
                    <rect x="46" y="25" width="8" height="30" rx="2">
                      <animate attributeName="height" values="30;45;30" dur="1.8s" repeatCount="indefinite" />
                    </rect>
                    <rect x="58" y="18" width="8" height="44" rx="2">
                      <animate attributeName="height" values="44;38;44" dur="2.2s" repeatCount="indefinite" />
                    </rect>
                  </g>
                  {/* Texto CISCO */}
                  <text x="80" y="45" fill="#ffffff" fontSize="22" fontWeight="bold" fontFamily="Arial, sans-serif">
                    CISCO
                  </text>
                  {/* Efecto de conexión */}
                  <circle cx="190" cy="40" r="3" fill="#60a5fa">
                    <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '8px',
                textAlign: 'center'
              }}>Cisco Systems</h3>
              <p style={{
                fontSize: '14px',
                color: '#cbd5e1',
                textAlign: 'center',
                marginBottom: '12px'
              }}>Líder Mundial en Redes y Seguridad</p>
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <span style={{
                  padding: '6px 16px',
                  background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.15))',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  color: '#60a5fa',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)'
                }}>CCNA</span>
                <span style={{
                  padding: '6px 16px',
                  background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.15))',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  color: '#60a5fa',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)'
                }}>CCNP</span>
                <span style={{
                  padding: '6px 16px',
                  background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.15))',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  color: '#60a5fa',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)'
                }}>Security</span>
              </div>
            </a>

            {/* Microsoft */}
            <a 
              href="https://www.microsoft.com/"
              target="_blank" 
              rel="noreferrer" 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '32px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.4)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <div style={{
                width: '140px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                {/* Logo SVG de Microsoft personalizado */}
                <svg width="140" height="50" viewBox="0 0 280 100" style={{ filter: 'drop-shadow(0 2px 8px rgba(34, 197, 94, 0.3))' }}>
                  {/* Logo de Microsoft (cuadrados coloridos) */}
                  <g>
                    <rect x="10" y="15" width="18" height="18" fill="#F25022" />
                    <rect x="32" y="15" width="18" height="18" fill="#7FBA00" />
                    <rect x="10" y="37" width="18" height="18" fill="#00A4EF" />
                    <rect x="32" y="37" width="18" height="18" fill="#FFB900" />
                  </g>
                  
                  {/* Texto Microsoft */}
                  <text x="60" y="45" fill="#ffffff" fontSize="24" fontWeight="600" fontFamily="Segoe UI, Arial, sans-serif">
                    Microsoft
                  </text>
                  
                  {/* Icono de certificación */}
                  <g transform="translate(200, 25)">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="126" strokeDashoffset="126">
                      <animate attributeName="stroke-dashoffset" values="126;0;126" dur="4s" repeatCount="indefinite" />
                    </circle>
                    <path d="M15 25 L22 32 L35 19" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <animate attributeName="stroke-dasharray" values="0,20;20,0;0,20" dur="2s" repeatCount="indefinite" begin="1s" />
                    </path>
                  </g>
                  
                  {/* Partículas flotantes */}
                  <circle cx="250" cy="15" r="2" fill="#34d399" opacity="0.7">
                    <animate attributeName="cy" values="15;80;15" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="260" cy="25" r="1.5" fill="#10b981" opacity="0.5">
                    <animate attributeName="cy" values="25;70;25" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '8px',
                textAlign: 'center'
              }}>Microsoft</h3>
              <p style={{
                fontSize: '14px',
                color: '#cbd5e1',
                textAlign: 'center',
                marginBottom: '12px'
              }}>Líder Mundial en Software</p>
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <span style={{
                  padding: '6px 16px',
                  background: 'linear-gradient(45deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.15))',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#4ade80',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)'
                }}>Office</span>
                <span style={{
                  padding: '6px 16px',
                  background: 'linear-gradient(45deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.15))',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#4ade80',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)'
                }}>Azure</span>
                <span style={{
                  padding: '6px 16px',
                  background: 'linear-gradient(45deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.15))',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#4ade80',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)'
                }}>M365</span>
              </div>
            </a>

            {/* ETC Iberoamericana */}
            <a 
              href="https://www.eticiberoamericana.com/" 
              target="_blank" 
              rel="noreferrer" 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '32px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(147, 51, 234, 0.2)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(147, 51, 234, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(147, 51, 234, 0.4)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(147, 51, 234, 0.2)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <div style={{
                width: '160px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                {/* Logo SVG de ETC Iberoamericana rediseñado */}
                <svg width="160" height="50" viewBox="0 0 320 100" style={{ filter: 'drop-shadow(0 2px 8px rgba(147, 51, 234, 0.3))' }}>
                  <defs>
                    <linearGradient id="etcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#9333ea" />
                      <stop offset="50%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="textWhite" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#f1f5f9" />
                    </linearGradient>
                  </defs>
                  
                  {/* Logo principal - Símbolo educativo moderno */}
                  <g transform="translate(10, 15)">
                    {/* Símbolo de conocimiento - libro abierto estilizado */}
                    <path d="M5 20 Q5 15 10 15 L25 15 Q30 15 30 20 L30 45 Q30 50 25 50 L10 50 Q5 50 5 45 Z" 
                          fill="url(#etcGrad)" opacity="0.8" />
                    
                    <path d="M35 20 Q35 15 40 15 L55 15 Q60 15 60 20 L60 45 Q60 50 55 50 L40 50 Q35 50 35 45 Z" 
                          fill="url(#etcGrad)" opacity="0.6" />
                    
                    {/* Líneas de texto estilizadas */}
                    <line x1="10" y1="25" x2="25" y2="25" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
                    <line x1="10" y1="30" x2="20" y2="30" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
                    <line x1="10" y1="35" x2="25" y2="35" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
                    
                    <line x1="40" y1="25" x2="55" y2="25" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
                    <line x1="45" y1="30" x2="55" y2="30" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
                    <line x1="40" y1="35" x2="50" y2="35" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
                    
                    {/* Punto de unión central */}
                    <circle cx="32.5" cy="32.5" r="3" fill="#a855f7">
                      <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </g>
                  
                  {/* Texto principal ETC */}
                  <text x="80" y="35" fill="url(#textWhite)" fontSize="24" fontWeight="bold" fontFamily="Arial, sans-serif">
                    ETC
                  </text>
                  
                  {/* Texto Iberoamericana */}
                  <text x="130" y="30" fill="#a78bfa" fontSize="14" fontWeight="600" fontFamily="Arial, sans-serif">
                    IBEROAMERICANA
                  </text>
                  
                  {/* Subtítulo */}
                  <text x="130" y="45" fill="#c084fc" fontSize="11" fontWeight="400" fontFamily="Arial, sans-serif">
                    Educación Tecnológica Avanzada
                  </text>
                  
                  {/* Elemento decorativo lateral - torre de conocimiento */}
                  <g transform="translate(270, 20)" opacity="0.7">
                    {/* Niveles de educación representados como bloques apilados */}
                    <rect x="0" y="40" width="24" height="8" rx="2" fill="#9333ea" opacity="0.8">
                      <animate attributeName="width" values="24;28;24" dur="3s" repeatCount="indefinite" />
                    </rect>
                    <rect x="2" y="30" width="20" height="8" rx="2" fill="#7c3aed" opacity="0.9">
                      <animate attributeName="width" values="20;24;20" dur="2.5s" repeatCount="indefinite" />
                    </rect>
                    <rect x="4" y="20" width="16" height="8" rx="2" fill="#8b5cf6">
                      <animate attributeName="width" values="16;20;16" dur="2s" repeatCount="indefinite" />
                    </rect>
                    <rect x="6" y="10" width="12" height="8" rx="2" fill="#a855f7">
                      <animate attributeName="width" values="12;16;12" dur="1.8s" repeatCount="indefinite" />
                    </rect>
                    
                    {/* Corona de excelencia */}
                    <circle cx="12" cy="5" r="3" fill="none" stroke="#a855f7" strokeWidth="1.5">
                      <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="12" cy="5" r="1" fill="#a855f7" />
                  </g>
                  
                  {/* Partículas de innovación */}
                  <circle cx="250" cy="15" r="1.5" fill="#a855f7" opacity="0.6">
                    <animate attributeName="cy" values="15;60;15" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.2;0.6" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="260" cy="25" r="1" fill="#8b5cf6" opacity="0.4">
                    <animate attributeName="cy" values="25;70;25" dur="5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="5s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '8px',
                textAlign: 'center'
              }}>ETC Iberoamericana</h3>
              <p style={{
                fontSize: '14px',
                color: '#cbd5e1',
                textAlign: 'center',
                marginBottom: '12px'
              }}>Educación Tecnológica Avanzada</p>
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <span style={{
                  padding: '6px 16px',
                  background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(124, 58, 237, 0.15))',
                  border: '1px solid rgba(147, 51, 234, 0.3)',
                  color: '#a78bfa',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)'
                }}>Oracle</span>
                <span style={{
                  padding: '6px 16px',
                  background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(124, 58, 237, 0.15))',
                  border: '1px solid rgba(147, 51, 234, 0.3)',
                  color: '#a78bfa',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)'
                }}>DevOps</span>
                <span style={{
                  padding: '6px 16px',
                  background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(124, 58, 237, 0.15))',
                  border: '1px solid rgba(147, 51, 234, 0.3)',
                  color: '#a78bfa',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)'
                }}>Cloud</span>
              </div>
            </a>

            {/* CertiProf */}
            <a 
              href="https://certiprof.com/" 
              target="_blank" 
              rel="noreferrer" 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '32px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(236, 72, 153, 0.2)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(236, 72, 153, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.4)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.2)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <div style={{
                width: '120px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                {/* Logo SVG de CertiProf personalizado */}
                <svg width="120" height="60" viewBox="0 0 240 120" style={{ filter: 'drop-shadow(0 2px 8px rgba(236, 72, 153, 0.3))' }}>
                  <defs>
                    <linearGradient id="certiprofGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="50%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#f9a8d4" />
                    </linearGradient>
                  </defs>
                  
                  {/* Logo principal - Símbolo de certificación profesional */}
                  <g transform="translate(10, 20)">
                    {/* Escudo de certificación */}
                    <path d="M20 5 L35 5 Q40 5 40 10 L40 40 Q40 50 30 55 L20 60 L10 55 Q0 50 0 40 L0 10 Q0 5 5 5 Z" 
                          fill="url(#certiprofGrad)" opacity="0.9" />
                    
                    {/* Checkmark de verificación */}
                    <path d="M10 30 L17 37 L30 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <animate attributeName="stroke-dasharray" values="0,20;20,0;0,20" dur="3s" repeatCount="indefinite" />
                    </path>
                    
                    {/* Elementos decorativos */}
                    <circle cx="5" cy="15" r="2" fill="#f472b6" opacity="0.6">
                      <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="35" cy="20" r="1.5" fill="#f9a8d4" opacity="0.7">
                      <animate attributeName="r" values="1.5;2.5;1.5" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                  </g>
                  
                  {/* Texto CERTI */}
                  <text x="60" y="45" fill="#ffffff" fontSize="20" fontWeight="bold" fontFamily="Arial, sans-serif">
                    CERTI
                  </text>
                  
                  {/* Texto PROF */}
                  <text x="130" y="45" fill="url(#certiprofGrad)" fontSize="20" fontWeight="bold" fontFamily="Arial, sans-serif">
                    PROF
                  </text>
                  
                  {/* Subtítulo */}
                  <text x="60" y="65" fill="#f472b6" fontSize="12" fontWeight="400" fontFamily="Arial, sans-serif">
                    Professional Certification
                  </text>
                  
                  {/* Elementos de conexión - representan la red global */}
                  <g transform="translate(180, 30)" opacity="0.6">
                    <circle cx="15" cy="15" r="8" fill="none" stroke="#f472b6" strokeWidth="2">
                      <animate attributeName="stroke-dasharray" values="0,50;25,25;50,0;25,25;0,50" dur="4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="15" cy="15" r="3" fill="#ec4899" />
                    
                    {/* Nodos conectados */}
                    <circle cx="5" cy="5" r="2" fill="#f472b6" />
                    <circle cx="25" cy="8" r="2" fill="#f472b6" />
                    <circle cx="8" cy="25" r="2" fill="#f472b6" />
                    
                    {/* Líneas de conexión */}
                    <line x1="15" y1="15" x2="5" y2="5" stroke="#f9a8d4" strokeWidth="1" opacity="0.5" />
                    <line x1="15" y1="15" x2="25" y2="8" stroke="#f9a8d4" strokeWidth="1" opacity="0.5" />
                    <line x1="15" y1="15" x2="8" y2="25" stroke="#f9a8d4" strokeWidth="1" opacity="0.5" />
                  </g>
                  
                  {/* Partículas flotantes */}
                  <circle cx="200" cy="20" r="1" fill="#f472b6" opacity="0.5">
                    <animate attributeName="cy" values="20;80;20" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.1;0.5" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="210" cy="35" r="1.5" fill="#ec4899" opacity="0.4">
                    <animate attributeName="cy" values="35;70;35" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '8px',
                textAlign: 'center'
              }}>CertiProf</h3>
              <p style={{
                fontSize: '14px',
                color: '#cbd5e1',
                textAlign: 'center',
                marginBottom: '12px'
              }}>Certificaciones Profesionales Ágiles</p>
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <span style={{
                  padding: '6px 16px',
                  background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.2), rgba(244, 114, 182, 0.15))',
                  border: '1px solid rgba(236, 72, 153, 0.3)',
                  color: '#f472b6',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)'
                }}>Scrum</span>
                <span style={{
                  padding: '6px 16px',
                  background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.2), rgba(244, 114, 182, 0.15))',
                  border: '1px solid rgba(236, 72, 153, 0.3)',
                  color: '#f472b6',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)'
                }}>Agile</span>
                <span style={{
                  padding: '6px 16px',
                  background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.2), rgba(244, 114, 182, 0.15))',
                  border: '1px solid rgba(236, 72, 153, 0.3)',
                  color: '#f472b6',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)'
                }}>DevOps</span>
              </div>
            </a>
          </div>

          {/* Sección de estadísticas */}
          <div style={{
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            borderRadius: '24px',
            padding: '40px',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '36px', fontWeight: '900', marginBottom: '8px' }}>4</div>
                <div style={{ fontSize: '16px', opacity: '0.9' }}>Partners Oficiales</div>
              </div>
              <div>
                <div style={{ fontSize: '36px', fontWeight: '900', marginBottom: '8px' }}>50+</div>
                <div style={{ fontSize: '16px', opacity: '0.9' }}>Certificaciones Disponibles</div>
              </div>
              <div>
                <div style={{ fontSize: '36px', fontWeight: '900', marginBottom: '8px' }}>100%</div>
                <div style={{ fontSize: '16px', opacity: '0.9' }}>Reconocimiento Internacional</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
