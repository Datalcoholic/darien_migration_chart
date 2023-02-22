<script>
	import { extent, scaleLinear, nice, sum } from 'd3'
	import { ticks } from 'd3'
	import { y } from '../../stores/scalesStores'
	import YLabelLine from './y-label-line.svelte'
	import { boxSize } from '../../stores/size-store'

	export let data, margins

	const { top, right, bottom, left } = margins
	const totals = data.map((d) => d.totalValue)
	const sumTotals = sum(totals)
	const totalsExt = extent(totals)
	$: yScale = scaleLinear()
		.domain([0, sumTotals])
		.range([$boxSize.height - bottom - top, top])
	$: y.set(yScale)

	const tickValues = ticks(0, sumTotals, 12)
</script>

<g class="y-axis-labels">
	{#each tickValues as tValue, i}
		<YLabelLine
			label={tValue}
			xLabel={$boxSize.width - right}
			yLabel={$y(tValue)}
			{margins}
			{i}
			last={tickValues.length - 1}
		/>
	{/each}
</g>

<style>
	/* your styles go here */
</style>
