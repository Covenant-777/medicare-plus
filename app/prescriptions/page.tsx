'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Prescriptions() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return setError('Please select a file')
    setUploading(true)
    setError('')

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('prescriptions')
      .upload(fileName, file)

    if (uploadError) {
      setError('Upload failed. Please try again.')
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('prescriptions')
      .getPublicUrl(fileName)

    const { error: dbError } = await supabase
      .from('prescriptions')
      .insert({ file_url: urlData.publicUrl, status: 'pending' })

    if (dbError) {
      setError('Failed to save prescription.')
      setUploading(false)
      return
    }

    setSuccess(true)
    setUploading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-green-700 font-bold text-xl">MediCare+</Link>
        <Link href="/cart" className="text-green-600 font-medium text-sm">← Back to Cart</Link>
      </nav>

      <div className="pt-24 px-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Prescription</h1>
        <p className="text-gray-500 mb-8">Upload a clear photo or scan of your prescription. Our pharmacist will verify it within 2 hours.</p>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-green-700 mb-2">Prescription Uploaded!</h2>
            <p className="text-green-600 mb-6">Our pharmacist will review it within 2 hours.</p>
            <Link href="/products" className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-500 transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <form onSubmit={handleUpload} className="flex flex-col gap-6">
              {/* Upload Area */}
              <label className="border-2 border-dashed border-green-200 rounded-2xl p-10 text-center cursor-pointer hover:border-green-400 transition">
                <div className="text-4xl mb-3">📄</div>
                {file ? (
                  <div>
                    <p className="font-semibold text-green-600">{file.name}</p>
                    <p className="text-sm text-gray-400 mt-1">Click to change file</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold text-gray-700">Click to upload prescription</p>
                    <p className="text-sm text-gray-400 mt-1">JPG, PNG or PDF — max 5MB</p>
                  </div>
                )}
                <input type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden"
                  onChange={e => setFile(e.target.files[0])} />
              </label>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button type="submit" disabled={uploading || !file}
                className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-500 transition disabled:opacity-50">
                {uploading ? 'Uploading...' : 'Upload Prescription'}
              </button>
            </form>

            {/* Info */}
            <div className="mt-6 bg-green-50 rounded-xl p-4">
              <p className="text-sm text-green-700 font-semibold mb-2">What happens next?</p>
              <ul className="text-sm text-green-600 flex flex-col gap-1">
                <li>✓ Pharmacist reviews your prescription</li>
                <li>✓ You get notified via email</li>
                <li>✓ Medicine is added to your order</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}