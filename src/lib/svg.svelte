<script>
	export let svgWidth, svgHeight
</script>

<svg width={svgWidth} height={svgHeight}>
	<slot />
</svg>

<style>
	svg {
		margin: -15px 0 0 0;
	}
</style>
