<script>
	import { extent, scaleLinear, nice, sum, rollup, max } from 'd3'
	import { ticks } from 'd3'
	import { y } from '../../stores/scalesStores'
	import YLabelLine from './y-label-line.svelte'
	import { boxSize } from '../../stores/size-store'

	export let data, margins

	const { top, right, bottom, left } = margins
	const totals = data.map((d) => d.totalValue)
	const sumTotals = sum(totals)
	const totalsByYear = rollup(
		data,
		(v) => sum(v, (d) => d.totalValue),
		(d) => d.year
	)
	const totalMax = max(totalsByYear)
	// console.log('totalsByYear :>> ', max(totalsByYear))
	const totalsExt = extent(totals)
	$: yScale = scaleLinear()
		.domain([0, totalMax.at(1)])
		.range([$boxSize.height - bottom - top, top])
	$: y.set(yScale)

	const tickValues = ticks(0, totalMax.at(1), 10)
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
