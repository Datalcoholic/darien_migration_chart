<script>
	import { boxSize } from '../../stores/size-store'
	export let label, xLabel, yLabel, margins, i, last
	const numberFormat = Intl.NumberFormat('es-ES', {
		notation: 'compact',
	})
</script>

<g class="label">
	<text x={xLabel} y={yLabel} style="text-anchor:end">{label} </text>
</g>

<style>
	.label {
		stroke: var(--antiflash-white-1);
		stroke-width: 1px;
		paint-order: stroke;
		font-weight: 400;
		font-size: var(--font-axis-size);
		letter-spacing: -1.8px;
		fill: var(--antiflash-grey);
	}

	line {
		stroke: var(--antiflash-white-1);
		stroke-width: 0.5px;
	}
</style>
