// Aquí irían las llamadas reales (FastAPI/Render/PayU/Stripe/PlaceToPay).
export async function listProducts(){
  const data = await import('../data/products.json')
  return data.default
}
export async function createOrder(payload){
  // Simula una orden
  return { id: 'ORD-' + Math.random().toString(36).slice(2,8).toUpperCase(), ...payload }
}
