import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authApi';
import './Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initDashboard = async () => {
      try {
        // Verificar si el usuario está autenticado
        if (!authService.isAuthenticated()) {
          navigate('/login');
          return;
        }

        // Obtener datos del usuario
        const storedUserData = authService.getUserData();
        if (storedUserData) {
          setUserData(storedUserData);
        }

        // Opcionalmente, obtener datos actualizados del servidor
        try {
          const currentUserData = await authService.getProfile();
          setUserData(currentUserData);
        } catch (error) {
          console.error('Error al obtener perfil:', error);
          // Si falla, usar los datos almacenados localmente
        }
      } catch (error) {
        console.error('Error en dashboard:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Error durante logout:', error);
      // Incluso si hay error, redirigir al login
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="app-title">Orto-Whave Dashboard</h1>
          <div className="user-info">
            <span className="welcome-text">
              Bienvenido, {userData?.firstName || 'Usuario'}
            </span>
            <button 
              onClick={handleLogout}
              className="logout-button"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* User Profile Card */}
          <div className="profile-card">
            <h2>Información del Usuario</h2>
            <div className="profile-info">
              <div className="info-item">
                <span className="label">ID:</span>
                <span className="value">{userData?.id}</span>
              </div>
              <div className="info-item">
                <span className="label">Email:</span>
                <span className="value">{userData?.email}</span>
              </div>
              <div className="info-item">
                <span className="label">Nombre:</span>
                <span className="value">{userData?.firstName}</span>
              </div>
              <div className="info-item">
                <span className="label">Apellido:</span>
                <span className="value">{userData?.lastName}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <h3>Sistema</h3>
                <p>Funcionando correctamente</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🔐</div>
              <div className="stat-info">
                <h3>Autenticación</h3>
                <p>JWT Token activo</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-info">
                <h3>Estado</h3>
                <p>Conectado</p>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="welcome-card">
            <h2>¡Bienvenido a Orto-Whave!</h2>
            <p>
              Has iniciado sesión exitosamente en el sistema de autenticación escalable. 
              Este dashboard es un ejemplo básico que demuestra la integración entre el 
              frontend en React y el backend en NestJS con autenticación JWT.
            </p>
            <div className="features-list">
              <h3>Características implementadas:</h3>
              <ul>
                <li>✅ Autenticación JWT</li>
                <li>✅ Interceptores automáticos</li>
                <li>✅ Manejo de errores</li>
                <li>✅ Protección de rutas</li>
                <li>✅ Logout automático en token inválido</li>
                <li>✅ Diseño responsivo</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;