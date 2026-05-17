export default function Gallery() {
  const items = [
    { title: 'Forest Scape No.1', style: 'Nature Aquarium', size: '30L', gradient: 'from-green-50 to-soft-ice' },
    { title: 'Stone Valley', style: 'Iwagumi', size: '45L', gradient: 'from-gray-50 to-soft-ice' },
    { title: 'Jungle Deep', style: 'Jungle Style', size: '60L', gradient: 'from-emerald-50 to-green-100' },
    { title: 'Mist & Moss', style: 'Wabi-kusa', size: '20L', gradient: 'from-soft-ice to-blue-50' },
    { title: 'Desert Rock', style: 'Iwagumi', size: '30L', gradient: 'from-amber-50 to-orange-50' },
    { title: 'Blue Lagoon', style: 'Dutch Style', size: '45L', gradient: 'from-blue-50 to-soft-ice' },
    { title: 'Ancient Drift', style: 'Nature Aquarium', size: '30L', gradient: 'from-stone-50 to-soft-ice' },
    { title: 'Zen Garden', style: 'Iwagumi', size: '20L', gradient: 'from-slate-50 to-gray-100' },
    { title: 'Emerald Forest', style: 'Nature Aquarium', size: '60L', gradient: 'from-green-100 to-teal-50' },
  ]

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center mb-16">
          <p className="section-label mb-4">OUR CREATIONS</p>
          <h1 className="font-montserrat font-light text-4xl text-navy" style={{ letterSpacing: '0.15em' }}>GALLERY</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div key={i} className={`group cursor-pointer ${i === 0 || i === 5 ? 'md:row-span-2' : ''}`}>
              <div className={`bg-gradient-to-br ${item.gradient} ${i === 0 || i === 5 ? 'h-full min-h-80' : 'aspect-square'} flex items-end relative overflow-hidden`}>
                {/* Mini aquarium art */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 300 240" fill="none" className="w-4/5 h-4/5 opacity-40">
                    <rect x="20" y="30" width="260" height="180" rx="15" fill="#EAF4F8" stroke="#0D2742" strokeWidth="2" />
                    <path d="M20 130 C70 108, 130 155, 180 130 C230 105, 270 135, 280 125 L280 210 Q280 210 268 210 L32 210 Q20 210 20 210 Z" fill="#B7D6E5" opacity="0.7" />
                    <rect x="40" y="140" width="12" height="50" rx="6" fill="#4caf50" opacity="0.5" transform="rotate(-8 40 190)" />
                    <rect x="60" y="120" width="10" height="70" rx="5" fill="#66bb6a" opacity="0.6" transform="rotate(4 60 190)" />
                    <rect x="230" y="130" width="11" height="60" rx="5.5" fill="#4caf50" opacity="0.5" transform="rotate(6 230 190)" />
                    <ellipse cx="150" cy="208" rx="40" ry="10" fill="#8d7b6b" opacity="0.3" />
                    <ellipse cx="130" cy="202" rx="18" ry="8" fill="#8d7b6b" opacity="0.4" />
                    <ellipse cx="168" cy="204" rx="14" ry="7" fill="#9e8e7e" opacity="0.3" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 p-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-montserrat font-medium text-sm tracking-wider">{item.title}</h3>
                  <p className="font-inter text-xs text-white/70 mt-1">{item.style} · {item.size}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
