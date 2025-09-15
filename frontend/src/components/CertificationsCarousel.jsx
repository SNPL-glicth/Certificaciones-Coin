import React, { useState, useEffect } from 'react';
import { certifications } from '../data/certifications';

export default function CertificationsCarousel({ onCta }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % certifications.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certifications.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + certifications.length) % certifications.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="hero-carousel">
      <div 
        className="hero-carousel-bg"
        style={{
          backgroundImage: `url(${certifications[currentIndex].image})`,
        }}
      />
      <div className="hero-carousel-overlay"></div>
      
      <div className="hero-carousel-content container">
        <div className="hero-carousel-inner">
          <p className="hero-kicker">ETC IBEROAMERICANA</p>
          <h1 className="hero-title">
            {certifications[currentIndex].title}
            <br />
            <span className="hero-title-accent">de Clase Mundial</span>
          </h1>
          <p className="hero-description">
            {certifications[currentIndex].description}
          </p>
          <div className="hero-actions">
            <button className="btn-hero primary" onClick={onCta}>
              Explorar Catálogo
            </button>
            <button className="btn-hero secondary">
              Ver Becas Disponibles
            </button>
          </div>
        </div>
      </div>
      
      <button className="carousel-btn carousel-btn-prev" onClick={prevSlide}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      
      <button className="carousel-btn carousel-btn-next" onClick={nextSlide}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </button>
      
      <div className="carousel-dots">
        {certifications.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
