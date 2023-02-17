import { csv, group } from 'd3'
import { writable } from 'svelte/store'

export const darien = writable()

let resp = await csv(
	'https://raw.githubusercontent.com/Datalcoholic/darien_migration_chart/master/data/darien_2019-2022_clean.csv',
	(d) => {
		return {
			country: d.toShow,
			year: d.year,
			total: +d.total,
		}
	}
)

resp = Array.from(
	group(resp, (d) => d.year),
	([key, value]) => {
		return {
			key,
			values: value.sort((a, b) => b.total - a.total),
		}
	}
)
console.log('resp :>> ', resp)
darien.set(resp)
