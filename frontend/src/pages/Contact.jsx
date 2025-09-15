import React, { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Número de WhatsApp de la empresa
    const whatsappNumber = '573108640631' // +57 310 864 0631
    
    // Formatear el mensaje para WhatsApp
    const message = `*Nuevo mensaje de contacto desde la web*

` +
                   `*Nombre:* ${formData.name}
` +
                   `*Email:* ${formData.email}
` +
                   `*Teléfono:* ${formData.phone}
` +
                   `*Asunto:* ${formData.subject}

` +
                   `*Mensaje:*
${formData.message}

` +
                   `_Mensaje enviado desde coincertificaciones.com_`
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message)
    
    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    
    setTimeout(() => {
      try {
        // Abrir WhatsApp en una nueva ventana/tab
        window.open(whatsappUrl, '_blank')
        
        // Mostrar mensaje de éxito y limpiar formulario
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } catch (error) {
        console.error('Error al abrir WhatsApp:', error)
        setSubmitStatus('error')
      }
      setIsSubmitting(false)
    }, 1000)
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
        padding: '80px 0 60px'
      }}>
        {/* Efectos de fondo */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 30% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)
          `
        }}></div>
        
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 24px',
              background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(126, 34, 206, 0.15))',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#a78bfa',
              marginBottom: '24px',
              backdropFilter: 'blur(20px)'
            }}>
              <svg style={{ width: '16px', height: '16px', marginRight: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contáctanos
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
              }}>Conecta con</span>
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 50%, #6d28d9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Nuestros Expertos</span>
            </h1>
            
            <p style={{
              color: '#cbd5e1',
              fontSize: '20px',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              ¿Tienes alguna pregunta sobre nuestras certificaciones? Nuestro equipo de expertos está listo para ayudarte.
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
                }}>Envíanos un Mensaje</h2>
                <p style={{
                  color: '#cbd5e1',
                  fontSize: '16px'
                }}>Completa el formulario y serás redirigido a WhatsApp para enviar tu consulta</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gap: '24px' }}>
                  {/* Nombre */}
                  <div>
                    <label 
                      htmlFor="name"
                      style={{
                        display: 'block',
                        color: '#f1f5f9',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}
                    >
                      Nombre Completo
                    </label>
                    <input 
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
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
                        e.target.style.borderColor = 'rgba(147, 51, 234, 0.5)';
                        e.target.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.2)';
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
                      htmlFor="email"
                      style={{
                        display: 'block',
                        color: '#f1f5f9',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}
                    >
                      Correo Electrónico
                    </label>
                    <input 
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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
                        e.target.style.borderColor = 'rgba(147, 51, 234, 0.5)';
                        e.target.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  {/* Teléfono */}
                  <div>
                    <label 
                      htmlFor="phone"
                      style={{
                        display: 'block',
                        color: '#f1f5f9',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}
                    >
                      Número de Teléfono
                    </label>
                    <input 
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
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
                      required
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(147, 51, 234, 0.5)';
                        e.target.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  {/* Asunto */}
                  <div>
                    <label 
                      htmlFor="subject"
                      style={{
                        display: 'block',
                        color: '#f1f5f9',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}
                    >
                      Asunto
                    </label>
                    <input 
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
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
                      placeholder="¿En qué te podemos ayudar?"
                      required
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(147, 51, 234, 0.5)';
                        e.target.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  
                  {/* Mensaje */}
                  <div>
                    <label 
                      htmlFor="message"
                      style={{
                        display: 'block',
                        color: '#f1f5f9',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}
                    >
                      Mensaje
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
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
                        transition: 'all 0.3s ease',
                        resize: 'vertical',
                        minHeight: '120px'
                      }}
                      placeholder="Escribe tu mensaje aquí..."
                      required
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(147, 51, 234, 0.5)';
                        e.target.style.boxShadow = '0 0 20px rgba(147, 51, 234, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }}
                    ></textarea>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '16px',
                    marginTop: '24px',
                    background: isSubmitting ? 'rgba(107, 114, 128, 0.5)' : 'linear-gradient(45deg, #25d366, #128c7e)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: isSubmitting ? 'none' : '0 10px 25px rgba(37, 211, 102, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    if (!isSubmitting) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 15px 35px rgba(37, 211, 102, 0.4)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isSubmitting) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 10px 25px rgba(37, 211, 102, 0.3)';
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                      </svg>
                      Enviar por WhatsApp
                    </>
                  )}
                </button>

                {/* Mensajes de estado */}
                {submitStatus === 'success' && (
                  <div style={{
                    marginTop: '16px',
                    padding: '16px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    color: '#10b981',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    ¡Perfecto! Se ha abierto WhatsApp con tu mensaje. Solo tienes que enviarlo.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div style={{
                    marginTop: '16px',
                    padding: '16px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '12px',
                    color: '#ef4444',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 000 2v4a1 1 0 002 0V7a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.
                  </div>
                )}
              </form>
            </div>

            {/* Columna de Información */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '32px',
              position: 'relative'
            }}>
              {/* Información de contacto */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>Información de Contacto</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    background: 'rgba(147, 51, 234, 0.1)',
                    border: '1px solid rgba(147, 51, 234, 0.2)',
                    borderRadius: '12px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(45deg, #9333ea, #7c3aed)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg style={{ width: '18px', height: '18px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ color: '#a78bfa', fontSize: '14px', fontWeight: '600', margin: 0 }}>Ubicación</p>
                      <p style={{ color: '#cbd5e1', fontSize: '16px', margin: 0 }}>Av. Principal 123, Bogotá, Colombia</p>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '12px'
                  }}>
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
                      <svg style={{ width: '18px', height: '18px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ color: '#34d399', fontSize: '14px', fontWeight: '600', margin: 0 }}>Teléfono</p>
                      <p style={{ color: '#cbd5e1', fontSize: '16px', margin: 0 }}>+57 310 864 0631</p>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    background: 'rgba(249, 115, 22, 0.1)',
                    border: '1px solid rgba(249, 115, 22, 0.2)',
                    borderRadius: '12px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(45deg, #f97316, #ea580c)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <svg style={{ width: '18px', height: '18px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ color: '#fb923c', fontSize: '14px', fontWeight: '600', margin: 0 }}>Email</p>
                      <p style={{ color: '#cbd5e1', fontSize: '16px', margin: 0 }}>contacto@coincertificaciones.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Horarios */}
              <div style={{
                padding: '20px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '16px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#60a5fa', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Horarios de Atención</h4>
                <div style={{ fontSize: '14px', color: '#cbd5e1' }}>
                  <p style={{ margin: '4px 0' }}>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                  <p style={{ margin: '4px 0' }}>Sábados: 9:00 AM - 2:00 PM</p>
                  <p style={{ margin: '4px 0' }}>Domingos: Cerrado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

