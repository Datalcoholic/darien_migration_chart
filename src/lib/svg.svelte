<script>
	export let svgWidth, svgHeight
</script>

<svg width={svgWidth} height={svgHeight}>
	<slot />
</svg>

<style>
	svg {
		outline: 1px solid cornflowerblue;
	}
</style>
