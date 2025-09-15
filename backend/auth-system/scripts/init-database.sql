-- Crear base de datos de desarrollo
CREATE DATABASE IF NOT EXISTS auth_system_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear usuario para la aplicación
CREATE USER IF NOT EXISTS 'auth_user'@'localhost' IDENTIFIED BY 'auth_password_dev';
CREATE USER IF NOT EXISTS 'auth_user'@'%' IDENTIFIED BY 'auth_password_dev';

-- Otorgar permisos
GRANT ALL PRIVILEGES ON auth_system_dev.* TO 'auth_user'@'localhost';
GRANT ALL PRIVILEGES ON auth_system_dev.* TO 'auth_user'@'%';

-- Aplicar cambios
FLUSH PRIVILEGES;

-- Usar la base de datos
USE auth_system_dev;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    isActive BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_active (isActive)
);

-- Crear tabla de sesiones
CREATE TABLE IF NOT EXISTS session (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token TEXT NOT NULL,
    userId INT NOT NULL,
    ipAddress VARCHAR(45),
    userAgent TEXT,
    isActive BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastActivity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expiresAt TIMESTAMP NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE,
    INDEX idx_token (token(255)),
    INDEX idx_user_active (userId, isActive),
    INDEX idx_expires (expiresAt)
);

-- Insertar usuario de prueba (contraseña hasheada para '123456')
INSERT INTO user (email, password, firstName, lastName) 
VALUES ('prueba@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Usuario', 'Prueba')
ON DUPLICATE KEY UPDATE 
firstName = VALUES(firstName),
lastName = VALUES(lastName);