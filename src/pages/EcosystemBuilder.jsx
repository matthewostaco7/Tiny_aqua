import { useState } from 'react'
import { ChevronRight, Check, Plus, Minus } from 'lucide-react'
import { products, ecosystemSteps, livestock as livestockData } from '../data/products'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const tanks = products.filter(p => p.category === 'nano-tanks')
const designItems = products.filter(p => p.category === 'design')
const plantItems = products.filter(p => p.category === 'plants')
const equipmentItems = products.filter(p => ['lighting', 'co2-systems', 'accessories'].includes(p.category)).slice(0, 4)

function StepIndicator({ steps, current }) {
  return (
    <div className="flex items-center overflow-x-auto pb-1">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center flex-shrink-0">
          <div className={`flex flex-col items-center ${i <= current ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${i < current ? 'bg-navy border-navy text-white' : i === current ? 'border-navy bg-soft-ice text-navy' : 'border-gray-200 text-gray-400'}`}>
              {i < current ? <Check size={11} strokeWidth={2} /> : <span className="font-montserrat text-[9px]">{step.number}</span>}
            </div>
            <span className={`font-montserrat text-[7px] mt-1 tracking-widest whitespace-nowrap ${i === current ? 'text-navy' : 'text-gray-400'}`} style={{ letterSpacing: '0.12em' }}>
              {step.label.toUpperCase()}
            </span>
          </div>
          {i < steps.length - 1 && <div className={`w-6 md:w-10 h-px mx-1 flex-shrink-0 -mt-3 ${i < current ? 'bg-navy' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  )
}

function TankCard({ tank, selected, onSelect }) {
  return (
    <button onClick={() => onSelect(tank)} className={`w-full text-left p-3 border transition-all ${selected ? 'border-navy bg-soft-ice' : 'border-gray-100 hover:border-mist-blue'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'border-navy' : 'border-gray-300'}`}>
          {selected && <div className="w-2 h-2 rounded-full bg-navy" />}
        </div>
        <div className={`w-11 h-11 flex-shrink-0 bg-gradient-to-br ${tank.gradient} flex items-center justify-center`}>
          <svg viewBox="0 0 50 40" fill="none" className="w-9 h-7">
            <rect x="3" y="4" width="44" height="32" rx="5" fill="#EAF4F8" stroke="#0D2742" strokeWidth="1.5" opacity="0.8" />
            <path d="M3 24 C13 18, 24 28, 32 22 C40 16, 45 24, 47 22 L47 36 Q47 36 45 36 L5 36 Q3 36 3 36 Z" fill="#B7D6E5" opacity="0.6" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-montserrat font-medium text-xs text-navy">{tank.name}</p>
          <p className="font-inter text-[10px] text-gray-400">{tank.specs?.dimensions} · {tank.specs?.volume || tank.size}</p>
        </div>
        <p className="font-montserrat font-medium text-sm text-navy flex-shrink-0">₱{tank.price.toLocaleString()}</p>
      </div>
    </button>
  )
}

function ItemCard({ item, selected, onToggle }) {
  return (
    <div onClick={() => onToggle(item)} className={`border p-3 cursor-pointer transition-all ${selected ? 'border-navy bg-soft-ice' : 'border-gray-100 hover:border-mist-blue'}`}>
      <div className={`aspect-square bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-2 relative`}>
        {selected && <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-navy rounded-full flex items-center justify-center"><Check size={9} className="text-white" strokeWidth={2} /></div>}
        <svg viewBox="0 0 80 65" fill="none" className="w-full h-full">
          <rect x="8" y="10" width="64" height="45" rx="6" fill="#EAF4F8" stroke="#0D2742" strokeWidth="1" opacity="0.7" />
          <path d="M8 35 C20 28, 36 42, 48 35 C60 28, 72 38, 72 35 L72 55 Q72 55 70 55 L10 55 Q8 55 8 55 Z" fill="#B7D6E5" opacity="0.5" />
        </svg>
      </div>
      <h4 className="font-montserrat font-medium text-[10px] text-navy leading-snug">{item.name}</h4>
      <p className="font-inter text-[9px] text-gray-400 mt-0.5 mb-1.5 line-clamp-1">{item.tagline}</p>
      <p className="font-montserrat text-xs text-navy">₱{item.price.toLocaleString()}</p>
    </div>
  )
}

function LivestockCard({ animal, qty, onAdd, onRemove }) {
  return (
    <div className={`border p-3 transition-all ${qty > 0 ? 'border-navy bg-soft-ice' : 'border-gray-100'}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-montserrat font-medium text-xs text-navy">{animal.name}</h4>
          <p className="font-inter text-[10px] text-gray-400 mt-0.5 leading-snug">{animal.description}</p>
          <p className="font-montserrat text-xs text-navy mt-1.5">₱{animal.pricePerUnit}/pc</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={onRemove}
            disabled={qty === 0}
            className={`w-7 h-7 border flex items-center justify-center transition-colors ${qty > 0 ? 'border-navy text-navy hover:bg-navy hover:text-white' : 'border-gray-200 text-gray-300 cursor-not-allowed'}`}
          >
            <Minus size={11} strokeWidth={2} />
          </button>
          <span className="w-6 text-center font-inter text-sm text-navy">{qty}</span>
          <button
            onClick={onAdd}
            className="w-7 h-7 border border-navy text-navy flex items-center justify-center hover:bg-navy hover:text-white transition-colors"
          >
            <Plus size={11} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function EcosystemBuilder() {
  const [step, setStep] = useState(0)
  const [selectedTank, setSelectedTank] = useState(null)
  const [selectedDesign, setSelectedDesign] = useState([])
  const [selectedPlants, setSelectedPlants] = useState([])
  const [livestockQty, setLivestockQty] = useState({})
  const [selectedEquipment, setSelectedEquipment] = useState([])
  const [selectedCarePlan, setSelectedCarePlan] = useState(null)
  const { addItem } = useCart()
  const navigate = useNavigate()

  const toggle = (arr, setArr, item) =>
    setArr(arr.find(i => i.id === item.id) ? arr.filter(i => i.id !== item.id) : [...arr, item])

  const getLQty = id => livestockQty[id] || 0
  const adjustLQty = (id, delta) => {
    const newQty = Math.max(0, getLQty(id) + delta)
    setLivestockQty(prev => {
      if (newQty === 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: newQty }
    })
  }

  const selectedLivestockItems = livestockData.filter(a => getLQty(a.id) > 0)

  const ecosystemProductItems = [
    ...(selectedTank ? [selectedTank] : []),
    ...selectedDesign,
    ...selectedPlants,
    ...selectedEquipment,
  ]

  const livestockTotal = selectedLivestockItems.reduce((s, a) => s + a.pricePerUnit * getLQty(a.id), 0)
  const total = ecosystemProductItems.reduce((s, i) => s + i.price, 0) + livestockTotal

  const handleAddAll = () => {
    ecosystemProductItems.forEach(item => addItem({ id: item.id, name: item.name, price: item.price, slug: item.slug || item.id }))
    selectedLivestockItems.forEach(a => addItem({ id: a.id, name: a.name, price: a.pricePerUnit, slug: a.id }, getLQty(a.id)))
    navigate('/cart')
  }

  const carePlans = [
    { id: 'essential', name: 'Essential Care', price: 1500, features: ['Water change (bi/month)', 'Plant trimming', 'Water testing'] },
    { id: 'nature', name: 'Nature Care', price: 3000, features: ['Water change (4x/month)', 'Plant trimming', 'CO2 refill', 'Fertilisation'] },
    { id: 'elite', name: 'Elite Ecosystem', price: 5000, features: ['Unlimited maintenance', 'Emergency support', 'Monthly ecosystem check'] },
  ]

  const allItemCount = ecosystemProductItems.length + selectedLivestockItems.reduce((s, a) => s + getLQty(a.id), 0)

  const stepContent = [
    <div key="tank">
      <h2 className="font-montserrat font-light text-lg md:text-xl text-navy mb-1" style={{ letterSpacing: '0.08em' }}>CHOOSE YOUR TANK</h2>
      <p className="font-inter text-sm text-gray-400 mb-5">Select the perfect tank for your ecosystem.</p>
      <div className="space-y-2">
        {tanks.map(t => <TankCard key={t.id} tank={t} selected={selectedTank?.id === t.id} onSelect={setSelectedTank} />)}
      </div>
    </div>,

    <div key="design">
      <h2 className="font-montserrat font-light text-lg md:text-xl text-navy mb-1" style={{ letterSpacing: '0.08em' }}>CHOOSE DESIGN</h2>
      <p className="font-inter text-sm text-gray-400 mb-5">Stones and driftwood shape your scape.</p>
      <div className="grid grid-cols-2 gap-3">
        {designItems.map(item => <ItemCard key={item.id} item={item} selected={selectedDesign.some(i => i.id === item.id)} onToggle={i => toggle(selectedDesign, setSelectedDesign, i)} />)}
      </div>
    </div>,

    <div key="plants">
      <h2 className="font-montserrat font-light text-lg md:text-xl text-navy mb-1" style={{ letterSpacing: '0.08em' }}>ADD PLANTS</h2>
      <p className="font-inter text-sm text-gray-400 mb-5">Choose plant species for your ecosystem.</p>
      <div className="grid grid-cols-2 gap-3">
        {plantItems.map(item => <ItemCard key={item.id} item={item} selected={selectedPlants.some(i => i.id === item.id)} onToggle={i => toggle(selectedPlants, setSelectedPlants, i)} />)}
      </div>
    </div>,

    <div key="livestock">
      <h2 className="font-montserrat font-light text-lg md:text-xl text-navy mb-1" style={{ letterSpacing: '0.08em' }}>ADD LIVESTOCK</h2>
      <p className="font-inter text-sm text-gray-400 mb-5">Choose fish and shrimp — set how many you want.</p>
      <div className="space-y-2">
        {livestockData.map(a => (
          <LivestockCard
            key={a.id}
            animal={a}
            qty={getLQty(a.id)}
            onAdd={() => adjustLQty(a.id, 1)}
            onRemove={() => adjustLQty(a.id, -1)}
          />
        ))}
      </div>
    </div>,

    <div key="equipment">
      <h2 className="font-montserrat font-light text-lg md:text-xl text-navy mb-1" style={{ letterSpacing: '0.08em' }}>ADD EQUIPMENT</h2>
      <p className="font-inter text-sm text-gray-400 mb-5">Lighting, CO2, and accessories.</p>
      <div className="grid grid-cols-2 gap-3">
        {equipmentItems.map(item => <ItemCard key={item.id} item={item} selected={selectedEquipment.some(i => i.id === item.id)} onToggle={i => toggle(selectedEquipment, setSelectedEquipment, i)} />)}
      </div>
    </div>,

    <div key="care">
      <h2 className="font-montserrat font-light text-lg md:text-xl text-navy mb-1" style={{ letterSpacing: '0.08em' }}>CARE PLAN</h2>
      <p className="font-inter text-sm text-gray-400 mb-5">Optional professional maintenance.</p>
      <div className="space-y-3">
        {carePlans.map(plan => (
          <button key={plan.id} onClick={() => setSelectedCarePlan(selectedCarePlan?.id === plan.id ? null : plan)} className={`w-full text-left p-4 border transition-all ${selectedCarePlan?.id === plan.id ? 'border-navy bg-soft-ice' : 'border-gray-100 hover:border-mist-blue'}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-montserrat font-medium text-xs text-navy mb-2">{plan.name.toUpperCase()}</h4>
                <ul className="space-y-1">{plan.features.map(f => <li key={f} className="flex items-center gap-1.5 font-inter text-xs text-gray-500"><span className="text-mist-blue text-[10px]">✓</span>{f}</li>)}</ul>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-montserrat font-light text-xl text-navy">₱{plan.price.toLocaleString()}</p>
                <p className="font-inter text-[10px] text-gray-400">/mo</p>
              </div>
            </div>
          </button>
        ))}
        <button onClick={() => setSelectedCarePlan(null)} className={`w-full p-3 border text-left transition-all ${!selectedCarePlan ? 'border-navy' : 'border-gray-100 hover:border-mist-blue'}`}>
          <p className="font-montserrat text-[10px] text-gray-400" style={{ letterSpacing: '0.08em' }}>SKIP — I'LL MAINTAIN IT MYSELF</p>
        </button>
      </div>
    </div>,

    <div key="summary">
      <h2 className="font-montserrat font-light text-lg md:text-xl text-navy mb-1" style={{ letterSpacing: '0.08em' }}>YOUR ECOSYSTEM</h2>
      <p className="font-inter text-sm text-gray-400 mb-5">Review before adding to cart.</p>
      {ecosystemProductItems.length === 0 && selectedLivestockItems.length === 0 ? (
        <div className="text-center py-10 border border-gray-100">
          <p className="font-inter text-sm text-gray-400">No items selected yet.</p>
          <button onClick={() => setStep(0)} className="mt-3 font-montserrat text-xs text-navy border-b border-navy">START OVER</button>
        </div>
      ) : (
        <div>
          <div className="space-y-2.5 mb-5">
            {ecosystemProductItems.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <p className="font-inter text-sm text-navy">{item.name}</p>
                <p className="font-montserrat text-sm text-navy">₱{item.price.toLocaleString()}</p>
              </div>
            ))}
            {selectedLivestockItems.map(a => (
              <div key={a.id} className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <p className="font-inter text-sm text-navy">{a.name} <span className="text-gray-400 text-xs">× {getLQty(a.id)}</span></p>
                <p className="font-montserrat text-sm text-navy">₱{(a.pricePerUnit * getLQty(a.id)).toLocaleString()}</p>
              </div>
            ))}
            {selectedCarePlan && (
              <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <p className="font-inter text-sm text-navy">{selectedCarePlan.name} <span className="text-gray-400 text-xs">(subscription)</span></p>
                <p className="font-montserrat text-sm text-navy">₱{selectedCarePlan.price.toLocaleString()}/mo</p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 mb-6">
            <p className="font-montserrat font-medium text-xs text-navy" style={{ letterSpacing: '0.08em' }}>TOTAL</p>
            <p className="font-montserrat font-medium text-xl text-navy">₱{total.toLocaleString()}</p>
          </div>
          <button onClick={handleAddAll} className="btn-primary w-full text-center">ADD ECOSYSTEM TO CART →</button>
        </div>
      )}
    </div>,
  ]

  return (
    <div className="min-h-screen pt-14 lg:pt-16 bg-white">

      {/* Header */}
      <div className="bg-soft-ice border-b border-gray-100 py-6 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-1">GUIDED BUILDER</p>
          <h1 className="font-montserrat font-light text-xl md:text-2xl text-navy mb-5" style={{ letterSpacing: '0.12em' }}>BUILD YOUR ECOSYSTEM</h1>
          <StepIndicator steps={ecosystemSteps} current={step} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

          {/* Main content */}
          <div className="lg:col-span-2">
            {stepContent[step]}

            {/* Nav */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className={`font-montserrat text-[10px] tracking-widest ${step === 0 ? 'text-gray-200' : 'text-navy hover:text-mist-blue'} transition-colors`} style={{ letterSpacing: '0.15em' }}>
                ← BACK
              </button>
              {step < ecosystemSteps.length - 1 && (
                <button onClick={() => setStep(s => s + 1)} className="btn-primary flex items-center gap-2">
                  CONTINUE <ChevronRight size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-soft-ice p-5">
              <h3 className="font-montserrat font-medium text-[9px] tracking-widest text-navy mb-4" style={{ letterSpacing: '0.18em' }}>YOUR ECOSYSTEM</h3>

              {/* Preview */}
              <div className="bg-white aspect-square flex items-center justify-center mb-4 border border-gray-100">
                {selectedTank ? (
                  <svg viewBox="0 0 200 160" fill="none" className="w-4/5 h-4/5">
                    <rect x="15" y="20" width="170" height="120" rx="12" fill="#EAF4F8" stroke="#0D2742" strokeWidth="2" opacity="0.9" />
                    {selectedDesign.length > 0 && <ellipse cx="100" cy="138" rx="30" ry="8" fill="#8d7b6b" opacity="0.4" />}
                    {selectedPlants.length > 0 && <>
                      <rect x="35" y="95" width="8" height="30" rx="4" fill="#4caf50" opacity="0.5" transform="rotate(-5 35 125)" />
                      <rect x="48" y="85" width="6" height="40" rx="3" fill="#66bb6a" opacity="0.6" transform="rotate(3 48 125)" />
                    </>}
                    <path d="M15 90 C45 75, 80 105, 110 88 C140 72, 165 95, 185 85 L185 140 Q185 140 177 140 L23 140 Q15 140 15 140 Z" fill="#B7D6E5" opacity="0.5" />
                    {selectedLivestockItems.length > 0 && <ellipse cx="80" cy="85" rx="8" ry="4" fill="#ef5350" opacity="0.6" transform="rotate(-15 80 85)" />}
                  </svg>
                ) : (
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full border border-dashed border-mist-blue flex items-center justify-center mx-auto mb-2">
                      <span className="text-mist-blue text-lg">+</span>
                    </div>
                    <p className="font-inter text-[10px] text-gray-300">Select a tank to begin</p>
                  </div>
                )}
              </div>

              {/* Items */}
              <div className="space-y-1.5 mb-4 max-h-40 overflow-y-auto">
                {ecosystemProductItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <p className="font-inter text-[10px] text-gray-500 truncate">{item.name}</p>
                    <p className="font-montserrat text-[10px] text-navy ml-2 flex-shrink-0">₱{item.price.toLocaleString()}</p>
                  </div>
                ))}
                {selectedLivestockItems.map(a => (
                  <div key={a.id} className="flex items-center justify-between">
                    <p className="font-inter text-[10px] text-gray-500 truncate">{a.name} ×{getLQty(a.id)}</p>
                    <p className="font-montserrat text-[10px] text-navy ml-2 flex-shrink-0">₱{(a.pricePerUnit * getLQty(a.id)).toLocaleString()}</p>
                  </div>
                ))}
                {allItemCount === 0 && <p className="font-inter text-[10px] text-gray-300 text-center py-2">No items yet</p>}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                <span className="font-montserrat text-[9px] text-navy" style={{ letterSpacing: '0.1em' }}>{allItemCount} ITEM{allItemCount !== 1 ? 'S' : ''}</span>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-inter text-[8px] text-gray-400">TOTAL</p>
                    <p className="font-montserrat font-medium text-base text-navy">₱{total.toLocaleString()}</p>
                  </div>
                  {step < ecosystemSteps.length - 1 ? (
                    <button onClick={() => setStep(s => s + 1)} className="btn-primary py-1.5 text-[9px] whitespace-nowrap">NEXT →</button>
                  ) : (
                    <button onClick={handleAddAll} className="btn-primary py-1.5 text-[9px] whitespace-nowrap">ADD ALL</button>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
