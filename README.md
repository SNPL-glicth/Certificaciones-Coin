# 🔐 Sistema de Autenticación Escalable - Orto-Whave

Sistema de autenticación empresarial desarrollado con **NestJS** (backend) y **React** (frontend), implementando las mejores prácticas de seguridad y arquitectura escalable.

## 🚀 Características Principales

### Backend (NestJS + TypeScript)
- ✅ **Autenticación JWT** con refresh tokens
- ✅ **Arquitectura modular** escalable
- ✅ **Base de datos MySQL** con TypeORM
- ✅ **Interceptores automáticos** para logging y seguridad
- ✅ **Rate limiting** configurable por ambiente
- ✅ **Validación robusta** con class-validator
- ✅ **Documentación automática** con Swagger
- ✅ **Logging estructurado** con Winston y rotación
- ✅ **Health checks** para monitoreo
- ✅ **Configuración por ambiente** (dev/staging/prod)
- ✅ **Middleware de seguridad** (Helmet, CORS, Compression)
- ✅ **Manejo de errores** global y estructurado

### Frontend (React)
- ✅ **Interceptores Axios** para JWT automático
- ✅ **Rutas protegidas** con React Router
- ✅ **Logout automático** en token inválido
- ✅ **UI moderna** y responsiva
- ✅ **Manejo de errores** unificado
- ✅ **Dashboard interactivo** post-autenticación

## 📁 Estructura del Proyecto

```
144 - copia- mejorado/
├── backend/auth-system/          # Backend NestJS
│   ├── src/
│   │   ├── auth/                 # Módulo de autenticación
│   │   │   ├── dto/              # DTOs de validación
│   │   │   ├── guards/           # Guards JWT/Local
│   │   │   ├── strategies/       # Estrategias Passport
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── entities/             # Entidades de base de datos
│   │   │   ├── user.entity.ts
│   │   │   └── session.entity.ts
│   │   ├── config/               # Configuración por ambiente
│   │   │   ├── config.schema.ts
│   │   │   └── database.config.ts
│   │   ├── common/               # Servicios compartidos
│   │   │   ├── filters/          # Filtros de excepción
│   │   │   ├── interceptors/     # Interceptores HTTP
│   │   │   ├── middleware/       # Middleware de seguridad
│   │   │   ├── logger/           # Servicio de logging
│   │   │   └── pipes/            # Pipes de validación
│   │   ├── health/               # Health checks
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── scripts/                  # Scripts de base de datos
│   │   ├── init-database.sql
│   │   └── setup-db.sh
│   ├── logs/                     # Archivos de log (generados)
│   ├── .env                      # Variables de entorno
│   ├── .env.development          # Config desarrollo
│   └── .env.production.example   # Config producción (template)
├── frontend/                     # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx     # Dashboard post-login
│   │   │   ├── Dashboard.css
│   │   │   ├── Login.jsx         # Componente login adicional
│   │   │   └── Login.css
│   │   ├── pages/
│   │   │   └── Campus.jsx        # Página principal de login
│   │   ├── services/
│   │   │   └── authApi.js        # API de autenticación
│   │   └── main.jsx              # Enrutamiento principal
└── README.md                     # Este archivo
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- **Node.js** 18+ (recomendado 20+)
- **MySQL** 5.7+ o 8.0+
- **npm** o **yarn**

### 1. Configurar Base de Datos

```bash
# Inicializar base de datos MySQL
cd backend/auth-system
chmod +x scripts/setup-db.sh
./scripts/setup-db.sh
```

El script creará:
- Base de datos: `auth_system_dev`
- Usuario: `auth_user` / Password: `auth_password_dev`
- Usuario de prueba: `prueba@gmail.com` / Password: `123456`

### 2. Configurar Backend

```bash
# Instalar dependencias del backend
cd backend/auth-system
npm install

# Verificar variables de entorno
cp .env.development .env
# Editar .env si es necesario

# Iniciar en modo desarrollo
npm run start:dev
```

El servidor estará disponible en: http://localhost:3000

#### Endpoints principales:
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `GET /auth/profile` - Obtener perfil (requiere JWT)
- `POST /auth/logout` - Cerrar sesión
- `GET /health` - Health check del sistema
- `GET /api/docs` - Documentación Swagger (solo desarrollo)

### 3. Configurar Frontend

```bash
# Instalar dependencias del frontend
cd ../../frontend
npm install

# Iniciar en modo desarrollo
npm run dev
```

La aplicación estará disponible en: http://localhost:5173

## 🔧 Configuración de Ambiente

### Variables de Entorno del Backend

```env
# Desarrollo (.env.development)
NODE_ENV=development
PORT=3000

# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=auth_user
DB_PASSWORD=auth_password_dev
DB_DATABASE=auth_system_dev

# JWT
JWT_SECRET=dev_jwt_secret_key_change_in_production_12345678
JWT_EXPIRATION=24h
JWT_REFRESH_SECRET=dev_refresh_secret_key_change_in_production_87654321
JWT_REFRESH_EXPIRATION=7d

# Seguridad
BCRYPT_SALT_ROUNDS=10
SESSION_EXPIRATION_HOURS=24

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=1000

