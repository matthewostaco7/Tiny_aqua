import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">

      {/* Why Choose */}
      <div className="bg-soft-ice py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <p className="section-label text-center mb-1">WHY CHOOSE</p>
          <h2 className="font-montserrat font-light text-2xl text-navy text-center tracking-widest mb-10" style={{ letterSpacing: '0.18em' }}>
            TINY AQUA
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7"><circle cx="20" cy="20" r="18" stroke="#B7D6E5" strokeWidth="1.5" /><path d="M12 20l5 5 11-11" stroke="#0D2742" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                title: 'PREMIUM QUALITY', desc: 'Top materials for long-lasting beauty.',
              },
              {
                icon: <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7"><circle cx="20" cy="20" r="18" stroke="#B7D6E5" strokeWidth="1.5" /><circle cx="20" cy="20" r="6" stroke="#0D2742" strokeWidth="1.5" /><line x1="20" y1="2" x2="20" y2="8" stroke="#0D2742" strokeWidth="1.5" strokeLinecap="round" /><line x1="20" y1="32" x2="20" y2="38" stroke="#0D2742" strokeWidth="1.5" strokeLinecap="round" /><line x1="2" y1="20" x2="8" y2="20" stroke="#0D2742" strokeWidth="1.5" strokeLinecap="round" /><line x1="32" y1="20" x2="38" y2="20" stroke="#0D2742" strokeWidth="1.5" strokeLinecap="round" /></svg>,
                title: 'SMART TECHNOLOGY', desc: 'Intelligent lighting for healthy plants.',
              },
              {
                icon: <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7"><circle cx="20" cy="20" r="18" stroke="#B7D6E5" strokeWidth="1.5" /><path d="M14 26 C14 20 18 16 20 14 C22 16 26 20 26 26" stroke="#0D2742" strokeWidth="1.5" strokeLinecap="round" /><circle cx="20" cy="28" r="2" fill="#0D2742" /></svg>,
                title: 'EASY MAINTENANCE', desc: 'Designed for simplicity and balance.',
              },
              {
                icon: <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7"><circle cx="20" cy="20" r="18" stroke="#B7D6E5" strokeWidth="1.5" /><path d="M20 12 C16 16 12 20 14 25 C16 28 24 28 26 25 C28 20 24 16 20 12Z" stroke="#0D2742" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>,
                title: 'SUSTAINABLE', desc: 'Eco-friendly practices for a better planet.',
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <h4 className="font-montserrat font-medium text-[9px] tracking-widest text-navy mb-1.5" style={{ letterSpacing: '0.15em' }}>{item.title}</h4>
                <p className="font-inter text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/about" className="btn-outline">LEARN MORE</Link>
          </div>
        </div>
      </div>

      {/* Dark banner strip */}
      <div className="bg-navy py-10 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-montserrat font-light text-white/10 text-4xl md:text-6xl tracking-widest select-none" style={{ letterSpacing: '0.4em' }}>TINY AQUA</p>
          <p className="font-montserrat font-light text-white text-xs tracking-widest mt-2" style={{ letterSpacing: '0.3em' }}>
            SMALL ECOSYSTEMS. ENDLESS PEACE.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">

            {/* Brand */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <Logo size="md" dark={true} />
              <p className="font-montserrat font-light text-[9px] text-mist-blue mt-1.5 tracking-widest" style={{ letterSpacing: '0.12em' }}>
                SMALL ECOSYSTEMS. ENDLESS PEACE.
              </p>
              <div className="flex gap-3 mt-5">
                {['I', 'Y', 'F', 'T'].map(s => (
                  <a key={s} href="#" className="w-7 h-7 border border-gray-200 flex items-center justify-center hover:border-navy transition-colors">
                    <span className="text-[9px] text-gray-400 font-montserrat">{s}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div>
              <h5 className="font-montserrat font-medium text-[9px] tracking-widest text-navy mb-4" style={{ letterSpacing: '0.18em' }}>SHOP</h5>
              <ul className="space-y-2.5">
                {['Nano Tanks', 'Aquascapes', 'Plants', 'Hardscape', 'Lighting', 'Accessories'].map(i => (
                  <li key={i}><Link to="/shop" className="font-inter text-xs text-gray-400 hover:text-navy transition-colors">{i}</Link></li>
                ))}
              </ul>
            </div>

            {/* Ecosystems */}
            <div>
              <h5 className="font-montserrat font-medium text-[9px] tracking-widest text-navy mb-4" style={{ letterSpacing: '0.18em' }}>ECOSYSTEMS</h5>
              <ul className="space-y-2.5">
                {['Starter Kits', 'Custom Builder', 'All-In-One', 'Gift Cards'].map(i => (
                  <li key={i}><Link to="/ecosystems" className="font-inter text-xs text-gray-400 hover:text-navy transition-colors">{i}</Link></li>
                ))}
              </ul>
            </div>

            {/* Support + Company */}
            <div className="col-span-2 lg:col-span-2 grid grid-cols-2 gap-6">
              <div>
                <h5 className="font-montserrat font-medium text-[9px] tracking-widest text-navy mb-4" style={{ letterSpacing: '0.18em' }}>SUPPORT</h5>
                <ul className="space-y-2.5">
                  {['Help Center', 'Shipping', 'Returns', 'Warranty', 'Contact'].map(i => (
                    <li key={i}><a href="#" className="font-inter text-xs text-gray-400 hover:text-navy transition-colors">{i}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-montserrat font-medium text-[9px] tracking-widest text-navy mb-4" style={{ letterSpacing: '0.18em' }}>COMPANY</h5>
                <ul className="space-y-2.5">
                  {['About Us', 'Sustainability', 'Blog', 'Careers'].map(i => (
                    <li key={i}><a href="#" className="font-inter text-xs text-gray-400 hover:text-navy transition-colors">{i}</a></li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Newsletter */}
          <div className="border-t border-gray-100 pt-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-montserrat font-medium text-[9px] tracking-widest text-navy mb-1" style={{ letterSpacing: '0.18em' }}>NEWSLETTER</p>
              <p className="font-inter text-xs text-gray-400">Get 10% off your first order.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 sm:w-56 border-b border-gray-200 pb-1.5 text-xs font-inter text-navy outline-none focus:border-navy placeholder-gray-300" />
              <button className="bg-navy text-white px-4 py-1.5 text-xs font-montserrat hover:bg-opacity-90 transition-colors">→</button>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-inter text-[10px] text-gray-300">© 2025 Tiny Aqua. All rights reserved.</p>
            <div className="flex gap-5">
              {['Terms', 'Privacy', 'Cookies'].map(l => (
                <a key={l} href="#" className="font-inter text-[10px] text-gray-300 hover:text-navy transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
