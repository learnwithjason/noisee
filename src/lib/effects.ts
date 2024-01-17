export function linear(prefix = '') {
	return [
		`linear-gradient(
      to top right, 
      white min(var(--${prefix}frequency-high, 0%), 100%), 
      #0000 calc(min(var(--${prefix}frequency-high, 0%), 100%) + 1px)
    )`,
    `linear-gradient(
      to bottom left, 
      white min(var(--${prefix}frequency-low, 0%), 100%), 
      #0000 calc(min(var(--${prefix}frequency-low, 0%), 100%) + 1px)
    )`
	]
}

export function radial(prefix = '') {
	return [`
		radial-gradient(
      100vw circle at center, 
      white min(var(--${prefix}frequency-low, 0%), 100%), 
      #0000 calc(min(var(--${prefix}frequency-low, 0%), 100%) + 1px)
    )`,`
		radial-gradient(
      100vw circle at center, 
      white min(var(--${prefix}frequency-high, 0%), 100%), 
      #0000 calc(min(var(--${prefix}frequency-high, 0%), 100%) + 1px)
    )`
  ]
}

export function conic(prefix = '') {
	return [`
		conic-gradient(
      from 90deg at top left, 
      white 0 min(var(--${prefix}frequency-low, 0%), 100%), 
      #0000 0
    )`,`
		conic-gradient(
      from 180deg at top right, 
      white min(var(--${prefix}frequency-high, 0%), 100%), 
      #0000 0
    )`
  ]
}