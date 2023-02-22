<script>
	import {
		area,
		curveBumpX,
		curveMonotoneX,
		extent,
		group,
		scaleLinear,
		scaleOrdinal,
	} from 'd3'
	import { darien } from '../stores/dataStore'
	import { x, y } from '../stores/scalesStores'
	import { boxSize } from '../stores/size-store'
	export let margins
	const countryColors = {
		atomic_tangerine: 'hsla(19, 99%, 71%, 1)',
		ash_gray: 'hsla(72, 15%, 74%, 1)',
		air_superiority_blue: 'hsla(199, 46%, 56%, 1)',
		carolina_blue: 'hsla(201, 51%, 69%, 1)',
		columbia_blue: 'hsla(198, 56%, 84%, 1)',
		tomato: 'hsla(8, 99%, 65%, 1)',
		sunset: 'hsla(36, 98%, 77%, 1)',
	}

	const colorNames = Object.keys(countryColors)
	const countryDomain = Array.from(new Set($darien.map((d) => d.country)))
	const fillPalette = scaleOrdinal().domain(countryDomain).range(colorNames)
	const valuesExt = extent($darien, (d) => d.totalValue)

	const seriesWidth = 80
	// Se generan 2 puntos extras unos antes del punto y otro despues del puntos del eje x
	$: transformedData = $darien.map((d) => {
		const before = { ...d, x: $x(d.year) - seriesWidth }
		const after = { ...d, x: $x(d.year) + seriesWidth }
		return [before, after]
	})
	$: areaGen = area()
		.x((d) => d.x)
		.y0((d) => $y(d.from))
		.y1((d) => $y(d.to))
		.curve(curveBumpX)

	$: groupedDataNew = Array.from(
		group(transformedData.flat(2), (d) => d.country),
		([key, value]) => {
			const d = areaGen(value)
			return {
				key,
				d,
				fill: fillPalette(key),
			}
		}
	)
</script>

<g class="area-series">
	{#each groupedDataNew as d}
		<path d={d.d} fill={countryColors[d.fill]} />
	{/each}
</g>

<style>
	.area-series {
		stroke: white;
	}
</style>
