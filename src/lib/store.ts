import { writable } from 'svelte/store'

export const deviceID = writable('default')
export const gradient = writable('radial')

export const connections = writable(0)
export const partyers = writable({})
