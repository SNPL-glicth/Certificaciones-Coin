import React, { useState } from 'react';
import '../styles.css';

// Datos de becas disponibles
const becasData = [
  {
    id: 1,
    title: 'Scrum Master Professional',
    provider: 'CertiProf',
    category: 'Metodologías Ágiles',
    duration: '3 meses',
    level: 'Intermedio',
    spots: '15 cupos',
    color: '#10b981',
    benefits: ['Material completo', 'Voucher examen', 'Mentorías 1:1'],
    icon: 'scrum'
  },
  {
    id: 2,
    title: 'ITIL® 4 Foundation',
    provider: 'AXELOS',
    category: 'Gestión de Servicios TI',
    duration: '4 meses',
    level: 'Básico-Intermedio',
    spots: '20 cupos',
    color: '#3b82f6',
    benefits: ['Certificación oficial', 'Labs prácticos', 'Soporte 24/7'],
    icon: 'itil'
  },
  {
    id: 3,
    title: 'AWS Cloud Practitioner',
    provider: 'Amazon Web Services',
    category: 'Cloud Computing',
    duration: '2 meses',
    level: 'Básico',
    spots: '25 cupos',
    color: '#f59e0b',
    benefits: ['Acceso AWS', 'Proyectos reales', 'Certificado oficial'],
    icon: 'cloud'
  },
  {
    id: 4,
    title: 'Cisco CCNA',
    provider: 'Cisco Systems',
    category: 'Redes y Seguridad',
    duration: '6 meses',
    level: 'Avanzado',
    spots: '12 cupos',
    color: '#06b6d4',
    benefits: ['Laboratorios virtuales', 'Simuladores', 'Voucher examen'],
    icon: 'network'
  },
  {
    id: 5,
    title: 'Microsoft Azure Fundamentals',
    provider: 'Microsoft',
    category: 'Cloud Platform',
    duration: '3 meses',
    level: 'Básico-Intermedio',
    spots: '18 cupos',
    color: '#8b5cf6',
    benefits: ['Suscripción Azure', 'Proyectos guiados', 'Certificación oficial'],
    icon: 'azure'
  },
  {
    id: 6,
    title: 'Project Management (PMP)',
    provider: 'PMI',
    category: 'Gestión de Proyectos',
    duration: '5 meses',
    level: 'Avanzado',
    spots: '10 cupos',
    color: '#ec4899',
    benefits: ['35 PDUs', 'Simuladores de examen', 'Coaching personalizado'],
    icon: 'project'
  }
];

