import React from 'react'
import { useCart } from '../contexts/CartContext'
import { fmtCOP } from '../utils/format'
import { useNavigate } from 'react-router-dom'

export default function CartPage() {
  const cart = useCart()
  const nav = useNavigate()

  // Estado vacío con diseño OffSec
  if (!cart.items.length) {
    return (
      <main style={{
        minHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        color: 'white',
        padding: '32px 16px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Efectos de fondo */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
          `
        }}></div>
        
        <div style={{ maxWidth: '512px', margin: '0 auto', position: 'relative' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '48px',
            textAlign: 'center'
          }}>
            {/* Icono del carrito vacío */}
            <div style={{
              position: 'relative',
              width: '128px',
              height: '128px',
              margin: '0 auto 32px'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.3), rgba(234, 88, 12, 0.3))',
                borderRadius: '50%',
                animation: 'pulse 2s ease-in-out infinite'
              }}></div>
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                right: '16px',
                bottom: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg style={{ width: '56px', height: '56px', color: '#fb923c' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px'
            }}>Tu carrito está vacío</h1>
            <p style={{
              color: '#cbd5e1',
              marginBottom: '40px',
              fontSize: '18px',
              lineHeight: '1.6'
            }}>
              ¡Descubre nuestras certificaciones y da el siguiente paso en tu carrera profesional!
            </p>
            
            <a 
              href="/catalogo"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: 'linear-gradient(45deg, #f97316, #ea580c)',
                color: 'white',
                padding: '16px 40px',
                borderRadius: '16px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px -5px rgba(249, 115, 22, 0.3)',
                fontWeight: '600',
                fontSize: '18px',
                border: '1px solid rgba(249, 115, 22, 0.2)'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'linear-gradient(45deg, #ea580c, #dc2626)';
                e.target.style.boxShadow = '0 15px 40px -5px rgba(249, 115, 22, 0.4)';
                e.target.style.transform = 'translateY(-2px) scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'linear-gradient(45deg, #f97316, #ea580c)';
                e.target.style.boxShadow = '0 10px 30px -5px rgba(249, 115, 22, 0.3)';
                e.target.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Explorar Certificaciones
            </a>
          </div>
        </div>
      </main>
    )
  }

  const taxes = 0
  const total = cart.subtotal + taxes

  return (
    <main style={{
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      minHeight: '100vh',
      color: 'white',
      paddingTop: '28px',
      paddingBottom: '40px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Efectos de fondo */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
        `
      }}></div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '12px 24px',
            background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.2), rgba(234, 88, 12, 0.15))',
            border: '1px solid rgba(249, 115, 22, 0.3)',
            borderRadius: '30px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#fb923c',
            marginBottom: '24px',
            backdropFilter: 'blur(20px)'
          }}>
            <svg style={{ width: '16px', height: '16px', marginRight: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Carrito de Compras
          </div>
          
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 48px)',
            fontWeight: '900',
            marginBottom: '16px',
            lineHeight: '1.1'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Tu Carrito de</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Certificaciones</span>
          </h1>
          
          <p style={{
            color: '#cbd5e1',
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Revisa tus certificaciones seleccionadas antes de proceder al checkout
          </p>
        </div>
        
        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:'32px'}}>
          {/* Items del carrito */}
          <div style={{display:'flex', flexDirection:'column', gap:'24px'}}>
            {cart.items.map(item => (
              <div key={item.id} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '24px',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}>
                {/* Efecto de brillo sutil */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
                }}></div>
                
                <div style={{display:'flex', alignItems:'center', gap:'24px'}}>
                  {/* Información del producto */}
                  <div style={{flex:1}}>
                    <h3 style={{fontSize:'20px', fontWeight:'bold', color:'#ffffff', marginBottom:'8px'}}>{item.title}</h3>
                    <div style={{display:'flex', gap:'8px', marginBottom:'12px'}}>
                      <span style={{
                        padding: '6px 16px',
                        background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.2), rgba(234, 88, 12, 0.15))',
                        border: '1px solid rgba(249, 115, 22, 0.3)',
                        color: '#fb923c',
                        fontSize: '12px',
                        fontWeight: '600',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)'
                      }}>Certificación</span>
                      <span style={{
                        padding: '6px 16px',
                        background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.15))',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        color: '#34d399',
                        fontSize: '12px',
                        fontWeight: '600',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)'
                      }}>Internacional</span>
                    </div>
                    <p style={{
                      fontSize:'24px', 
                      fontWeight:'bold', 
                      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>{fmtCOP.format(item.price)}</p>
                  </div>

                  {/* Controles */}
                  <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
                    <div>
                      <span style={{color:'#cbd5e1', fontWeight:'500', marginRight:'8px'}}>Cantidad:</span>
                      <input 
                        style={{
                          width: '80px',
                          height: '48px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '12px',
                          textAlign: 'center',
                          fontWeight: '600',
                          fontSize: '18px',
                          color: 'white',
                          backdropFilter: 'blur(10px)',
                          outline: 'none'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'rgba(249, 115, 22, 0.5)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                          e.target.style.boxShadow = 'none';
                        }}
                        type="number" 
                        min="1" 
                        max="99" 
                        value={item.qty} 
                        onChange={e => cart.update(item.id, parseInt(e.target.value || '1', 10))} 
                      />
                    </div>
                    
                    <div style={{textAlign:'right'}}>
                      <p style={{fontSize:'14px', color:'#94a3b8', marginBottom: '4px'}}>Subtotal</p>
                      <p style={{fontSize:'20px', fontWeight:'bold', color:'#ffffff'}}>{fmtCOP.format(item.qty * item.price)}</p>
                    </div>

                    <button 
                      style={{
                        padding: '12px',
                        color: '#ef4444',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(10px)'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                        e.target.style.transform = 'scale(1)';
                      }}
                      onClick={() => cart.remove(item.id)}
                      title="Eliminar del carrito"
                    >
                      <svg style={{width:'24px', height:'24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen del pedido */}
          <div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '32px',
              position: 'sticky',
              top: '32px'
            }}>
              {/* Efecto de brillo superior */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)'
              }}></div>
              
              <h2 style={{
                fontSize:'24px', 
                fontWeight:'bold', 
                color:'#ffffff', 
                marginBottom:'24px',
                textAlign: 'center'
              }}>Resumen del Pedido</h2>
              
              <div style={{marginBottom:'32px'}}>
                <div style={{
                  display:'flex', 
                  justifyContent:'space-between', 
                  padding:'16px 0', 
                  borderBottom:'1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{color:'#94a3b8', fontWeight:'500'}}>Subtotal</span>
                  <span style={{fontWeight:'bold', fontSize:'18px', color: '#ffffff'}}>{fmtCOP.format(cart.subtotal)}</span>
                </div>
                
                <div style={{
                  display:'flex', 
                  justifyContent:'space-between', 
                  padding:'16px 0', 
                  borderBottom:'1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{color:'#94a3b8', fontWeight:'500'}}>Impuestos</span>
                  <span style={{fontWeight:'bold', fontSize:'18px', color: '#ffffff'}}>{fmtCOP.format(taxes)}</span>
                </div>
                
                <div style={{
                  display:'flex', 
                  justifyContent:'space-between', 
                  padding:'20px', 
                  background:'linear-gradient(45deg, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.05))', 
                  border: '1px solid rgba(249, 115, 22, 0.2)',
                  borderRadius:'16px', 
                  marginTop:'24px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <span style={{fontSize:'20px', fontWeight:'bold', color:'#ffffff'}}>Total</span>
                  <span style={{
                    fontSize:'24px', 
                    fontWeight:'bold', 
                    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>{fmtCOP.format(total)}</span>
                </div>
              </div>

              <button 
                style={{
                  width: '100%',
                  background: 'linear-gradient(45deg, #f97316, #ea580c)',
                  color: 'white',
                  padding: '18px 24px',
                  borderRadius: '16px',
                  border: '1px solid rgba(249, 115, 22, 0.3)',
                  fontWeight: '600',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  marginBottom: '24px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px -5px rgba(249, 115, 22, 0.3)'
                }}
                onClick={() => nav('/checkout')}
                onMouseOver={(e) => {
                  e.target.style.background = 'linear-gradient(45deg, #ea580c, #dc2626)';
                  e.target.style.transform = 'translateY(-2px) scale(1.02)';
                  e.target.style.boxShadow = '0 15px 40px -5px rgba(249, 115, 22, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'linear-gradient(45deg, #f97316, #ea580c)';
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 10px 30px -5px rgba(249, 115, 22, 0.3)';
                }}
              >
                <svg style={{width:'24px', height:'24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Proceder al Pago
              </button>
              
              <div style={{
                padding: '20px',
                background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(45deg, #10b981, #059669)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg style={{width:'20px', height:'20px', color: 'white'}} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p style={{fontSize:'14px', fontWeight:'600', color:'#34d399', margin:'0 0 4px 0'}}>Certificaciones Internacionales</p>
                    <p style={{fontSize:'12px', color:'#10b981', margin:0}}>Reconocidas mundialmente por la industria</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
