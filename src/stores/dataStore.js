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
		let obj = {}
		let values = value
			.sort((a, b) => b.total - a.total)
			.forEach((d) => {
				Object.assign(obj, { [d.country]: d.total })
			})
		return {
			year: key,
			...obj,
		}
	}
)
const dataKeys = Object.keys(resp.at(0)).slice(1)
const stackGen = stack().keys(dataKeys).order(stackOrderAscending)

resp = stackGen(resp).map((d) => {
	const arr = d.map((a) => {
		return {
			from: a.at(0) + 150, //shink the real value
			to: a.at(1) - 150, //shink the real value
			totalValue: a.data[d.key],
			year: a.data.year,
			country: d.key,
		}
	})

	return arr
})
console.log('resp :>> ', resp)
darien.set(resp.flat())

export { darien, quadtreeData, dataForBoxes }
