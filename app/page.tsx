import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafaf7]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-green-100 px-8 h-[70px] flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl text-green-700" style={{fontFamily:'Georgia, serif'}}>
          MediCare<span className="text-green-400">+</span>
        </Link>
        <div className="hidden md:flex gap-8">
          {['Products','Prescriptions','Health Blog','About','Contact'].map(item => (
            <Link key={item} href={`/${item.toLowerCase().replace(' ','-')}`}
              className="text-gray-500 hover:text-green-700 text-sm font-medium transition">{item}</Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="px-4 py-2 border border-green-600 text-green-600 rounded-full text-sm font-medium hover:bg-green-600 hover:text-white transition">Sign In</Link>
          <Link href="/register" className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-500 transition">Register</Link>
          <Link href="/cart" className="relative bg-green-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-green-100 transition">
            🛒
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center px-8 md:px-[5vw] pt-[70px]">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Trusted by 50,000+ customers
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4" style={{fontFamily:'Georgia, serif'}}>
              Your Health,<br/><span className="text-green-600">Delivered</span><br/>to Your Door
            </h1>
            <p className="text-gray-500 text-lg max-w-lg mb-8 leading-relaxed">
              Shop prescription and over-the-counter medicines, vitamins, and wellness products — with same-day delivery and licensed pharmacist support.
            </p>

            {/* Search */}
            <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden mb-8 max-w-lg">
              <input type="text" placeholder="Search medicines, vitamins, supplements…"
                className="flex-1 px-5 py-4 text-sm outline-none text-gray-700" />
              <Link href="/products" className="bg-green-600 text-white px-6 flex items-center gap-2 font-semibold text-sm hover:bg-green-500 transition">
                🔍 Search
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {[['10K+','Products Available'],['98%','Satisfaction Rate'],['24/7','Pharmacist Support']].map(([num, label]) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-gray-900" style={{fontFamily:'Georgia, serif'}}>{num}</div>
                  <div className="text-xs text-gray-400 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Card */}
          <div className="hidden md:flex justify-center relative">
            <div className="absolute -top-4 -left-8 bg-white rounded-2xl px-5 py-3 shadow-lg flex items-center gap-2 text-sm font-medium animate-bounce">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Free Delivery on KES 2,000+
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl w-72">
              <div className="flex justify-between items-center mb-6">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-3xl">💊</div>
                <span className="bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">20% OFF</span>
              </div>
              <div className="font-bold text-gray-900 mb-1">Vitamin C 1000mg</div>
              <div className="text-sm text-gray-400 mb-4">Immune Support · 60 Tablets</div>
              <div className="text-2xl font-bold text-green-600 mb-4" style={{fontFamily:'Georgia, serif'}}>
                KES 850 <del className="text-sm text-gray-300 font-normal">KES 1,060</del>
              </div>
              <Link href="/products" className="block w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-green-500 transition text-sm">
                Add to Cart
              </Link>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-5 py-3 shadow-lg flex items-center gap-2 text-sm font-medium">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              Rx Verified ✓
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-8 md:px-[5vw] py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">Browse by Category</div>
              <h2 className="text-3xl font-bold text-gray-900" style={{fontFamily:'Georgia, serif'}}>Shop by Health Need</h2>
            </div>
            <Link href="/products" className="text-green-600 font-semibold text-sm hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              {icon:'❤️', name:'Heart Health', count:'142'},
              {icon:'💊', name:'Vitamins', count:'318'},
              {icon:'🛡️', name:'Immunity', count:'87'},
              {icon:'📋', name:'Prescription', count:'506'},
              {icon:'😴', name:'Sleep & Stress', count:'63'},
              {icon:'⚡', name:'Supplements', count:'229'},
            ].map(cat => (
              <Link href="/products" key={cat.name}
                className="bg-white rounded-2xl p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all border-2 border-transparent hover:border-green-100">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <div className="font-semibold text-sm text-gray-900">{cat.name}</div>
                <div className="text-xs text-gray-400 mt-1">{cat.count} products</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FLASH SALE BANNER */}
      <section className="px-8 md:px-[5vw] pb-20">
        <div className="max-w-7xl mx-auto bg-green-700 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">⚡ Flash Sale</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3" style={{fontFamily:'Georgia, serif'}}>
              Up to 40% Off<br/>Wellness Essentials
            </h2>
            <p className="text-green-200 max-w-md">Stock up on your favourite health products before the offer ends.</p>
          </div>
          <Link href="/products" className="bg-white text-green-700 px-8 py-4 rounded-full font-bold hover:scale-105 transition whitespace-nowrap">
            Shop the Sale →
          </Link>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-gray-900 px-8 md:px-[5vw] py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-2">Why Choose Us</div>
          <h2 className="text-3xl font-bold text-white mb-12" style={{fontFamily:'Georgia, serif'}}>Healthcare You Can Trust</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {icon:'🛡️', title:'Licensed Pharmacists', desc:'Every order reviewed by certified pharmacists before dispatch.'},
              {icon:'🚀', title:'Same-Day Delivery', desc:'Order before 2 PM and receive your medicines the same day.'},
              {icon:'📞', title:'24/7 Support', desc:'Chat or call our pharmacist team any time of day or night.'},
              {icon:'💳', title:'Secure Payments', desc:'Pay via M-Pesa, card, or insurance with 256-bit SSL security.'},
            ].map(f => (
              <div key={f.title} className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition">
                <div className="text-3xl mb-4">{f.icon}</div>
                <div className="font-bold text-white mb-2">{f.title}</div>
                <div className="text-sm text-white/50 leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 border-t border-white/10 px-8 md:px-[5vw] py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-xl text-green-400" style={{fontFamily:'Georgia, serif'}}>MediCare+</div>
          <p className="text-white/30 text-sm">© 2026 MediCare Plus. Licensed by PPB Kenya.</p>
          <div className="flex gap-4 text-white/40 text-sm">
            <Link href="#" className="hover:text-white transition">Privacy</Link>
            <Link href="#" className="hover:text-white transition">Terms</Link>
            <Link href="#" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}