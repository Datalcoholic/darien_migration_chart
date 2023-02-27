import {
	csv,
	group,
	stack,
	stackOffsetDiverging,
	stackOffsetExpand,
	stackOffsetNone,
	stackOffsetSilhouette,
	stackOffsetWiggle,
	stackOrderAscending,
	stackOrderDescending,
} from 'd3'
import { writable } from 'svelte/store'

const darien = writable()
const quadtreeData = writable()
const dataForBoxes = writable()

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
		const vals = value
			.sort((a, b) => b.total - a.total)
			.map((d, i) => {
				return {
					...d,
					order: i + 1,
				}
			})
		return [...vals]
	}
)

console.log('resp :>> ', resp)
darien.set(resp.flat(1))

export { darien, quadtreeData, dataForBoxes }
