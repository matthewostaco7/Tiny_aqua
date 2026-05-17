export default function Logo({ size = 'md', dark = true }) {
  const scales = { sm: 0.6, md: 1, lg: 1.4 }
  const s = scales[size] || 1
  const color = dark ? '#0D2742' : '#FFFFFF'
  const blueColor = dark ? '#B7D6E5' : '#B7D6E5'

  return (
    <div className="flex items-center gap-3" style={{ transform: `scale(${s})`, transformOrigin: 'left center' }}>
      <svg width="42" height="28" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="40" height="26" rx="13" stroke={color} strokeWidth="1.8" fill="none" />
        <path
          d="M2 16 C8 10, 16 20, 21 14 C26 8, 34 18, 40 14"
          stroke={blueColor}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M2 18 C8 12, 16 22, 21 16 C26 10, 34 20, 40 16 L40 26 Q40 27 39 27 L3 27 Q2 27 2 26 Z"
          fill={blueColor}
          opacity="0.35"
        />
        <path
          d="M2 20 C8 15, 16 24, 21 19 C26 14, 34 22, 40 19 L40 26 Q40 27 39 27 L3 27 Q2 27 2 26 Z"
          fill={blueColor}
          opacity="0.5"
        />
      </svg>
      <div className="leading-none">
        <div
          className="font-montserrat font-light tracking-widest2 text-sm"
          style={{ color, letterSpacing: '0.28em', fontSize: '13px' }}
        >
          TINY AQUA
        </div>
      </div>
    </div>
  )
}
