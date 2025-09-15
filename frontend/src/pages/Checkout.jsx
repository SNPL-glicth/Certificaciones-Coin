import React, { useMemo, useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { fmtCOP } from '../utils/format'
import { createOrder } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Checkout(){
  const cart = useCart()
  const nav = useNavigate()
  const [form, setForm] = useState({nombre:'',correo:'',telefono:'',documento:'',acepta:false,metodo:'tarjeta'})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const can = useMemo(() => cart.items.length && form.nombre && /.+@.+\..+/.test(form.correo) && form.acepta, [cart.items.length, form])
  const total = cart.subtotal

  async function submit(){
    setIsSubmitting(true)
    try {
      const order = await createOrder({ form, items: cart.items, total })
      alert(`¡Pedido confirmado! Código: ${order.id}`)
      cart.clear()
      nav('/')
    } catch (error) {
      console.error('Error al procesar orden:', error)
      alert('Error al procesar la orden. Inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main style={{
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 0 60px'
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
            radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)
          `
        }}></div>
        
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
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
              Checkout Seguro
            </div>
            
            <h1 style={{
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
              }}>Finaliza tu</span>
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Compra</span>
            </h1>
            
            <p style={{
              color: '#cbd5e1',
              fontSize: '18px',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Solo unos pasos más para completar tu pedido y comenzar tu certificación profesional.
            </p>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section style={{ padding: '0 0 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '48px',
            alignItems: 'start'
          }}>
            {/* Formulario */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '40px',
              position: 'relative'
            }}>
              <div style={{
                marginBottom: '32px',
                textAlign: 'center'
              }}>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  marginBottom: '12px'
                }}>Datos del Comprador</h2>
                <p style={{
                  color: '#cbd5e1',
                  fontSize: '16px'
                }}>Completa la información para finalizar tu compra</p>
              </div>
              
              <div style={{ display: 'grid', gap: '24px' }}>
                {/* Nombre */}
                <div>
                  <label 
                    htmlFor="nombre"
                    style={{
                      display: 'block',
                      color: '#f1f5f9',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}
                  >
                    Nombre Completo *
                  </label>
                  <input 
                    type="text"
                    id="nombre"
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    placeholder="Tu nombre completo"
                    required
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(249, 115, 22, 0.5)';
                      e.target.style.boxShadow = '0 0 20px rgba(249, 115, 22, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                {/* Email */}
                <div>
                  <label 
                    htmlFor="correo"
                    style={{
                      display: 'block',
                      color: '#f1f5f9',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}
                  >
                    Correo Electrónico *
                  </label>
                  <input 
                    type="email"
                    id="correo"
                    value={form.correo}
                    onChange={e => setForm({ ...form, correo: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    placeholder="tu@email.com"
                    required
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(249, 115, 22, 0.5)';
                      e.target.style.boxShadow = '0 0 20px rgba(249, 115, 22, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Grid de dos columnas para teléfono y documento */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {/* Teléfono */}
                  <div>
                    <label 
                      htmlFor="telefono"
                      style={{
                        display: 'block',
                        color: '#f1f5f9',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}
                    >
                      Teléfono
                    </label>
                    <input 
                      type="tel"
                      id="telefono"
                      value={form.telefono}
                      onChange={e => setForm({ ...form, telefono: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      placeholder="+57 300 123 4567"
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(249, 115, 22, 0.5)';
                        e.target.style.boxShadow = '0 0 20px rgba(249, 115, 22, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Documento */}
                  <div>
                    <label 
                      htmlFor="documento"
                      style={{
                        display: 'block',
                        color: '#f1f5f9',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}
                    >
                      Documento
                    </label>
                    <input 
                      type="text"
                      id="documento"
                      value={form.documento}
                      onChange={e => setForm({ ...form, documento: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      placeholder="123456789"
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(249, 115, 22, 0.5)';
                        e.target.style.boxShadow = '0 0 20px rgba(249, 115, 22, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
                
                {/* Método de pago */}
                <div>
                  <label 
                    htmlFor="metodo"
                    style={{
                      display: 'block',
                      color: '#f1f5f9',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}
                  >
                    Método de Pago
                  </label>
                  <select
                    id="metodo"
                    value={form.metodo}
                    onChange={e => setForm({ ...form, metodo: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(249, 115, 22, 0.5)';
                      e.target.style.boxShadow = '0 0 20px rgba(249, 115, 22, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                    <option value="pse">PSE</option>
                    <option value="efectivo">Efectivo</option>
                  </select>
                </div>

                {/* Términos y condiciones */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <input
                    type="checkbox"
                    checked={form.acepta}
                    onChange={e => setForm({ ...form, acepta: e.target.checked })}
                    style={{
                      width: '18px',
                      height: '18px',
                      marginTop: '2px',
                      accentColor: '#f97316'
                    }}
                  />
                  <span style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.5' }}>
                    Acepto los{' '}
                    <a 
                      href="/terminos" 
                      target="_blank" 
                      style={{ 
                        color: '#fb923c', 
                        textDecoration: 'underline',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseOver={(e) => e.target.style.color = '#f97316'}
                      onMouseOut={(e) => e.target.style.color = '#fb923c'}
                    >
                      términos y condiciones
                    </a>
                  </span>
                </div>
              </div>
              
              {/* Botones de acción */}
              <div style={{
                display: 'flex',
                gap: '16px',
                marginTop: '32px'
              }}>
                <button 
                  onClick={() => nav('/carrito')}
                  style={{
                    flex: 1,
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Volver al Carrito
                </button>
                
                <button 
                  disabled={!can || isSubmitting}
                  onClick={submit}
                  style={{
                    flex: 2,
                    padding: '16px',
                    background: (!can || isSubmitting) ? 'rgba(107, 114, 128, 0.5)' : 'linear-gradient(45deg, #f97316, #ea580c)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: (!can || isSubmitting) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: (!can || isSubmitting) ? 'none' : '0 10px 25px rgba(249, 115, 22, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    if (!(!can || isSubmitting)) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 15px 35px rgba(249, 115, 22, 0.4)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!(!can || isSubmitting)) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 10px 25px rgba(249, 115, 22, 0.3)';
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Confirmar y Pagar {fmtCOP.format(total)}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Resumen de la compra */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '32px',
              height: 'fit-content',
              position: 'sticky',
              top: '24px'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '24px',
                textAlign: 'center'
              }}>Resumen de la Compra</h3>
              
              {/* Items del carrito */}
              <div style={{ marginBottom: '24px' }}>
                {cart.items.map(item => (
                  <div 
                    key={item.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      marginBottom: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div>
                      <div style={{
                        color: '#ffffff',
                        fontSize: '16px',
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}>
                        {item.qty}× {item.title}
                      </div>
                      <div style={{
                        color: '#94a3b8',
                        fontSize: '14px'
                      }}>
                        {fmtCOP.format(item.price)} c/u
                      </div>
                    </div>
                    <div style={{
                      color: '#fb923c',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}>
                      {fmtCOP.format(item.qty * item.price)}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Total */}
              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '20px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.05))',
                  borderRadius: '12px',
                  border: '1px solid rgba(249, 115, 22, 0.2)'
                }}>
                  <span style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#ffffff'
                  }}>Total:</span>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: '900',
                    color: '#f97316'
                  }}>
                    {fmtCOP.format(total)}
                  </span>
                </div>
              </div>
              
              {/* Aviso de integración */}
              <div style={{
                padding: '16px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <p style={{
                  color: '#60a5fa',
                  fontSize: '13px',
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  💡 <strong>Nota:</strong> Integra tu pasarela de pago (Stripe/PayU/PlaceToPay) en{' '}
                  <code style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    services/api.js
                  </code>{' '}
                  para procesar pagos reales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CSS para animación de spin */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  )
}
