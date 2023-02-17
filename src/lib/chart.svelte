<script>
	import { boxSize } from '../stores/size-store'
	import Svg from './svg.svelte'
</script>

<Svg svgWidth={$boxSize.width} svgHeight={$boxSize.height}>
	<!-- test -->
</Svg>

<style>
</style>
