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
    )`,
    `linear-gradient(
      to top left, 
      white min(var(--${prefix}frequency-low, 0%), 100%), 
      #0000 calc(min(var(--${prefix}frequency-low, 0%), 100%) + 1px)
    )`,
    `linear-gradient(
      to bottom right, 
      white min(var(--${prefix}frequency-low, 0%), 100%), 
      #0000 calc(min(var(--${prefix}frequency-low, 0%), 100%) + 1px)
    )`
	]
}

export function radial(prefix = '') {
	return [`
		radial-gradient(
      circle at center, 
      white min(var(--${prefix}frequency-low, 0%), 100%), 
      #0000 calc(min(var(--${prefix}frequency-low, 0%), 100%) + 1px)
    )`,`
		radial-gradient(
      circle at center, 
      white min(var(--${prefix}frequency-high, 0%), 100%), 
      #0000 calc(min(var(--${prefix}frequency-high, 0%), 100%) + 1px)
    )`,`
    radial-gradient(
      circle at top right, 
      white min(var(--${prefix}frequency-high, 0%), 100%), 
      #0000 calc(min(var(--${prefix}frequency-high, 0%), 100%) + 1px)
    )`,`
    radial-gradient(
      circle at bottom left, 
      white min(var(--${prefix}frequency-high, 0%), 100%), 
      #0000 calc(min(var(--${prefix}frequency-high, 0%), 100%) + 1px)
    )`
  ]
}

export function conic(prefix = '') {
	return [`
		conic-gradient(
      from 130deg at top left, 
      white 0 min(var(--${prefix}frequency-low, 0%), 100%), 
      #0000 0
    )`,`
		conic-gradient(
      from 320deg at bottom right, 
      white min(var(--${prefix}frequency-low, 0%), 100%), 
      #0000 0
    )`
  ]
}