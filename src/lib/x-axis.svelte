<script>
	import { scaleBand } from 'd3'
	import { x } from '../stores/scalesStores'
	import { boxSize } from '../stores/size-store'

	export let data, margins
	const { top, right, bottom, left } = margins
	const years = Array.from(new Set(data.map((d) => d.year)))
	$: xScale = scaleBand()
		.domain(years)
		.round(true)
		.paddingOuter(0.15)
		.paddingInner(0.65)
		.range([left, $boxSize.width - right])

	$: x.set(xScale)
</script>

<g class="x-labels">
	{#if $x}
		<g>
			{#each years as year}
				<text class="x-label" x={$x(year)} y={$boxSize.height - bottom}
					>{year}</text
				>
			{/each}
		</g>
	{/if}
</g>

<style>
	.x-labels {
		stroke: var(--antiflash-white-1);
		stroke-width: 1.5px;
		paint-order: stroke;
		font-weight: 400;
		font-size: var(--font-axis-size);
		letter-spacing: -1.8px;
		fill: var(--antiflash-grey);
	}
	.x-label {
		alignment-baseline: ideographic;
	}
</style>
