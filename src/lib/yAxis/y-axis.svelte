<script>
	import { extent, scaleLinear, nice, sum, rollup, max, scaleBand } from 'd3'
	import { ticks } from 'd3'
	import { y } from '../../stores/scalesStores'
	import YLabelLine from './y-label-line.svelte'
	import { boxSize } from '../../stores/size-store'

	export let data, margins

	const { top, right, bottom, left } = margins
	const orderValues = Array.from(new Set(data.map((d) => d.order))).reverse()
	console.log('orderValues :>> ', orderValues)
	$: yScale = scaleBand()
		.paddingOuter(0.9)
		.paddingInner(0.5)
		.domain(orderValues)
		.range([$boxSize.height - bottom - top, top])
	$: y.set(yScale)

	const tickValues = orderValues
</script>

<g class="y-axis-labels">
	{#each tickValues as tValue, i}
		<YLabelLine
			label={tValue}
			xLabel={left}
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
