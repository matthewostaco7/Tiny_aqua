import { Link } from 'react-router-dom'
import { Play, ChevronRight } from 'lucide-react'
import { products, categories } from '../data/products'
import { useCart } from '../context/CartContext'

function AquariumHero() {
  return (
    <div className="relative w-full max-w-md mx-auto float-anim">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-mist-blue opacity-20 blur-3xl scale-110" />
      {/* Main tank shape */}
      <div className="relative bg-gradient-to-b from-soft-ice via-white to-mist-blue rounded-[40%_40%_50%_50%/30%_30%_50%_50%] aspect-[4/3] border border-mist-blue/40 overflow-hidden shadow-2xl">
        {/* Water layers */}
        <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-b from-transparent via-mist-blue/20 to-mist-blue/50" />
        {/* Plants */}
        <div className="absolute bottom-8 left-8 w-16 h-24 opacity-60">
          <div className="relative">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 bg-gradient-to-t from-green-700 to-green-400 rounded-full"
                style={{
                  width: `${6 + i * 2}px`,
                  height: `${30 + i * 15}px`,
                  left: `${i * 10}px`,
                  transform: `rotate(${-10 + i * 5}deg)`,
                  transformOrigin: 'bottom',
                }}
              />
            ))}
          </div>
        </div>
        {/* Rocks */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex gap-1 items-end">
            <div className="w-10 h-8 bg-gray-300 rounded-t-full opacity-70" />
            <div className="w-14 h-12 bg-gray-400 rounded-t-full opacity-80" />
            <div className="w-8 h-6 bg-gray-300 rounded-t-full opacity-60" />
          </div>
        </div>
        {/* Plants right */}
        <div className="absolute bottom-8 right-6 w-12 h-20 opacity-50">
          <div className="relative">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 bg-gradient-to-t from-green-600 to-emerald-300 rounded-full"
                style={{
                  width: `${5 + i}px`,
                  height: `${20 + i * 12}px`,
                  right: `${i * 8}px`,
                  transform: `rotate(${5 - i * 3}deg)`,
                  transformOrigin: 'bottom',
                }}
              />
            ))}
          </div>
        </div>
        {/* Light beam from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-24 bg-gradient-to-b from-white to-transparent opacity-40" />
        {/* Bubbles */}
        {[15, 35, 60, 75].map((left, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full border border-white/60"
            style={{
              left: `${left}%`,
              bottom: `${20 + i * 12}%`,
              animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
      {/* Water reflection below */}
      <div className="relative mt-4 mx-8 h-12 bg-gradient-to-b from-mist-blue/30 to-transparent rounded-b-full blur-sm" />
    </div>
  )
}

function CategoryIcon({ icon, label, id }) {
  return (
    <Link
      to={`/shop?category=${id}`}
      className="flex flex-col items-center gap-3 group"
    >
      <div className="w-16 h-16 rounded-full bg-soft-ice flex items-center justify-center text-2xl group-hover:bg-mist-blue transition-colors duration-300 border border-transparent group-hover:border-mist-blue">
        {icon}
      </div>
      <span className="font-montserrat font-medium text-[9px] tracking-widest text-navy text-center" style={{ letterSpacing: '0.15em' }}>
        {label.toUpperCase()}
      </span>
    </Link>
  )
}

function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <div className="product-card flex flex-col">
      <Link to={`/product/${product.slug}`} className="block">
        <div className={`aspect-square bg-gradient-to-br ${product.gradient} flex items-center justify-center relative overflow-hidden`}>
          {product.badge && (
            <span className="absolute top-3 left-3 bg-navy text-white font-montserrat text-[9px] tracking-widest px-2 py-1" style={{ letterSpacing: '0.15em' }}>
              {product.badge}
            </span>
          )}
          <div className="w-3/4 h-3/4 relative">
            <MiniTank category={product.category} />
          </div>
          <button
            className="absolute bottom-3 right-3 w-8 h-8 bg-white border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-navy"
            onClick={(e) => { e.preventDefault(); addItem({ id: product.id, name: product.name, price: product.price, slug: product.slug }) }}
          >
            <span className="text-navy text-sm">+</span>
          </button>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-montserrat font-medium text-sm text-navy tracking-wide hover:text-mist-blue transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="font-inter text-sm text-navy mt-1">${product.price.toFixed(2)}</p>
      </div>
    </div>
  )
}

function MiniTank({ category }) {
  const colors = {
    'nano-tanks': { from: '#EAF4F8', to: '#B7D6E5', accent: '#0D2742' },
    'aquascapes': { from: '#e8f5e9', to: '#c8e6c9', accent: '#2e7d32' },
    'plants': { from: '#f1f8e9', to: '#dcedc8', accent: '#558b2f' },
    'hardscape': { from: '#fafafa', to: '#eceff1', accent: '#607d8b' },
    'lighting': { from: '#fff8e1', to: '#fff59d', accent: '#f57f17' },
    'co2-systems': { from: '#e0f7fa', to: '#b2ebf2', accent: '#00838f' },
    'accessories': { from: '#fce4ec', to: '#f8bbd0', accent: '#880e4f' },
    'care-maintenance': { from: '#e8eaf6', to: '#c5cae9', accent: '#283593' },
  }
  const c = colors[category] || colors['nano-tanks']

  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="10" y="15" width="100" height="70" rx="8" fill={c.from} stroke={c.accent} strokeWidth="1.5" opacity="0.8" />
      <path d={`M10 55 C30 45, 50 60, 70 50 C90 40, 100 55, 110 50 L110 85 Q110 85 102 85 L18 85 Q10 85 10 85 Z`} fill={c.to} opacity="0.6" />
      <rect x="10" y="83" width="100" height="2" rx="1" fill={c.accent} opacity="0.3" />
    </svg>
  )
}

