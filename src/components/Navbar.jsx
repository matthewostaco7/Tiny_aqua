import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Logo from './Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { itemCount } = useCart()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navBg = isHome && !scrolled ? 'bg-transparent' : 'bg-white border-b border-gray-100'

  const links = [
    { to: '/shop', label: 'SHOP' },
    { to: '/ecosystems', label: 'ECOSYSTEMS' },
    { to: '/subscription', label: 'SUBSCRIPTION' },
    { to: '/gallery', label: 'GALLERY' },
    { to: '/about', label: 'ABOUT' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-14 lg:h-16">

            <Link to="/" className="flex-shrink-0">
              <Logo size="md" dark={true} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-7">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`nav-link text-[11px] ${location.pathname.startsWith(l.to) ? 'text-mist-blue' : ''}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button onClick={() => setSearchOpen(!searchOpen)} className="text-navy hover:text-mist-blue transition-colors">
                <Search size={16} strokeWidth={1.5} />
              </button>
              <Link to="/account" className="text-navy hover:text-mist-blue transition-colors hidden lg:block">
                <User size={16} strokeWidth={1.5} />
              </Link>
              <Link to="/cart" className="text-navy hover:text-mist-blue transition-colors relative">
                <ShoppingBag size={16} strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-navy text-white text-[8px] font-montserrat w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button className="lg:hidden text-navy" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
              </button>
            </div>

          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="bg-white border-t border-gray-100 px-4 sm:px-6 lg:px-12 py-3">
            <div className="max-w-xl mx-auto relative">
              <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-mist-blue" strokeWidth={1.5} />
              <input
                autoFocus
                type="text"
                placeholder="Search products, categories..."
                className="w-full pl-5 pb-2 border-b border-gray-200 focus:border-navy outline-none font-inter text-sm text-navy placeholder-gray-300"
              />
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col pt-14">
          <div className="flex flex-col px-6 pt-8 gap-1">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className="font-montserrat font-light text-lg text-navy tracking-widest py-3 border-b border-gray-50"
                style={{ letterSpacing: '0.15em' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="px-6 mt-6 flex gap-5">
            <Link to="/account" className="nav-link text-[10px]">ACCOUNT</Link>
            <Link to="/cart" className="nav-link text-[10px]">CART ({itemCount})</Link>
          </div>
        </div>
      )}
    </>
  )
}
