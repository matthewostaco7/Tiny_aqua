import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Heart, RotateCcw, ChevronDown, ChevronRight, MessageCircle } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

function MiniTank({ category, size = 'lg' }) {
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
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="15" y="20" width="170" height="120" rx="12" fill={c.from} stroke={c.accent} strokeWidth="2" opacity="0.9" />
      <path d="M15 90 C45 75, 80 105, 110 88 C140 72, 165 95, 185 85 L185 140 Q185 140 177 140 L23 140 Q15 140 15 140 Z" fill={c.to} opacity="0.7" />
      <path d="M15 105 C45 92, 80 115, 110 102 C140 88, 165 108, 185 100 L185 140 Q185 140 177 140 L23 140 Q15 140 15 140 Z" fill={c.to} opacity="0.5" />
      {/* Decorative plants */}
      <rect x="30" y="100" width="6" height="30" rx="3" fill={c.accent} opacity="0.2" transform="rotate(-5 30 130)" />
      <rect x="40" y="90" width="5" height="40" rx="2.5" fill={c.accent} opacity="0.3" transform="rotate(3 40 130)" />
      <rect x="155" y="95" width="6" height="35" rx="3" fill={c.accent} opacity="0.2" transform="rotate(5 155 130)" />
      {/* Rock */}
      <ellipse cx="100" cy="138" rx="25" ry="8" fill={c.accent} opacity="0.15" />
      <ellipse cx="88" cy="132" rx="12" ry="6" fill={c.accent} opacity="0.2" />
      <ellipse cx="110" cy="134" rx="9" ry="5" fill={c.accent} opacity="0.15" />
      {/* Light beam */}
      <path d="M80 20 L60 80 L140 80 L120 20 Z" fill="white" opacity="0.08" />
    </svg>
  )
}