# CORS
CORS_ORIGIN=http://localhost:3001,http://localhost:5173

# Logging
LOG_LEVEL=debug
```

### Configuración Frontend

El frontend se conecta automáticamente al backend en `http://localhost:3000`. 

Para cambiar la URL de la API, crear un archivo `.env` en el directorio frontend:

```env
REACT_APP_API_URL=http://localhost:3000
```

## 🚀 Uso del Sistema

### 1. Acceso al Login

Visita: http://localhost:5173/campus

**Credenciales de demostración:**
- **Email:** `prueba@gmail.com`
- **Contraseña:** `123456`

### 2. Flujo de Autenticación

1. **Login:** Usuario ingresa credenciales en `/campus`
2. **Validación:** Backend valida credenciales y genera JWT
3. **Almacenamiento:** Token se guarda automáticamente en localStorage
4. **Redirección:** Usuario es redirigido a `/dashboard`
5. **Dashboard:** Muestra información del usuario autenticado

### 3. Características de Seguridad

- **Auto-logout:** Si el token expira o es inválido
- **Interceptores:** Headers JWT agregados automáticamente
- **Rate limiting:** Protección contra ataques de fuerza bruta
- **Validación:** Datos validados en frontend y backend
- **Logging:** Todas las acciones son registradas

## 📊 Monitoreo y Logs

### Health Checks

- **Simple:** `GET /health/simple`
- **Completo:** `GET /health` (incluye estado de base de datos)

### Logs

Los logs se almacenan en `backend/auth-system/logs/`:

```
logs/
├── access-YYYY-MM-DD.log     # Requests HTTP
├── combined-YYYY-MM-DD.log   # Logs generales
├── error-YYYY-MM-DD.log      # Solo errores
├── exceptions-YYYY-MM-DD.log # Excepciones no manejadas
└── rejections-YYYY-MM-DD.log # Promise rejections
```

### Swagger Documentation

En desarrollo: http://localhost:3000/api/docs

## 🔒 Seguridad

### Implementaciones de Seguridad

1. **JWT con expiración configurable**
2. **Bcrypt con salt rounds ajustables**
3. **Rate limiting por IP**
4. **Helmet.js para headers de seguridad**
5. **CORS configurado por ambiente**
6. **Validación estricta de inputs**
7. **Logging de eventos de seguridad**
8. **Sessions tracking con IP y User Agent**

### Configuración de Producción

Para producción, usar el archivo `.env.production.example` como plantilla:

```bash
# Copiar template de producción
cp .env.production.example .env.production

# Editar variables críticas
# - JWT_SECRET (mínimo 256 bits)
# - JWT_REFRESH_SECRET (mínimo 256 bits)
# - DB_PASSWORD (contraseña fuerte)
# - CORS_ORIGIN (dominios específicos)
# - BCRYPT_SALT_ROUNDS=12
```

## 🔧 Desarrollo y Extensión

### Agregar Nuevos Endpoints

1. Crear controller en el módulo correspondiente
2. Agregar decoradores de Swagger
3. Implementar validación con DTOs
4. Agregar logging según sea necesario

### Agregar Nuevas Entidades

1. Crear entidad en `src/entities/`
2. Agregar a `database.config.ts`
3. Crear DTOs correspondientes
4. Implementar CRUD en service/controller

### Escalabilidad

El sistema está diseñado para crecer:

- **Microservicios:** Cada módulo puede extraerse a su propio servicio
- **Base de datos:** Configuración lista para réplicas y clustering
- **Cache:** Redis puede agregarse fácilmente
- **Load Balancing:** Configuración stateless lista para múltiples instancias

## 🐛 Troubleshooting

### Problemas Comunes

#### Error de conexión a MySQL
```bash
# Verificar que MySQL esté corriendo
sudo systemctl status mysql

# Iniciar MySQL si está parado
sudo systemctl start mysql
```

#### Puerto en uso
```bash
# Verificar procesos en puerto 3000
lsof -i :3000

# Cambiar puerto en .env
PORT=3001
```

#### Problemas de permisos en logs
```bash
# Crear directorio de logs
mkdir -p backend/auth-system/logs
chmod 755 backend/auth-system/logs
```

### Logs de Debug

Para ver logs detallados:

```bash
# Backend con logs detallados
cd backend/auth-system
LOG_LEVEL=debug npm run start:dev

# Frontend con logs de red
# Abrir DevTools > Console > Network
```

## 📈 Próximas Mejoras

- [ ] Implementar refresh tokens automáticos
- [ ] Agregar autenticación de dos factores (2FA)
- [ ] Implementar roles y permisos
- [ ] Cache con Redis
- [ ] Tests automatizados
- [ ] CI/CD pipeline
- [ ] Docker containers
- [ ] Métricas con Prometheus
- [ ] Notificaciones de seguridad

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para detalles.

## 👥 Soporte

Para soporte y preguntas:
- Abrir un Issue en el repositorio
- Revisar la documentación en `/api/docs`
- Verificar los logs en `backend/auth-system/logs/`

---

**Desarrollado con ❤️ usando NestJS, React y las mejores prácticas de seguridad empresarial.**