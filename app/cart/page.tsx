'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Cart() {
  const [cart, setCart] = useState([
    { id: 1, name: 'Paracetamol 500mg', price: 150, quantity: 1 },
    { id: 2, name: 'Vitamin C 1000mg', price: 850, quantity: 2 },
  ])

  const updateQty = (id, qty) => {
    if (qty < 1) return removeItem(id)
    setCart(cart.map(item => item.id === id ? { ...item, quantity: qty } : item))
  }

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-green-700 font-bold text-xl">MediCare+</Link>
        <Link href="/products" className="text-green-600 font-medium text-sm">← Continue Shopping</Link>
      </nav>

      <div className="pt-24 px-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">Your cart is empty</p>
            <Link href="/products" className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-500 transition">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cart.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-2xl">💊</div>
                    <div>
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      <div className="text-green-600 font-bold">KES {item.price}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold hover:bg-gray-200">−</button>
                    <span className="font-semibold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold hover:bg-gray-200">+</button>
                    <button onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-600 ml-2 text-sm">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{item.name} x{item.quantity}</span>
                  <span>KES {item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>KES {total}</span>
              </div>
              <Link href="/checkout" className="block mt-6 bg-green-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-green-500 transition">
                Proceed to Checkout
              </Link>
              <Link href="/prescriptions" className="block mt-3 border border-green-600 text-green-600 py-3 rounded-xl font-semibold text-center hover:bg-green-50 transition text-sm">
                Upload Prescription
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}