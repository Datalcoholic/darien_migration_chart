<script>
	import { darien } from '../stores/dataStore'
	import { boxSize } from '../stores/size-store'
	import Area from './area.svelte'
	import Svg from './svg.svelte'
	import XAxis from './x-axis.svelte'
	import YAxis from './yAxis/y-axis.svelte'

	const margins = { top: 35, right: 50, bottom: 35, left: 25 }
</script>

<Svg svgWidth={$boxSize.width} svgHeight={$boxSize.height}>
	<XAxis data={$darien} {margins} />
	<YAxis data={$darien} {margins} />
	<Area {margins} />
</Svg>

<style>
</style>
