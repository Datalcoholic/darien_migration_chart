<script>
	import { darien } from '../stores/dataStore'
	import { boxSize } from '../stores/size-store'
	import Svg from './svg.svelte'
	import XAxis from './x-axis.svelte'

	const margins = { top: 35, right: 35, bottom: 35, left: 35 }
</script>

<Svg svgWidth={$boxSize.width} svgHeight={$boxSize.height}>
	<XAxis data={$darien} parentSize={$boxSize} {margins} />
</Svg>

<style>
</style>
