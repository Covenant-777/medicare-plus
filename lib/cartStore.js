import { useState, useEffect } from 'react'

export function useCart() {
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) {
        return prev.map(p => p.id === product.id ? {...p, quantity: p.quantity + 1} : p)
      }
      return [...prev, {...product, quantity: 1}]
    })
    setOpen(true)
    setTimeout(() => setOpen(false), 3000)
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)

  return { cart, addToCart, removeFromCart, total, count, open, setOpen }
}