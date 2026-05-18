import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Grid, List, SlidersHorizontal, X, Plus } from 'lucide-react'
import { products, categories } from '../data/products'
import { useCart } from '../context/CartContext'

function MiniTank({ category }) {
  const colors = {
    'nano-tanks': { from: '#EAF4F8', to: '#B7D6E5', accent: '#0D2742' },
    'aquascapes': { from: '#e8f5e9', to: '#c8e6c9', accent: '#2e7d32' },
    'plants': { from: '#f1f8e9', to: '#dcedc8', accent: '#558b2f' },
    'design': { from: '#fafafa', to: '#eceff1', accent: '#607d8b' },
    'lighting': { from: '#fff8e1', to: '#fff59d', accent: '#f57f17' },
    'co2-systems': { from: '#e0f7fa', to: '#b2ebf2', accent: '#00838f' },
    'accessories': { from: '#fce4ec', to: '#f8bbd0', accent: '#880e4f' },
    'care-maintenance': { from: '#e8eaf6', to: '#c5cae9', accent: '#283593' },
  }
  const c = colors[category] || colors['nano-tanks']
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <rect x="10" y="15" width="100" height="70" rx="8" fill={c.from} stroke={c.accent} strokeWidth="1.5" opacity="0.8" />
      <path d="M10 55 C30 45, 50 60, 70 50 C90 40, 100 55, 110 50 L110 85 Q110 85 102 85 L18 85 Q10 85 10 85 Z" fill={c.to} opacity="0.6" />
      <rect x="10" y="83" width="100" height="2" rx="1" fill={c.accent} opacity="0.3" />
    </svg>
  )
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [priceRange, setPriceRange] = useState(30000)
  const [sortBy, setSortBy] = useState('featured')
  const { addItem } = useCart()

  const activeCategory = searchParams.get('category') || ''

  const setCategory = id => {
    if (id === activeCategory) searchParams.delete('category')
    else searchParams.set('category', id)
    setSearchParams(searchParams)
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (activeCategory) list = list.filter(p => p.category === activeCategory)
    list = list.filter(p => p.price <= priceRange)
    switch (sortBy) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break
      default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    return list
  }, [activeCategory, priceRange, sortBy])

  return (
    <div className="min-h-screen pt-14 lg:pt-16 bg-white">

      {/* Header */}
      <div className="border-b border-gray-100 py-5 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Link to="/" className="font-inter text-[11px] text-gray-400 hover:text-navy">Home</Link>
                <span className="text-gray-300 text-[11px]">›</span>
                <span className="font-inter text-[11px] text-navy">Shop</span>
              </div>
              <h1 className="font-montserrat font-light text-xl md:text-2xl text-navy" style={{ letterSpacing: '0.12em' }}>SHOP ALL</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <span className="font-inter text-xs text-gray-400">Sort by</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="font-inter text-xs text-navy border-b border-gray-200 pb-0.5 focus:outline-none focus:border-navy cursor-pointer bg-transparent">
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low–High</option>
                  <option value="price-desc">Price: High–Low</option>
                  <option value="name">Name</option>
                </select>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => setViewMode('grid')} className={`p-1 ${viewMode === 'grid' ? 'text-navy' : 'text-gray-300'}`}><Grid size={15} strokeWidth={1.5} /></button>
                <button onClick={() => setViewMode('list')} className={`p-1 ${viewMode === 'list' ? 'text-navy' : 'text-gray-300'}`}><List size={15} strokeWidth={1.5} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter bar */}
      <div className="lg:hidden border-b border-gray-100 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(true)} className="flex items-center gap-1.5 font-montserrat text-[10px] tracking-widest text-navy" style={{ letterSpacing: '0.15em' }}>
          <SlidersHorizontal size={13} strokeWidth={1.5} />FILTERS
          {activeCategory && <span className="ml-1 bg-navy text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">1</span>}
        </button>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="font-inter text-xs text-navy border-b border-gray-200 pb-0.5 focus:outline-none bg-transparent">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low–High</option>
          <option value="price-desc">Price: High–Low</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Mobile filter drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-montserrat font-medium text-xs text-navy tracking-widest" style={{ letterSpacing: '0.2em' }}>FILTERS</h3>
              <button onClick={() => setSidebarOpen(false)}><X size={16} className="text-navy" strokeWidth={1.5} /></button>
            </div>
            <FilterContent activeCategory={activeCategory} setCategory={setCategory} priceRange={priceRange} setPriceRange={setPriceRange} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-8">
        <div className="flex gap-8">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-44 flex-shrink-0">
            <FilterContent activeCategory={activeCategory} setCategory={setCategory} priceRange={priceRange} setPriceRange={setPriceRange} />
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            <p className="font-inter text-xs text-gray-400 mb-4">{filtered.length} products</p>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
                {filtered.map(product => (
                  <div key={product.id} className="product-card group">
                    <Link to={`/product/${product.slug}`}>
                      <div className={`aspect-square bg-gradient-to-br ${product.gradient} flex items-center justify-center relative`}>
                        {product.badge && (
                          <span className="absolute top-2 left-2 bg-navy text-white font-montserrat text-[8px] tracking-widest px-1.5 py-0.5" style={{ letterSpacing: '0.1em' }}>{product.badge}</span>
                        )}
                        <div className="w-3/4 h-3/4"><MiniTank category={product.category} /></div>
                        <button
                          onClick={e => { e.preventDefault(); addItem({ id: product.id, name: product.name, price: product.price, slug: product.slug }) }}
                          className="absolute bottom-2 right-2 w-7 h-7 bg-white border border-gray-200 items-center justify-center opacity-0 group-hover:opacity-100 flex transition-all hover:border-navy hover:bg-navy hover:text-white text-navy"
                        ><Plus size={13} strokeWidth={1.5} /></button>
                      </div>
                    </Link>
                    <div className="p-3">
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="font-montserrat font-medium text-xs text-navy hover:text-mist-blue transition-colors leading-snug">{product.name}</h3>
                      </Link>
                      <p className="font-inter text-xs text-navy mt-1">₱{product.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(product => (
                  <div key={product.id} className="flex gap-4 p-3 border border-gray-100 hover:border-mist-blue transition-colors group">
                    <Link to={`/product/${product.slug}`} className="w-20 h-20 flex-shrink-0">
                      <div className={`w-full h-full bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                        <div className="w-3/4 h-3/4"><MiniTank category={product.category} /></div>
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          {product.badge && <span className="inline-block bg-navy text-white font-montserrat text-[8px] tracking-widest px-1.5 py-0.5 mb-1" style={{ letterSpacing: '0.1em' }}>{product.badge}</span>}
                          <Link to={`/product/${product.slug}`}>
                            <h3 className="font-montserrat font-medium text-sm text-navy hover:text-mist-blue transition-colors">{product.name}</h3>
                          </Link>
                          <p className="font-inter text-xs text-gray-400 mt-0.5 truncate">{product.tagline}</p>
                        </div>
                        <p className="font-montserrat font-medium text-sm text-navy flex-shrink-0">₱{product.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price, slug: product.slug })} className="btn-primary py-1.5 text-[9px]">ADD TO CART</button>
                        <Link to={`/product/${product.slug}`} className="font-inter text-xs text-gray-400 hover:text-navy transition-colors">View →</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              {[1, 2, 3, '…', 8].map((p, i) => (
                <button key={i} className={`w-7 h-7 flex items-center justify-center font-montserrat text-xs transition-colors ${p === 1 ? 'bg-navy text-white' : 'text-gray-400 hover:text-navy border border-gray-100 hover:border-navy'}`}>{p}</button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function FilterContent({ activeCategory, setCategory, priceRange, setPriceRange, onClose }) {
  return (
    <div className="space-y-7">
      <div>
        <h3 className="font-montserrat font-medium text-[9px] tracking-widest text-navy mb-3" style={{ letterSpacing: '0.2em' }}>CATEGORIES</h3>
        <ul className="space-y-1.5">
          <li>
            <button onClick={() => { setCategory(''); onClose?.() }} className={`font-inter text-sm w-full text-left py-0.5 transition-colors ${!activeCategory ? 'text-navy font-medium' : 'text-gray-400 hover:text-navy'}`}>All Products</button>
          </li>
          {categories.map(c => (
            <li key={c.id}>
              <button onClick={() => { setCategory(c.id); onClose?.() }} className={`font-inter text-sm w-full text-left py-0.5 transition-colors flex items-center gap-1.5 ${activeCategory === c.id ? 'text-navy font-medium' : 'text-gray-400 hover:text-navy'}`}>
                <span className="text-xs">{c.icon}</span>{c.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-montserrat font-medium text-[9px] tracking-widest text-navy mb-3" style={{ letterSpacing: '0.2em' }}>PRICE</h3>
        <input type="range" min={0} max={30000} value={priceRange} onChange={e => setPriceRange(Number(e.target.value))} className="w-full mb-2" />
        <div className="flex justify-between">
          <span className="font-inter text-xs text-gray-400">₱0</span>
          <span className="font-inter text-xs text-navy">₱{priceRange.toLocaleString()}</span>
        </div>
      </div>

      <div>
        <h3 className="font-montserrat font-medium text-[9px] tracking-widest text-navy mb-3" style={{ letterSpacing: '0.2em' }}>SIZE</h3>
        <div className="flex flex-wrap gap-2">
          {['15L', '20L', '30L', '45L'].map(s => (
            <button key={s} className="border border-gray-200 px-3 py-1 font-inter text-xs text-gray-500 hover:border-navy hover:text-navy transition-colors">{s}</button>
          ))}
        </div>
      </div>

      <button onClick={() => { setCategory(''); setPriceRange(30000) }} className="font-montserrat text-[9px] tracking-widest text-gray-400 hover:text-navy transition-colors" style={{ letterSpacing: '0.15em' }}>
        CLEAR FILTERS
      </button>
    </div>
  )
}
