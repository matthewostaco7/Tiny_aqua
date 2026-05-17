import { useState } from 'react'
import { ChevronRight, Check } from 'lucide-react'
import { products, ecosystemSteps, livestock as livestockData } from '../data/products'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const tanks = products.filter(p => p.category === 'nano-tanks')
const hardscapeItems = products.filter(p => p.category === 'hardscape')
const plantItems = products.filter(p => p.category === 'plants')
const equipmentItems = products.filter(p => ['lighting', 'co2-systems', 'accessories'].includes(p.category)).slice(0, 4)

function StepIndicator({ steps, current }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex flex-col items-center ${i <= current ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${i < current ? 'bg-navy border-navy text-white' : i === current ? 'border-navy bg-soft-ice text-navy' : 'border-gray-200 text-gray-400'}`}>
              {i < current ? <Check size={12} strokeWidth={2} /> : <span className="font-montserrat text-[10px]">{step.number}</span>}
            </div>
            <span className={`font-montserrat text-[8px] mt-1 tracking-widest hidden lg:block ${i === current ? 'text-navy' : 'text-gray-400'}`} style={{ letterSpacing: '0.15em' }}>
              {step.label.toUpperCase()}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 lg:w-12 h-px mx-1 ${i < current ? 'bg-navy' : 'bg-gray-200'} -mt-4`} />
          )}
        </div>
      ))}
    </div>
  )
}

function TankCard({ tank, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(tank)}
      className={`w-full text-left p-4 border transition-all ${selected ? 'border-navy bg-soft-ice' : 'border-gray-100 hover:border-mist-blue'}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected ? 'border-navy' : 'border-gray-300'}`}>
          {selected && <div className="w-2 h-2 rounded-full bg-navy" />}
        </div>
        <div className={`w-12 h-12 flex-shrink-0 bg-gradient-to-br ${tank.gradient} flex items-center justify-center`}>
          <svg viewBox="0 0 50 40" fill="none" className="w-10 h-8">
            <rect x="3" y="4" width="44" height="32" rx="5" fill="#EAF4F8" stroke="#0D2742" strokeWidth="1.5" opacity="0.8" />
            <path d="M3 24 C13 18, 24 28, 32 22 C40 16, 45 24, 47 22 L47 36 Q47 36 45 36 L5 36 Q3 36 3 36 Z" fill="#B7D6E5" opacity="0.6" />
          </svg>
        </div>
        <div>
          <p className="font-montserrat font-medium text-xs text-navy" style={{ letterSpacing: '0.05em' }}>{tank.name}</p>
          <p className="font-inter text-xs text-gray-400">{tank.specs?.volume || tank.size}</p>
        </div>
        <p className="ml-auto font-montserrat font-medium text-sm text-navy">${tank.price}</p>
      </div>
    </button>
  )
}

function ItemCard({ item, selected, onToggle }) {
  return (
    <div
      onClick={() => onToggle(item)}
      className={`border p-4 cursor-pointer transition-all ${selected ? 'border-navy bg-soft-ice' : 'border-gray-100 hover:border-mist-blue'}`}
    >
      <div className={`aspect-square bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 relative`}>
        {selected && (
          <div className="absolute top-2 right-2 w-5 h-5 bg-navy rounded-full flex items-center justify-center">
            <Check size={10} className="text-white" strokeWidth={2} />
          </div>
        )}
        <svg viewBox="0 0 80 65" fill="none" className="w-full h-full">
          <rect x="8" y="10" width="64" height="45" rx="6" fill="#EAF4F8" stroke="#0D2742" strokeWidth="1" opacity="0.7" />
          <path d="M8 35 C20 28, 36 42, 48 35 C60 28, 72 38, 72 35 L72 55 Q72 55 70 55 L10 55 Q8 55 8 55 Z" fill="#B7D6E5" opacity="0.5" />
        </svg>
      </div>
      <h4 className="font-montserrat font-medium text-xs text-navy" style={{ letterSpacing: '0.05em' }}>{item.name}</h4>
      <p className="font-inter text-xs text-gray-400 mt-0.5 mb-2 line-clamp-1">{item.tagline}</p>
      <p className="font-montserrat text-sm text-navy">${item.price}</p>
    </div>
  )
}

