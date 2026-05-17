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

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')
  const [filterOpen, setFilterOpen] = useState(true)
  const [priceRange, setPriceRange] = useState(1000)
  const [sortBy, setSortBy] = useState('featured')
  const { addItem } = useCart()

  const activeCategory = searchParams.get('category') || ''

  const setCategory = (id) => {
    if (id === activeCategory) {
      searchParams.delete('category')
    } else {
      searchParams.set('category', id)
    }
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
    <div className="min-h-screen pt-20 bg-white">

      {/* Header */}
      <div className="border-b border-gray-100 py-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link to="/" className="font-inter text-xs text-gray-400 hover:text-navy">Home</Link>
                <span className="text-gray-300 text-xs">›</span>
                <span className="font-inter text-xs text-navy">Shop</span>
              </div>
              <h1 className="font-montserrat font-light text-3xl text-navy" style={{ letterSpacing: '0.15em' }}>SHOP ALL</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="font-inter text-xs text-gray-400">Sort by</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="font-inter text-xs text-navy border-b border-gray-200 pb-1 focus:outline-none focus:border-navy cursor-pointer bg-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 ${viewMode === 'grid' ? 'text-navy' : 'text-gray-300'}`}
                >
                  <Grid size={16} strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 ${viewMode === 'list' ? 'text-navy' : 'text-gray-300'}`}
                >
                  <List size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex gap-10">

          {/* Sidebar */}
          <aside className={`${filterOpen ? 'w-52 flex-shrink-0' : 'w-0 overflow-hidden'} transition-all duration-300`}>
            <div className="space-y-8">

              {/* Categories */}
              <div>
                <h3 className="font-montserrat font-medium text-[10px] tracking-widest text-navy mb-4 flex items-center justify-between" style={{ letterSpacing: '0.2em' }}>
                  CATEGORIES
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setCategory('')}
                      className={`font-inter text-sm w-full text-left py-1 transition-colors ${!activeCategory ? 'text-navy font-medium' : 'text-gray-400 hover:text-navy'}`}
                    >
                      All Products
                    </button>
                  </li>
                  {categories.map(c => (
                    <li key={c.id}>
                      <button
                        onClick={() => setCategory(c.id)}
                        className={`font-inter text-sm w-full text-left py-1 transition-colors flex items-center gap-2 ${activeCategory === c.id ? 'text-navy font-medium' : 'text-gray-400 hover:text-navy'}`}
                      >
                        <span className="text-xs">{c.icon}</span>
                        {c.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div>
                <h3 className="font-montserrat font-medium text-[10px] tracking-widest text-navy mb-4" style={{ letterSpacing: '0.2em' }}>
                  PRICE
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min={0}
                    max={1000}
                    value={priceRange}
                    onChange={e => setPriceRange(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between">
                    <span className="font-inter text-xs text-gray-400">$0</span>
                    <span className="font-inter text-xs text-navy">${priceRange}</span>
                  </div>
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="font-montserrat font-medium text-[10px] tracking-widest text-navy mb-4" style={{ letterSpacing: '0.2em' }}>
                  SIZE
                </h3>
                <div className="space-y-2">
                  {['15L', '20L', '30L', '45L'].map(s => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer group">
                      <div className="w-3 h-3 border border-gray-300 group-hover:border-navy transition-colors flex items-center justify-center">
                      </div>
                      <span className="font-inter text-sm text-gray-400 group-hover:text-navy transition-colors">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-montserrat font-medium text-[10px] tracking-widest text-navy mb-4" style={{ letterSpacing: '0.2em' }}>
                  AVAILABILITY
                </h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="w-3 h-3 border border-navy bg-navy flex items-center justify-center">
                    <span className="text-white text-[8px]">✓</span>
                  </div>
                  <span className="font-inter text-sm text-navy">In Stock</span>
                </label>
              </div>

              {/* Clear */}
              <button
                onClick={() => { setCategory(''); setPriceRange(1000) }}
                className="font-montserrat text-[10px] tracking-widest text-gray-400 hover:text-navy transition-colors border-b border-gray-200 pb-1" style={{ letterSpacing: '0.15em' }}
              >
                CLEAR FILTERS
              </button>

            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="font-inter text-sm text-gray-400">{filtered.length} products</p>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 font-montserrat text-[10px] tracking-widest text-navy hover:text-mist-blue transition-colors lg:hidden"
                style={{ letterSpacing: '0.15em' }}
              >
                <SlidersHorizontal size={14} strokeWidth={1.5} />
                FILTERS
              </button>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(product => (
                  <div key={product.id} className="product-card group">
                    <Link to={`/product/${product.slug}`}>
                      <div className={`aspect-square bg-gradient-to-br ${product.gradient} flex items-center justify-center relative`}>
                        {product.badge && (
                          <span className="absolute top-3 left-3 bg-navy text-white font-montserrat text-[9px] tracking-widest px-2 py-1" style={{ letterSpacing: '0.1em' }}>
                            {product.badge}
                          </span>
                        )}
                        <div className="w-3/4 h-3/4">
                          <MiniTank category={product.category} />
                        </div>
                        <button
                          onClick={e => { e.preventDefault(); addItem({ id: product.id, name: product.name, price: product.price, slug: product.slug }) }}
                          className="absolute bottom-3 right-3 w-8 h-8 bg-white border border-gray-200 items-center justify-center opacity-0 group-hover:opacity-100 flex transition-all hover:border-navy hover:bg-navy hover:text-white"
                        >
                          <Plus size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="font-montserrat font-medium text-sm text-navy hover:text-mist-blue transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="font-inter text-sm text-navy mt-1">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map(product => (
                  <div key={product.id} className="flex gap-6 p-4 border border-gray-100 hover:border-mist-blue transition-colors group">
                    <Link to={`/product/${product.slug}`} className="w-24 h-24 flex-shrink-0">
                      <div className={`w-full h-full bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                        <div className="w-3/4 h-3/4">
                          <MiniTank category={product.category} />
                        </div>
                      </div>
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          {product.badge && (
                            <span className="inline-block bg-navy text-white font-montserrat text-[9px] tracking-widest px-2 py-0.5 mb-2" style={{ letterSpacing: '0.1em' }}>
                              {product.badge}
                            </span>
                          )}
                          <Link to={`/product/${product.slug}`}>
                            <h3 className="font-montserrat font-medium text-base text-navy hover:text-mist-blue transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="font-inter text-sm text-gray-400 mt-1">{product.tagline}</p>
                        </div>
                        <p className="font-montserrat font-medium text-lg text-navy ml-4">${product.price}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <button
                          onClick={() => addItem({ id: product.id, name: product.name, price: product.price, slug: product.slug })}
                          className="btn-primary py-2 text-[10px]"
                        >
                          ADD TO CART
                        </button>
                        <Link to={`/product/${product.slug}`} className="font-inter text-xs text-gray-400 hover:text-navy transition-colors">
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-3 mt-16">
              {[1, 2, 3, '...', 8].map((p, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center font-montserrat text-xs transition-colors ${p === 1 ? 'bg-navy text-white' : 'text-gray-400 hover:text-navy border border-gray-200 hover:border-navy'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
