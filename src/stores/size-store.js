import { writable } from 'svelte/store'

export const boxSize = writable({ width: 500, height: 500 })
