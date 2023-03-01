<script>
	import {
		area,
		cross,
		curveBumpX,
		extent,
		group,
		polygonArea,
		polygonCentroid,
		polygonHull,
		scaleOrdinal,
		scaleSqrt,
	} from 'd3'
	import { darien, dataForBoxes, quadtreeData } from '../stores/dataStore'
	import { x, y } from '../stores/scalesStores'
	import Labels from './labels.svelte'
	import StripesPatterns from './stripes-patterns.svelte'
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

	const paletteConstrast = {
		atomic_tangerine: 'hsla(19, 99%, 41%, 1)',
		ash_gray: 'hsla(72, 15%, 45%, 1)',
		air_superiority_blue: 'hsla(199, 46%, 86%, 1)',
		carolina_blue: 'hsla(201, 51%, 39%, 1)',
		columbia_blue: 'hsla(198, 56%, 54%, 1)',
		tomato: 'hsla(8, 99%, 42%, 1)',
		sunset: 'hsla(36, 98%, 40%, 1)',
	}
	const colorNames = Object.keys(countryColors)
	const countryDomain = Array.from(new Set($darien.map((d) => d.country)))
	const fillPalette = scaleOrdinal().domain(countryDomain).range(colorNames)
	const valuesExt = extent($darien, (d) => d.totalValue)

	const seriesWidth = 40
	// Se generan 2 puntos extras unos antes del punto y otro despues del puntos del eje x
	// NOTE: La manera en que se procesan los ptos para top y bottoms para cada area en este script es engorrosa
	$: transformedData = $darien.map((d) => {
		const before = { ...d, x: $x ? $x(d.year) : null }
		const after = { ...d, x: $x ? $x(d.year) : null }
		return [
			before.x < margins.left ? { ...d, x: margins.left + 15 } : before,
			after,
		]
	})

	$: quadtreeData.set(transformedData)
	$: dataForBoxes.set(transformedData)

	let areaGen
	$: if ($y)
		areaGen = area()
			.x0((d) => d.x0)
			.x1((d) => d.x1)
			.y0((d) => d.y0)
			.y1((d) => d.y1)
			.curve(curveBumpX)

	const totalsExt = extent($darien, (d) => d.total)
	$: rectSizeScale = scaleSqrt()
		.domain([0, totalsExt.at(1)])
		.range([10, 80])
	$: groupedDataNew = Array.from(
		group(boxes.flat(2), (d) => d.country),
		([key, value]) => {
			const points = value.map((d) => {
				const top = [
					{ x0: d.box.at(0).at(0), y0: d.box.at(0).at(1) },
					{ x0: d.box.at(3).at(0), y0: d.box.at(3).at(1) },
					// { x0: d.box.at(4).at(0), y0: d.box.at(4).at(1) },
					// { x0: d.box.at(6).at(0), y0: d.box.at(6).at(1) },
				]
				const bottom = [
					{ x1: d.box.at(1).at(0), y1: d.box.at(1).at(1) },
					{ x1: d.box.at(2).at(0), y1: d.box.at(2).at(1) },
					// { x1: d.box.at(5).at(0), y1: d.box.at(5).at(1) },
					// { x1: d.box.at(7).at(0), y1: d.box.at(7).at(1) },
				]
				// se hacen la permutaciones de todos los puntos generados.
				// para que retorne en un misno objeto tanto los x's tops y x's bottoms
				let permuted = cross(top, bottom, (a, b) =>
					// Solo retona los puntos permutados en los cuales x0 y x1 son iguales
					a.x0 === b.x1 ? { ...a, ...b } : undefined
				)
				permuted = permuted
					.filter((d) => d !== undefined)
					.sort((a, b) => a.x0 - b.x0)
				return [...permuted]
			})

			const d = areaGen ? areaGen(points.flat(1)) : null
			// const d = areaGen ? areaGen(areaPoints) : null

			return {
				key,
				d,
				value,
				fill: fillPalette(key),
			}
		}
	)
	const gapX = 10
	const gapY = 5
	// generar puntos pre y post y antes pre y despues pro para las areas de las series
	$: boxes = $dataForBoxes.map((d) => {
		const x1 = d.at(0).x - rectSizeScale(d.at(0).total) / 2
		const x2 = d.at(1).x + rectSizeScale(d.at(0).total) / 2
		const x3 = d.at(0).year === '2019' ? d.at(0).x : d.at(0).x - gapX
		const x4 = d.at(0).year === '2022' ? d.at(0).x : d.at(1).x + gapX
		const width = Math.abs(x2 - x1)
		const y1 = $y ? $y(d.at(1).order) - rectSizeScale(d.at(0).total) / 2 : null
		const y2 = $y ? $y(d.at(1).order) + rectSizeScale(d.at(0).total) / 2 : null
		const y3 = $y
			? $y(d.at(1).order) + (rectSizeScale(d.at(0).total) / 2 - gapY) * 1.2 //rectSizeScale(d.at(0).total) * 0.4
			: null
		const y4 = $y
			? $y(d.at(1).order) - (rectSizeScale(d.at(0).total) / 2 - gapY) * 1.2 //rectSizeScale(d.at(0).total) * 0.4
			: null
		const height = Math.abs(y2 - y1)

		const box = [
			[x1, y1], // pto pre top
			[x1, y2], // pto pre bottom
			[x2, y2], // pto post top
			[x2, y1], // pto post bottom
			[x3, y4], // pto antes pre  top
			[x3, y3], // pto antes pre bottom
			// [x4, y4], // pto despues post top
			// [x4, y3], // pto despues post bottom
		]
		const { total, year, country, _ } = d.at(0)
		const polygon = polygonHull(box)
		return {
			width,
			height,
			box,
			total,
			year,
			country,
			centroid: polygonCentroid(polygon),
			polygon,
			area: polygonArea(polygon),
			fill: fillPalette(country),
		}
	})
</script>

<defs>
	<g class="patterns">
		{#each groupedDataNew as pattern}
			<StripesPatterns
				viewbox="0,0,40,40"
				width={'20%'}
				height={'20%'}
				id={pattern.key}
				strokeWidth={20}
				stroke={fillPalette(pattern.key)}
				palette={paletteConstrast}
			/>
		{/each}
	</g>
</defs>

<g class="area-series">
	{#each groupedDataNew as d}
		<path class="serie" d={d.d} fill={countryColors[d.fill]} />
	{/each}
</g>

<g class="boxes">
	{#each boxes as box}
		<rect
			x={box.box.at(0).at(0)}
			y={box.box.at(0).at(1)}
			width={box.width}
			height={box.height}
			fill={countryColors[box.fill]}
			rx={2}
		/>
	{/each}
</g>
<g class="pattern-boxes">
	{#each boxes as box}
		<rect
			x={box.box.at(0).at(0)}
			y={box.box.at(0).at(1)}
			width={box.width}
			height={box.height}
			fill={`url(#${box.country.replaceAll(' ', '-')})`}
			rx={2}
			stroke={paletteConstrast[box.fill]}
			style="stroke-width:2.5; opacity:0.7"
		/>
	{/each}
</g>

<Labels {boxes} palette={countryColors} />

<style>
	.serie {
		opacity: 0.45;
	}
</style>
