'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  const categories = ['All', 'Vitamins', 'Pain Relief', 'Antibiotics', 'Supplements', 'Skin Care']

  useEffect(() => {
    fetchProducts()
  }, [])

const fetchProducts = async () => {
  const { data, error } = await supabase.from('products').select('*')
  console.log('products:', data, 'error:', error)
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
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-green-700 font-bold text-xl">MediCare+</Link>
        <div className="flex gap-4">
          <Link href="/cart" className="px-4 py-2 border border-green-600 text-green-600 rounded-full text-sm hover:bg-green-600 hover:text-white transition">Cart</Link>
          <Link href="/login" className="px-4 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-500 transition">Account</Link>
        </div>
      </nav>

      <div className="pt-24 px-8 max-w-7xl mx-auto">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search medicines, vitamins..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-lg border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === cat
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-green-400'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
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
              <div key={product.id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                <div className="h-32 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-4xl">💊</span>
                </div>
                <div className="text-xs font-semibold text-green-600 uppercase mb-1">{product.category}</div>
                <div className="font-semibold text-gray-900 mb-1">{product.name}</div>
                <div className="text-sm text-gray-400 mb-3">{product.description}</div>
                {product.requires_prescription && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Rx Required</span>
                )}
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-gray-900">KES {product.price}</span>
                  <button className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-500 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}