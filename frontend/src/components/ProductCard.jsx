import React, { useMemo, useCallback } from 'react'
import { fmtCOP } from '../utils/format'
import { useCart } from '../contexts/CartContext'

function ProductCard({ product }){
  const cart = useCart()
  
  // Memoizar colores de categoría para evitar recálculos
  const categoryColors = useMemo(() => {
    const colors = {
      'Agile': { bg: 'rgba(16, 185, 129, 0.2)', border: 'rgba(16, 185, 129, 0.3)', text: '#34d399' },
      'IT Service': { bg: 'rgba(59, 130, 246, 0.2)', border: 'rgba(59, 130, 246, 0.3)', text: '#60a5fa' },
      'Quality': { bg: 'rgba(147, 51, 234, 0.2)', border: 'rgba(147, 51, 234, 0.3)', text: '#a78bfa' },
      'Cloud': { bg: 'rgba(6, 182, 212, 0.2)', border: 'rgba(6, 182, 212, 0.3)', text: '#22d3ee' },
      'Developer': { bg: 'rgba(236, 72, 153, 0.2)', border: 'rgba(236, 72, 153, 0.3)', text: '#f472b6' },
      'Default': { bg: 'rgba(249, 115, 22, 0.2)', border: 'rgba(249, 115, 22, 0.3)', text: '#fb923c' }
    }
    return colors[product.category] || colors['Default']
  }, [product.category])
  
  // Memoizar precio formateado
  const formattedPrice = useMemo(() => fmtCOP.format(product.price), [product.price])
  
  // Callback para agregar al carrito
  const handleAddToCart = useCallback(() => {
    cart.add(product)
  }, [cart, product])
  
  return (
    <article style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '24px',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
      e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
      e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.3)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      e.currentTarget.style.boxShadow = 'none';
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
      
      <div>
        <div style={{ marginBottom: '16px' }}>
          <span style={{
            display: 'inline-block',
            padding: '6px 16px',
            background: categoryColors.bg,
            border: `1px solid ${categoryColors.border}`,
            color: categoryColors.text,
            fontSize: '12px',
            fontWeight: '600',
            borderRadius: '20px',
            marginBottom: '12px',
            backdropFilter: 'blur(10px)'
          }}>
            {product.category}
          </span>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '8px',
            color: '#ffffff',
            lineHeight: '1.3'
          }}>{product.title}</h3>
          <p style={{
            fontSize: '14px',
            color: '#a78bfa',
            marginBottom: '12px',
            fontWeight: '500'
          }}>{product.vendor}</p>
        </div>
        
        <p style={{
          color: '#cbd5e1',
          marginBottom: '20px',
          lineHeight: '1.6',
          fontSize: '14px'
        }}>{product.description}</p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div>
            <span style={{
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>{formattedPrice}</span>
            <div style={{
              fontSize: '12px',
              color: '#94a3b8'
            }}>Precio final</div>
          </div>
          <button 
            onClick={handleAddToCart}
            style={{
              background: 'linear-gradient(45deg, #f97316, #ea580c)',
              color: 'white',
              padding: '14px 28px',
              borderRadius: '12px',
              fontWeight: '600',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 20px -5px rgba(249, 115, 22, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'linear-gradient(45deg, #ea580c, #dc2626)';
              e.target.style.transform = 'translateY(-2px) scale(1.02)';
              e.target.style.boxShadow = '0 8px 30px -5px rgba(249, 115, 22, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'linear-gradient(45deg, #f97316, #ea580c)';
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 4px 20px -5px rgba(249, 115, 22, 0.3)';
            }}
          >
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Agregar
          </button>
        </div>
      </div>
      
      {/* Partícula decorativa */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '8px',
        height: '8px',
        background: categoryColors.text,
        borderRadius: '50%',
        opacity: '0.6'
      }}></div>
    </article>
  )
}

// Exportar con React.memo para evitar re-renders innecesarios
export default React.memo(ProductCard)
