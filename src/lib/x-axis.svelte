<script>
	import { scaleBand } from 'd3'
	import { boxSize } from '../stores/size-store'

	export let data, margins
	const { top, right, bottom, left } = margins
	const years = Array.from(new Set(data.map((d) => d.year)))
	$: x = scaleBand()
		.domain(years)
		.round(true)
		.paddingOuter(0.15)
		.paddingInner(0.65)
		.range([left, $boxSize.width - right])
</script>

{#each years as year}
	<text x={x(year)} y={$boxSize.height - bottom}>{year}</text>
{/each}

<style>
	/* your styles go here */
</style>
