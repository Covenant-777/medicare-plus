'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import MiniCart from '../components/MiniCart'
import { useCart } from '@/lib/cartStore'

const categoryImages: any = {
  'Pain Relief': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop',
  'Vitamins': 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&h=200&fit=crop',
  'Antibiotics': 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&h=200&fit=crop',
  'Supplements': 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=300&h=200&fit=crop',
  'default': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop',
}

export default function Products() {
  const [products, setProducts] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const { cart, addToCart, removeFromCart, total, count, open, setOpen } = useCart()

  const categories = ['All', 'Vitamins', 'Pain Relief', 'Antibiotics', 'Supplements', 'Skin Care']

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*')
    setProducts(data || [])
    setLoading(false)
  }

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || p.category === category
    return matchSearch && matchCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-green-700 font-bold text-xl">MediCare+</Link>
        <div className="flex items-center gap-4">
          <Link href="/login" className="px-4 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-500 transition">Account</Link>
          <MiniCart cart={cart} total={total} count={count} open={open} setOpen={setOpen} removeFromCart={removeFromCart} />
        </div>
      </nav>

      <div className="pt-24 px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search medicines, vitamins..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-lg border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 text-gray-900"
          />
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === cat ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-green-400'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading products...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-2">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                <img
                  src={categoryImages[product.category] || categoryImages['default']}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <div className="text-xs font-semibold text-green-600 uppercase mb-1">{product.category}</div>
                  <div className="font-semibold text-gray-900 mb-1">{product.name}</div>
                  <div className="text-sm text-gray-400 mb-3">{product.description}</div>
                  {product.requires_prescription && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Rx Required</span>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-gray-900">KES {product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-500 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}