import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-green-100 px-8 h-16 flex items-center justify-between">
        <span className="text-green-700 font-bold text-xl">MediCare+</span>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 border border-green-600 text-green-600 rounded-full text-sm hover:bg-green-600 hover:text-white transition">Sign In</Link>
          <Link href="/register" className="px-4 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-500 transition">Register</Link>
        </div>
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 bg-gradient-to-b from-green-50 to-white">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold mb-6">
          Trusted by 50,000+ customers
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Your Health, <span className="text-green-600">Delivered</span></h1>
        <p className="text-gray-500 max-w-lg mb-8 text-lg">Shop prescription and OTC medicines with same-day delivery and licensed pharmacist support.</p>
        <div className="flex gap-4">
          <Link href="/products" className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-500 transition">Shop Now</Link>
          <Link href="/register" className="px-8 py-3 border border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-600 hover:text-white transition">Get Started</Link>
        </div>
      </section>
    </main>
  )
}