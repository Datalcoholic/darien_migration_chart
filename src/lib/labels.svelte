<script>
	import { max, polygonArea, polygonCentroid, polygonHull, rank } from 'd3'
	import { dataForBoxes } from '../stores/dataStore'
	import { x, y } from '../stores/scalesStores'

	export let fillScale, palette

	function rectArea(arr) {
		const [point1, point2] = arr
		const width = point2.at(0) - point1.at(0)
		const length = point2.at(1) - point1.at(1)
		return Math.abs(width * length)
	}

	$: boxes = $dataForBoxes.map((d) => {
		const x1 = d.at(0).x
		const x2 = d.at(1).x
		const width = Math.abs(x2 - x1)
		const y1 = $y ? $y(d.at(0).to) : null
		const y2 = $y ? $y(d.at(1).from) : null
		const height = Math.abs(y2 - y1)

		const box = [
			[x1, y1],
			[x1, y2],
			[x2, y2],
			[x2, y1],
		]
		const { totalValue, year, country, _ } = d.at(0)
		const polygon = polygonHull(box)
		return {
			width,
			height,
			box,
			totalValue,
			year,
			country,
			centroid: polygonCentroid(polygon),
			polygon,
			area: polygonArea(polygon),
		}
	})

	$: countryLabels = boxes.filter((d) => +d.year === max(boxes, (d) => +d.year))
	$: console.log('countryLabels :>> ', countryLabels)
</script>

{#each boxes as box}
	<rect
		x={box.box.at(0).at(0)}
		y={box.box.at(0).at(1)}
		width={box.width}
		height={box.height}
		fill="none"
		stroke="black"
	/>
{/each}

{#each countryLabels as country}
	<text
		class="country-label"
		x={country.centroid.at(0) + country.width / 2 + 10}
		y={country.centroid.at(1)}
		fill={palette[fillScale(country.country)]}
	>
		{country.country}
	</text>
	<!-- content here -->
{/each}

<style>
	.country-label {
		font-size: 1.05rem;
		font-weight: 800;
	}
</style>
