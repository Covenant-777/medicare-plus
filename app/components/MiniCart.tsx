'use client'
import Link from 'next/link'

export default function MiniCart({ cart, total, count, open, setOpen, removeFromCart }: any) {
  return (
    <div className="relative">
      {/* Cart Button */}
      <button onClick={() => setOpen(!open)}
        className="relative bg-green-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-green-100 transition">
        🛒
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Your Cart ({count})</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              <div className="text-3xl mb-2">🛒</div>
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="max-h-60 overflow-y-auto p-4 flex flex-col gap-3">
                {cart.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-lg flex-shrink-0">💊</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{item.name}</div>
                      <div className="text-xs text-gray-400">x{item.quantity} · KES {item.price * item.quantity}</div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 text-xs">✕</button>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-100">
                <div className="flex justify-between font-bold text-gray-900 mb-3">
                  <span>Total</span>
                  <span>KES {total}</span>
                </div>
                <div className="flex gap-2">
                  <Link href="/cart" onClick={() => setOpen(false)}
                    className="flex-1 border border-green-600 text-green-600 py-2 rounded-xl text-sm font-semibold text-center hover:bg-green-50 transition">
                    View Cart
                  </Link>
                  <Link href="/checkout" onClick={() => setOpen(false)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-xl text-sm font-semibold text-center hover:bg-green-500 transition">
                    Checkout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}