<script>
	import { group, max, polygonArea, polygonCentroid, polygonHull } from 'd3'
	import { dataForBoxes } from '../stores/dataStore'
	import { y } from '../stores/scalesStores'

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
	$: valueLabels = Array.from(
		group(boxes, (d) => d.country),
		([key, value]) => {
			const maxArea = max(value, (d) => d.area)
			const filterValue = value.filter((d) => d.area === maxArea)
			return {
				...filterValue.at(0),
			}
		}
	)

	const minSize = {
		Cuba: '1.5rem',
		Chile: '0.8rem',
		Brasil: '0.7rem',
	}

	const labelPalette = {
		atomic_tangerine: 'hsla(19, 99%, 41%, 1)',
		ash_gray: 'hsla(72, 15%, 45%, 1)',
		air_superiority_blue: 'hsla(199, 46%, 86%, 1)',
		carolina_blue: 'hsla(201, 51%, 39%, 1)',
		columbia_blue: 'hsla(198, 56%, 54%, 1)',
		tomato: 'hsla(8, 99%, 82%, 1)',
		sunset: 'hsla(36, 98%, 40%, 1)',
	}
	const labelFormat = new Intl.NumberFormat('es-VE')
	// $: test = filter(valueLabels, (d) => d.area === max(d, (d) => d.area))
	$: console.log('test :>> ', valueLabels)
</script>

<!-- {#each valueLabels as box}
	<rect
		x={box.box.at(0).at(0)}
		y={box.box.at(0).at(1)}
		width={box.width}
		height={box.height}
		fill="none"
		stroke="black"
	/>
{/each} -->

{#each countryLabels as country}
	<text
		class="country-label"
		x={country.centroid.at(0) + country.width / 2 + 10}
		y={country.centroid.at(1)}
		fill={palette[fillScale(country.country)]}
	>
		{country.country}
	</text>
{/each}

{#each valueLabels as label}
	{#if label.country in minSize}
		<text
			class="value-label"
			x={label.centroid.at(0)}
			y={label.centroid.at(1)}
			style="font-size: {minSize[label.country]}"
			fill={labelPalette[fillScale(label.country)]}
		>
			{labelFormat.format(label.totalValue)} p
		</text>
	{:else}
		<text
			class="value-label"
			x={label.centroid.at(0)}
			y={label.centroid.at(1)}
			fill={labelPalette[fillScale(label.country)]}
		>
			{labelFormat.format(label.totalValue)} p
		</text>
	{/if}
{/each}

<style>
	.country-label {
		font-size: 1.05rem;
		font-weight: 800;
	}
	.value-label {
		font-size: 2rem;
		font-weight: 800;
		text-anchor: middle;
		alignment-baseline: middle;
		letter-spacing: -0.1rem;
	}
</style>