function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full flex items-center justify-between py-4 font-montserrat font-medium text-xs text-navy tracking-widest text-left"
        style={{ letterSpacing: '0.15em' }}
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-5 font-inter text-sm text-gray-500 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  )
}

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.slug === slug)
  const [qty, setQty] = useState(1)
  const [activeThumb, setActiveThumb] = useState(0)
  const [wishlisted, setWishlisted] = useState(false)
  const { addItem } = useCart()

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-montserrat text-2xl text-navy mb-4">Product not found</h2>
          <Link to="/shop" className="btn-primary">BACK TO SHOP</Link>
        </div>
      </div>
    )
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, slug: product.slug }, qty)
    navigate('/cart')
  }

  return (
    <div className="min-h-screen pt-20 bg-white">

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 py-4 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link to="/" className="font-inter text-xs text-gray-400 hover:text-navy">Home</Link>
          <span className="text-gray-300 text-xs">›</span>
          <Link to="/shop" className="font-inter text-xs text-gray-400 hover:text-navy">Shop</Link>
          <span className="text-gray-300 text-xs">›</span>
          <span className="font-inter text-xs text-navy">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Images */}
          <div>
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-3">
                {[0, 1, 2].map(i => (
                  <button
                    key={i}
                    onClick={() => setActiveThumb(i)}
                    className={`w-16 h-16 border flex items-center justify-center ${activeThumb === i ? 'border-navy' : 'border-gray-100 hover:border-mist-blue'} transition-colors`}
                  >
                    <div className={`w-full h-full bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                      <div className="w-3/4 h-3/4 opacity-80 scale-75">
                        <MiniTank category={product.category} />
                      </div>
                    </div>
                  </button>
                ))}
                {/* 360 view */}
                <button className="w-16 h-16 border border-gray-100 hover:border-mist-blue flex flex-col items-center justify-center gap-1 transition-colors">
                  <RotateCcw size={12} className="text-gray-400" strokeWidth={1.5} />
                  <span className="font-montserrat text-[7px] text-gray-400 tracking-widest">360°</span>
                </button>
              </div>

              {/* Main Image */}
              <div className={`flex-1 aspect-square bg-gradient-to-br ${product.gradient} flex items-center justify-center relative`}>
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-mist-blue text-navy font-montserrat text-[9px] tracking-widest px-3 py-1" style={{ letterSpacing: '0.15em' }}>
                    FEATURED
                  </div>
                )}
                <div className="w-4/5 h-4/5">
                  <MiniTank category={product.category} />
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            {/* Product name */}
            <h1 className="font-montserrat font-medium text-2xl text-navy mb-1" style={{ letterSpacing: '0.05em' }}>
              {product.name}
            </h1>
            <p className="font-inter text-sm text-gray-400 mb-6 leading-relaxed max-w-sm">
              {product.tagline}
            </p>

            {/* Feature icons */}
            <div className="flex gap-6 mb-8">
              {product.features.map((f, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full border border-mist-blue flex items-center justify-center text-xs">
                    {i === 0 ? '◎' : i === 1 ? '🌿' : '⚡'}
                  </div>
                  <span className="font-montserrat text-[8px] text-gray-400 tracking-wider text-center" style={{ letterSpacing: '0.1em' }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-8">
              <span className="font-montserrat font-light text-3xl text-navy">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="font-inter text-base text-gray-300 line-through">${product.originalPrice}</span>
              )}
            </div>

            {/* Qty + Add */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="w-10 text-center font-inter text-sm text-navy">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 text-center"
              >
                ADD TO ECOSYSTEM
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`w-11 h-11 border flex items-center justify-center transition-colors ${wishlisted ? 'border-navy bg-navy text-white' : 'border-gray-200 text-gray-400 hover:border-navy hover:text-navy'}`}
              >
                <Heart size={16} strokeWidth={1.5} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Chat CTA */}
            <div className="flex items-center gap-4 p-4 bg-soft-ice mb-8">
              <div className="flex -space-x-2">
                {['#B7D6E5', '#0D2742'].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white" style={{ background: c }} />
                ))}
              </div>
              <div className="flex-1">
                <p className="font-montserrat font-medium text-xs text-navy" style={{ letterSpacing: '0.1em' }}>NEED HELP CHOOSING?</p>
                <p className="font-inter text-xs text-gray-400">Our experts are here for you.</p>
              </div>
              <button className="flex items-center gap-2 font-montserrat text-[10px] tracking-widest text-navy border-b border-navy pb-0.5" style={{ letterSpacing: '0.15em' }}>
                <MessageCircle size={12} strokeWidth={1.5} />
                CHAT WITH US
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-100">
              <AccordionItem title="DESCRIPTION">
                <p>{product.tagline} Built with premium ultra-clear glass and designed for minimal maintenance, the {product.name} is the perfect starting point for your aquascaping journey.</p>
              </AccordionItem>
              <AccordionItem title="SPECIFICATIONS">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k}>
                      <p className="font-montserrat text-[10px] tracking-widest text-gray-300 uppercase" style={{ letterSpacing: '0.15em' }}>{k}</p>
                      <p className="font-inter text-sm text-navy mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
              </AccordionItem>
              <AccordionItem title="WHAT'S INCLUDED">
                <ul className="space-y-2">
                  {product.whatsIncluded.map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-mist-blue text-xs">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
              <AccordionItem title="SHIPPING & RETURNS">
                <p>Free shipping on orders over $100. Standard delivery 3–5 business days. Express available at checkout.</p>
                <p className="mt-2">30-day returns on all unused items. See our full return policy for details.</p>
              </AccordionItem>
            </div>

          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="section-label mb-2">YOU MAY ALSO LIKE</p>
                <h2 className="font-montserrat font-light text-2xl text-navy" style={{ letterSpacing: '0.1em' }}>RELATED PRODUCTS</h2>
              </div>
              <Link to="/shop" className="nav-link flex items-center gap-2 text-xs">VIEW ALL <ChevronRight size={14} /></Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {related.map(p => (
                <div key={p.id} className="product-card group">
                  <Link to={`/product/${p.slug}`}>
                    <div className={`aspect-square bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                      <div className="w-3/4 h-3/4">
                        <MiniTank category={p.category} />
                      </div>
                    </div>
                  </Link>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <Link to={`/product/${p.slug}`}>
                        <h3 className="font-montserrat font-medium text-sm text-navy hover:text-mist-blue transition-colors">{p.name}</h3>
                      </Link>
                      <p className="font-inter text-sm text-navy mt-1">${p.price}</p>
                    </div>
                    <button
                      onClick={() => addItem({ id: p.id, name: p.name, price: p.price, slug: p.slug })}
                      className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:border-navy hover:bg-navy hover:text-white text-navy transition-all"
                    >
                      <span className="text-sm">+</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
