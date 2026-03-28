'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Admin() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [prescriptions, setPrescriptions] = useState([])
  const [activeTab, setActiveTab] = useState('products')
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', stock: '', requires_prescription: false })
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    const { data: p } = await supabase.from('products').select('*')
    const { data: o } = await supabase.from('orders').select('*')
    const { data: rx } = await supabase.from('prescriptions').select('*')
    setProducts(p || [])
    setOrders(o || [])
    setPrescriptions(rx || [])
  }

  const addProduct = async (e) => {
    e.preventDefault()
    setAdding(true)
    await supabase.from('products').insert({
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
      requires_prescription: newProduct.requires_prescription
    })
    setNewProduct({ name: '', description: '', price: '', category: '', stock: '', requires_prescription: false })
    setAdding(false)
    fetchAll()
  }

  const deleteProduct = async (id) => {
    await supabase.from('products').delete().eq('id', id)
    fetchAll()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-green-700 font-bold text-xl">MediCare+ Admin</Link>
        <div className="flex gap-3">
          <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">{products.length} Products</div>
          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">{orders.length} Orders</div>
          <div className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">{prescriptions.length} Prescriptions</div>
        </div>
      </nav>

      <div className="pt-24 px-8 max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {['products', 'orders', 'prescriptions'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full font-semibold text-sm capitalize transition ${
                activeTab === tab ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-green-400'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="flex flex-col gap-6">
            {/* Add Product Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Add New Product</h2>
              <form onSubmit={addProduct} className="grid grid-cols-2 gap-4">
                <input placeholder="Product name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-green-500" required />
                <input placeholder="Category" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-green-500" required />
                <input placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-green-500 col-span-2" required />
                <input placeholder="Price (KES)" type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                  className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-green-500" required />
                <input placeholder="Stock quantity" type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                  className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-green-500" required />
                <label className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                  <input type="checkbox" checked={newProduct.requires_prescription}
                    onChange={e => setNewProduct({...newProduct, requires_prescription: e.target.checked})} />
                  Requires Prescription
                </label>
                <button type="submit" disabled={adding}
                  className="col-span-2 bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-500 transition">
                  {adding ? 'Adding...' : 'Add Product'}
                </button>
              </form>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{p.category}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">KES {p.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{p.stock}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => deleteProduct(p.id)}
                          className="text-red-400 hover:text-red-600 text-sm font-medium">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {orders.length === 0 ? (
              <div className="text-center py-20 text-gray-400">No orders yet</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Order ID</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} className="border-b border-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-500">{o.id.slice(0,8)}...</td>
                      <td className="px-6 py-4 font-semibold text-green-600">KES {o.total}</td>
                      <td className="px-6 py-4">
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">{o.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(o.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {prescriptions.length === 0 ? (
              <div className="text-center py-20 text-gray-400">No prescriptions uploaded yet</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">File</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map(rx => (
                    <tr key={rx.id} className="border-b border-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-500">{rx.id.slice(0,8)}...</td>
                      <td className="px-6 py-4">
                        <a href={rx.file_url} target="_blank" className="text-green-600 text-sm hover:underline">View File</a>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold">{rx.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(rx.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  )
}