<script>
	export let viewbox, width, height, id, strokeWidth, stroke, palette
</script>

<pattern
	id={id.replaceAll(' ', '-')}
	viewBox={viewbox}
	{width}
	{height}
	patternTransform="rotate(45)"
>
	<line
		x={0}
		y={0}
		x1={200}
		y1={0}
		stroke={palette[stroke]}
		style="stroke-width:{strokeWidth}"
	/>
</pattern>

<style>
	line {
		opacity: 0.3;
	}
</style>
