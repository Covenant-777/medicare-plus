'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Checkout() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', payment: 'mpesa'
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
    }, 2000)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
          <p className="text-gray-500 mb-2">Thank you {form.name}!</p>
          <p className="text-gray-500 mb-6">Your order has been received. We'll send a confirmation to {form.email}</p>
          <Link href="/products" className="block bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-500 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-green-700 font-bold text-xl">MediCare+</Link>
        <Link href="/cart" className="text-green-600 font-medium text-sm">← Back to Cart</Link>
      </nav>

      <div className="pt-24 px-8 max-w-4xl mx-auto pb-20">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          {/* Left - Details */}
          <div className="flex flex-col gap-6">
            {/* Personal Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Personal Information</h2>
              <div className="flex flex-col gap-4">
                <input placeholder="Full name" required value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 text-gray-900" />
                <input placeholder="Email address" type="email" required value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 text-gray-900" />
                <input placeholder="Phone number (e.g. 0712345678)" required value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 text-gray-900" />
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Delivery Address</h2>
              <div className="flex flex-col gap-4">
                <input placeholder="Street address" required value={form.address}
                  onChange={e => setForm({...form, address: e.target.value})}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 text-gray-900" />
                <input placeholder="City / Town" required value={form.city}
                  onChange={e => setForm({...form, city: e.target.value})}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 text-gray-900" />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Payment Method</h2>
              <div className="flex flex-col gap-3">
                {[
                  {id:'mpesa', label:'M-Pesa', icon:'📱'},
                  {id:'card', label:'Credit / Debit Card', icon:'💳'},
                  {id:'cash', label:'Cash on Delivery', icon:'💵'},
                ].map(p => (
                  <label key={p.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                    form.payment === p.id ? 'border-green-500 bg-green-50' : 'border-gray-100'
                  }`}>
                    <input type="radio" name="payment" value={p.id}
                      checked={form.payment === p.id}
                      onChange={e => setForm({...form, payment: e.target.value})}
                      className="accent-green-600" />
                    <span className="text-xl">{p.icon}</span>
                    <span className="font-medium text-gray-900 text-sm">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="flex flex-col gap-3 mb-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Paracetamol 500mg x1</span>
                  <span>KES 150</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Vitamin C 1000mg x2</span>
                  <span>KES 1,700</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery fee</span>
                  <span>KES 200</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span>KES 2,050</span>
              </div>

              {form.payment === 'mpesa' && (
                <div className="bg-green-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-green-700 font-semibold mb-1">M-Pesa Payment</p>
                  <p className="text-xs text-green-600">You will receive an M-Pesa prompt on your phone after placing the order.</p>
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-500 transition disabled:opacity-50">
                {loading ? 'Placing Order...' : 'Place Order →'}
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                🔒 Your information is secure and encrypted
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}