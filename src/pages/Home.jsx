import { Link } from 'react-router-dom'
import { Play, ChevronRight } from 'lucide-react'
import { products, categories } from '../data/products'
import { useCart } from '../context/CartContext'

function AquariumHero() {
  return (
    <div className="relative w-full max-w-sm mx-auto float-anim">
      <div className="absolute inset-0 rounded-full bg-mist-blue opacity-20 blur-3xl scale-110" />
      <div className="relative bg-gradient-to-b from-soft-ice via-white to-mist-blue rounded-[40%_40%_50%_50%/30%_30%_50%_50%] aspect-[4/3] border border-mist-blue/40 overflow-hidden shadow-xl">
        <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-b from-transparent via-mist-blue/20 to-mist-blue/50" />
        <div className="absolute bottom-6 left-6 w-12 h-20 opacity-60">
          <div className="relative">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 bg-gradient-to-t from-green-700 to-green-400 rounded-full"
                style={{ width: `${5 + i * 2}px`, height: `${24 + i * 12}px`, left: `${i * 8}px`, transform: `rotate(${-10 + i * 5}deg)`, transformOrigin: 'bottom' }}
              />
            ))}
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex gap-1 items-end">
            <div className="w-8 h-6 bg-gray-300 rounded-t-full opacity-70" />
            <div className="w-11 h-9 bg-gray-400 rounded-t-full opacity-80" />
            <div className="w-6 h-5 bg-gray-300 rounded-t-full opacity-60" />
          </div>
        </div>
        <div className="absolute bottom-6 right-5 w-10 h-16 opacity-50">
          <div className="relative">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 bg-gradient-to-t from-green-600 to-emerald-300 rounded-full"
                style={{ width: `${4 + i}px`, height: `${16 + i * 10}px`, right: `${i * 6}px`, transform: `rotate(${5 - i * 3}deg)`, transformOrigin: 'bottom' }}
              />
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-white to-transparent opacity-40" />
        {[15, 45, 70].map((left, i) => (
          <div key={i} className="absolute w-1.5 h-1.5 rounded-full border border-white/60" style={{ left: `${left}%`, bottom: `${25 + i * 14}%`, animation: `float ${2 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }} />
        ))}
      </div>
      <div className="relative mt-3 mx-8 h-8 bg-gradient-to-b from-mist-blue/30 to-transparent rounded-b-full blur-sm" />
    </div>
  )
}

function CategoryIcon({ icon, label, id }) {
  return (
    <Link to={`/shop?category=${id}`} className="flex flex-col items-center gap-2 group flex-shrink-0">
      <div className="w-11 h-11 rounded-full bg-soft-ice flex items-center justify-center text-lg group-hover:bg-mist-blue transition-colors duration-200 border border-transparent group-hover:border-mist-blue">
        {icon}
      </div>
      <span className="font-montserrat font-medium text-[8px] tracking-widest text-navy text-center whitespace-nowrap" style={{ letterSpacing: '0.12em' }}>
        {label.toUpperCase()}
      </span>
    </Link>
  )
}

function ProductCard({ product }) {
  const { addItem } = useCart()
  return (
    <div className="product-card flex flex-col group">
      <Link to={`/product/${product.slug}`} className="block">
        <div className={`aspect-square bg-gradient-to-br ${product.gradient} flex items-center justify-center relative overflow-hidden`}>
          {product.badge && (
            <span className="absolute top-2 left-2 bg-navy text-white font-montserrat text-[8px] tracking-widest px-2 py-0.5" style={{ letterSpacing: '0.12em' }}>
              {product.badge}
            </span>
          )}
          <div className="w-3/4 h-3/4">
            <MiniTank category={product.category} />
          </div>
          <button
            className="absolute bottom-2 right-2 w-7 h-7 bg-white border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:border-navy"
            onClick={e => { e.preventDefault(); addItem({ id: product.id, name: product.name, price: product.price, slug: product.slug }) }}
          >
            <span className="text-navy text-sm leading-none">+</span>
          </button>
        </div>
      </Link>
      <div className="p-3">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-montserrat font-medium text-xs text-navy hover:text-mist-blue transition-colors leading-snug">{product.name}</h3>
        </Link>
        <p className="font-inter text-xs text-navy mt-1">${product.price.toFixed(2)}</p>
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
      <path d="M10 55 C30 45, 50 60, 70 50 C90 40, 100 55, 110 50 L110 85 Q110 85 102 85 L18 85 Q10 85 10 85 Z" fill={c.to} opacity="0.6" />
      <rect x="10" y="83" width="100" height="2" rx="1" fill={c.accent} opacity="0.3" />
    </svg>
  )
}

export default function Home() {
  const featured = products.filter(p => p.featured).slice(0, 4)

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-white via-soft-ice to-white pt-20 pb-12 md:pb-0 md:min-h-[88vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left */}
            <div className="order-2 lg:order-1">
              <p className="section-label mb-3 fade-up fade-up-delay-1">SMALL ECOSYSTEMS</p>
              <h1 className="font-montserrat font-light leading-none mb-2 fade-up fade-up-delay-1" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', letterSpacing: '-0.01em' }}>
                <span className="text-navy block">ENDLESS</span>
                <span className="text-mist-blue block">PEACE</span>
              </h1>
              <p className="font-inter font-light text-gray-500 text-sm leading-relaxed mt-4 mb-6 max-w-xs fade-up fade-up-delay-2">
                Bring nature into stillness.<br />Premium aquascapes for modern living.
              </p>
              <div className="flex flex-wrap gap-3 fade-up fade-up-delay-3">
                <Link to="/shop" className="btn-primary">SHOP AQUARIUMS →</Link>
                <Link to="/ecosystems" className="btn-outline">BUILD ECOSYSTEM</Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 mt-8 fade-up fade-up-delay-4">
                <div className="flex -space-x-2">
                  {['#B7D6E5', '#EAF4F8', '#0D2742', '#8ba8be'].map((c, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white" style={{ background: c }} />
                  ))}
                </div>
                <div>
                  <p className="font-montserrat font-medium text-[11px] text-navy">
                    TRUSTED BY <span className="text-mist-blue">10K+</span> CUSTOMERS
                  </p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-[10px]">★</span>)}
                    <span className="font-inter text-[10px] text-gray-400 ml-1">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="order-1 lg:order-2 relative">
              <AquariumHero />
              <button className="absolute bottom-2 right-2 flex items-center gap-2 group">
                <div className="w-7 h-7 rounded-full border border-navy flex items-center justify-center group-hover:bg-navy transition-colors">
                  <Play size={9} fill="currentColor" className="text-navy group-hover:text-white" />
                </div>
                <span className="font-montserrat text-[8px] tracking-widest text-navy hidden sm:block" style={{ letterSpacing: '0.2em' }}>WATCH THE CALM</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 md:py-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-start justify-start overflow-x-auto gap-5 md:gap-6 pb-2 md:justify-between scrollbar-hide">
            {categories.map(cat => (
              <CategoryIcon key={cat.id} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <p className="section-label mb-1">FEATURED</p>
              <h2 className="font-montserrat font-light text-xl md:text-2xl text-navy" style={{ letterSpacing: '0.08em' }}>CURATED FOR YOU</h2>
            </div>
            <Link to="/shop" className="nav-link flex items-center gap-1 text-[10px]">
              VIEW ALL <ChevronRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Ecosystem Banner */}
      <section className="py-10 md:py-14 bg-soft-ice">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="section-label mb-3">ECOSYSTEM BUILDER</p>
              <h2 className="font-montserrat font-light text-xl md:text-2xl lg:text-3xl text-navy leading-snug mb-4" style={{ letterSpacing: '0.04em' }}>
                BUILD YOUR PERFECT WORLD
              </h2>
              <p className="font-inter text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
                Choose your tank, hardscape, plants, and livestock. Our guided builder creates a living ecosystem that thrives.
              </p>
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                {['Tank', 'Hardscape', 'Plants', 'Livestock', 'Equipment'].map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full border border-navy flex items-center justify-center">
                      <span className="font-montserrat text-[8px] text-navy">{i + 1}</span>
                    </div>
                    <span className="font-montserrat text-[9px] tracking-widest text-navy hidden sm:block" style={{ letterSpacing: '0.1em' }}>{step.toUpperCase()}</span>
                    {i < 4 && <div className="w-3 h-px bg-mist-blue hidden sm:block" />}
                  </div>
                ))}
              </div>
              <Link to="/ecosystems" className="btn-primary">START BUILDING →</Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Choose Tank', icon: '🪟', desc: '4 sizes available' },
                { label: 'Add Hardscape', icon: '🪨', desc: 'Stone & driftwood' },
                { label: 'Plant it', icon: '🌿', desc: '30+ species' },
                { label: 'Add Life', icon: '🐟', desc: 'Curated livestock' },
              ].map((s, i) => (
                <div key={i} className="bg-white p-4 border border-gray-100 hover:border-mist-blue transition-colors">
                  <span className="text-xl mb-2 block">{s.icon}</span>
                  <h4 className="font-montserrat font-medium text-[10px] text-navy mb-0.5" style={{ letterSpacing: '0.08em' }}>{s.label.toUpperCase()}</h4>
                  <p className="font-inter text-xs text-gray-400">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Teaser */}
      <section className="py-10 md:py-14 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="font-montserrat text-[10px] tracking-widest text-mist-blue mb-3" style={{ letterSpacing: '0.3em' }}>AQUACARE</p>
              <h2 className="font-montserrat font-light text-xl md:text-2xl lg:text-3xl text-white leading-snug mb-4" style={{ letterSpacing: '0.04em' }}>
                WE TAKE CARE OF YOUR ECOSYSTEM
              </h2>
              <p className="font-inter text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
                Professional maintenance, healthy plants & fish, crystal clear water — from $29/month.
              </p>
              <ul className="space-y-2 mb-6">
                {['Professional maintenance', 'Healthy plants & fish', 'Crystal clear water', 'Priority support'].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-mist-blue text-xs">✓</span>
                    <span className="font-inter text-sm text-gray-300">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/subscription" className="inline-block border border-white text-white font-montserrat text-xs tracking-widest px-5 py-2.5 hover:bg-white hover:text-navy transition-all" style={{ letterSpacing: '0.15em' }}>
                VIEW PLANS →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Essential', price: 29, popular: false },
                { name: 'Nature Care', price: 59, popular: true },
                { name: 'Elite', price: 99, popular: false },
              ].map(plan => (
                <div key={plan.name} className={`p-4 border text-center ${plan.popular ? 'border-mist-blue bg-white/5' : 'border-white/20'}`}>
                  {plan.popular && <p className="font-montserrat text-[7px] text-mist-blue tracking-widest mb-1" style={{ letterSpacing: '0.15em' }}>POPULAR</p>}
                  <h4 className="font-montserrat font-light text-[9px] text-white mb-2 leading-snug" style={{ letterSpacing: '0.08em' }}>{plan.name.toUpperCase()}</h4>
                  <p className="font-montserrat font-light text-2xl text-white">${plan.price}<span className="text-xs text-gray-400 font-inter">/mo</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* More Products */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <p className="section-label mb-1">SHOP ALL</p>
              <h2 className="font-montserrat font-light text-xl md:text-2xl text-navy" style={{ letterSpacing: '0.08em' }}>MORE TO EXPLORE</h2>
            </div>
            <Link to="/shop" className="nav-link flex items-center gap-1 text-[10px]">
              VIEW ALL <ChevronRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {products.filter(p => !p.featured).slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

    </div>
  )
}
