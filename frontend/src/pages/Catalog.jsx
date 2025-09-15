import React, { useEffect, useMemo, useState } from 'react'
import { listProducts } from '../services/api'
import ProductCard from '../components/ProductCard'

export default function Catalog(){
  const [raw, setRaw] = useState([])
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('todas')

  useEffect(() => { listProducts().then(setRaw) }, [])

  const categories = useMemo(() => ['todas', ...Array.from(new Set(raw.map(x=>x.category)))], [raw])

  const data = useMemo(() => {
    let d = raw
    if (cat !== 'todas') d = d.filter(x => x.category === cat)
    if (query.trim()) {
      const q = query.toLowerCase()
      d = d.filter(x => x.title.toLowerCase().includes(q) || x.vendor.toLowerCase().includes(q))
    }
    return d
  }, [raw, query, cat])

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
          backgroundImage: 'url("https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1920&h=1080&fit=crop&crop=center")',
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
            radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
          `,
          zIndex: 2
        }}></div>
        
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 3 }}>
          {/* Header */}
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
              color: '#f97316',
              marginBottom: '24px',
              backdropFilter: 'saturate(180%)'
            }}>
              <svg style={{ width: '16px', height: '16px', marginRight: '8px' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Catálogo Premium
            </div>
            
            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: '900',
              marginBottom: '24px',
              lineHeight: '1.1',
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              Certificaciones
              <br />
              <span style={{
                color: '#f97316'
              }}>Internacionales</span>
            </h1>
            
            <p style={{
              color: '#ffffff',
              fontSize: '20px',
              maxWidth: '600px',
              margin: '0 auto 40px',
              lineHeight: '1.6',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}>
              Explora nuestro catálogo completo de certificaciones de élite y encuentra la que impulsará tu carrera al siguiente nivel.
            </p>
          </div>
          
          {/* Filtros modernos */}
          <div style={{
            display: 'flex',
            gap: '20px',
            maxWidth: '800px',
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {/* Búscador */}
            <div style={{ flex: '1', minWidth: '300px', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'saturate(150%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                placeholder="Buscar certificación o proveedor..."
                value={query}
                onChange={e => setQuery(e.target.value)}
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
            
            {/* Selector de categoría */}
            <div style={{ minWidth: '200px' }}>
              <select 
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'saturate(150%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 12px center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '16px',
                  transition: 'all 0.3s ease'
                }}
                value={cat}
                onChange={e => setCat(e.target.value)}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(249, 115, 22, 0.5)';
                  e.target.style.boxShadow = '0 0 20px rgba(249, 115, 22, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {categories.map(c => (
                  <option key={c} value={c} style={{ background: '#1a1a2e', color: 'white' }}>
                    {c === 'todas' ? 'Todas las categorías' : c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Resultados */}
      <section style={{ padding: '40px 0 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          {data.length > 0 ? (
            <>
              {/* Stats */}
              <div style={{
                textAlign: 'center',
                marginBottom: '48px',
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '24px'
              }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: '900', color: '#f97316' }}>{data.length}</div>
                  <div style={{ fontSize: '14px', color: '#cbd5e1' }}>Certificaciones Disponibles</div>
                </div>
                <div style={{ width: '1px', height: '40px', background: 'rgba(255, 255, 255, 0.2)' }}></div>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: '900', color: '#10b981' }}>{categories.length - 1}</div>
                  <div style={{ fontSize: '14px', color: '#cbd5e1' }}>Categorías Activas</div>
                </div>
              </div>
              
              {/* Grid de productos */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px'
              }}>
                {data.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '80px 24px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'rgba(249, 115, 22, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                <svg style={{ width: '40px', height: '40px', color: '#f97316' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.236 0-4.236-.643-5.657-1.754M6 20a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>
                No se encontraron resultados
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '16px' }}>
                No hay certificaciones que coincidan con los filtros seleccionados. Intenta ajustar tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
