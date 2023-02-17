<script>
	import { darien } from '../stores/dataStore'
	import { boxSize } from '../stores/size-store'
	import Svg from './svg.svelte'

	console.log('darien :>> ', $darien)
</script>

<Svg svgWidth={$boxSize.width} svgHeight={$boxSize.height}>
	<!-- test -->
</Svg>

<style>
</style>
