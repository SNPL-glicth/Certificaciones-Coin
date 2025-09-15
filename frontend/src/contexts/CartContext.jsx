import React, { createContext, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const CartCtx = createContext(null)
export function CartProvider({ children }){
  const [items, setItems] = useLocalStorage('cart', [])
  const api = useMemo(() => ({
    items,
    add(p){ setItems(prev => {
      const i = prev.findIndex(x => x.id === p.id)
      if (i>=0){ const c = [...prev]; c[i] = { ...c[i], qty: Math.min(99, c[i].qty+1)}; return c }
      return [...prev, { id:p.id, title:p.title, price:p.price, qty:1 }]
    })},
    remove(id){ setItems(prev => prev.filter(x => x.id !== id)) },
    update(id, qty){ setItems(prev => prev.map(x => x.id===id ? { ...x, qty: Math.max(1, Math.min(99, qty)) } : x)) },
    clear(){ setItems([]) },
    count: items.reduce((n,it)=>n+it.qty,0),
    subtotal: items.reduce((s,it)=> s + it.price*it.qty, 0),
  }), [items, setItems])
  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>
}
export function useCart(){ const c = useContext(CartCtx); if(!c) throw new Error('Use within CartProvider'); return c }
