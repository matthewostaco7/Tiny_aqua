import { useState } from 'react'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    id: 'essential', name: 'Essential Care', price: 29, popular: false,
    tagline: 'Basic maintenance for healthy ecosystems.',
    features: ['Water change (bi/month)', 'Plant trimming', 'Water testing', 'Online support'],
  },
  {
    id: 'nature', name: 'Nature Care', price: 59, popular: true,
    tagline: 'Complete care for thriving aquascapes.',
    features: ['Water change (4x/month)', 'Plant trimming', 'Water testing', 'CO2 refill', 'Fertilisation', 'Priority support'],
  },
  {
    id: 'elite', name: 'Elite Ecosystem', price: 99, popular: false,
    tagline: 'Premium care for elite ecosystems.',
    features: ['Unlimited maintenance', 'CO2 & fertilizer included', 'Emergency support', 'Monthly ecosystem check', 'Personal aquascaper'],
  },
]

const faqs = [
  { q: 'How does the subscription work?', a: 'After subscribing, our team contacts you within 48 hours to schedule your first maintenance visit. We handle everything — you just enjoy the view.' },
  { q: 'Can I cancel at any time?', a: 'Yes, absolutely. No long-term contracts. Cancel or pause any time from your account dashboard.' },
  { q: 'What areas do you service?', a: 'We currently service major metro areas. Enter your postcode at checkout to confirm availability.' },
  { q: 'Do I need to be home during maintenance?', a: 'Not necessarily. Many clients provide access. Discuss your preference with your assigned aquascaper.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left">
        <span className="font-montserrat font-medium text-sm text-navy pr-4">{q}</span>
        <span className={`text-navy transition-transform ${open ? 'rotate-45' : ''} text-lg leading-none flex-shrink-0`}>+</span>
      </button>
      {open && <p className="font-inter text-sm text-gray-500 leading-relaxed pb-4">{a}</p>}
    </div>
  )
}

