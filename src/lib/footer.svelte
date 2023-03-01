<script>
	export let margins, height
</script>

<g class="footer">
	<text x={margins.left} y={height - margins.bottom + margins.top}>
		<tspan class="bold">Data:</tspan> Migración Panama
	</text>
</g>

<style>
	.footer {
		font-size: 0.98rem;
		fill: var(--antiflash-grey);
		font-weight: 200;
	}
	.bold {
		font-weight: 600;
	}
</style>
