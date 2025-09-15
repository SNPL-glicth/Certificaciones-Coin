# COIN Commerce (Empresarial)

Plataforma empresarial para venta de **certificaciones internacionales** con:
- **Hero carrusel** full-bleed (autoplay, dots, progress bar)
- **Catálogo** con búsqueda y filtro
- **Carrito** con contexto global y persistencia (localStorage)
- **Checkout** simulado, listo para conectar a pasarela
- **Rutas** (react-router-dom) y **layout** corporativo
- **Tema** claro/oscuro

## Requisitos
- Node.js 18+ (recomendado 20)
- npm

## Ejecutar
```bash
npm install
npm run dev
```

## Estructura
```txt
coin-commerce/
├─ index.html
├─ package.json
├─ vite.config.js
└─ src/
   ├─ assets/
   │  └─ banners/ (banners hero)
   ├─ components/
   │  ├─ HeroCarousel.jsx
   │  ├─ Navbar.jsx
   │  └─ ProductCard.jsx
   ├─ contexts/
   │  └─ CartContext.jsx
   ├─ hooks/
   │  └─ useLocalStorage.js
   ├─ layouts/
   │  └─ MainLayout.jsx
   ├─ pages/
   │  ├─ Home.jsx
   │  ├─ Catalog.jsx
   │  ├─ CartPage.jsx
   │  ├─ Checkout.jsx
   │  ├─ Campus.jsx
   │  ├─ Becas.jsx
   │  └─ Contact.jsx
   ├─ services/
   │  └─ api.js
   ├─ utils/
   │  └─ format.js
   ├─ data/
   │  └─ products.json
   ├─ styles.css
   └─ main.jsx
```

## Integración de pagos
- Conecta tu pasarela en `services/api.js`.
- Ejemplo: Stripe/PayU/PlaceToPay (crea la orden, redirige al checkout, y confirma webhook).

## Personalización
- Cambia el catálogo en `src/data/products.json`.
- Coloca banners en `src/assets/banners/` y apunta con `imageUrl`.
- Ajusta colores de marca en `:root` (`styles.css`).
- Activa tema oscuro con el botón en el navbar.

Generado el 2025-08-24.
# Certificaciones-Coin
