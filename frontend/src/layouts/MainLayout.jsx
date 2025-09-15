import React from 'react'
import Navbar from '../components/Navbar'

export default function MainLayout({ children, onToggleTheme }){
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'white', color: 'black' }}>
      <Navbar onToggleTheme={onToggleTheme} />
      <main style={{ flex: 1, paddingTop: '72px' }}>
        {children}
      </main>
      <footer style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Elementos decorativos de fondo */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '256px',
            height: '256px',
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '192px',
            height: '192px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}></div>
        </div>
        
        <div style={{
          position: 'relative',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '64px 24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '48px'
          }}>
            {/* Logo y descripción */}
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #f97316, #ea580c)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}></div>
                <span style={{ fontSize: '24px', fontWeight: '900' }}>COIN Certificaciones</span>
              </div>
              <p style={{
                color: '#d1d5db',
                lineHeight: '1.6',
                marginBottom: '24px',
                fontSize: '18px'
              }}>
                Tu aliado estratégico para alcanzar la excelencia profesional y empresarial a través de certificaciones internacionales de prestigio global.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <svg style={{ width: '16px', height: '16px', color: '#4ade80' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>Partners Oficiales</span>
                </div>
              </div>
              
              {/* Redes Sociales */}
              <div>
                <h5 style={{ 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  marginBottom: '16px', 
                  color: '#fb923c',
                  textAlign: 'left' 
                }}>Síguenos</h5>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px' 
                }}>
                  {/* Facebook */}
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px',
                      height: '44px',
                      background: 'rgba(24, 119, 242, 0.15)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(24, 119, 242, 0.2)',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(24, 119, 242, 0.25)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(24, 119, 242, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(24, 119, 242, 0.15)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <svg style={{ width: '20px', height: '20px', color: '#1877f2' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  
                  {/* Instagram */}
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px',
                      height: '44px',
                      background: 'rgba(225, 48, 108, 0.15)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(225, 48, 108, 0.2)',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(225, 48, 108, 0.25)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(225, 48, 108, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(225, 48, 108, 0.15)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <svg style={{ width: '20px', height: '20px', color: '#e1306c' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  
                  {/* LinkedIn */}
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px',
                      height: '44px',
                      background: 'rgba(0, 119, 181, 0.15)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(0, 119, 181, 0.2)',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 119, 181, 0.25)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 119, 181, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 119, 181, 0.15)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <svg style={{ width: '20px', height: '20px', color: '#0077b5' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  
                  {/* WhatsApp */}
                  <a 
                    href="https://wa.me/573108640631" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px',
                      height: '44px',
                      background: 'rgba(37, 211, 102, 0.15)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(37, 211, 102, 0.2)',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(37, 211, 102, 0.25)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(37, 211, 102, 0.15)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <svg style={{ width: '20px', height: '20px', color: '#25d366' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                    </svg>
                  </a>
                  
                  {/* YouTube */}
                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px',
                      height: '44px',
                      background: 'rgba(255, 0, 0, 0.15)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(255, 0, 0, 0.2)',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 0, 0, 0.25)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 0, 0, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 0, 0, 0.15)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <svg style={{ width: '20px', height: '20px', color: '#ff0000' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  
                  {/* Twitter/X */}
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px',
                      height: '44px',
                      background: 'rgba(0, 0, 0, 0.15)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.25)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.15)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <svg style={{ width: '18px', height: '18px', color: '#ffffff' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Navegación rápida */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', color: '#fb923c' }}>Enlaces Rápidos</h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="/" style={{
                  display: 'block',
                  color: '#d1d5db',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }} onMouseOver={(e) => {
                  e.target.style.color = '#fb923c';
                  e.target.style.transform = 'translateX(8px)';
                }} onMouseOut={(e) => {
                  e.target.style.color = '#d1d5db';
                  e.target.style.transform = 'translateX(0)';
                }}>Inicio</a>
                <a href="/catalogo" style={{
                  display: 'block',
                  color: '#d1d5db',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }} onMouseOver={(e) => {
                  e.target.style.color = '#fb923c';
                  e.target.style.transform = 'translateX(8px)';
                }} onMouseOut={(e) => {
                  e.target.style.color = '#d1d5db';
                  e.target.style.transform = 'translateX(0)';
                }}>Catálogo</a>
                <a href="/becas" style={{
                  display: 'block',
                  color: '#d1d5db',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }} onMouseOver={(e) => {
                  e.target.style.color = '#fb923c';
                  e.target.style.transform = 'translateX(8px)';
                }} onMouseOut={(e) => {
                  e.target.style.color = '#d1d5db';
                  e.target.style.transform = 'translateX(0)';
                }}>Becas</a>
                <a href="/contacto" style={{
                  display: 'block',
                  color: '#d1d5db',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }} onMouseOver={(e) => {
                  e.target.style.color = '#fb923c';
                  e.target.style.transform = 'translateX(8px)';
                }} onMouseOut={(e) => {
                  e.target.style.color = '#d1d5db';
                  e.target.style.transform = 'translateX(0)';
                }}>Contacto</a>
              </nav>
            </div>
            
            {/* Información de contacto */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px', color: '#fb923c' }}>Certificaciones</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#d1d5db' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg style={{ width: '16px', height: '16px', color: '#fb923c' }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span style={{ fontSize: '14px' }}>Cisco Systems</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg style={{ width: '16px', height: '16px', color: '#fb923c' }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span style={{ fontSize: '14px' }}>Microsoft Certiport</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg style={{ width: '16px', height: '16px', color: '#fb923c' }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span style={{ fontSize: '14px' }}>ETC Iberoamericana</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Línea divisoria */}
          <div style={{
            marginTop: '48px',
            paddingTop: '32px',
            borderTop: '1px solid #4b5563'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '4px' }}>
                  © {new Date().getFullYear()} Nexus International Corporation S.A.S (COIN)
                </div>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                  Desarrollando profesionales del futuro con estándares internacionales
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Hecho con</span>
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: 'linear-gradient(45deg, #f97316, #dc2626)',
                  borderRadius: '50%'
                }}></div>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>para profesionales ambiciosos</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
