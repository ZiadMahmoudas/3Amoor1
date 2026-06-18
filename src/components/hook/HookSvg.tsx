export default function HookSvg({
  width = 55,
  height = 100,
  className = '',
}: {
  width?: number
  height?: number
  className?: string
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 60 110" className={className} fill="none">
      <circle cx="30" cy="8" r="7" stroke="currentColor" strokeWidth="3" />
      <circle cx="30" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <line x1="30" y1="15" x2="30" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M30 50 Q30 82 17 90 Q0 100 5 80 Q8 66 22 63 Q34 60 34 73"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M5 80 L0 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="3" cy="77" r="4" fill="currentColor" opacity="0.65" />
      <circle cx="3" cy="77" r="8" fill="currentColor" opacity="0.15" />
    </svg>
  )
}