// Componente de iconos SVG profesionales
const IconSVG = ({ type, color }) => {
  const icons = {
    scrum: (
      <svg viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="20" r="15" stroke={color} strokeWidth="3" fill="none" />
        <circle cx="50" cy="50" r="15" stroke={color} strokeWidth="3" fill="none" />
        <circle cx="50" cy="80" r="15" stroke={color} strokeWidth="3" fill="none" />
        <path d="M50 35L50 65" stroke={color} strokeWidth="3" />
        <path d="M35 50L65 50" stroke={color} strokeWidth="3" />
        <circle cx="50" cy="50" r="3" fill={color} />
      </svg>
    ),
    itil: (
      <svg viewBox="0 0 100 100" fill="none">
        <rect x="20" y="30" width="60" height="40" stroke={color} strokeWidth="3" fill="none" rx="5" />
        <path d="M30 50L40 60L60 40" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="25" cy="25" r="3" fill={color} />
        <circle cx="75" cy="25" r="3" fill={color} />
        <circle cx="50" cy="15" r="3" fill={color} />
      </svg>
    ),
    cloud: (
      <svg viewBox="0 0 100 100" fill="none">
        <path d="M25 60C15 60 10 50 15 40C20 30 35 25 45 35C50 25 65 25 75 35C85 35 90 45 85 55C80 65 65 65 55 60H25Z" 
              stroke={color} strokeWidth="3" fill="none" />
        <circle cx="35" cy="50" r="2" fill={color} />
        <circle cx="50" cy="45" r="2" fill={color} />
        <circle cx="65" cy="50" r="2" fill={color} />
      </svg>
    ),
    network: (
      <svg viewBox="0 0 100 100" fill="none">
        <circle cx="25" cy="25" r="8" stroke={color} strokeWidth="3" fill="none" />
        <circle cx="75" cy="25" r="8" stroke={color} strokeWidth="3" fill="none" />
        <circle cx="25" cy="75" r="8" stroke={color} strokeWidth="3" fill="none" />
        <circle cx="75" cy="75" r="8" stroke={color} strokeWidth="3" fill="none" />
        <circle cx="50" cy="50" r="8" stroke={color} strokeWidth="3" fill="none" />
        <path d="M33 33L42 42M58 42L67 33M33 67L42 58M67 67L58 58" stroke={color} strokeWidth="2" />
      </svg>
    ),
    azure: (
      <svg viewBox="0 0 100 100" fill="none">
        <path d="M20 70L35 25L65 35L80 70L50 80L20 70Z" stroke={color} strokeWidth="3" fill="none" />
        <circle cx="50" cy="50" r="15" stroke={color} strokeWidth="2" fill="none" />
        <path d="M50 35L50 65M35 50L65 50" stroke={color} strokeWidth="2" />
      </svg>
    ),
    project: (
      <svg viewBox="0 0 100 100" fill="none">
        <rect x="20" y="30" width="60" height="50" stroke={color} strokeWidth="3" fill="none" rx="3" />
        <path d="M30 50L40 60L60 40" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="30" cy="20" r="3" fill={color} />
        <circle cx="50" cy="15" r="3" fill={color} />
        <circle cx="70" cy="20" r="3" fill={color} />
        <path d="M30 23L50 18L70 23" stroke={color} strokeWidth="2" />
      </svg>
    )
  };
  
  return (
    <div style={{ width: '48px', height: '48px' }}>
      {icons[type] || icons.scrum}
    </div>
  );
};

