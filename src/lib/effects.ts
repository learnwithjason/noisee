export function linear() {
	return [
		`linear-gradient(
      to top right, 
      white min(var(--frequency-high, 0%), 100%), 
      #0000 calc(min(var(--frequency-high, 0%), 100%) + 1px)
    )`,
    `linear-gradient(
      to bottom left, 
      white min(var(--frequency-low, 0%), 100%), 
      #0000 calc(min(var(--frequency-low, 0%), 100%) + 1px)
    )`
	]
}

export function radial() {
	return [`
		radial-gradient(
      100vw circle at center, 
      white min(var(--frequency-low, 0%), 100%), 
      #0000 calc(min(var(--frequency-low, 0%), 100%) + 1px)
    )`,`
		radial-gradient(
      100vw circle at center, 
      white min(var(--frequency-high, 0%), 100%), 
      #0000 calc(min(var(--frequency-high, 0%), 100%) + 1px)
    )`
  ]
}

export function conic() {
	return [`
		conic-gradient(
      from 90deg at top left, 
      white 0 min(var(--frequency-low, 0%), 100%), 
      #0000 0
    )`,`
		conic-gradient(
      from 180deg at top right, 
      white min(var(--frequency-high, 0%), 100%), 
      #0000 0
    )`
  ]
}