import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen pt-20 bg-white">

      {/* Hero */}
      <section className="py-24 px-6 lg:px-12 bg-soft-ice">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4">OUR STORY</p>
            <h1 className="font-montserrat font-light text-5xl text-navy leading-tight mb-6" style={{ letterSpacing: '0.05em' }}>
              NATURE IN<br />EVERY CORNER
            </h1>
            <p className="font-inter text-gray-500 leading-relaxed mb-6 max-w-md">
              Tiny Aqua was born from a simple belief: that living ecosystems should be accessible to everyone. We combine design, nature, and technology to create aquascapes that bring peace into modern spaces.
            </p>
            <p className="font-inter text-gray-500 leading-relaxed max-w-md">
              Each ecosystem we create is a carefully balanced world — a living artwork that breathes, grows, and evolves with you.
            </p>
          </div>
          <div className="relative">
            <div className="bg-white aspect-square max-w-sm mx-auto flex items-center justify-center border border-gray-100">
              <svg viewBox="0 0 300 300" fill="none" className="w-4/5 h-4/5">
                <circle cx="150" cy="150" r="140" fill="#EAF4F8" opacity="0.5" />
                <circle cx="150" cy="150" r="110" stroke="#B7D6E5" strokeWidth="1" fill="none" />
                {/* Large decorative aquarium */}
                <rect x="60" y="80" width="180" height="130" rx="15" fill="white" stroke="#0D2742" strokeWidth="1.5" opacity="0.8" />
                <path d="M60 155 C90 138, 130 170, 160 152 C190 135, 225 158, 240 148 L240 210 Q240 210 232 210 L68 210 Q60 210 60 210 Z" fill="#B7D6E5" opacity="0.5" />
                <rect x="80" y="155" width="8" height="40" rx="4" fill="#4caf50" opacity="0.5" transform="rotate(-6 80 195)" />
                <rect x="96" y="140" width="7" height="55" rx="3.5" fill="#66bb6a" opacity="0.6" transform="rotate(3 96 195)" />
                <rect x="210" y="148" width="8" height="48" rx="4" fill="#4caf50" opacity="0.5" transform="rotate(5 210 196)" />
                <ellipse cx="150" cy="209" rx="35" ry="9" fill="#8d7b6b" opacity="0.3" />
                <ellipse cx="135" cy="204" rx="15" ry="7" fill="#9e8e7e" opacity="0.4" />
                <ellipse cx="162" cy="206" rx="12" ry="6" fill="#8d7b6b" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { label: 'MISSION', title: 'Bring Peace', desc: 'To bring peace into modern spaces through living ecosystems.' },
              { label: 'VISION', title: 'Lead Asia', desc: 'To become the leading modern ecosystem lifestyle brand in Asia.' },
              { label: 'VALUES', title: 'Minimal. Modern. Natural.', desc: 'Peaceful. Intelligent. Calm. Everything we create reflects these principles.' },
            ].map(v => (
              <div key={v.label} className="p-8 border border-gray-100">
                <p className="section-label mb-3">{v.label}</p>
                <h3 className="font-montserrat font-light text-2xl text-navy mb-4" style={{ letterSpacing: '0.05em' }}>{v.title}</h3>
                <p className="font-inter text-sm text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-montserrat font-light text-mist-blue text-xs tracking-widest mb-4" style={{ letterSpacing: '0.3em' }}>BEGIN YOUR JOURNEY</p>
          <h2 className="font-montserrat font-light text-4xl text-white mb-6" style={{ letterSpacing: '0.05em' }}>
            BRING NATURE HOME
          </h2>
          <p className="font-inter text-gray-400 text-sm mb-10">
            Explore our collection of premium nano aquariums and living ecosystems.
          </p>
          <Link to="/shop" className="inline-block border border-white text-white font-montserrat text-xs tracking-widest px-8 py-4 hover:bg-white hover:text-navy transition-all" style={{ letterSpacing: '0.2em' }}>
            SHOP NOW →
          </Link>
        </div>
      </section>

    </div>
  )
}
