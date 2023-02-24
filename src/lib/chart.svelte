<script>
	import { darien } from '../stores/dataStore'
	import { boxSize } from '../stores/size-store'
	import Area from './area.svelte'
	import Quadtree from './quadtree/quadtree.svelte'
	import Svg from './svg.svelte'
	import XAxis from './x-axis.svelte'
	import YAxis from './yAxis/y-axis.svelte'

	const margins = { top: 35, right: 20, bottom: 35, left: 75 }
</script>

<Svg svgWidth={$boxSize.width} svgHeight={$boxSize.height}>
	<Area {margins} />
	<YAxis data={$darien} {margins} />
	<XAxis data={$darien} {margins} />
	<!-- <Quadtree {margins} /> -->
</Svg>

<style>
</style>
