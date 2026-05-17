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
  const { addItem } = useCart()
  const shipping = subtotal >= 100 ? 0 : 15
  const total = subtotal + shipping

  const suggested = products.filter(p => !items.find(i => i.id === p.id)).slice(0, 3)

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-14 lg:pt-16 bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-xs">
          <div className="w-16 h-16 rounded-full bg-soft-ice flex items-center justify-center mx-auto mb-5">
            <ShoppingBag size={22} className="text-mist-blue" strokeWidth={1.5} />
          </div>
          <h2 className="font-montserrat font-light text-xl text-navy mb-3" style={{ letterSpacing: '0.08em' }}>YOUR CART IS EMPTY</h2>
          <p className="font-inter text-sm text-gray-400 mb-6 leading-relaxed">Explore our premium nano aquariums and aquascapes.</p>
          <Link to="/shop" className="btn-primary">SHOP AQUARIUMS →</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-14 lg:pt-16 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">

        <h1 className="font-montserrat font-light text-xl md:text-2xl text-navy mb-8" style={{ letterSpacing: '0.12em' }}>
          YOUR CART ({items.length})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

          {/* Cart Items */}
          <div className="lg:col-span-2">

            {/* Column headers — desktop only */}
            <div className="hidden md:grid grid-cols-12 gap-3 pb-3 border-b border-gray-100 font-montserrat text-[8px] tracking-widest text-gray-400" style={{ letterSpacing: '0.18em' }}>
              <div className="col-span-6">PRODUCT</div>
              <div className="col-span-2 text-center">PRICE</div>
              <div className="col-span-2 text-center">QTY</div>
              <div className="col-span-2 text-right">TOTAL</div>
            </div>

            <div className="space-y-4 mt-4">
              {items.map(item => {
                const product = products.find(p => p.id === item.id)
                return (
                  <div key={item.id} className="flex gap-3 md:grid md:grid-cols-12 md:gap-3 items-center py-4 border-b border-gray-50">
                    {/* Image + name */}
                    <div className="flex items-center gap-3 md:col-span-6 flex-1 min-w-0">
                      <Link to={`/product/${item.slug}`} className="w-16 h-16 flex-shrink-0">
                        <div className={`w-full h-full bg-gradient-to-br ${product?.gradient || 'from-soft-ice to-mist-blue'} flex items-center justify-center`}>
                          <div className="w-3/4 h-3/4"><MiniTank category={product?.category || 'nano-tanks'} /></div>
                        </div>
                      </Link>
                      <div className="min-w-0">
                        <Link to={`/product/${item.slug}`}>
                          <h3 className="font-montserrat font-medium text-xs text-navy hover:text-mist-blue transition-colors leading-snug">{item.name}</h3>
                        </Link>
                        <p className="font-inter text-[10px] text-gray-400 mt-0.5">${item.price.toFixed(2)}</p>
                        {/* Mobile: qty inline */}
                        <div className="flex items-center gap-2 mt-2 md:hidden">
                          <div className="flex items-center border border-gray-200">
                            <button className="w-6 h-6 flex items-center justify-center border-r border-gray-200 text-navy text-sm" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                            <span className="w-7 text-center font-inter text-xs text-navy">{item.qty}</span>
                            <button className="w-6 h-6 flex items-center justify-center border-l border-gray-200 text-navy text-sm" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                          </div>
                          <span className="font-montserrat font-medium text-xs text-navy">${(item.price * item.qty).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price — desktop */}
                    <div className="hidden md:block md:col-span-2 text-center font-inter text-sm text-navy">${item.price.toFixed(2)}</div>

                    {/* Qty — desktop */}
                    <div className="hidden md:flex md:col-span-2 justify-center">
                      <div className="flex items-center border border-gray-200">
                        <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                        <span className="w-7 text-center font-inter text-sm text-navy">{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                    </div>

                    {/* Total + remove — desktop */}
                    <div className="hidden md:flex md:col-span-2 items-center justify-end gap-3">
                      <span className="font-montserrat font-medium text-sm text-navy">${(item.price * item.qty).toFixed(2)}</span>
                      <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-navy transition-colors"><X size={13} strokeWidth={1.5} /></button>
                    </div>

                    {/* Remove — mobile */}
                    <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-navy transition-colors flex-shrink-0 md:hidden"><X size={14} strokeWidth={1.5} /></button>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Link to="/shop" className="font-montserrat text-[10px] tracking-widest text-gray-400 hover:text-navy transition-colors border-b border-gray-200 pb-0.5" style={{ letterSpacing: '0.12em' }}>← CONTINUE SHOPPING</Link>
              <Link to="/ecosystems" className="font-montserrat text-[10px] tracking-widest text-navy hover:text-mist-blue transition-colors border-b border-navy pb-0.5" style={{ letterSpacing: '0.12em' }}>BUILD ECOSYSTEM →</Link>
            </div>

            {/* Suggested */}
            <div className="mt-12">
              <p className="section-label mb-5">YOU MAY ALSO LIKE</p>
              <div className="grid grid-cols-3 gap-3">
                {suggested.map(p => (
                  <div key={p.id} className="product-card group">
                    <Link to={`/product/${p.slug}`}>
                      <div className={`aspect-square bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                        <div className="w-3/4 h-3/4"><MiniTank category={p.category} /></div>
                      </div>
                    </Link>
                    <div className="p-2.5">
                      <Link to={`/product/${p.slug}`}>
                        <h4 className="font-montserrat font-medium text-[10px] text-navy hover:text-mist-blue transition-colors leading-snug">{p.name}</h4>
                      </Link>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="font-inter text-[10px] text-navy">${p.price}</span>
                        <button onClick={() => addItem({ id: p.id, name: p.name, price: p.price, slug: p.slug })} className="w-6 h-6 border border-gray-200 flex items-center justify-center hover:border-navy hover:bg-navy hover:text-white text-navy transition-all text-xs">+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-soft-ice p-5 md:p-6">
              <h2 className="font-montserrat font-medium text-[10px] tracking-widest text-navy mb-6" style={{ letterSpacing: '0.18em' }}>ORDER SUMMARY</h2>

              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm text-gray-500">Subtotal</span>
                  <span className="font-montserrat text-sm text-navy">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm text-gray-500">Shipping</span>
                  <span className={`font-montserrat text-sm ${shipping === 0 ? 'text-mist-blue' : 'text-navy'}`}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm text-gray-500">Tax</span>
                  <span className="font-montserrat text-sm text-navy">$0.00</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-montserrat font-medium text-sm text-navy" style={{ letterSpacing: '0.08em' }}>TOTAL</span>
                  <span className="font-montserrat font-medium text-xl text-navy">${total.toFixed(2)}</span>
                </div>
                {subtotal < 100 && <p className="font-inter text-[10px] text-gray-400 mt-1.5">Add ${(100 - subtotal).toFixed(2)} more for free shipping</p>}
                <p className="font-inter text-[10px] text-mist-blue mt-1.5">4 interest-free payments of ${(total / 4).toFixed(2)} with Shop Pay</p>
              </div>

              <button className="btn-primary w-full text-center mb-4">CHECKOUT →</button>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-gray-200">
                {[
                  { Icon: Truck, label: 'FREE SHIP', sub: 'Over $100' },
                  { Icon: RotateCcw, label: '30-DAY', sub: 'Returns' },
                  { Icon: Shield, label: 'SECURE', sub: 'Payment' },
                ].map(({ Icon, label, sub }) => (
                  <div key={label} className="text-center">
                    <Icon size={16} className="text-mist-blue mx-auto mb-1" strokeWidth={1.5} />
                    <p className="font-montserrat text-[7px] tracking-widest text-navy" style={{ letterSpacing: '0.08em' }}>{label}</p>
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