export default function Subscription() {
  const [billing, setBilling] = useState('monthly')

  return (
    <div className="min-h-screen pt-14 lg:pt-16 bg-white">

      {/* Hero */}
      <section className="bg-soft-ice py-10 md:py-14 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="section-label mb-3">AQUACARE SUBSCRIPTION</p>
              <h1 className="font-montserrat font-light text-2xl md:text-3xl lg:text-4xl text-navy leading-snug mb-4" style={{ letterSpacing: '0.04em' }}>
                WE TAKE CARE<br />OF YOUR ECOSYSTEM
              </h1>
              <p className="font-inter text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
                Professional aquacare so you can enjoy the peace. Starting at $29/month.
              </p>
              <ul className="space-y-2.5 mb-8">
                {['Professional maintenance', 'Healthy plants & fish', 'Crystal clear water', 'Priority support'].map(f => (
                  <li key={f} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full border border-navy flex items-center justify-center flex-shrink-0">
                      <Check size={8} strokeWidth={2.5} className="text-navy" />
                    </div>
                    <span className="font-inter text-sm text-navy">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative tank */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-56 md:w-64">
                <div className="bg-gradient-to-b from-soft-ice to-mist-blue rounded-2xl aspect-[3/4] border border-mist-blue/30 flex items-end justify-center overflow-hidden">
                  <div className="w-full h-3/4 bg-gradient-to-t from-mist-blue/60 to-transparent relative">
                    <div className="absolute bottom-0 left-6 flex gap-1 items-end">
                      {[24, 40, 32, 48, 28].map((h, i) => (
                        <div key={i} className="bg-gradient-to-t from-green-700 to-green-400 rounded-full opacity-60" style={{ width: '5px', height: `${h}px`, transform: `rotate(${-5 + i * 3}deg)`, transformOrigin: 'bottom' }} />
                      ))}
                    </div>
                    <div className="absolute bottom-0 right-6">
                      <div className="flex gap-1 items-end">
                        <div className="w-6 h-5 bg-gray-400 rounded-t-full opacity-50" />
                        <div className="w-9 h-7 bg-gray-500 rounded-t-full opacity-60" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-navy text-white px-3 py-1.5">
                  <p className="font-montserrat font-light text-[9px] tracking-widest" style={{ letterSpacing: '0.18em' }}>FROM</p>
                  <p className="font-montserrat font-light text-xl">$29<span className="text-xs">/mo</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Billing toggle */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center bg-soft-ice p-0.5 gap-0.5">
              {['monthly', 'yearly'].map(b => (
                <button key={b} onClick={() => setBilling(b)} className={`font-montserrat text-[10px] px-4 py-2 transition-all tracking-widest ${billing === b ? 'bg-navy text-white' : 'text-navy'}`} style={{ letterSpacing: '0.12em' }}>
                  {b === 'monthly' ? 'MONTHLY' : 'YEARLY (−20%)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {plans.map(plan => {
              const price = billing === 'yearly' ? Math.round(plan.price * 0.8) : plan.price
              return (
                <div key={plan.id} className={`relative border p-6 ${plan.popular ? 'border-navy' : 'border-gray-100'}`}>
                  {plan.popular && (
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-mist-blue text-navy font-montserrat text-[8px] tracking-widest px-3 py-1" style={{ letterSpacing: '0.18em' }}>MOST POPULAR</div>
                  )}
                  <div className="mb-5">
                    <h3 className="font-montserrat font-medium text-sm text-navy mb-1" style={{ letterSpacing: '0.08em' }}>{plan.name.toUpperCase()}</h3>
                    <p className="font-inter text-xs text-gray-400">{plan.tagline}</p>
                  </div>
                  <div className="mb-5">
                    <span className="font-montserrat font-light text-4xl text-navy">${price}</span>
                    <span className="font-inter text-xs text-gray-400"> /month</span>
                    {billing === 'yearly' && <p className="font-inter text-[10px] text-mist-blue mt-0.5">Billed annually (${price * 12}/yr)</p>}
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2">
                        <Check size={11} className="text-mist-blue flex-shrink-0" strokeWidth={2} />
                        <span className="font-inter text-xs text-navy">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-2.5 font-montserrat text-[10px] tracking-widest transition-all ${plan.popular ? 'bg-navy text-white hover:bg-opacity-90' : 'border border-navy text-navy hover:bg-navy hover:text-white'}`} style={{ letterSpacing: '0.15em' }}>
                    CHOOSE PLAN
                  </button>
                </div>
              )
            })}
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10 pt-10 border-t border-gray-100">
            {[
              { icon: '↩', title: 'CANCEL ANYTIME', desc: 'No long-term contracts.' },
              { icon: '◎', title: 'EXPERT SUPPORT', desc: 'We are here for you.' },
              { icon: '★', title: '100% SATISFACTION', desc: 'Love it or we fix it.' },
              { icon: '🔒', title: 'SECURE PAYMENT', desc: 'Safe & encrypted.' },
            ].map(b => (
              <div key={b.title} className="flex items-start gap-3">
                <span className="text-mist-blue text-lg">{b.icon}</span>
                <div>
                  <p className="font-montserrat font-medium text-[9px] text-navy mb-0.5" style={{ letterSpacing: '0.12em' }}>{b.title}</p>
                  <p className="font-inter text-xs text-gray-400">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-14 bg-soft-ice px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <p className="section-label text-center mb-3">HAVE QUESTIONS?</p>
          <h2 className="font-montserrat font-light text-2xl text-navy text-center mb-8" style={{ letterSpacing: '0.08em' }}>FREQUENTLY ASKED</h2>
          <div>{faqs.map(faq => <FaqItem key={faq.q} {...faq} />)}</div>
          <div className="text-center mt-8">
            <p className="font-inter text-sm text-gray-400 mb-4">Still have questions?</p>
            <button className="btn-primary">CONTACT US</button>
          </div>
        </div>
      </section>

    </div>
  )
}