export default function Home() {
  const featured = products.filter(p => p.featured).slice(0, 4)

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="min-h-screen bg-gradient-to-br from-white via-soft-ice to-white flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <p className="section-label mb-6 fade-up fade-up-delay-1">SMALL ECOSYSTEMS</p>
              <h1 className="font-montserrat font-light leading-none mb-2 fade-up fade-up-delay-1" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', letterSpacing: '-0.02em' }}>
                <span className="text-navy block">ENDLESS</span>
                <span className="text-mist-blue block">PEACE</span>
              </h1>
              <p className="font-inter font-light text-gray-500 text-base leading-relaxed mt-6 mb-10 max-w-sm fade-up fade-up-delay-2">
                Bring nature into stillness.<br />
                Premium aquascapes for modern living.
              </p>
              <div className="flex flex-wrap gap-4 fade-up fade-up-delay-3">
                <Link to="/shop" className="btn-primary">SHOP AQUARIUMS →</Link>
                <Link to="/ecosystems" className="btn-outline">BUILD YOUR ECOSYSTEM</Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 mt-12 fade-up fade-up-delay-4">
                <div className="flex -space-x-2">
                  {['#B7D6E5', '#EAF4F8', '#0D2742', '#8ba8be'].map((c, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <div>
                  <p className="font-montserrat font-medium text-xs text-navy" style={{ letterSpacing: '0.05em' }}>
                    TRUSTED BY <span className="text-mist-blue">10K+</span> CUSTOMERS
                  </p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">★</span>
                    ))}
                    <span className="font-inter text-xs text-gray-400 ml-1">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Aquarium */}
            <div className="relative">
              <AquariumHero />
              {/* Watch CTA */}
              <button className="absolute bottom-0 right-0 flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full border border-navy flex items-center justify-center group-hover:bg-navy transition-colors">
                  <Play size={10} fill="currentColor" className="text-navy group-hover:text-white" />
                </div>
                <span className="font-montserrat text-[9px] tracking-widest text-navy" style={{ letterSpacing: '0.2em' }}>WATCH THE CALM</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between overflow-x-auto gap-6 pb-2">
            {categories.map(cat => (
              <CategoryIcon key={cat.id} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label mb-2">FEATURED</p>
              <h2 className="font-montserrat font-light text-3xl text-navy" style={{ letterSpacing: '0.1em' }}>
                CURATED FOR YOU
              </h2>
            </div>
            <Link to="/shop" className="nav-link flex items-center gap-2 text-xs">
              VIEW ALL <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Banner */}
      <section className="py-24 bg-soft-ice">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-4">ECOSYSTEM BUILDER</p>
              <h2 className="font-montserrat font-light text-4xl text-navy leading-tight mb-6" style={{ letterSpacing: '0.05em' }}>
                BUILD YOUR<br />PERFECT WORLD
              </h2>
              <p className="font-inter text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
                Choose your tank, hardscape, plants, and livestock. Our guided builder helps you create a living ecosystem that thrives.
              </p>
              <div className="flex items-center gap-3 mb-10">
                {['Tank', 'Hardscape', 'Plants', 'Livestock', 'Equipment'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full border border-navy flex items-center justify-center">
                      <span className="font-montserrat text-[9px] text-navy">{i + 1}</span>
                    </div>
                    <span className="font-montserrat text-[10px] tracking-widest text-navy hidden lg:block" style={{ letterSpacing: '0.1em' }}>
                      {step.toUpperCase()}
                    </span>
                    {i < 4 && <div className="w-4 h-px bg-mist-blue hidden lg:block" />}
                  </div>
                ))}
              </div>
              <Link to="/ecosystems" className="btn-primary">START BUILDING →</Link>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Choose Tank', icon: '🪟', desc: '4 sizes available' },
                  { label: 'Add Hardscape', icon: '🪨', desc: 'Stone, driftwood & more' },
                  { label: 'Plant it', icon: '🌿', desc: '30+ plant species' },
                  { label: 'Add Life', icon: '🐟', desc: 'Curated livestock' },
                ].map((s, i) => (
                  <div key={i} className="bg-white p-5 border border-gray-100 hover:border-mist-blue transition-colors">
                    <span className="text-2xl mb-3 block">{s.icon}</span>
                    <h4 className="font-montserrat font-medium text-xs text-navy mb-1" style={{ letterSpacing: '0.1em' }}>{s.label.toUpperCase()}</h4>
                    <p className="font-inter text-xs text-gray-400">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Teaser */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-montserrat text-[11px] tracking-widest text-mist-blue mb-4" style={{ letterSpacing: '0.3em' }}>AQUACARE</p>
              <h2 className="font-montserrat font-light text-4xl text-white leading-tight mb-6" style={{ letterSpacing: '0.05em' }}>
                WE TAKE CARE OF<br />YOUR ECOSYSTEM
              </h2>
              <p className="font-inter text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                Professional maintenance, healthy plants & fish, crystal clear water, and priority support — from $29/month.
              </p>
              <ul className="space-y-3 mb-10">
                {['Professional maintenance', 'Healthy plants & fish', 'Crystal clear water', 'Priority support'].map(f => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="text-mist-blue text-sm">✓</span>
                    <span className="font-inter text-sm text-gray-300">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/subscription" className="inline-block border border-white text-white font-montserrat text-xs tracking-widest px-6 py-3 hover:bg-white hover:text-navy transition-all" style={{ letterSpacing: '0.15em' }}>
                VIEW PLANS →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'Essential', price: 29, popular: false },
                { name: 'Nature Care', price: 59, popular: true },
                { name: 'Elite', price: 99, popular: false },
              ].map(plan => (
                <div
                  key={plan.name}
                  className={`p-6 border text-center ${plan.popular ? 'border-mist-blue bg-white/5' : 'border-white/20'}`}
                >
                  {plan.popular && (
                    <p className="font-montserrat text-[8px] text-mist-blue tracking-widest mb-2" style={{ letterSpacing: '0.2em' }}>MOST POPULAR</p>
                  )}
                  <h4 className="font-montserrat font-light text-xs text-white mb-3" style={{ letterSpacing: '0.1em' }}>{plan.name.toUpperCase()}</h4>
                  <p className="font-montserrat font-light text-3xl text-white">
                    ${plan.price}
                    <span className="text-sm text-gray-400 font-inter">/mo</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* More Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label mb-2">SHOP ALL</p>
              <h2 className="font-montserrat font-light text-3xl text-navy" style={{ letterSpacing: '0.1em' }}>
                MORE TO EXPLORE
              </h2>
            </div>
            <Link to="/shop" className="nav-link flex items-center gap-2 text-xs">
              VIEW ALL <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.filter(p => !p.featured).slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
