<script>
	import { scaleBand } from 'd3'

	export let data, margins, parentSize
	const { width, height } = parentSize
	const { top, right, bottom, left } = margins
	const years = Array.from(new Set(data.map((d) => d.year)))
	const x = scaleBand()
		.domain(years)
		.round(true)
		.paddingOuter(0.15)
		.paddingInner(0.65)
		.range([left, width - right])
</script>

{#each years as year}
	<text x={x(year)} y={height - bottom}>{year}</text>
{/each}

<style>
	/* your styles go here */
</style>
