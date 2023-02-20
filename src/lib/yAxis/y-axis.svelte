<script>
	import { extent, scaleLinear, nice } from 'd3'
	import { ticks } from 'd3'
	import { y } from '../../stores/scalesStores'
	import YLabelLine from './y-label-line.svelte'
	import { boxSize } from '../../stores/size-store'

	export let data, margins

	const { top, right, bottom, left } = margins
	const totals = data.map((d) => d.totalValue)
	const totalsExt = extent(totals)
	$: yScale = scaleLinear()
		.domain(totalsExt)
		.range([$boxSize.height - bottom - top, top])
	$: y.set(yScale)

	const tickValues = ticks(0, totalsExt.at(1), 12)
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
