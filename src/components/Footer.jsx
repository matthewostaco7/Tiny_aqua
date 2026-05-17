import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">

      {/* Why Choose Section */}
      <div className="bg-soft-ice py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="section-label text-center mb-2">WHY CHOOSE</p>
          <h2 className="font-montserrat font-light text-3xl text-navy text-center tracking-widest mb-16" style={{ letterSpacing: '0.2em' }}>
            TINY AQUA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                    <circle cx="20" cy="20" r="18" stroke="#B7D6E5" strokeWidth="1.5" />
                    <path d="M12 20l5 5 11-11" stroke="#0D2742" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'PREMIUM QUALITY',
                desc: 'Top materials for long-lasting beauty.',
              },
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                    <circle cx="20" cy="20" r="18" stroke="#B7D6E5" strokeWidth="1.5" />
                    <circle cx="20" cy="20" r="6" stroke="#0D2742" strokeWidth="1.5" />
                    <line x1="20" y1="2" x2="20" y2="8" stroke="#0D2742" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="20" y1="32" x2="20" y2="38" stroke="#0D2742" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="2" y1="20" x2="8" y2="20" stroke="#0D2742" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="32" y1="20" x2="38" y2="20" stroke="#0D2742" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: 'SMART TECHNOLOGY',
                desc: 'Intelligent lighting for healthy plants.',
              },
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                    <circle cx="20" cy="20" r="18" stroke="#B7D6E5" strokeWidth="1.5" />
                    <path d="M14 26 C14 20 18 16 20 14 C22 16 26 20 26 26" stroke="#0D2742" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="20" cy="28" r="2" fill="#0D2742" />
                  </svg>
                ),
                title: 'EASY MAINTENANCE',
                desc: 'Designed for simplicity and balance.',
              },
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                    <circle cx="20" cy="20" r="18" stroke="#B7D6E5" strokeWidth="1.5" />
                    <path d="M20 12 C16 16 12 20 14 25 C16 28 24 28 26 25 C28 20 24 16 20 12Z" stroke="#0D2742" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                ),
                title: 'SUSTAINABLE',
                desc: 'Eco-friendly practices for a better planet.',
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-5">{item.icon}</div>
                <h4 className="font-montserrat font-medium text-xs tracking-widest text-navy mb-3" style={{ letterSpacing: '0.2em' }}>
                  {item.title}
                </h4>
                <p className="font-inter text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link to="/about" className="btn-outline">LEARN MORE</Link>
          </div>
        </div>
      </div>

      {/* Hero Footer Image */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-soft-ice via-mist-blue to-navy opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="font-montserrat font-light text-4xl lg:text-6xl text-navy tracking-widest opacity-10" style={{ letterSpacing: '0.4em' }}>
              TINY AQUA
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-soft-ice/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent opacity-80" />
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="font-montserrat font-light text-white text-sm tracking-widest" style={{ letterSpacing: '0.3em' }}>
            SMALL ECOSYSTEMS. ENDLESS PEACE.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">

            {/* Brand */}
            <div className="col-span-2">
              <Logo size="md" dark={true} />
              <p className="font-montserrat font-light text-[10px] text-mist-blue mt-2 tracking-widest" style={{ letterSpacing: '0.15em' }}>
                SMALL ECOSYSTEMS. ENDLESS PEACE.
              </p>
              <div className="flex gap-4 mt-6">
                {['instagram', 'youtube', 'tiktok', 'facebook'].map(s => (
                  <a key={s} href="#" className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:border-navy transition-colors">
                    <span className="text-xs text-gray-400 font-montserrat">{s[0].toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div>
              <h5 className="font-montserrat font-medium text-[11px] tracking-widest text-navy mb-5" style={{ letterSpacing: '0.2em' }}>SHOP</h5>
              <ul className="space-y-3">
                {['Nano Tanks', 'Aquascapes', 'Plants', 'Hardscape', 'Lighting', 'Accessories'].map(i => (
                  <li key={i}><Link to="/shop" className="font-inter text-sm text-gray-400 hover:text-navy transition-colors">{i}</Link></li>
                ))}
              </ul>
            </div>

            {/* Ecosystems */}
            <div>
              <h5 className="font-montserrat font-medium text-[11px] tracking-widest text-navy mb-5" style={{ letterSpacing: '0.2em' }}>ECOSYSTEMS</h5>
              <ul className="space-y-3">
                {['Starter Kits', 'Custom Builder', 'All-In-One Systems', 'Gift Cards'].map(i => (
                  <li key={i}><Link to="/ecosystems" className="font-inter text-sm text-gray-400 hover:text-navy transition-colors">{i}</Link></li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h5 className="font-montserrat font-medium text-[11px] tracking-widest text-navy mb-5" style={{ letterSpacing: '0.2em' }}>SUPPORT</h5>
              <ul className="space-y-3">
                {['Help Center', 'Shipping & Returns', 'Warranty', 'Track Your Order', 'Contact Us'].map(i => (
                  <li key={i}><a href="#" className="font-inter text-sm text-gray-400 hover:text-navy transition-colors">{i}</a></li>
                ))}
              </ul>
            </div>

            {/* Company + Newsletter */}
            <div>
              <h5 className="font-montserrat font-medium text-[11px] tracking-widest text-navy mb-5" style={{ letterSpacing: '0.2em' }}>COMPANY</h5>
              <ul className="space-y-3 mb-8">
                {['About Us', 'Sustainability', 'Blog', 'Careers'].map(i => (
                  <li key={i}><a href="#" className="font-inter text-sm text-gray-400 hover:text-navy transition-colors">{i}</a></li>
                ))}
              </ul>
              <h5 className="font-montserrat font-medium text-[11px] tracking-widest text-navy mb-4" style={{ letterSpacing: '0.2em' }}>NEWSLETTER</h5>
              <p className="font-inter text-xs text-gray-400 mb-3">Join our community and get 10% off your first order.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 border-b border-gray-200 pb-2 text-xs font-inter text-navy outline-none focus:border-navy placeholder-gray-300"
                />
                <button className="bg-navy text-white w-8 h-7 flex items-center justify-center text-xs hover:bg-opacity-90 transition-colors">
                  →
                </button>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-inter text-xs text-gray-300">© 2025 Tiny Aqua. All rights reserved.</p>
            <div className="flex gap-6">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map(l => (
                <a key={l} href="#" className="font-inter text-xs text-gray-300 hover:text-navy transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
