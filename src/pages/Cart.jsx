import { Link } from 'react-router-dom'
import { X, ShoppingBag, Shield, RotateCcw, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

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
    <svg viewBox="0 0 80 65" fill="none" className="w-full h-full">
      <rect x="5" y="8" width="70" height="50" rx="6" fill={c.from} stroke={c.accent} strokeWidth="1.2" opacity="0.8" />
      <path d="M5 35 C20 27, 36 42, 52 35 C68 28, 75 38, 75 35 L75 58 Q75 58 73 58 L7 58 Q5 58 5 58 Z" fill={c.to} opacity="0.6" />
    </svg>
  )
}

export default function Cart() {
  const { items, removeItem, updateQty, subtotal } = useCart()
  const shipping = subtotal >= 100 ? 0 : 15
  const tax = 0
  const total = subtotal + shipping + tax

  const suggested = products.filter(p => !items.find(i => i.id === p.id)).slice(0, 3)
  const { addItem } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <div className="w-20 h-20 rounded-full bg-soft-ice flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={28} className="text-mist-blue" strokeWidth={1.5} />
          </div>
          <h2 className="font-montserrat font-light text-2xl text-navy mb-4" style={{ letterSpacing: '0.1em' }}>YOUR CART IS EMPTY</h2>
          <p className="font-inter text-sm text-gray-400 mb-8 leading-relaxed">Bring nature into your space. Explore our premium nano aquariums and aquascapes.</p>
          <Link to="/shop" className="btn-primary">SHOP AQUARIUMS →</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">

        <h1 className="font-montserrat font-light text-3xl text-navy mb-10" style={{ letterSpacing: '0.15em' }}>
          YOUR CART ({items.length})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Cart Items */}
          <div className="lg:col-span-2">

            {/* Column headers */}
            <div className="hidden lg:grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 font-montserrat text-[9px] tracking-widest text-gray-400" style={{ letterSpacing: '0.2em' }}>
              <div className="col-span-6">PRODUCT</div>
              <div className="col-span-2 text-center">PRICE</div>
              <div className="col-span-2 text-center">QTY</div>
              <div className="col-span-2 text-right">TOTAL</div>
            </div>

            {/* Items */}
            <div className="space-y-6 mt-6">
              {items.map(item => {
                const product = products.find(p => p.id === item.id)
                return (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-50">
                    {/* Product */}
                    <div className="col-span-12 lg:col-span-6 flex items-center gap-4">
                      <Link to={`/product/${item.slug}`} className="w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0">
                        <div className={`w-full h-full bg-gradient-to-br ${product?.gradient || 'from-soft-ice to-mist-blue'} flex items-center justify-center`}>
                          <div className="w-3/4 h-3/4">
                            <MiniTank category={product?.category || 'nano-tanks'} />
                          </div>
                        </div>
                      </Link>
                      <div>
                        <Link to={`/product/${item.slug}`}>
                          <h3 className="font-montserrat font-medium text-sm text-navy hover:text-mist-blue transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="font-inter text-xs text-gray-400 mt-1">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>

                    {/* Price (desktop) */}
                    <div className="hidden lg:block col-span-2 text-center font-inter text-sm text-navy">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Qty */}
                    <div className="col-span-8 lg:col-span-2 flex items-center justify-start lg:justify-center">
                      <div className="flex items-center border border-gray-200">
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                        >−</button>
                        <span className="w-8 text-center font-inter text-sm text-navy">{item.qty}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                        >+</button>
                      </div>
                    </div>

                    {/* Total + Remove */}
                    <div className="col-span-4 lg:col-span-2 flex items-center justify-end gap-4">
                      <span className="font-montserrat font-medium text-sm text-navy">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-navy transition-colors"
                      >
                        <X size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8 flex items-center justify-between">
              <Link to="/shop" className="font-montserrat text-xs tracking-widest text-gray-400 hover:text-navy transition-colors border-b border-gray-200 pb-1" style={{ letterSpacing: '0.15em' }}>
                ← CONTINUE SHOPPING
              </Link>
              <Link to="/ecosystems" className="font-montserrat text-xs tracking-widest text-navy hover:text-mist-blue transition-colors border-b border-navy pb-1" style={{ letterSpacing: '0.15em' }}>
                BUILD AN ECOSYSTEM →
              </Link>
            </div>

            {/* You May Also Like */}
            <div className="mt-16">
              <p className="section-label mb-6">YOU MAY ALSO LIKE</p>
              <div className="grid grid-cols-3 gap-4">
                {suggested.map(p => (
                  <div key={p.id} className="product-card group">
                    <Link to={`/product/${p.slug}`}>
                      <div className={`aspect-square bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                        <div className="w-3/4 h-3/4">
                          <MiniTank category={p.category} />
                        </div>
                      </div>
                    </Link>
                    <div className="p-3">
                      <Link to={`/product/${p.slug}`}>
                        <h4 className="font-montserrat font-medium text-xs text-navy hover:text-mist-blue transition-colors">{p.name}</h4>
                      </Link>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-inter text-xs text-navy">${p.price}</span>
                        <button
                          onClick={() => addItem({ id: p.id, name: p.name, price: p.price, slug: p.slug })}
                          className="w-6 h-6 border border-gray-200 flex items-center justify-center hover:border-navy hover:bg-navy hover:text-white text-navy transition-all text-xs"
                        >+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-soft-ice p-8">
              <h2 className="font-montserrat font-medium text-xs tracking-widest text-navy mb-8" style={{ letterSpacing: '0.2em' }}>ORDER SUMMARY</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm text-gray-500">Subtotal</span>
                  <span className="font-montserrat text-sm text-navy">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm text-gray-500">Shipping</span>
                  <span className={`font-montserrat text-sm ${shipping === 0 ? 'text-mist-blue' : 'text-navy'}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm text-gray-500">Tax</span>
                  <span className="font-montserrat text-sm text-navy">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-8">
                <div className="flex items-center justify-between">
                  <span className="font-montserrat font-medium text-sm text-navy" style={{ letterSpacing: '0.1em' }}>TOTAL</span>
                  <span className="font-montserrat font-medium text-2xl text-navy">${total.toFixed(2)}</span>
                </div>
                {subtotal < 100 && (
                  <p className="font-inter text-xs text-gray-400 mt-2">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <p className="font-inter text-xs text-mist-blue mt-2">
                  4 interest-free payments of ${(total / 4).toFixed(2)} with Shop Pay
                </p>
              </div>

              <button className="btn-primary w-full text-center mb-4">
                CHECKOUT →
              </button>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-200">
                {[
                  { Icon: Truck, label: 'FREE SHIPPING', sub: 'On orders over $100' },
                  { Icon: RotateCcw, label: '30-DAY RETURNS', sub: 'Hassle-free returns' },
                  { Icon: Shield, label: 'SECURE PAYMENT', sub: '100% protected' },
                ].map(({ Icon, label, sub }) => (
                  <div key={label} className="text-center">
                    <Icon size={18} className="text-mist-blue mx-auto mb-1" strokeWidth={1.5} />
                    <p className="font-montserrat text-[7px] tracking-widest text-navy" style={{ letterSpacing: '0.1em' }}>{label}</p>
                    <p className="font-inter text-[9px] text-gray-400 mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
