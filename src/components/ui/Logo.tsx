export function Logo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <circle cx="20" cy="20" r="19" fill="#0f172a" />
      
      {/* Inner design - upward arrow/hands */}
      <path
        d="M20 8 L28 18 L24 18 L24 28 L16 28 L16 18 L12 18 Z"
        fill="#0ea5e9"
      />
      
      {/* Accent circle */}
      <circle cx="20" cy="20" r="19" fill="none" stroke="#0ea5e9" strokeWidth="2" />
    </svg>
  )
}
