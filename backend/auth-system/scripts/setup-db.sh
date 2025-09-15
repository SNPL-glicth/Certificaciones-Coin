#!/bin/bash

# Script para inicializar la base de datos MySQL
echo "Inicializando base de datos MySQL para Auth System..."

# Verificar si MySQL está instalado y corriendo
if ! command -v mysql &> /dev/null; then
    echo "ERROR: MySQL no está instalado"
    echo "Instalar con: sudo apt-get install mysql-server"
    exit 1
fi

if ! systemctl is-active --quiet mysql; then
    echo "ERROR: MySQL no está corriendo"
    echo "Iniciar con: sudo systemctl start mysql"
    exit 1
fi

# Pedir credenciales de root de MySQL
echo "Ingrese la contraseña de root de MySQL:"
read -s MYSQL_ROOT_PASSWORD

# Ejecutar script SQL
mysql -u root -p"$MYSQL_ROOT_PASSWORD" < "$(dirname "$0")/init-database.sql"

if [ $? -eq 0 ]; then
    echo "✅ Base de datos inicializada correctamente"
    echo ""
    echo "Credenciales de la aplicación:"
    echo "Host: localhost"
    echo "Database: auth_system_dev"
    echo "Username: auth_user"
    echo "Password: auth_password_dev"
    echo ""
    echo "Usuario de prueba:"
    echo "Email: prueba@gmail.com"
    echo "Password: 123456"
else
    echo "❌ Error al inicializar la base de datos"
    exit 1
fi