function LivestockCard({ animal, selected, onToggle }) {
  return (
    <div
      onClick={() => onToggle(animal)}
      className={`border p-4 cursor-pointer transition-all ${selected ? 'border-navy bg-soft-ice' : 'border-gray-100 hover:border-mist-blue'}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-montserrat font-medium text-xs text-navy" style={{ letterSpacing: '0.05em' }}>{animal.name}</h4>
          <p className="font-inter text-xs text-gray-400 mt-1">{animal.description}</p>
        </div>
        <div className={`w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 ml-2 ${selected ? 'border-navy bg-navy' : 'border-gray-200'}`}>
          {selected && <Check size={10} className="text-white" strokeWidth={2} />}
        </div>
      </div>
      <p className="font-montserrat text-sm text-navy mt-2">${animal.price}</p>
    </div>
  )
}

export default function EcosystemBuilder() {
  const [step, setStep] = useState(0)
  const [selectedTank, setSelectedTank] = useState(null)
  const [selectedHardscape, setSelectedHardscape] = useState([])
  const [selectedPlants, setSelectedPlants] = useState([])
  const [selectedLivestock, setSelectedLivestock] = useState([])
  const [selectedEquipment, setSelectedEquipment] = useState([])
  const [selectedCarePlan, setSelectedCarePlan] = useState(null)
  const { addItem } = useCart()
  const navigate = useNavigate()

  const toggleItem = (arr, setArr, item) => {
    setArr(arr.find(i => i.id === item.id) ? arr.filter(i => i.id !== item.id) : [...arr, item])
  }

  const ecosystemTotal = [
    selectedTank?.price || 0,
    ...selectedHardscape.map(i => i.price),
    ...selectedPlants.map(i => i.price),
    ...selectedLivestock.map(i => i.price),
    ...selectedEquipment.map(i => i.price),
  ].reduce((a, b) => a + b, 0)

  const ecosystemItems = [
    ...(selectedTank ? [selectedTank] : []),
    ...selectedHardscape,
    ...selectedPlants,
    ...selectedLivestock,
    ...selectedEquipment,
  ]

  const handleAddAllToCart = () => {
    ecosystemItems.forEach(item => addItem({ id: item.id, name: item.name, price: item.price, slug: item.slug || item.id }))
    navigate('/cart')
  }

  const carePlans = [
    { id: 'essential', name: 'Essential Care', price: 29, features: ['Water change (bi/month)', 'Plant trimming', 'Water testing'] },
    { id: 'nature', name: 'Nature Care', price: 59, features: ['Water change (4x/month)', 'Plant trimming', 'Water testing', 'CO2 refill', 'Fertilisation'] },
    { id: 'elite', name: 'Elite Ecosystem', price: 99, features: ['Unlimited maintenance', 'CO2 & fertilizer', 'Emergency support', 'Monthly ecosystem check'] },
  ]

  const stepContent = [
    /* 0: Tank */
    <div key="tank">
      <h2 className="font-montserrat font-light text-2xl text-navy mb-2" style={{ letterSpacing: '0.1em' }}>CHOOSE YOUR TANK</h2>
      <p className="font-inter text-sm text-gray-400 mb-8">Select the perfect tank for your ecosystem.</p>
      <div className="grid grid-cols-1 gap-3">
        {tanks.map(tank => (
          <TankCard key={tank.id} tank={tank} selected={selectedTank?.id === tank.id} onSelect={setSelectedTank} />
        ))}
      </div>
    </div>,

    /* 1: Hardscape */
    <div key="hardscape">
      <h2 className="font-montserrat font-light text-2xl text-navy mb-2" style={{ letterSpacing: '0.1em' }}>CHOOSE HARDSCAPE</h2>
      <p className="font-inter text-sm text-gray-400 mb-8">Stones and driftwood shape the character of your scape.</p>
      <div className="grid grid-cols-2 gap-4">
        {hardscapeItems.map(item => (
          <ItemCard key={item.id} item={item} selected={selectedHardscape.some(i => i.id === item.id)} onToggle={item => toggleItem(selectedHardscape, setSelectedHardscape, item)} />
        ))}
      </div>
    </div>,

    /* 2: Plants */
    <div key="plants">
      <h2 className="font-montserrat font-light text-2xl text-navy mb-2" style={{ letterSpacing: '0.1em' }}>ADD PLANTS</h2>
      <p className="font-inter text-sm text-gray-400 mb-8">Choose plant species for your living ecosystem.</p>
      <div className="grid grid-cols-2 gap-4">
        {plantItems.map(item => (
          <ItemCard key={item.id} item={item} selected={selectedPlants.some(i => i.id === item.id)} onToggle={item => toggleItem(selectedPlants, setSelectedPlants, item)} />
        ))}
      </div>
    </div>,

    /* 3: Livestock */
    <div key="livestock">
      <h2 className="font-montserrat font-light text-2xl text-navy mb-2" style={{ letterSpacing: '0.1em' }}>ADD LIVESTOCK</h2>
      <p className="font-inter text-sm text-gray-400 mb-8">Choose fish and shrimp for your ecosystem.</p>
      <div className="grid grid-cols-1 gap-3">
        {livestockData.map(animal => (
          <LivestockCard key={animal.id} animal={animal} selected={selectedLivestock.some(i => i.id === animal.id)} onToggle={item => toggleItem(selectedLivestock, setSelectedLivestock, item)} />
        ))}
      </div>
    </div>,

    /* 4: Equipment */
    <div key="equipment">
      <h2 className="font-montserrat font-light text-2xl text-navy mb-2" style={{ letterSpacing: '0.1em' }}>ADD EQUIPMENT</h2>
      <p className="font-inter text-sm text-gray-400 mb-8">Lighting, CO2, and accessories for a thriving tank.</p>
      <div className="grid grid-cols-2 gap-4">
        {equipmentItems.map(item => (
          <ItemCard key={item.id} item={item} selected={selectedEquipment.some(i => i.id === item.id)} onToggle={item => toggleItem(selectedEquipment, setSelectedEquipment, item)} />
        ))}
      </div>
    </div>,

    /* 5: Care Plan */
    <div key="care">
      <h2 className="font-montserrat font-light text-2xl text-navy mb-2" style={{ letterSpacing: '0.1em' }}>CHOOSE CARE PLAN</h2>
      <p className="font-inter text-sm text-gray-400 mb-8">Optional professional maintenance subscription.</p>
      <div className="grid grid-cols-1 gap-4">
        {carePlans.map(plan => (
          <button
            key={plan.id}
            onClick={() => setSelectedCarePlan(selectedCarePlan?.id === plan.id ? null : plan)}
            className={`text-left p-6 border transition-all ${selectedCarePlan?.id === plan.id ? 'border-navy bg-soft-ice' : 'border-gray-100 hover:border-mist-blue'}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-montserrat font-medium text-sm text-navy mb-3" style={{ letterSpacing: '0.05em' }}>{plan.name.toUpperCase()}</h4>
                <ul className="space-y-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-mist-blue text-xs">✓</span>
                      <span className="font-inter text-xs text-gray-500">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <p className="font-montserrat font-light text-2xl text-navy">${plan.price}</p>
                <p className="font-inter text-xs text-gray-400">/month</p>
              </div>
            </div>
          </button>
        ))}
        <button
          onClick={() => setSelectedCarePlan(null)}
          className={`p-4 border text-left transition-all ${!selectedCarePlan ? 'border-navy' : 'border-gray-100 hover:border-mist-blue'}`}
        >
          <p className="font-montserrat text-xs text-gray-400" style={{ letterSpacing: '0.1em' }}>SKIP — I'LL MAINTAIN IT MYSELF</p>
        </button>
      </div>
    </div>,

    /* 6: Summary */
    <div key="summary">
      <h2 className="font-montserrat font-light text-2xl text-navy mb-2" style={{ letterSpacing: '0.1em' }}>YOUR ECOSYSTEM</h2>
      <p className="font-inter text-sm text-gray-400 mb-8">Review your custom ecosystem before adding to cart.</p>
      {ecosystemItems.length === 0 ? (
        <div className="text-center py-12 border border-gray-100">
          <p className="font-inter text-gray-400">No items selected. Go back to add items.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {ecosystemItems.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100">
              <p className="font-inter text-sm text-navy">{item.name}</p>
              <p className="font-montserrat text-sm text-navy">${item.price}</p>
            </div>
          ))}
          {selectedCarePlan && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <p className="font-inter text-sm text-navy">{selectedCarePlan.name} (subscription)</p>
              <p className="font-montserrat text-sm text-navy">${selectedCarePlan.price}/mo</p>
            </div>
          )}
          <div className="flex items-center justify-between pt-4">
            <p className="font-montserrat font-medium text-sm text-navy" style={{ letterSpacing: '0.1em' }}>TOTAL</p>
            <p className="font-montserrat font-medium text-xl text-navy">${ecosystemTotal.toFixed(2)}</p>
          </div>
          <button onClick={handleAddAllToCart} className="btn-primary w-full text-center mt-6">
            ADD ECOSYSTEM TO CART →
          </button>
        </div>
      )}
    </div>,
  ]

  return (
    <div className="min-h-screen pt-20 bg-white">

      {/* Header */}
      <div className="bg-soft-ice border-b border-gray-100 py-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-2">GUIDED BUILDER</p>
          <h1 className="font-montserrat font-light text-3xl text-navy mb-8" style={{ letterSpacing: '0.15em' }}>BUILD YOUR ECOSYSTEM</h1>
          <StepIndicator steps={ecosystemSteps} current={step} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main content */}
          <div className="lg:col-span-2">
            {stepContent[step]}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-100">
              <button
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
                className={`font-montserrat text-xs tracking-widest ${step === 0 ? 'text-gray-200' : 'text-navy hover:text-mist-blue'} transition-colors`}
                style={{ letterSpacing: '0.15em' }}
              >
                ← BACK
              </button>
              {step < ecosystemSteps.length - 1 ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  className="btn-primary flex items-center gap-2"
                >
                  CONTINUE <ChevronRight size={14} />
                </button>
              ) : null}
            </div>
          </div>

          {/* Sidebar — Your Ecosystem */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-soft-ice p-6">
              <h3 className="font-montserrat font-medium text-xs tracking-widest text-navy mb-6" style={{ letterSpacing: '0.2em' }}>YOUR ECOSYSTEM</h3>

              {/* Tank preview */}
              <div className="bg-white aspect-square flex items-center justify-center mb-6 border border-gray-100">
                {selectedTank ? (
                  <div className="w-4/5 h-4/5">
                    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
                      <rect x="15" y="20" width="170" height="120" rx="12" fill="#EAF4F8" stroke="#0D2742" strokeWidth="2" opacity="0.9" />
                      {selectedHardscape.length > 0 && (
                        <ellipse cx="100" cy="138" rx="30" ry="8" fill="#8d7b6b" opacity="0.4" />
                      )}
                      {selectedPlants.length > 0 && (
                        <>
                          <rect x="35" y="95" width="8" height="30" rx="4" fill="#4caf50" opacity="0.5" transform="rotate(-5 35 125)" />
                          <rect x="48" y="85" width="6" height="40" rx="3" fill="#66bb6a" opacity="0.6" transform="rotate(3 48 125)" />
                          <rect x="150" y="90" width="7" height="35" rx="3.5" fill="#4caf50" opacity="0.5" transform="rotate(5 150 125)" />
                        </>
                      )}
                      <path d="M15 90 C45 75, 80 105, 110 88 C140 72, 165 95, 185 85 L185 140 Q185 140 177 140 L23 140 Q15 140 15 140 Z" fill="#B7D6E5" opacity="0.5" />
                      {selectedLivestock.length > 0 && (
                        <>
                          <ellipse cx="80" cy="85" rx="8" ry="4" fill="#ef5350" opacity="0.6" transform="rotate(-15 80 85)" />
                          <ellipse cx="120" cy="78" rx="7" ry="3.5" fill="#42a5f5" opacity="0.6" transform="rotate(10 120 78)" />
                        </>
                      )}
                    </svg>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full border border-dashed border-mist-blue flex items-center justify-center mx-auto mb-2">
                      <span className="text-mist-blue text-xl">+</span>
                    </div>
                    <p className="font-inter text-xs text-gray-300">Select a tank to begin</p>
                  </div>
                )}
              </div>

              {/* Items list */}
              <div className="space-y-2 mb-6 max-h-48 overflow-y-auto">
                {ecosystemItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <p className="font-inter text-xs text-gray-500 truncate">{item.name}</p>
                    <p className="font-montserrat text-xs text-navy ml-2 flex-shrink-0">${item.price}</p>
                  </div>
                ))}
                {ecosystemItems.length === 0 && (
                  <p className="font-inter text-xs text-gray-300 text-center py-3">No items selected yet</p>
                )}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <span className="font-montserrat text-xs text-navy" style={{ letterSpacing: '0.1em' }}>{ecosystemItems.length} ITEM{ecosystemItems.length !== 1 ? 'S' : ''}</span>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-inter text-[9px] text-gray-400">TOTAL</p>
                    <p className="font-montserrat font-medium text-lg text-navy">${ecosystemTotal.toFixed(2)}</p>
                  </div>
                  {step < ecosystemSteps.length - 1 ? (
                    <button onClick={() => setStep(s => s + 1)} className="btn-primary py-2 text-[10px] whitespace-nowrap">
                      CONTINUE →
                    </button>
                  ) : (
                    <button onClick={handleAddAllToCart} className="btn-primary py-2 text-[10px] whitespace-nowrap">
                      ADD TO CART
                    </button>
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
