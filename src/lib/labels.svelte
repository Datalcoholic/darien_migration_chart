<script>
	import { group, max, polygonArea, polygonCentroid, polygonHull } from 'd3'
	import { dataForBoxes } from '../stores/dataStore'
	import { y } from '../stores/scalesStores'

	export let boxes, palette
	const numberFormat = new Intl.NumberFormat('es-VE')

	$: countryLabelNames = boxes.filter(
		(d) => d.year === '2022' || d.year === '2019'
	)
</script>

<g class="labels">
	{#each boxes as box}
		<text class="value-label" x={box.centroid.at(0)} y={box.centroid.at(1)}>
			<tspan>{numberFormat.format(box.total)}</tspan>
			<tspan x={box.centroid.at(0)} dy="0.85rem">pers</tspan>
		</text>
	{/each}
	<g class="country-label">
		{#each countryLabelNames as country}
			{#if country.year === '2019'}
				<text
					class="name-label"
					x={country.centroid.at(0) - country.width / 2 - 30}
					y={country.centroid.at(1)}
					fill={palette[country.fill]}
					style="text-anchor: end;"
				>
					{country.country}
				</text>
			{:else}
				<text
					class="name-label"
					x={country.centroid.at(0) + country.width / 2 + 15}
					y={country.centroid.at(1)}
					fill={palette[country.fill]}
				>
					{country.country}
				</text>
			{/if}
		{/each}
	</g>
</g>

<style>
	.value-label {
		font-size: 1.01rem;
		text-anchor: middle;
		font-weight: 600;
		/* stroke: var(--antiflash-white); */
		stroke-width: 0.5px;
		paint-order: stroke;
		fill: var(--antiflash-grey);
		alignment-baseline: middle;
	}

	.name-label {
		font-size: 1.05rem;
		font-weight: 900;
		alignment-baseline: middle;
		text-anchor: start;
	}
</style>