export default function Becas() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBeca, setSelectedBeca] = useState(null);
  
  const categories = ['all', 'Cloud Computing', 'Metodologías Ágiles', 'Gestión de Servicios TI', 'Redes y Seguridad', 'Gestión de Proyectos'];
  
  const filteredBecas = selectedCategory === 'all' 
    ? becasData 
    : becasData.filter(beca => beca.category === selectedCategory);

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
        padding: '100px 0 80px'
      }}>
        {/* Imagen de fondo difuminada */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&h=1080&fit=crop&crop=center")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(3px)',
          transform: 'scale(1.1)',
          zIndex: 0
        }}></div>
        
        {/* Overlay oscuro */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.85) 0%, rgba(26, 26, 46, 0.75) 50%, rgba(22, 33, 62, 0.85) 100%)',
          zIndex: 1
        }}></div>
        
        {/* Efectos de fondo adicionales */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)
          `,
          zIndex: 2
        }}></div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 3 }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 20px',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#10b981',
              marginBottom: '32px',
              backdropFilter: 'saturate(180%) blur(20px)'
            }}>
              <svg style={{ width: '16px', height: '16px', marginRight: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              Programa de Becas 2025
            </div>
            
            <h1 style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: '900',
              marginBottom: '24px',
              lineHeight: '1.1',
              color: '#ffffff',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.6)'
            }}>
              Impulsa tu carrera con{' '}
              <span style={{
                color: '#10b981'
              }}>becas completas</span>
            </h1>
            
            <p style={{
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: '20px',
              maxWidth: '700px',
              margin: '0 auto 40px',
              lineHeight: '1.6',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              Accede a certificaciones internacionales de élite con nuestro programa integral 
              que incluye material, vouchers de examen y mentorías especializadas.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button style={{
                background: 'linear-gradient(45deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
              }}>
                Ver Becas Disponibles
              </button>
              
              <button style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                padding: '14px 28px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
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
              }}>
                ¿Cómo funciona?
              </button>
            </div>
          </div>
          
          {/* Estadísticas rápidas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#10b981', marginBottom: '8px' }}>95%</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Tasa de Aprobación</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#f59e0b', marginBottom: '8px' }}>6</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Certificaciones Disponibles</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#8b5cf6', marginBottom: '8px' }}>24/7</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>Soporte Académico</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Filtros y Becas */}
      <section style={{ padding: '80px 0', position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          {/* Filtros de categorías */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '60px'
          }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: selectedCategory === category 
                    ? 'linear-gradient(45deg, #10b981, #059669)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  color: selectedCategory === category ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  border: selectedCategory === category 
                    ? 'none'
                    : '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.target.style.color = 'white';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                  }
                }}
              >
                {category === 'all' ? 'Todas las Becas' : category}
              </button>
            ))}
          </div>
          
          {/* Grid de Becas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '32px',
            marginBottom: '60px'
          }}>
            {filteredBecas.map((beca) => (
              <div
                key={beca.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = `${beca.color}40`;
                  e.currentTarget.style.boxShadow = `0 20px 40px -10px ${beca.color}20`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => setSelectedBeca(beca)}
              >
                {/* Badge de disponibilidad */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: `${beca.color}20`,
                  color: beca.color,
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: `1px solid ${beca.color}40`
                }}>
                  {beca.spots}
                </div>
                
                {/* Icono y header */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{
                    background: `${beca.color}15`,
                    borderRadius: '12px',
                    padding: '12px',
                    marginRight: '16px',
                    border: `1px solid ${beca.color}30`
                  }}>
                    <IconSVG type={beca.icon} color={beca.color} />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: 'white',
                      marginBottom: '4px'
                    }}>{beca.title}</h3>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '14px',
                      margin: 0
                    }}>{beca.provider}</p>
                  </div>
                </div>
                
                {/* Información del curso */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    display: 'inline-block',
                    background: `${beca.color}10`,
                    color: beca.color,
                    padding: '6px 16px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '16px'
                  }}>
                    {beca.category}
                  </div>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                    marginBottom: '20px'
                  }}>
                    <div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px', marginBottom: '4px' }}>Duración</div>
                      <div style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>{beca.duration}</div>
                    </div>
                    <div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px', marginBottom: '4px' }}>Nivel</div>
                      <div style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>{beca.level}</div>
                    </div>
                  </div>
                </div>
                
                {/* Beneficios */}
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '12px'
                  }}>Incluye:</h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {beca.benefits.map((benefit, index) => (
                      <li key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '14px'
                      }}>
                        <svg style={{ width: '16px', height: '16px', marginRight: '8px', color: beca.color }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Botón de acción */}
                <button style={{
                  width: '100%',
                  background: `linear-gradient(45deg, ${beca.color}, ${beca.color}dd)`,
                  color: 'white',
                  border: 'none',
                  padding: '14px 24px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = `0 8px 20px -5px ${beca.color}50`;
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}>
                  Aplicar a esta Beca
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px'
            }}>Nuestras Certificaciones</h2>
            <p style={{
              color: '#94a3b8',
              fontSize: '18px',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>Ofrecemos una amplia gama de certificaciones para impulsar tu carrera profesional.</p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginTop: '48px'
          }}>
            {/* Certificación ISO 9001 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '32px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}>
              {/* Efecto de brillo superior */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
              }}></div>
              
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(45deg, #9333ea, #7c3aed)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 10px 30px -5px rgba(147, 51, 234, 0.3)'
              }}>
                <svg style={{ width: '36px', height: '36px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '12px'
              }}>ISO 9001</h3>
              <div style={{
                padding: '8px 16px',
                background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(124, 58, 237, 0.15))',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                borderRadius: '20px',
                color: '#a78bfa',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-block'
              }}>Gestión de Calidad</div>
            </div>
            
            {/* Certificación ITIL */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '32px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
              }}></div>
              
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 10px 30px -5px rgba(59, 130, 246, 0.3)'
              }}>
                <svg style={{ width: '36px', height: '36px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '12px'
              }}>ITIL</h3>
              <div style={{
                padding: '8px 16px',
                background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.15))',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '20px',
                color: '#60a5fa',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-block'
              }}>Gestión de Servicios TI</div>
            </div>
            
            {/* Certificación Scrum */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '32px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
              }}></div>
              
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(45deg, #16b981, #059669)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 10px 30px -5px rgba(22, 185, 129, 0.3)'
              }}>
                <svg style={{ width: '36px', height: '36px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '12px'
              }}>Scrum</h3>
              <div style={{
                padding: '8px 16px',
                background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.15))',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '20px',
                color: '#34d399',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-block'
              }}>Metodologías Ágiles</div>
            </div>
            
            {/* Big Data y Data Analytics */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '32px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
              }}></div>
              
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(45deg, #f97316, #ea580c)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 10px 30px -5px rgba(249, 115, 22, 0.3)'
              }}>
                <svg style={{ width: '36px', height: '36px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '12px'
              }}>Big Data y Data Analytics</h3>
              <div style={{
                padding: '8px 16px',
                background: 'linear-gradient(45deg, rgba(249, 115, 22, 0.2), rgba(234, 88, 12, 0.15))',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                borderRadius: '20px',
                color: '#fb923c',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-block'
              }}>Análisis de Datos</div>
            </div>
            
            {/* Desarrollo Full Stack */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '32px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
              }}></div>
              
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 10px 30px -5px rgba(139, 92, 246, 0.3)'
              }}>
                <svg style={{ width: '36px', height: '36px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '12px'
              }}>Desarrollo Front-End, Back-End y Full Stack</h3>
              <div style={{
                padding: '8px 16px',
                background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.15))',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '20px',
                color: '#a78bfa',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-block'
              }}>Desarrollo Web</div>
            </div>
            
            {/* DevOps */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '32px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
              }}></div>
              
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(45deg, #06b6d4, #0891b2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 10px 30px -5px rgba(6, 182, 212, 0.3)'
              }}>
                <svg style={{ width: '36px', height: '36px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '12px'
              }}>DevOps</h3>
              <div style={{
                padding: '8px 16px',
                background: 'linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(8, 145, 178, 0.15))',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '20px',
                color: '#22d3ee',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-block'
              }}>Operaciones y Desarrollo</div>
            </div>
            
            {/* IA y Machine Learning */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '32px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
              }}></div>
              
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(45deg, #ec4899, #db2777)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 10px 30px -5px rgba(236, 72, 153, 0.3)'
              }}>
                <svg style={{ width: '36px', height: '36px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '12px'
              }}>Inteligencia Artificial y Machine Learning</h3>
              <div style={{
                padding: '8px 16px',
                background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.2), rgba(219, 39, 119, 0.15))',
                border: '1px solid rgba(236, 72, 153, 0.3)',
                borderRadius: '20px',
                color: '#f472b6',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-block'
              }}>IA y Machine Learning</div>
            </div>
            
            {/* PMP */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '32px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
              }}></div>
              
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(45deg, #14b8a6, #0d9488)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 10px 30px -5px rgba(20, 184, 166, 0.3)'
              }}>
                <svg style={{ width: '36px', height: '36px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '12px'
              }}>Project Management Professional (PMP)</h3>
              <div style={{
                padding: '8px 16px',
                background: 'linear-gradient(45deg, rgba(20, 184, 166, 0.2), rgba(13, 148, 136, 0.15))',
                border: '1px solid rgba(20, 184, 166, 0.3)',
                borderRadius: '20px',
                color: '#5eead4',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-block'
              }}>Gestión de Proyectos</div>
            </div>
          </div>
        </section>

        {/* Sección: Qué incluye nuestro programa de becas */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px'
            }}>¿Qué incluye nuestro programa de becas?</h2>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '24px'
          }}>
            {/* Beneficio 1: Material de estudio */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
              e.currentTarget.style.transform = 'translateX(8px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(45deg, #16b981, #059669)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: '500' }}>
                Material de estudio y prácticas completos.
              </span>
            </div>
            
            {/* Beneficio 2: Información técnica */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
              e.currentTarget.style.transform = 'translateX(8px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: '500' }}>
                Información técnica y documentación actualizada.
              </span>
            </div>
            
            {/* Beneficio 3: Voucher de examen */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
              e.currentTarget.style.transform = 'translateX(8px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v-4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v.01" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 14v-4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v-2" />
                </svg>
              </div>
              <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: '500' }}>
                Voucher para examen de certificación internacional*.
              </span>
            </div>
            
            {/* Beneficio 4: Certificado */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
              e.currentTarget.style.transform = 'translateX(8px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: '500' }}>
                Certificado de finalización y asistencia al curso.
              </span>
            </div>
            
            {/* Beneficio 5: Simuladores */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
              e.currentTarget.style.transform = 'translateX(8px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(45deg, #06b6d4, #0891b2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                </svg>
              </div>
              <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: '500' }}>
                Simuladores de examen para práctica.
              </span>
            </div>
          </div>
          
          <div style={{
            marginTop: '32px',
            textAlign: 'center'
          }}>
            <p style={{
              color: '#94a3b8',
              fontSize: '14px',
              fontStyle: 'italic'
            }}>*Aplican condiciones y restricciones</p>
          </div>
        </section>

        {/* Sección: A quién va dirigido */}
        <section style={{
          marginBottom: '40px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '48px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
          }}></div>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '24px'
            }}>¿A quién va dirigido?</h2>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{
              color: '#cbd5e1',
              fontSize: '18px',
              lineHeight: '1.7',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              A todos los ciudadanos interesados en adquirir nuevas competencias y certificaciones internacionales en 
              <strong style={{ color: '#f97316' }}> gestión de proyectos</strong>, 
              <strong style={{ color: '#10b981' }}> marcos ágiles</strong>, 
              <strong style={{ color: '#8b5cf6' }}> ciberseguridad</strong> y 
              <strong style={{ color: '#06b6d4' }}> herramientas Oracle</strong>.
            </p>
            
            <div style={{
              marginTop: '32px',
              padding: '24px',
              background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '16px',
              display: 'inline-block'
            }}>
              <p style={{
                color: '#34d399',
                fontSize: '16px',
                fontWeight: '600',
                margin: 0
              }}>No se requieren títulos universitarios ni experiencia laboral previa</p>
            </div>
          </div>
        </section>

        {/* Sección: Cómo postular */}
        <section>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px'
            }}>¿Cómo postular?</h2>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {/* Paso 1 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(45deg, #f97316, #ea580c)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 10px 30px -5px rgba(249, 115, 22, 0.3)'
              }}>
                <span style={{
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>1</span>
              </div>
              <p style={{
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '500',
                margin: 0
              }}>Selecciona un curso de tu interés</p>
            </div>
            
            {/* Paso 2 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(45deg, #16b981, #059669)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 10px 30px -5px rgba(22, 185, 129, 0.3)'
              }}>
                <span style={{
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>2</span>
              </div>
              <p style={{
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '500',
                margin: 0
              }}>Selecciona tu país</p>
            </div>
            
            {/* Paso 3 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 10px 30px -5px rgba(139, 92, 246, 0.3)'
              }}>
                <span style={{
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>3</span>
              </div>
              <p style={{
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '500',
                margin: 0
              }}>Regístrate rellenando el formulario con tus datos</p>
            </div>
            
            {/* Paso 4 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(45deg, #06b6d4, #0891b2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 10px 30px -5px rgba(6, 182, 212, 0.3)'
              }}>
                <span style={{
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>4</span>
              </div>
              <p style={{
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '500',
                margin: 0
              }}>Menciona en el correo electrónico cómo te enteraste del programa</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
